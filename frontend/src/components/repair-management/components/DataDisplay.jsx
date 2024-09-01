import {useEffect, useState} from 'react';
import axios from "../../../services/axios.js";
import {FaChevronLeft, FaChevronRight, FaFilter, FaSearch} from 'react-icons/fa';
import {MdClear} from 'react-icons/md';
import Status from "../../divs/Status.jsx";
import ActionButtonColor from "../../divs/ActionButtonColor.jsx";
import OnCreateForm from "./OnCreateForm.jsx";

const DataManagementComponent = () => {
    const [data, setData] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [editingItem, setEditingItem] = useState(null);
    const [isEdit, setIsEdit] = useState('edit');
    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        axios.get('/machines/').then((response) => {
            setData(response.data);
        }).catch((error) => {
            alert(error);
        });
    }, []);

    const itemsPerPage = 10;
    const filteredData = data.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) &&
        (statusFilter === 'all' || item.status === statusFilter)
    );

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleViewMode = (mode) => {
        setViewMode(mode);
        setEditingItem(null);
    };

    // const handleEdit = (item) => {
    //     setEditingItem({...item});
    //     setViewMode('edit');
    // };

    const handleSave = () => {
        // In a real application, you would update the data source here
        setEditingItem(null);
        setViewMode('list');
    };

    const handleInputChange = (e) => {
        setEditingItem({...editingItem, [e.target.name]: e.target.value});
    };

    function handleDelete(item_id) {
        axios.delete(`/machines/${item_id}`).then((response) => {
            setData(data.filter((item) => item.item_id !== item_id));
        }).catch((error) => {
            alert(error);
        });

    }

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            {isCreate && (
                <OnCreateForm setIsCreate={"setIsCreate"} setData={"setData"}/>
            )}
            <div className="mb-4 flex flex-wrap items-center justify-between">
                <h1 className="text-2xl font-bold mb-2 sm:mb-0">Machine Management</h1>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center"
                    >
                        <FaFilter className="mr-2"/> Filters
                    </button>
                    <button
                        onClick={
                            () => {
                                if (isCreate === false) {
                                    setIsCreate(true);
                                    setViewMode('not list')
                                    setEditingItem(null);
                                    setIsEdit('not');
                                } else {
                                    setIsCreate(false);
                                    setViewMode('list');
                                    setEditingItem(null);
                                    setIsEdit('edit');
                                }

                            }
                        }
                    >
                        Add Machine
                    </button>
                    {/*<button*/}
                    {/*    onClick={() => handleViewMode('grid')}*/}
                    {/*    className={`px-4 py-2 rounded transition duration-300 ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}*/}
                    {/*>*/}
                    {/*    Grid*/}
                    {/*</button>*/}
                </div>
            </div>

            {filterOpen && (
                <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-inner">
                    <div className="flex flex-wrap items-center space-x-4">
                        <div className="relative flex-grow mb-2 sm:mb-0">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute right-3 top-3 text-gray-400"/>
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">Pending</option>
                        </select>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setStatusFilter('all');
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 flex items-center"
                        >
                            <MdClear className="mr-2"/> Clear
                        </button>
                    </div>
                </div>
            )}

            {isEdit === 'edit' && editingItem && (
                <div className="mb-4 p-4 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Edit Machine</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Machine
                                Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={editingItem.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Machine
                                Type</label>
                            <input
                                type="text"
                                id="type"
                                name="type"
                                value={editingItem.type}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={editingItem.status}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => {
                                    setEditingItem(null)
                                    setViewMode('list')
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {viewMode === 'list' && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                        <thead className="bg-color_extra text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Machine ID</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Machine Name</th>
                            <th className="py-3 px-4 text-left">Machine Type</th>
                            <th className="py-3 px-4 text-left">Driver ID</th>
                            <th className="py-3 px-4 text-left">Registration Number</th>
                            <th className="py-3 px-4 text-left sticky right-0 bg-color_button text-black">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {paginatedData.map((item) => (
                            <tr key={item.item_id} className="hover:bg-gray-50 transition duration-300">
                                <td className="py-3 px-4">{item.item_id}</td>
                                <td className="py-3 px-4"><Status value={item.status}/></td>
                                <td className="py-3 px-4">{item.name}</td>
                                <td className="py-3 px-4">{item.type}</td>
                                <td className="py-3 px-4">{item.driver_id}</td>
                                <td className="py-3 px-4">{item.registration_number}</td>
                                <td className="py-3 px-4 sticky right-0 backdrop-blur space-x-2">
                                    <ActionButtonColor text='Edit' onclickfun={
                                        () => {
                                            setEditingItem({...item});
                                            setIsEdit('edit');
                                        }
                                    }/>
                                    <ActionButtonColor text='Delete' color='bg-red-500'
                                                       onclickfun={
                                                           () => {
                                                               handleDelete(item.item_id)
                                                           }
                                                       }/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/*{viewMode === 'grid' && (*/}
            {/*    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">*/}
            {/*        {paginatedData.map((item) => (*/}
            {/*            <div key={item.item_id} className="bg-white rounded-lg shadow-lg overflow-hidden">*/}
            {/*                <div className="p-4">*/}
            {/*                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>*/}
            {/*                    <p className="text-gray-600 mb-2">ID: {item.item_id}</p>*/}
            {/*                    <p className="mb-2">Type: {item.type}</p>*/}
            {/*                    <p className="mb-2">Driver ID: {item.driver_id}</p>*/}
            {/*                    <p className="mb-2">Registration: {item.registration_number}</p>*/}
            {/*                    <div className="mb-4">*/}
            {/*                        /!*<Status value={item.status}/>*!/*/}
            {/*                        <Status value={"Active"}/>*/}
            {/*                    </div>*/}
            {/*                    <div className="flex justify-end space-x-2">*/}
            {/*                        <ActionButtonColor text='Edit' href={`/repair-management/edit/${item.item_id}`}/>*/}
            {/*                        <ActionButtonColor text='Delete' color='bg-red-500'*/}
            {/*                                           href={`/repair-management/delete/${item.item_id}`}/>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}

            {viewMode === 'list' && (
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-700">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
                    </p>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                        >
                            <FaChevronLeft/>
                        </button>
                        <span className="text-sm text-gray-700">
            Page {currentPage} of {pageCount}
          </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                            disabled={currentPage === pageCount}
                            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                        >
                            <FaChevronRight/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataManagementComponent;
import {useState} from "react";

const MaintenanceFrom = () => {
    const [maintenance, setMaintenance] = useState({
        machine: "",
        date: "",
        description: "",
        cost: "",
        status: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setMaintenance({
            ...maintenance,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(maintenance);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
            <input
                type="text"
                name="machine"
                value={maintenance.machine}
                onChange={handleChange}
                placeholder="Machine"
                className="p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <input
                type="date"
                name="date"
                value={maintenance.date}
                onChange={handleChange}
                placeholder="Date"
                className="p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <input
                type="text"
                name="description"
                value={maintenance.description}
                onChange={handleChange}
                placeholder="Description"
                className="p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <input
                type="number"
                name="cost"
                value={maintenance.cost}
                onChange={handleChange}
                placeholder="Cost"
                className="p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <input
                type="text"
                name="status"
                value={maintenance.status}
                onChange={handleChange}
                placeholder="Status"
                className="p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
                Submit
            </button>
        </form>
    );
}
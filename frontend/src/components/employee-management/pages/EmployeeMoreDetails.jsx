import { useEffect, useState, useRef } from 'react';
import axios from 'axios'; 
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EmployeeMoreDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const componentsRef = useRef();
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        Id: "",
        email: "",
        age: "",
        gender: "",
        dateOfBirth: "",
        contactNo: "",
        designation: "",
        department: "",
        dateOfJoining: "",
        salary: "",
        leavesLeft: 30,
        address: "",
    });

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/api/empManagement/${id}`
                );
                if (response.data) {
                    setInputs(response.data);
                } else {
                    console.error("Employee data not found.");
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            }
        };
        fetchHandler();
    }, [id]);

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // Function to generate and download the PDF report
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Employee Details", 14, 22);

        // Prepare data for the PDF
        const pdfData = inputs.map((EmployeeDet) => [
            EmployeeDet?.firstName,
            EmployeeDet?.lastName,
            EmployeeDet?.age,
            EmployeeDet?.email,
            EmployeeDet?.contactNumber,
            EmployeeDet?._id,
        ]);

        // Add a table to the PDF
        doc.autoTable({
            head: [["First Name", "Last Name", "Age", "Email", "Contact Number", "ID"]],
            body: pdfData,
            startY: 30,
            headStyles: {
                fillColor: [21, 245, 186],
                textColor: 0,
                styles: {
                    lineWidth: 1,
                    lineColor: [0, 0, 0],
                },
            },
        });

        doc.save("EmployeeDetails.pdf");
    };

    const handlePrint = useReactToPrint({
        content: () => componentsRef.current,
        documentTitle: "Employee Report",
        onAfterPrint: () => alert("Employee Report Successfully Downloaded!"),
    });

    return (
        <div className=" flex items-center justify-center bg-gray-100">
            <div ref={componentsRef} className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mt-10">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Employee Details</h1>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* First Name Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.firstName}</p>
                        </div>

                        {/* Last Name Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.lastName}</p>
                        </div>

                        {/* Company ID Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company ID</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.Id}</p>
                        </div>

                        {/* Email Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.email}</p>
                        </div>

                        {/* Age Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.age}</p>
                        </div>

                        {/* Gender Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.gender}</p>
                        </div>

                        {/* Date of Birth Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.dateOfBirth}</p>
                        </div>

                        {/* Contact No Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact No</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.contactNumber}</p>
                        </div>

                        {/* Designation Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Designation</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.designation}</p>
                        </div>

                        {/* Department Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Department</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.department}</p>
                        </div>

                        {/* Date of Joining Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Joining</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.dateOfJoining}</p>
                        </div>

                        {/* Salary Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Salary</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.salary}</p>
                        </div>

                        {/* Leaves Left Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Leaves Left</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.leavesLeft}</p>
                        </div>

                        {/* Address Display */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <p className="mt-1 text-sm text-gray-600">{inputs.address}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EmployeeMoreDetails;

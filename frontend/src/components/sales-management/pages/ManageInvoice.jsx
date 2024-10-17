import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from '../../../services/axios.js';
import { useNavigate } from 'react-router-dom';

const AddInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const navigateTo = useNavigate();

  // Fetch invoices from the API
  const fetchInvoices = async () => {
    try {
      const response = await axios.get("/invoices/");
      setInvoices(response.data);
      setFilteredInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices data:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    setFilteredInvoices(
      invoices.filter((invoice) =>
        invoice.invoice_Number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (invoice.buyer_id.fName + ' ' + invoice.buyer_id.lName).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, invoices]);

  // Navigate to update invoice page
  const handleUpdate = (invoice) => {
    navigateTo(`/admin/sales/addinvoice/${invoice._id}`, { state: { invoice } });
  };

  // Delete an invoice
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/invoices/${id}`);
      alert("Invoice deleted successfully");
      setInvoices(invoices.filter((invoice) => invoice._id !== id));
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  // Function to generate and download the PDF report
  const handleDownloadReport = () => {
    const doc = new jsPDF();
    const tableColumn = ["Invoice Number", "Title", "Date", "Customer Name", "Address", "Phone", "Grand Total"];
    const tableRows = [];

    // Add each invoice data to the table rows
    filteredInvoices.forEach((invoice) => {
      const invoiceData = [
        invoice.invoice_Number,
        invoice.title,
        invoice.date,
        `${invoice.buyer_id.fName} ${invoice.buyer_id.lName}`,
        invoice.address,
        invoice.telephone,
        invoice.grand_total
      ];
      tableRows.push(invoiceData);
    });

    // Create the table in the PDF
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Invoice Report", 14, 15);
    doc.save("Invoices_Report.pdf"); // Save the PDF
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Invoice Management</h1>

      {/* Download Report Button */}
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleDownloadReport}
        >
          Download Full Report (PDF)
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Invoice Number, Title, or Customer Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-teal-500 text-white">
              <th className="py-2 px-4 text-left">Invoice Number</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Customer Name</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Grand Total</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <tr key={invoice._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{invoice.invoice_Number}</td>
                  <td className="py-2 px-4 border">{invoice.title}</td>
                  <td className="py-2 px-4 border">{invoice.date}</td>
                  <td className="py-2 px-4 border">{`${invoice.buyer_id.fName} ${invoice.buyer_id.lName}`}</td>
                  <td className="py-2 px-4 border">{invoice.address}</td>
                  <td className="py-2 px-4 border">{invoice.telephone}</td>
                  <td className="py-2 px-4 border">{invoice.grand_total}</td>
                  <td className="py-2 px-4 border flex justify-center gap-2">
                    <button
                      className="bg-teal-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleUpdate(invoice)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleDelete(invoice._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No invoices available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddInvoice;

import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    invoice_Number: '',
    title: '',
    date: '',
    buyer_id: '',
    address: '',
    telephone: '',
    email: '',
    products: [{ product_id: '', quantity: '', uni_price: '', subtotal: '0.00' }],
    sales_tax: 0,
    grand_total: 0,
  });

  const [displayInvoice, setDisplayInvoice] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const products = [...formData.products];
    products[index][name] = value;

    // Update subtotal for the product
    if (name === 'quantity' || name === 'uni_price') {
      products[index].subtotal = (
        parseFloat(products[index].quantity || 0) * parseFloat(products[index].uni_price || 0)
      ).toFixed(2);
    }

    setFormData((prevData) => ({
      ...prevData,
      products,
    }));
  };

  const calculateTotals = () => {
    const total = formData.products.reduce((sum, product) => {
      return sum + parseFloat(product.subtotal || 0);
    }, 0);
    
    const salesTax = total * 0.1; // Assuming 10% sales tax
    const grandTotal = total + salesTax;

    setFormData((prevData) => ({
      ...prevData,
      sales_tax: salesTax.toFixed(2),
      grand_total: grandTotal.toFixed(2),
    }));
  };

  const handleDisplayInvoice = () => {
    calculateTotals(); // Calculate totals before displaying
    const invoiceDetails = {
      ...formData,
      products: formData.products.map((product) => ({
        ...product,
        subtotal: parseFloat(product.subtotal).toFixed(2),
      })),
    };
    setDisplayInvoice(invoiceDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the invoice data to the server
      await axios.post('http://localhost:3001/api/invoices', formData);
      
      // Send the email with the invoice
      await axios.post('http://localhost:3001/api/send-invoice', {
        email: formData.email,
        invoice: displayInvoice,
      });

      alert('Invoice submitted and sent successfully!');
      setFormData({ /* reset form data */ });
      setDisplayInvoice(null);
    } catch (error) {
      console.error(error);
      alert('Failed to submit the invoice.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Invoice Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="invoice_Number" placeholder="Invoice Number" onChange={handleInputChange} required />
        <input type="text" name="title" placeholder="Invoice Title" onChange={handleInputChange} required />
        <input type="date" name="date" onChange={handleInputChange} required />
        <input type="text" name="buyer_id" placeholder="Buyer ID" onChange={handleInputChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
        <input type="text" name="telephone" placeholder="Telephone" onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />

        {formData.products.map((product, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              name="product_id"
              placeholder="Product ID"
              onChange={(e) => handleProductChange(index, e)}
              required
              className="border p-2"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              onChange={(e) => handleProductChange(index, e)}
              required
              className="border p-2"
            />
            <input
              type="number"
              name="uni_price"
              placeholder="Unit Price"
              onChange={(e) => handleProductChange(index, e)}
              required
              className="border p-2"
            />
          </div>
        ))}

        <button type="button" onClick={handleDisplayInvoice} className="bg-yellow-500 text-white px-4 py-2 rounded ml-4">
          Display Invoice
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded ml-4">
          Submit Invoice
        </button>
      </form>

      {displayInvoice && (
        <div className="mt-8 p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Invoice</h3>
            <div>
              <p>{displayInvoice.title}</p>
              <p>Invoice No: {displayInvoice.invoice_Number}</p>
              <p>Date: {displayInvoice.date}</p>
            </div>
          </div>
          <div className="mt-4">
            <p><strong>Client Name:</strong> {displayInvoice.buyer_id}</p>
            <p><strong>Address:</strong> {displayInvoice.address}</p>
            <p><strong>Telephone:</strong> {displayInvoice.telephone}</p>
            <p><strong>Email:</strong> {displayInvoice.email}</p>
          </div>

          <table className="w-full mt-6 border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">QTY</th>
                <th className="border p-2">DESCRIPTION</th>
                <th className="border p-2">PRICE</th>
                <th className="border p-2">SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {displayInvoice.products.map((product, index) => (
                <tr key={index}>
                  <td className="border p-2">{product.quantity}</td>
                  <td className="border p-2">{product.product_id}</td>
                  <td className="border p-2">${product.uni_price}</td>
                  <td className="border p-2">${product.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between">
            <div>
              <p><strong>Sales Tax:</strong> ${displayInvoice.sales_tax}</p>
              <p><strong>Total Due:</strong> ${displayInvoice.grand_total}</p>
            </div>
            <div>
              <p><strong>Payment Info:</strong></p>
              <p>Account No: 123456789</p>
              <p>Routing No: 987654321</p>
            </div>
          </div>
          <p className="mt-4 text-center">Thank you!</p>
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;

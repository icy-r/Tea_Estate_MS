import React, { useEffect, useState } from 'react';
import axios from '../../../services/axios.js';

const URL = "http://localhost:3001/api/invoices/";

// Fetch all invoices

const fetchHanler = async () => {
  return await axios.get(URL).then((res) => res,data);
}

function InvoiceDetails() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchHanler().then((data) => setInvoices(data.invoice));
  }, []);

  const{invoice_Number, title, date, name, address, phone, description, quantity, uni_price, subtotal, sales_tax, grand_total} = props.invoice;

  

  return (
    <div>
      <h1 className="text-2xl font-semibold">Invoice Details</h1>
      <div>
        {invoices && invoices.map((invoice, i) => (
          <div key={i}>
            <InvoiceDetails invoice={invoice} />
          </div>
        ))}
      </div>

      <table className="w-full mt-6">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Title</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
            <th>Sales Tax</th>
            <th>Grand Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.invoice_Number}</td>
              <td>{invoice.title}</td>
              <td>{invoice.date}</td>
              <td>{invoice.name}</td>
              <td>{invoice.address}</td>
              <td>{invoice.phone}</td>
              <td>{invoice.description}</td>
              <td>{invoice.quantity}</td>
              <td>{invoice.uni_price}</td>
              <td>{invoice.subtotal}</td>
              <td>{invoice.sales_tax}</td>
              <td>{invoice.grand_total}</td>
              <button className="text-red-500 border border-red-500 px-2 py-1 rounded mr-2">DELETE</button>
              <button className="text-teal-500 border border-teal-500 px-2 py-1 rounded">EDIT</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export default InvoiceDetails;

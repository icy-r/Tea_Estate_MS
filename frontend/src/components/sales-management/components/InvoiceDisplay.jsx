import React from 'react';


const InvoiceDisplay = ({ invoiceData }) => {
  const { clientName, invoiceDate, invoiceNo, items, totalDue } = invoiceData;

  return (
    <div style={styles.invoiceContainer}>
      <h1 style={styles.header}>Invoice</h1>
      <h2>Client Name: {clientName}</h2>
      <div style={styles.clientInfo}>
        <p>Invoice Date: {invoiceDate}</p>
        <p>Invoice No: {invoiceNo}</p>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Qty</th>
            <th>Description</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.quantity}</td>
              <td>{item.description}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.total}>
        <h3>Total Due: ${totalDue.toFixed(2)}</h3>
      </div>
      <footer style={styles.footer}>
        <p>Thank you!</p>
      </footer>
    </div>
  );
};

const styles = {
  invoiceContainer: {
    padding: '20px',
    border: '1px solid #000',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
  },
  clientInfo: {
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  total: {
    textAlign: 'right',
    marginTop: '20px',
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px',
  },
};

export default InvoiceDisplay;

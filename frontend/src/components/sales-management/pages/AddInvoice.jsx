import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../services/axios.js'; // Assuming axios is set up for your API

const Invoice = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    invoice_Number: '',
    title: '',
    date: '',
    buyer_id: '',
    order_id: '',
    product_id: '',
    address: '',
    telephone: '',
    email: '',
    products: [
      { product_id: '', quantity: 1, uni_price: 0, subtotal: 0 }, // Start with one product
    ],
    sales_tax: 0.15, // Set default 15% sales tax
    grand_total: 0,
  });

  const [total, setTotal] = useState(0); // State for total
  const [buyers, setBuyers] = useState([]); // State for buyers
  const [orders, setOrders] = useState([]); // State for orders
  const [products, setProducts] = useState([]); // State for products
  const [errors, setErrors] = useState({}); // State to hold validation errors

  const [displayInvoice, setDisplayInvoice] = useState(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const buyerResponse = await axios.get('http://localhost:3001/api/buyers');
        console.log("Buyers:", buyerResponse.data);
        setBuyers(buyerResponse.data);
      } catch (error) {
        console.error('Error fetching buyers:', error);
      }
    };

    const fetchOrders = async () => {
      const response = await axios.get("http://localhost:3001/api/orders");
      console.log("Orders:", response.data);
      setOrders(response.data);
    };

   const fetchProducts = async () => {
      try {
        const productResponse = await axios.get('http://localhost:3001/api/catalog');
        console.log("Products:", productResponse.data);
        setProducts(productResponse.data); // Store fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchBuyers();
    fetchOrders();
    fetchProducts();
  }, []);

  // Handle input changes for the general invoice fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear the corresponding error if the input is changed
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // Automatically fill in address, phone, and email based on buyer selection
  const handleBuyerChange = (e) => {
    const selectedBuyerId = e.target.value;
    const selectedBuyer = buyers.find((buyer) => buyer._id === selectedBuyerId);

    setFormData((prevState) => ({
      ...prevState,
      buyer_id: selectedBuyerId,
      address: selectedBuyer ? selectedBuyer.companyAddress : '',
      telephone: selectedBuyer ? selectedBuyer.telephone : '',
      email: selectedBuyer ? selectedBuyer.email : '',
    }));
  };

  // Handle product changes
  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index][key] = value;

    const quantity = parseFloat(updatedProducts[index].quantity) || 0;
    const uni_price = parseFloat(updatedProducts[index].uni_price) || 0;
    const subtotal = quantity * uni_price;

    updatedProducts[index].subtotal = subtotal.toFixed(2);

    const totalSubtotal = updatedProducts.reduce(
      (acc, product) => acc + parseFloat(product.subtotal || 0),
      0
    );

    const sales_tax = totalSubtotal * 0.15;
    const grand_total = totalSubtotal + sales_tax;
    setTotal(grand_total);

    setFormData((prevState) => ({
      ...prevState,
      products: updatedProducts,
      sales_tax: sales_tax.toFixed(2),
      grand_total: grand_total.toFixed(2),
    }));
  };

  // Add a new product row
  const addProduct = () => {
    setFormData((prevState) => ({
      ...prevState,
      products: [
        ...prevState.products,
        { product_id: '', quantity: 1, uni_price: 0, subtotal: 0 },
      ],
    }));
  };

  // Remove a product row
  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);

    const totalSubtotal = updatedProducts.reduce(
      (acc, product) => acc + parseFloat(product.subtotal || 0),
      0
    );

    const sales_tax = totalSubtotal * 0.15;
    const grand_total = totalSubtotal + sales_tax;

    setFormData((prevState) => ({
      ...prevState,
      products: updatedProducts,
      sales_tax: sales_tax.toFixed(2),
      grand_total: grand_total.toFixed(2),
    }));
  };

  // Validate form data
  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    // Validation logic
    if (!formData.invoice_Number) {
      isValid = false;
      tempErrors.invoice_Number = 'Invoice number is required';
    }

    formData.products.forEach((product, index) => {
      if (!product.product_id) {
        isValid = false;
        tempErrors[`product_${index}`] = 'Product must be selected';
      }
    });

    setErrors(tempErrors);
    return isValid;
  };
  const handleDisplayInvoice = () => {
    const invoiceDetails = {
      ...formData,
      products: formData.products.map((product) => ({
        ...product,
        subtotal: parseFloat(product.subtotal).toFixed(2),
      })),
    };
    setDisplayInvoice(invoiceDetails);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await sendRequest(); // Send the invoice data to the server
        alert('Invoice submitted successfully!'); // Success alert
        navigate('/admin/sales/AddInvoice'); // Navigate after success
      } catch (error) {
        alert('Error submitting invoice. Please try again.'); // Error alert
      }
    } else {
      alert('Please fix the errors in the form.'); // Alert for validation errors
    }
  };

  // Send request to the server
  const sendRequest = async () => {
    return await axios.post("http://localhost:3001/api/invoices/", {
      invoice_Number: String(formData.invoice_Number),
      title: String(formData.title),
      date: String(formData.date),
      buyer_id: formData.buyer_id, // Send buyer_id as ObjectId
      order_id: formData.order_id, // Send order_id as ObjectId
      product_id: formData.pid, // Send product_id as ObjectId
      address: String(formData.address),
      telephone: String(formData.telephone),
      email: String(formData.email),
      products: formData.products.map((product) => ({
        product_id: product.product_id,
        quantity: String(product.quantity),
        uni_price: String(product.uni_price),
        subtotal: String(product.subtotal),
      })),
      sales_tax: String(formData.sales_tax),
      grand_total: String(formData.grand_total),
    });
  };

  return (
    <div className="flex">
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-center">Generate Invoice</h2>
          <button className="bg-red-500 text-white px-4 py-2 rounded">LOGOUT</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
            {/* Company Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Company Details</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Invoice Number</label>
                <input
                  type="text"
                  name="invoice_Number"
                  value={formData.invoice_Number}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.invoice_Number ? 'border-red-500' : 'border-gray-300'} rounded`}
                  placeholder="INS5698"
                  required
                  />
                {errors.invoice_Number && <p className="text-red-500">{errors.invoice_Number}</p>}
            </div>
              <div className="mb-4">
                <label className="block text-gray-700">Invoice Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded`}
                  placeholder="Title"
                  required
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                />
                {errors.date && <p className="text-red-500">{errors.date}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Buyer</label>
                <select
                  name="buyer_id"
                  value={formData.buyer_id}
                  onChange={handleBuyerChange}
                  className={`w-full p-2 border ${errors.buyer_id ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                >
                  <option value="">Select Buyer</option>
                  {buyers.map((buyer) => (
                    <option key={buyer._id} value={buyer._id}>{buyer.fName} {buyer.lName}</option>
                  ))}
                </select>
                {errors.buyer_id && <p className="text-red-500">{errors.buyer_id}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Order</label>
                <select
                  name="order_id"
                  value={formData.order_id}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.order_id ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                >
                  <option value="">Select Order</option>
                  {orders.map((order) => (
                    <option key={order._id} value={order._id}>{order.orderID}</option>
                  ))}
                </select>
                {errors.order_id && <p className="text-red-500">{errors.order_id}</p>}
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Address"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Telephone</label>
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Telephone"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Email"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Products Section */}
          <h3 className="text-xl font-semibold my-4">Products</h3>
          {formData.products.map((product, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-lg mb-4">
              <div>
                <label className="block text-gray-700">Product</label>
                <select
                  value={product.product_id}
                  onChange={(e) => handleProductChange(index, 'product_id', e.target.value)}
                  className={`w-full p-2 border ${errors[`product_${index}`] ? 'border-red-500' : 'border-gray-300'} rounded`}
                  required
                >
                  <option value="">Select Product</option>
                  {products.map((prod) => (
                    <option key={prod._id} value={prod._id}>{prod.pid}</option>
                  ))}
                </select>
                {errors[`product_${index}`] && <p className="text-red-500">{errors[`product_${index}`]}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Unit Price</label>
                <input
                  type="number"
                  value={product.uni_price}
                  onChange={(e) => handleProductChange(index, 'uni_price', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Subtotal</label>
                <input
                  type="text"
                  value={product.subtotal}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="button"
                onClick={() => removeProduct(index)}
                className="bg-red-500 text-white px-4 py-2 rounded col-span-4 mt-4"
              >
                Remove Product
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Product
          </button>
          <button type="button" onClick={handleDisplayInvoice} className="bg-yellow-500 text-white px-4 py-2 rounded ml-4">
          Display Invoice
        </button>

          {/* Summary Section */}
          <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Sales Tax (15%):</span>
              <span>${formData.sales_tax}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Grand Total:</span>
              <span>${formData.grand_total}</span>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Submit Invoice
            </button>
          </div>
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
    </div>
  );
};

export default Invoice;

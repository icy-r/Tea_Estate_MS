import { Order } from '../../models/sales-management/order-model.js';

// Function to generate a unique order ID
const generateOrderID = async () => {
  const lastOrder = await Order.findOne().sort({ createdAt: -1 }); // Get the last order created
  const lastOrderID = lastOrder ? lastOrder.orderID : null;
  
  // Generate the next order ID
  let newOrderID = 'OI0001';
  if (lastOrderID) {
    const num = parseInt(lastOrderID.slice(2)) + 1; // Increment the last order ID number
    newOrderID = `OI${num.toString().padStart(4, '0')}`; // Format with leading zeros
  }
  
  return newOrderID;
}

async function create(req, res) {
  try {
    // Generate a new order ID
    const orderID = await generateOrderID();
    const orderData = { ...req.body, orderID }; // Include the generated orderID
    const order = new Order(orderData);
    
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Other controller methods (index, show, update, destroy)
async function index(req, res) {
  const orders = await Order.find();
  res.json(orders);
}

async function show(req, res) {
  const order = await Order.findById(req.params.id);
  res.json(order);
}

async function update(req, res) {
  const { id } = req.params;
  const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedOrder);
}

async function destroy(req, res) {
  await Order.findByIdAndDelete(req.params.id);
  res.status(204).send();
}

export { index, show, create, update, destroy };

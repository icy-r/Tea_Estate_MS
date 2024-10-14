import { OrderSupply } from '../../models/supply-management/order-supply-model.js';

// Get all orders
async function index(req, res) {
  try {
    const orders = await OrderSupply.find({}).populate('supplierId', 'companyName contactNum'); // Populating supplier's companyName and contactNum
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
}

// Get a single order
async function show(req, res) {
  try {
    const order = await OrderSupply.findById(req.params.id).populate('supplierId', 'companyName contactNum');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order' });
  }
}

// Create an order
async function create(req, res) {
  try {
    const order = new OrderSupply(req.body);
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

// Update an order
async function update(req, res) {
  try {
    const order = await OrderSupply.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    Object.assign(order, req.body);
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: 'Error updating the order' });
  }
}

// Delete an order
async function destroy(req, res) {
  try {
    const order = await OrderSupply.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the order' });
  }
}

export { index, show, create, update, destroy };

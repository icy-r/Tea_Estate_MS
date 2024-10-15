import { Order } from '../../models/sales-management/order-model.js';

async function index(req, res) {
  try {
    //get all orders
    const order = await Order.find({});
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_order = req.params.id
    const order = await Order.find({id: req.params.id});
    res.json(order);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {

    const order = await Order.findByIdAndUpdate( req.params.id);

    Object.assign(order, req.body);
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function destroy(req, res) {
  try {
    const order = await Order.findByIdAndDelete( req.params.id );
    if (!order) {
      return res.status(404).json({ error: 'order not found' });
    }
    await order.deleteOne();
    res.json({ message: 'order deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });

  }
}

export { index, show, create, update, destroy };
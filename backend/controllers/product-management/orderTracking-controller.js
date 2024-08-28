import { OrderTracking } from "../../models/product-management/orderTracking-model";

async function index(req, res) {
  try {
    //get all orderTrackings
    const orderTrackings = await OrderTracking.find({});
    res.json(orderTrackings);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_orderTracking = req.params.id
    const orderTracking = await OrderTracking.find({
      id: req.params.id
    });
    res.json(orderTracking);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const orderTracking = new OrderTracking(req.body);
    await orderTracking.save();
    res.json(orderTracking);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {
    const orderTracking = await OrderTracking.findOne({
      id: req.params.id
    });
    Object.assign(orderTracking, req.body);
    await orderTracking.save();
    res.json(orderTracking);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function destroy(req, res) {
  try {
    const orderTracking = await OrderTracking.findOne({
      id: req.params.id
    });

    if (!orderTracking) {
      return res.status(404).json({
        error: "OrderTracking not found"
      });
    }

    await orderTracking.deleteOne();
    res.json({
      message: "OrderTracking deleted"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }
}

export { index, show, create, update, destroy };
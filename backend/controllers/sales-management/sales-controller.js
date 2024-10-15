import { Sales } from '../../models/sales-management/sales-model.js';

async function index(req, res) {
  try {
    //get all sales
    const sales = await Sales.find({});
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_sales = req.params.id
    const sales = await Sales.find({id: req.params.id});
    res.json(sales);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const sales = new Sales(req.body);
    await sales.save();
    res.json(sales);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {

    const sales = await Sales.findByIdAndUpdate( req.params.id);

    Object.assign(sales, req.body);
    await sales.save();
    res.json(sales);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function destroy(req, res) {
  try {
    const sales = await Sales.findByIdAndDelete( req.params.id );
    if (!sales) {
      return res.status(404).json({ error: 'sales not found' });
    }
    await sales.deleteOne();
    res.json({ message: 'sales deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });

  }
}

export { index, show, create, update, destroy };
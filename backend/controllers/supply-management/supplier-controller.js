import { Supplier } from '../../models/supply-management/supplier-model.js';


async function index(req, res) {
    try {
      //get all suppliers
      const supplier = await Supplier.find({});
      res.json(supplier);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  
  async function show(req, res) {
    try {
      //id_machine = req.params.id
      const supplier = await Supplier.find({id: req.params.id});
      res.json(supplier);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
  
  async function create(req, res) {
    try {
      const supplier = new Supplier(req.body);
      await supplier.save();
      res.json(supplier);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
  
  async function update(req, res) {
    try {
  
      const supplier = await Supplier.findOne({id: req.params.id});
  
      Object.assign(supplier, req.body);
      await supplier.save();
      res.json(supplier);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
  
  async function destroy(req, res) {
    try {
      const supplier = await Supplier.findOne({ id: req.params.id });
      if (!supplier) {
        return res.status(404).json({ error: 'Supplier not found' });
      }
      await supplier.deleteOne();
      res.json({ message: 'Supplier deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
  
    }
  }
  
  export { index, show, create, update, destroy };
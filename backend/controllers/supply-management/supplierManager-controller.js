import { SupplierManager } from '../../models/supply-management/supplierManager-model.js';


async function index(req, res) {
    try {
      //get all supplierManagers
      const supplierManager = await SupplierManager.find({});
      res.json(supplierManager);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  
  async function show(req, res) {
    try {
      //id_machine = req.params.id
      const supplierManager = await SupplierManager.find({id: req.params.id});
      res.json(supplierManager);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
  
  async function create(req, res) {
    try {
      const supplierManager = new SupplierManager(req.body);
      await supplierManager.save();
      res.json(supplierManager);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
  
  async function update(req, res) {
    try {
  
      const supplierManager = await SupplierManager.findByIdAndUpdate(req.params.id);
  
      Object.assign(supplierManager, req.body);
      await supplierManager.save();
      res.json(supplierManager);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
  
  async function destroy(req, res) {
    try {
      const supplierManager = await SupplierManager.findByIdAndDelete(req.params.id );
      if (!supplierManager) {
        return res.status(404).json({ error: 'Supplier Manager not found' });
      }
      await supplierManager.deleteOne();
      res.json({ message: 'Supplier Manager deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
  
    }
  }
  
  export { index, show, create, update, destroy };
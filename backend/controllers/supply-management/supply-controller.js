import { Supply } from '../../models/supply-management/supply-model.js';


async function index(req, res) {
    try {
      //get all supplies
      const supply = await Supply.find({});
      res.json(supply);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  
  async function show(req, res) {
    try {
      //id_machine = req.params.id
      const supply = await Supply.find({id: req.params.id});
      res.json(supply);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
  
  async function create(req, res) {
    try {
      const supply = new Supply(req.body);
      await supply.save();
      res.json(supply);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
  
  async function update(req, res) {
    try {
  
      const supply = await Supply.findOne({id: req.params.id});
  
      Object.assign(supply, req.body);
      await supply.save();
      res.json(supply);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
  
  async function destroy(req, res) {
    try {
      const supply = await Supply.findOne({ id: req.params.id });
      if (!supply) {
        return res.status(404).json({ error: 'Supply not found' });
      }
      await supply.deleteOne();
      res.json({ message: 'Supply deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
  
    }
  }
  
  export { index, show, create, update, destroy };
import {Driver} from '../../models/transport-management/driver-model.js'

async function index(req, res) {
    try {
      //get all routes
      const routes = await Driver.find({});
      res.json(routes);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  
  async function show(req, res) {
    try {
      //id_route = req.params.id
      const driver = await Driver.find({id: req.params.id});
      res.json(driver);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
  
  async function create(req, res) {
    try {
      const driver = new Driver(req.body);
      await driver.save();
      res.json(driver);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
  
  async function update(req, res) {
    try {
  
      const driver = await Driver.findOne({id: req.params.id});
  
      Object.assign(driver, req.body);
      await driver.save();
      res.json(driver);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
  
  async function destroy(req, res) {
    try {
      const driver = await Driver.findOne({ id: req.params.id });
      if (!driver) {
        return res.status(404).json({ error: 'Driver not found' });
      }
      await driver.deleteOne();
      res.json({ message: 'Driver deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
  
    }
  }
  
  export { index, show, create, update, destroy };
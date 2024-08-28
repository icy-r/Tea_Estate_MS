import {Route} from '../../models/transport-management/route-model.js'

async function index(req, res) {
    try {
      //get all routes
      const routes = await Route.find({});
      res.json(routes);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  
  async function show(req, res) {
    try {
      //id_route = req.params.id
      const route = await Route.find({id: req.params.id});
      res.json(route);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
  
  async function create(req, res) {
    try {
      const route = new Route(req.body);
      await route.save();
      res.json(route);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
  
  async function update(req, res) {
    try {
  
      const route = await Route.findOne({id: req.params.id});
  
      Object.assign(route, req.body);
      await route.save();
      res.json(route);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
  
  async function destroy(req, res) {
    try {
      const route = await Route.findOne({ id: req.params.id });
      if (!route) {
        return res.status(404).json({ error: 'Route not found' });
      }
      await route.deleteOne();
      res.json({ message: 'Route deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
  
    }
  }
  
  export { index, show, create, update, destroy };
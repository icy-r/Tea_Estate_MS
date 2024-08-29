import { Harvest } from "../../models/field-management/harvest-model.js";
import { Field } from "../../models/field-management/field-model.js";
import { Labour } from "../../models/field-management/labour-model.js";

async function index(req, res) {
    try {
        //get all harvests
        const harvests = await Harvest.find({});
        res.json(harvests);
    } catch (error) {
        res.status(500).json({ error: error });
    }
    }

async function show(req, res) {
    try {
        //id_harvest = req.params.id
        const harvest = await Harvest.find({ id: req.params.id });
        res.json(harvest);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

async function create(req, res) {
    try {
      const { field_id, labour_id, good_qnty, best_qnty, damaged_qnty, ...rest } = req.body;
  
      // Validate field_id
      const field = await Field.findById(field_id);
      if (!field) return res.status(400).json({ error: 'Invalid field' });
  
      // Validate labour_id
      const labour = await Labour.findById(labour_id);
      if (!labour) return res.status(400).json({ error: 'Invalid labour' });
  
      const total = good_qnty + best_qnty + damaged_qnty;
  
      const harvest = new Harvest({ field_id, labour_id, good_qnty, best_qnty, damaged_qnty, total, ...rest });
      await harvest.save();
      res.json(harvest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

async function update(req, res) {
    try {

        const harvest = await Harvest.findOne({ id: req.params.id });

        Object.assign(harvest, req.body);
        await harvest.save();
        res.json(harvest);
        } catch (error) {
        res.status(400).json({ error: error });
        }
}

async function destroy(req, res) {
    try {
        const harvest = await Harvest.findOne({ id: req.params.id });
        if (!harvest) {
        return res.status(404).json({ error: 'Harvest not found' });
        }
        await harvest.deleteOne();
        res.json({ message: 'Harvest deleted' });
        } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
        }
}

export { index, show, create, update, destroy }
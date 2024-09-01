import {Field} from '../../models/field-management/field-model.js'
import {Fertilizer} from '../../models/field-management/fertilizer-model.js'
import {Labour} from '../../models/field-management/labour-model.js'

async function index(req, res) {
  try {
    //get all fields
    const fields = await Field.find({});
    res.json(fields);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_field = req.params.id
    const field = await Field.find({id: req.params.id});
    res.json(field);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const field = new Field(req.body);
    await field.save();
    res.json(field);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {

    const field = await Field.findOne({id: req.params.id});

    Object.assign(field, req.body);
    await field.save();
    res.json(field);
    } catch (error) {
      res.status(400).json({ error: error });
    }
}

async function destroy(req, res) {
  try {
    const field = await Field.findOne({ id: req.params.id });
    if (!field) {
      return res.status(404).json({ error: 'Field not found' });
    }
    await field.deleteOne();
    res.json({ message: 'Field deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
}

export { index, show, create, update, destroy }
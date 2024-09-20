import { Labour } from "../../models/field-management/labour-model.js";

async function index(req, res) {
  try {
    //get all labours
    const labours = await Labour.find({});
    res.json(labours);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_labour = req.params.id
    const labour = await Labour.find({ id: req.params.id });
    res.json(labour);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const labour = new Labour(req.body);
    await labour.save();
    res.json(labour);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {
    const labour = await Labour.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    res.json(labour);
  }
  catch (error) {
    res.status(404).json({ error: error });
  }
}

export { index, show, create, update };
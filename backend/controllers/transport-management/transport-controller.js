import { Transport } from '../../models/transport-management/transport-model.js';

async function index(req, res) {
  try {
    //get all transports
    const transports = await Transport.find({});
    res.json(transports);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_transport = req.params.id
    const transport = await Transport.find({id: req.params.id});
    res.json(transport);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const transport = new Transport(req.body);
    await transport.save();
    res.json(transport);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {

    const transport = await Transport.findOne({id: req.params.id});

    Object.assign(transport, req.body);
    await transport.save();
    res.json(transport);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function destroy(req, res) {
  try {
    const transport = await Transport.findOne({ id: req.params.id });
    if (!transport) {
      return res.status(404).json({ error: 'Transport not found' });
    }
    await transport.deleteOne();
    res.json({ message: 'Transport deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });

  }
}

export { index, show, create, update, destroy };
import { Fertilizer } from "../../models/field-management/fertilizer-model.js";

//create index, show, create, update, destroy functions

async function index(req, res) {
    try {
        //get all fertilizers
        const fertilizers = await Fertilizer.find({});
        res.json(fertilizers);
    } catch (error) {
        res.status(500).json({ error: error });
    }
    }

async function show(req, res) {
    try {
        //id_fertilizer = req.params.id
        const fertilizer = await Fertilizer.find({id: req.params.id});
        res.json(fertilizer);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

async function create(req, res) {
    try {
        const fertilizer = new Fertilizer(req.body);
        await fertilizer.save();
        res.json(fertilizer);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function update(req, res) {
    try {

        const fertilizer = await Fertilizer.findOne({id: req.params.id});

        Object.assign(fertilizer, req.body);
        await fertilizer.save();
        res.json(fertilizer);
        } catch (error) {
        res.status(400).json({ error: error });
        }
}

async function destroy(req, res) {
    try {
        const fertilizer = await Fertilizer.findOne({ id: req.params.id });
        if (!fertilizer) {
        return res.status(404).json({ error: 'Fertilizer not found' });
        }
        await fertilizer.deleteOne();
        res.json({ message: 'Fertilizer deleted' });
        } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
        }
}

export { index, show, create, update, destroy }
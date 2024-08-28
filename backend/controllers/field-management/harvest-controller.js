import { Harvest } from "../../models/field-management/harvest-model";

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
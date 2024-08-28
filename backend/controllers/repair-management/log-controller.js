import { MaintenanceLog } from "../../models/repair-management/log-model.js";

async function index(req, res) {
    try {
        //get all logs
        const logs = await MaintenanceLog.find({});
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

async function show(req, res) {
    try {
        //id_log = req.params.id
        const log = await MaintenanceLog.find({id: req.params.id});
        res.json(log);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

async function create(req, res) {
    try {
        const log = new MaintenanceLog(req.body);
        await log.save();
        res.json(log);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function update(req, res) {
    try {

        const log = await MaintenanceLog.findOne({id: req.params.id});

        Object.assign(log, req.body);
        await log.save();
        res.json(log);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function destroy(req, res) {
    try {
        const log = await MaintenanceLog.findOne({ id: req.params.id });
        if (!log) {
            return res.status(404).json({ error: 'Log not found' });
        }
        await log.deleteOne();
        res.json({ message: 'Log deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });

    }
}

export { index, show, create, update, destroy };
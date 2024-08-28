import { MaintenanceTask } from "../../models/repair-management/maintenance-model.js";

async function index(req, res) {
    try {
        const tasks = await MaintenanceTask.find({});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

async function show(req, res) {
    try {
        const task = await MaintenanceTask.find({ id: req.params.id });
        res.json(task);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

async function create(req, res) {
    try {
        const task = new MaintenanceTask(req.body);
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function update(req, res) {
    try {
        const task = await MaintenanceTask.findOne({ id: req.params.id });
        Object.assign(task, req.body);
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function destroy(req, res) {
    try {
        const task = await MaintenanceTask.findOne({ id: req.params.id });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.deleteOne();
        res.json({ message: 'Task deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

export { index, show, create, update, destroy };
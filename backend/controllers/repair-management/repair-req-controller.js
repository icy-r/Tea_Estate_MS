import { RepairRequest } from "../../models/repair-management/repair-req-model.js";

async function index(req, res) {
    try {
        const repairRequests = await RepairRequest.find({});
        res.json(repairRequests);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

async function show(req, res) {
    try {
        const repairRequest = await RepairRequest.find({ id: req.params.id });
        res.json(repairRequest);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

async function create(req, res) {
    try {
        const repairRequest = new RepairRequest(req.body);
        await repairRequest.save();
        res.json(repairRequest);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function update(req, res) {
    try {
        const repairRequest = await RepairRequest.findOne({
          request_id: req.params.id,
        });
        Object.assign(repairRequest, req.body);
        await repairRequest.save();
        res.json(repairRequest);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function destroy(req, res) {
    try {
        const repairRequest = await RepairRequest.findOne({ id: req.params.id });
        if (!repairRequest) {
            return res.status(404).json({ error: 'Repair request not found' });
        }
        await repairRequest.deleteOne();
        res.json({ message: 'Repair request deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

export { index, show, create, update, destroy };
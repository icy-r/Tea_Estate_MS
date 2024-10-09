import { MaintenanceRequestSchema } from "../../models/repair-management/request-maintenance.js";
import { MaintenanceSchedule } from "../../models/repair-management/maintenance-model.js";

export const getTasksReq = async (req, res) => {
  try {
    const tasks = await MaintenanceRequestSchema.find({
      assignedTo: req.user.id,
      status: "assigned",
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTasksSch = async (req, res) => {
  try {
    const tasks = await MaintenanceSchedule.find({
      "assignedTechnician.technicianId": req.user.id,
      status: "scheduled",
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

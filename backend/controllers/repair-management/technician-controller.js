import { MaintenanceRequest } from "../../models/repair-management/request-maintenance.js";
import { MaintenanceSchedule } from "../../models/repair-management/maintenance-model.js";
import { Employee } from "../../models/employee-management/employee-model.js";

const testId = "66f3db97a2c609cb3127c975";

export const getTechnicians = async (req, res) => {
  try {
    const technicians = await Employee.find({ designation: "Technician" });
    res.status(200).json(technicians);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTasksReq = async (req, res) => {
  try {
    const tasks = await MaintenanceRequest.find({
      "assignedTo.technicianId": testId,
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
      "assignedTechnician.technicianId": testId,
    });
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMaintenanceSchedule = async (req, res) => {
  try {
    const updatedSchedule = await MaintenanceSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

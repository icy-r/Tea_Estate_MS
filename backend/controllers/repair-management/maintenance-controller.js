import { MaintenanceSchedule } from "../../models/repair-management/maintenance-model.js";

// index for getting all maintenances
export const index = async (req, res) => {
  try {
    const maintenances = await MaintenanceSchedule.find();
    res.status(200).json(maintenances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// show for getting a single maintenance
export const show = async (req, res) => {
  try {
    const maintenance = await MaintenanceSchedule.findById(req.params.id);
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create for creating a new maintenance
export const create = async (req, res) => {
  try {
    const maintenance = new MaintenanceSchedule(req.body);
    await maintenance.save();
    res.status(201).json(maintenance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// update for updating a maintenance
export const update = async (req, res) => {
  try {
    const maintenance = await MaintenanceSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// destroy for deleting a maintenance
export const destroy = async (req, res) => {
  try {
    await MaintenanceSchedule.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Maintenance deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//searchfield for searching a maintenance
export const searchField = async (req, res) => {
  try {
    const maintenances = await MaintenanceSchedule.find({
      $or: [
        { assetId: req.body.assetId },
        { maintenanceType: req.body.maintenanceType },
        { status: req.body.status },
      ],
    });
    res.status(200).json(maintenances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import { MaintenanceSchedule } from "../../models/repair-management/maintenance-model.js";
import { Asset } from "../../models/repair-management/asset-model.js";
import sendWhatsAppMessage from "../../services/twilio.js";
import { Notification } from "../../models/repair-management/notification-model.js";

// Get all maintenances
export const index = async (req, res) => {
  try {
    const maintenances = await MaintenanceSchedule.find();
    res.status(200).json(maintenances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single maintenance
export const show = async (req, res) => {
  try {
    const maintenance = await MaintenanceSchedule.findById(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ message: "Maintenance not found" });
    }
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new maintenance
export const create = async (req, res) => {
  try {
    const maintenance = new MaintenanceSchedule(req.body);
    await maintenance.save();
    const assetName = await getAssetName(maintenance.assetId);
    sendWhatsAppMessage(
      maintenance.assignedTechnician.technicianId,
      whatsappMessageDecorator(
        `Maintenance scheduled for ${assetName} on ${maintenance.scheduledDate}`
      )
    );
    const notification = new Notification({
      title: "Maintenance Scheduled",
      description: `Maintenance scheduled for ${assetName} on ${maintenance.scheduledDate}`,
    });
    await notification.save();
    res.status(201).json(maintenance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a maintenance
export const update = async (req, res) => {
  try {
    const maintenance = await MaintenanceSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!maintenance) {
      return res.status(404).json({ message: "Maintenance not found" });
    }
    const assetName = await getAssetName(maintenance.assetId);
    const messageMap = {
      completed: `Maintenance completed for ${assetName} on ${maintenance.completionDate}`,
      "in-progress": `Maintenance in progress for ${assetName} on ${maintenance.scheduledDate}`,
      postponed: `Maintenance postponed for ${assetName} on ${maintenance.scheduledDate}`,
      scheduled: `Maintenance scheduled for ${assetName} on ${maintenance.scheduledDate}`,
    };
    if (messageMap[maintenance.status]) {
      sendWhatsAppMessage(
        maintenance.assignedTechnician.technicianId,
        whatsappMessageDecorator(messageMap[maintenance.status])
      );
    }
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a maintenance
export const destroy = async (req, res) => {
  try {
    const maintenance = await MaintenanceSchedule.findByIdAndDelete(
      req.params.id
    );
    if (!maintenance) {
      return res.status(404).json({ message: "Maintenance not found" });
    }
    res.status(200).json({ message: "Maintenance deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search for maintenances
export const searchField = async (req, res) => {
  try {
    const { assetId, maintenanceType, status } = req.body;
    const query = {};
    if (assetId) query.assetId = assetId;
    if (maintenanceType) query.maintenanceType = maintenanceType;
    if (status) query.status = status;
    const maintenances = await MaintenanceSchedule.find(query);
    res.status(200).json(maintenances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAssetName = async (assetId) => {
  const asset = await Asset.findById(assetId);
  return asset ? asset.name : "Unknown Asset";
};

const whatsappMessageDecorator = (message) => {
  const emoji = {
    scheduled: "🗓️",
    "in-progress": "🔧",
    completed: "✅",
    postponed: "⏳",
  };

  const status = message.split(" ")[0].toLowerCase();
  const statusEmoji = emoji[status] || "ℹ️";

  return `${statusEmoji} *Maintenance Update* ${statusEmoji}\n\n${message}\n\nPlease respond if you have any questions. 👨‍🔧👩‍🔧`;
};

import { MaintenanceRequest } from "../../models/repair-management/request-maintenance.js";
import sendWhatsAppMessage from "../../services/twilio.js";

//create a new maintenance request
export const create = async (req, res) => {
  try {
    const maintenanceRequest = new MaintenanceRequest(req.body);
    await maintenanceRequest.save();
    await sendWhatsAppMessage(
      "+94770664182",
      `🔧 New Maintenance Request\n\nID: ${maintenanceRequest._id}\nStatus: Created\n\nPlease check the system for details.`
    );
    res.status(201).json(maintenanceRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//get all maintenance requests
export const index = async (req, res) => {
  try {
    const maintenanceRequests = await MaintenanceRequest.find();
    res.status(200).json(maintenanceRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get a single maintenance request
export const show = async (req, res) => {
  try {
    const maintenanceRequest = await MaintenanceRequest.findById(req.params.id);
    res.status(200).json(maintenanceRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update a maintenance request
export const update = async (req, res) => {
  try {
    const maintenanceRequest = await MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    await sendWhatsAppMessage(
      "+94770664182",
      `🔧 Maintenance Request Update\n\nID: ${maintenanceRequest._id}\nStatus: Updated\n\nPlease check the system for the latest information.`
    );
    res.status(200).json(maintenanceRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete a maintenance request
export const destroy = async (req, res) => {
  try {
    await MaintenanceRequest.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Maintenance Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//search for maintenance request by assetId
export const search = async (req, res) => {
  try {
    const maintenanceRequest = await MaintenanceRequest.find({
      assetId: req.params.id,
    });
    res.status(200).json(maintenanceRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// //delete all call once
// export const deleteAll = async (req, res) => {
//   try {
//     await MaintenanceRequest.deleteMany({});
//     console.log("All Maintenance Requests deleted");
//   } catch (error) {
//     console.error("Error deleting Maintenance Requests:", error);
//   }
// };

// deleteAll();

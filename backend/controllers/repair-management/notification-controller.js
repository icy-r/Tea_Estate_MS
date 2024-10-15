import { Notification } from "../../models/repair-management/notification-model.js";
import { setInterval } from "timers";

// Get all notifications
export const index = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new notification
export const createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark a notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//delete 1 day old notifications
const deleteOldNotifications = async () => {
  try {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const result = await Notification.deleteMany({
      createdAt: { $lte: oneDayAgo },
    });

    console.log(
      `${result.deletedCount} old notifications deleted successfully`
    );
  } catch (error) {
    console.error("Error deleting old notifications:", error);
  }
};

//delete old notifications every 10 minutes
setInterval(deleteOldNotifications, 10 * 60 * 1000);

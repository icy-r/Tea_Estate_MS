import { Router } from "express";
import {
  index,
  createNotification,
  markAsRead,
} from "../../controllers/repair-management/notification-controller.js";

const router = Router();

router.get("/", index);
router.post("/", createNotification);
router.put("/:id/read", markAsRead);

export { router };

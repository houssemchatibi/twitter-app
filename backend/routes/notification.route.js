import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { deleteNotifications, getNotifications, readAllNotifications } from "../controllers/notification.controller.js";


const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
router.post('/read',protectRoute, readAllNotifications);

export default router;
import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createTask);
router.get("/:projectId", protect, getTasks);
router.put("/:id", protect, updateTaskStatus);

export default router;
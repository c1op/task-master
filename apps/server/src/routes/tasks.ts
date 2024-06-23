import express from "express";
import {
  createTask,
  deleteTask,
  deleteTaskLabels,
  deleteTaskModules,
  getTask,
  getTasks,
  updateTask,
  updateTaskLabels,
  updateTaskModules,
} from "~/controllers/tasks";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await getTasks(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await createTask(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get("/:taskId", async (req, res, next) => {
  try {
    await getTask(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.put("/:taskId", async (req, res, next) => {
  try {
    await updateTask(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.delete("/:taskId", async (req, res, next) => {
  try {
    await deleteTask(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.put("/:taskId/modules", async (req, res, next) => {
  try {
    await updateTaskModules(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.delete("/:taskId/modules", async (req, res, next) => {
  try {
    await deleteTaskModules(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.put("/:taskId/labels", async (req, res, next) => {
  try {
    await updateTaskLabels(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.delete("/:taskId/labels", async (req, res, next) => {
  try {
    await deleteTaskLabels(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;

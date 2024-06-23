import express from "express";
import {
  createModule,
  deleteModule,
  getModule,
  getModuleTasks,
  getModules,
  updateModule,
} from "~/controllers/modules";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await getModules(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await createModule(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get("/:moduleId", async (req, res, next) => {
  try {
    await getModule(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.put("/:moduleId", async (req, res, next) => {
  try {
    await updateModule(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.delete("/:moduleId", async (req, res, next) => {
  try {
    await deleteModule(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get("/:moduleId/tasks", async (req, res, next) => {
  try {
    await getModuleTasks(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;

import express from "express";
import { createLabel, deleteLabel, getLabels, updateLabel } from "~/controllers/labels";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await getLabels(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await createLabel(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/:labelId", async (req, res, next) => {
  try {
    await updateLabel(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete("/:labelId", async (req, res, next) => {
  try {
    await deleteLabel(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;

import express from "express";
import { getSession, login, register } from "~/controllers/auth";
import authGuard from "~/middleware/authGuard";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    await login(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get("/session", authGuard, async (req, res, next) => {
  try {
    await getSession(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    await register(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;

import express from "express";
import authRouter from "./routes/auth";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import tasksRouter from "./routes/tasks";
import modulesRouter from "./routes/modules";
import authGuard from "./middleware/authGuard";
import labelsRouter from "./routes/labels";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/tasks", authGuard, tasksRouter);
app.use("/modules", authGuard, modulesRouter);
app.use("/labels", authGuard, labelsRouter);

app.get("/", function (req, res) {
  res.send("Aaaaaa");
});

app.use(errorHandler);

app.listen(3000);

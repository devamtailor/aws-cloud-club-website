import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import adminRoutes from "./routes/adminRoutes";
import announcementRoutes from "./routes/announcementRoutes";
import { env } from "./config/env";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

export const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

app.use("/api/admin", adminRoutes);
app.use("/api/announcements", announcementRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

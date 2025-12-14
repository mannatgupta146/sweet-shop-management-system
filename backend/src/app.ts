import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import sweetRoutes from "./routes/sweet.routes";

dotenv.config();

const app = express();

// 🔥 CORS MUST COME BEFORE ROUTES
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ✅ routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

export default app;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import sweetRoutes from "./routes/sweet.routes";

dotenv.config();

const app = express();

// ✅ CORS (allow frontend in dev + prod)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sweet-shop-management-system-imy5.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

export default app;

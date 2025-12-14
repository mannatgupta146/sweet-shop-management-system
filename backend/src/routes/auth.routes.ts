import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// test protected route
router.get("/me", protect, (req, res) => {
  res.status(200).json({ message: "You are authorized" });
});

export default router;

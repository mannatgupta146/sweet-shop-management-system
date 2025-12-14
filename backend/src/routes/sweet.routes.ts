import { Router } from "express";
import {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  purchaseSweet,
  restockSweet,
} from "../controllers/sweet.controller";
import { protect } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/admin.middleware";

const router = Router();

// user routes
router.get("/", protect, getSweets);
router.get("/search", protect, searchSweets);
router.post("/:id/purchase", protect, purchaseSweet);

// admin routes
router.post("/", protect, isAdmin, addSweet);
router.put("/:id", protect, isAdmin, updateSweet);
router.post("/:id/restock", protect, isAdmin, restockSweet);

export default router;

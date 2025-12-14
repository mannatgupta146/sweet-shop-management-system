import { Request, Response } from "express";
import Sweet from "../models/Sweet";

// ADD SWEET
export const addSweet = async (req: Request, res: Response) => {
  const name = req.body.name?.trim().toLowerCase();
  const category = req.body.category?.trim().toLowerCase();
  const price = Number(req.body.price);
  const quantity = Number(req.body.quantity);

  if (!name || !category || price <= 0 || quantity < 0) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
    });
    return res.status(201).json(sweet);
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Sweet already exists" });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ALL SWEETS
export const getSweets = async (_req: Request, res: Response) => {
  const sweets = await Sweet.find().sort({ createdAt: -1 });
  return res.status(200).json(sweets);
};

// SEARCH SWEETS (NAME / CATEGORY / PRICE)
export const searchSweets = async (req: Request, res: Response) => {
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
  const minPrice =
    req.query.minPrice !== undefined ? Number(req.query.minPrice) : undefined;
  const maxPrice =
    req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined;

  const query: any = {};

  if (q) {
    const regex = new RegExp(q, "i");
    query.$or = [{ name: regex }, { category: regex }];
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) query.price.$gte = minPrice;
    if (maxPrice !== undefined) query.price.$lte = maxPrice;
  }

  const sweets = await Sweet.find(query);
  return res.status(200).json(sweets);
};

// UPDATE SWEET
export const updateSweet = async (req: Request, res: Response) => {
  const update: any = { ...req.body };

  if (update.name) update.name = update.name.trim().toLowerCase();
  if (update.category)
    update.category = update.category.trim().toLowerCase();

  const sweet = await Sweet.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  return res.status(200).json(sweet);
};

// PURCHASE SWEET
export const purchaseSweet = async (req: Request, res: Response) => {
  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  if (sweet.quantity <= 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  sweet.quantity -= 1;
  await sweet.save();

  return res.status(200).json(sweet);
};

// RESTOCK SWEET
export const restockSweet = async (req: Request, res: Response) => {
  const quantity = Number(req.body.quantity);

  if (quantity <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  const sweet = await Sweet.findById(req.params.id);

  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  sweet.quantity += quantity;
  await sweet.save();

  return res.status(200).json(sweet);
};

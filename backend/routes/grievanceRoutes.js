import express from "express";
import Grievance from "../models/Grievance.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// CREATE
router.post("/", authMiddleware, async (req, res) => {
  const grievance = new Grievance(req.body);
  await grievance.save();
  res.json(grievance);
});

// GET ALL
router.get("/", authMiddleware, async (req, res) => {
  const data = await Grievance.find();
  res.json(data);
});

// GET BY ID
router.get("/:id", authMiddleware, async (req, res) => {
  const data = await Grievance.findById(req.params.id);
  res.json(data);
});

// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
  const data = await Grievance.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(data);
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// SEARCH
router.get("/search/title", authMiddleware, async (req, res) => {
  const { title } = req.query;
  const data = await Grievance.find({
    title: { $regex: title, $options: "i" }
  });
  res.json(data);
});

export default router;
const express = require("express");
const Task = require("../models/Task");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); 
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = new Task({ title, description, status });
    const savedTask = await newTask.save();
    
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error: error.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true, runValidators: true } 
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
});

module.exports = router;

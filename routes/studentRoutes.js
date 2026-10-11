const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ১. নতুন স্টুডেন্ট তৈরি করা (POST)
router.post("/", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json({ success: true, data: savedStudent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ২. সব স্টুডেন্টের তালিকা দেখা (GET)
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res
      .status(200)
      .json({ success: true, count: students.length, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ৩. নির্দিষ্ট একটি স্টুডেন্ট আইডি দিয়ে খোঁজা (GET)
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ৪. স্টুডেন্টের তথ্য আপডেট করা (PUT)
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedStudent)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    res.status(200).json({ success: true, data: updatedStudent });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ৫. স্টুডেন্ট ডিলেট করা (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent)
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

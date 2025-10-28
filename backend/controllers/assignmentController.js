const Assignment = require("../models/assignmentModel.js");
const User = require("../models/userModel.js");

// ✅ Create assignment
const createAssignment = async (req, res) => {
  try {
    const { title, description, subject, deadline, teacher } = req.body;

    if (!title || !description || !subject)
      return res.status(400).json({ message: "Missing required fields" });

    const assignment = await Assignment.create({
      title,
      description,
      subject,
      deadline: deadline ? new Date(deadline) : null,
      teacher: teacher || null,
    });

    // ✅ Modern way to populate (execPopulate is deprecated)
    const populatedAssignment = await assignment.populate(
      "teacher",
      "name email"
    );

    res.status(201).json(populatedAssignment);
  } catch (err) {
    console.error("Error creating assignment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all assignments (Students + Teachers)
const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate(
      "teacher",
      "name email"
    );
    res.json(assignments);
  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update assignment
const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, subject, deadline } = req.body;

    const assignment = await Assignment.findById(id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    assignment.title = title || assignment.title;
    assignment.description = description || assignment.description;
    assignment.subject = subject || assignment.subject;
    assignment.deadline = deadline ? new Date(deadline) : assignment.deadline;

    await assignment.save();

    const populatedAssignment = await assignment.populate(
      "teacher",
      "name email"
    );

    res.json(populatedAssignment);
  } catch (err) {
    console.error("Error updating assignment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete assignment
const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    await Assignment.findByIdAndDelete(id);

    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    console.error("Error deleting assignment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
};

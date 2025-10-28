const Assignment = require("../models/assignmentModel.js");
const User = require("../models/userModel.js");

// ✅ Create assignment (Teacher only)
const createAssignment = async (req, res) => {
  try {
    const sessUser = req.session?.user;
    if (!sessUser)
      return res.status(401).json({ message: "Not authenticated" });

    if (sessUser.role !== "Teacher")
      return res
        .status(403)
        .json({ message: "Only teachers can create assignments" });

    const { title, description, subject, deadline } = req.body;

    if (!title || !description || !subject)
      return res.status(400).json({ message: "Missing required fields" });

    const assignment = await Assignment.create({
      title,
      description,
      subject,
      deadline: deadline ? new Date(deadline) : null,
      teacher: sessUser._id,
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

// ✅ Update assignment (Teacher only)
const updateAssignment = async (req, res) => {
  try {
    const sessUser = req.session?.user;
    if (!sessUser)
      return res.status(401).json({ message: "Not authenticated" });

    if (sessUser.role !== "Teacher")
      return res
        .status(403)
        .json({ message: "Only teachers can update assignments" });

    const { id } = req.params;
    const { title, description, subject, deadline } = req.body;

    const assignment = await Assignment.findById(id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    if (assignment.teacher.toString() !== sessUser._id)
      return res
        .status(403)
        .json({ message: "You can only update your own assignments" });

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

// ✅ Delete assignment (Teacher only)
const deleteAssignment = async (req, res) => {
  try {
    const sessUser = req.session?.user;
    if (!sessUser)
      return res.status(401).json({ message: "Not authenticated" });

    if (sessUser.role !== "Teacher")
      return res
        .status(403)
        .json({ message: "Only teachers can delete assignments" });

    const { id } = req.params;

    const assignment = await Assignment.findById(id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    if (assignment.teacher.toString() !== sessUser._id)
      return res
        .status(403)
        .json({ message: "You can only delete your own assignments" });

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

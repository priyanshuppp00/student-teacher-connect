const express = require("express");
const router = express.Router();
const {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");
const { ensureAuth, ensureTeacher } = require("../middleware/authMiddleware");

router.post("/", ensureTeacher, createAssignment);
router.get("/", ensureAuth, getAssignments);
router.put("/:id", ensureTeacher, updateAssignment);
router.delete("/:id", ensureTeacher, deleteAssignment);

module.exports = router;

const express = require("express");
const {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController.js");
const {
  ensureTeacher,
  ensureAuth,
} = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", ensureTeacher, createAssignment);
router.get("/", getAssignments);
router.put("/:id", ensureTeacher, updateAssignment);
router.delete("/:id", ensureAuth, ensureTeacher, deleteAssignment);

module.exports = router;

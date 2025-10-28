const express = require("express");
const {
  createAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController.js");
const {
  ensureAuth,
  ensureTeacher,
} = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", ensureAuth, ensureTeacher, createAssignment);
router.get("/", getAssignments);
router.put("/:id", ensureAuth, ensureTeacher, updateAssignment);
router.delete("/:id", ensureAuth, ensureTeacher, deleteAssignment);

module.exports = router;

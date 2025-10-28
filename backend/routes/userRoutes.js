const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", getCurrentUser);

// Add test route for session check
router.get("/check-session", (req, res) => {
  res.json(
    req.session.user
      ? { loggedIn: true, user: req.session.user }
      : { loggedIn: false }
  );
});

module.exports = router;

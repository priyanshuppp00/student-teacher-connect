const ensureAuth = (req, res, next) => {
  if (!req.session?.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

const ensureTeacher = (req, res, next) => {
  if (!req.session?.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  if (req.session.user.role !== "Teacher") {
    return res.status(403).json({ message: "Access denied. Teachers only." });
  }
  next();
};

module.exports = {
  ensureAuth,
  ensureTeacher,
};

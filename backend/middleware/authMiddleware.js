const ensureAuth = (req, res, next) => {
  if (req.session && req.session.user) return next();
  return res.status(401).json({ message: "Not authenticated" });
};

const ensureTeacher = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === "Teacher")
    return next();
  return res.status(403).json({ message: "Only teachers allowed" });
};

module.exports = { ensureAuth, ensureTeacher };

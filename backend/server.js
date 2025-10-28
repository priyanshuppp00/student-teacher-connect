require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT || 5000;
const app = express();

// Handle crashes
process.on("unhandledRejection", (err) =>
  console.error("Unhandled Rejection:", err)
);
process.on("uncaughtException", (err) =>
  console.error("Uncaught Exception:", err)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
  })
);

app.use(
  cors({
    origin: "https://student-teacher-connect-six.vercel.app",
    credentials: true,
  })
);

// Trust proxy before sessions
app.set("trust proxy", 1);

app.use(
  session({
    name: process.env.SESSION_NAME || "stc.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.use(errorHandler);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

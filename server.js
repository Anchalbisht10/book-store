const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Logger
app.use(logger);

// ✅ USE /api PREFIX (important)
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", bookRoutes);

// Error handler
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
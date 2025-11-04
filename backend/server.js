// backend/src/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./userModel.js"; // Ensure path is correct

dotenv.config();
const app = express();

// ==================== Middleware ==================== //
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// ==================== MongoDB Connection ==================== //
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const JWT_SECRET = process.env.JWT_SECRET;

// ==================== Auth Middleware ==================== //
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: "Invalid or expired token" });
    req.user = decoded;
    next();
  });
};

// ==================== Routes ==================== //

// Root
app.get("/", (req, res) => {
  res.send("🚀 Secure E-Diary Backend is running!");
});

// Register
app.post("/api/register", async (req, res) => {
  const { username, email, password, pin, loginType } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      pin,
      loginType,
      role: "",
      subRole: "",
      customPurpose: "",
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role || "",
        subRole: user.subRole || "",
        customPurpose: user.customPurpose || "",
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get user profile
app.get("/api/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -pin");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Update user role, subRole, customPurpose
app.put("/api/role", verifyToken, async (req, res) => {
  try {
    const { role, subRole, customPurpose } = req.body;

    if (!role) return res.status(400).json({ msg: "Role is required" });

    const allowedRoles = ["Student", "Professional", "Homemaker", "Retired", "Custom"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ msg: "Invalid role. Allowed: " + allowedRoles.join(", ") });
    }

    if (role === "Custom" && (!customPurpose || customPurpose.trim() === "")) {
      return res.status(400).json({ msg: "Custom purpose is required when role is Custom" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.role = role;
    user.subRole = subRole || "";
    user.customPurpose = customPurpose || "";
    await user.save();

    res.json({ 
      msg: "Role updated successfully", 
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        subRole: user.subRole,
        customPurpose: user.customPurpose
      }
    });
  } catch (err) {
    console.error("Role update error:", err);
    res.status(500).json({ msg: "Server error while updating role", error: err.message });
  }
});

// ==================== Start Server ==================== //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

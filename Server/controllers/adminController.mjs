import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getAdminByEmail,
} from "../modules/adminModule.mjs";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "superrefreshsecret";

// In-memory refresh token store (use Redis/DB in production)
let refreshTokens = [];

// ✅ Register new admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if email already exists
    const existing = await getAdminByEmail(email);
    if (existing.success && existing.data) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createAdmin({ name, email, password: hashedPassword });

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



// ✅ Login admin
export const loginAdmin = async (req, res) => {
  console.log("👉 Incoming body:", req.body);

  try {
    const { email, password } = req.body;
    console.log("📩 Email received:", email);
    console.log("🔑 Password received:", password);

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const admin = await getAdminByEmail(email);
    console.log("📂 getAdminByEmail result:", admin);

    if (!admin.success || !admin.data) {
      console.log("❌ Admin not found in DB");
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    console.log("🔐 Stored hashed password:", admin.data.password);

    const validPassword = await bcrypt.compare(password, admin.data.password);
    console.log("✅ Password comparison result:", validPassword);

    if (!validPassword) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: admin.data.id, role: "admin" },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: admin.data.id, role: "admin" },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    refreshTokens.push(refreshToken);

    console.log("🎉 Login successful for admin:", admin.data.email);

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      admin: { id: admin.data.id, name: admin.data.name, email: admin.data.email },
    });
  } catch (error) {
    console.error("🔥 Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// ✅ Validate Access Token
export const validateAccessToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ success: false, message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }

    res.status(200).json({
      success: true,
      message: "Token is valid",
      user: { id: user.id, role: user.role },
    });
  });
};


// ✅ Refresh Token
export const refreshAccessToken = (req, res) => {
  const { token } = req.body;
  if (!token || !refreshTokens.includes(token)) {
    return res.status(403).json({ success: false, message: "Refresh token not valid" });
  }

  jwt.verify(token, JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid refresh token" });

    const accessToken = jwt.sign({ id: user.id, role: "admin" }, JWT_SECRET, { expiresIn: "15m" });
    res.json({ success: true, accessToken });
  });
};

// ✅ Logout
export const logoutAdmin = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.json({ success: true, message: "Logged out successfully" });
};

// ✅ Get all admins (protected)
export const fetchAllAdmins = async (req, res) => {
  try {
    const result = await getAllAdmins();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get single admin by ID (protected)
export const fetchAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getAdminById(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Update admin (protected)
export const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const result = await updateAdmin(id, { name, email, password: hashedPassword });
    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Delete admin (protected)
export const removeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteAdmin(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

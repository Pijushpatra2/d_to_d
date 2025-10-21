import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
} from "../../modules/usersModules/userModule.mjs";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "superrefreshsecret";

// In-memory refresh token store (use Redis/DB in production)
let refreshTokens = [];

// ✅ Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if email already exists
    const existing = await getUserByEmail(email);
    if (existing.success && existing.data) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await createUser({ name, email, password: hashedPassword });

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// ✅ Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const user = await getUserByEmail(email);

    if (!user.success || !user.data) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.data.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ id: user.data.id, role: "user" }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id: user.data.id, role: "user" }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    refreshTokens.push(refreshToken);

    // ✅ Only log tokens
    console.log("🎟️ Access Token:", accessToken);
    console.log("🔄 Refresh Token:", refreshToken);

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: { id: user.data.id, name: user.data.name, email: user.data.email },
    });
  } catch (error) {
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

    const accessToken = jwt.sign({ id: user.id, role: "user" }, JWT_SECRET, { expiresIn: "15m" });
    res.json({ success: true, accessToken });
  });
};

// ✅ Logout
export const logoutUser = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.json({ success: true, message: "Logged out successfully" });
};

// ✅ Get all users (protected)
export const fetchAllUsers = async (req, res) => {
  try {
    const result = await getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get single user by ID (protected)
export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getUserById(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Update user (protected)
export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const result = await updateUser(id, { name, email, password: hashedPassword });
    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Delete user (protected)
export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

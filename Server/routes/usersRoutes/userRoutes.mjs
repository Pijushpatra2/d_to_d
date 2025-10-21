import express from "express";
import {
  registerUser,
  loginUser,
  validateAccessToken,
  refreshAccessToken,
  logoutUser,
  fetchAllUsers,
  fetchUserById,
  editUser,
  removeUser,
} from "../../controllers/usersControllers/userController.mjs";

const router = express.Router();

// 🔑 Auth Routes
router.post("/register", registerUser);         // Register user
router.post("/login", loginUser);               // Login user
router.post("/validate", validateAccessToken);  // Validate access token
router.post("/refresh", refreshAccessToken);    // Refresh token
router.post("/logout", logoutUser);             // Logout user

// 👥 User CRUD Routes
router.get("/get", fetchAllUsers);              // Get all users
router.get("/get/:id", fetchUserById);          // Get user by ID
router.put("/update/:id", editUser);            // Update user
router.delete("/delete/:id", removeUser);       // Delete user

export default router;

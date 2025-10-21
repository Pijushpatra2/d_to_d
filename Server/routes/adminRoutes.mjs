// import express from "express";
// import {
//   registerAdmin,
//   loginAdmin,
//   refreshAccessToken,
//   logoutAdmin,
//   fetchAllAdmins,
//   fetchAdminById,
//   editAdmin,
//   removeAdmin,
//   validateAccessToken
// } from "../controllers/adminController.mjs";
// import { verifyToken } from "../middleware/auth.mjs";

// const router = express.Router();

// router.post("/register", registerAdmin);
// router.post("/login", loginAdmin);
// router.post("/refresh", refreshAccessToken);
// router.post("/logout", logoutAdmin);

// // ✅ Validate token route
// router.get("/validate", validateAccessToken);

// // Protected routes
// router.get("/", verifyToken, fetchAllAdmins);
// router.get("/:id", verifyToken, fetchAdminById);
// router.put("/:id", verifyToken, editAdmin);
// router.delete("/:id", verifyToken, removeAdmin);

// export default router;


import express from "express";
import {
  registerAdmin,
  loginAdmin,
  refreshAccessToken,
  logoutAdmin,
  fetchAllAdmins,
  fetchAdminById,
  editAdmin,
  removeAdmin,
  validateAccessToken,
} from "../controllers/adminController.mjs";
import { authenticate, authorizeAdmin } from "../middleware/auth.mjs";

const router = express.Router();

// Public routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutAdmin);

// ✅ Validate token route
router.get("/validate", authenticate, validateAccessToken);

// ✅ Protected routes (admin only)
router.get("/", authenticate, authorizeAdmin, fetchAllAdmins);
router.get("/:id", authenticate, authorizeAdmin, fetchAdminById);
router.put("/:id", authenticate, authorizeAdmin, editAdmin);
router.delete("/:id", authenticate, authorizeAdmin, removeAdmin);

export default router;

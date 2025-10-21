// import express from "express";
// import {
//   addUserAddress,
//   fetchUserAddresses,
//   fetchAddressById,
//   editUserAddress,
//   removeUserAddress,
// } from "../../controllers/usersControllers/userAddressController.mjs";

// const router = express.Router();

// // Create new address
// router.post("/add", addUserAddress);

// // Get all addresses by user_id
// router.get("/get/user/:user_id", fetchUserAddresses);

// // Get address by id
// router.get("/get/:id", fetchAddressById);

// // Update address
// router.put("/update/:id", editUserAddress);

// // Delete address
// router.delete("/delete/:id", removeUserAddress);

// export default router;


import express from "express";
import {
  addUserAddress,
  fetchMyAddresses,
  fetchUserAddresses,
  fetchAddressById,
  editUserAddress,
  removeUserAddress,
} from "../../controllers/usersControllers/userAddressController.mjs";
import { authenticate, authorizeAdmin } from "../../middleware/auth.mjs";

const router = express.Router();

// Create new address (user)
router.post("/add", authenticate, addUserAddress);

// Get all addresses for logged-in user
router.get("/me", authenticate, fetchMyAddresses);

// Get all addresses by user_id (admin only)
router.get("/get/user/:user_id", authenticate, fetchUserAddresses);

// Get address by id
router.get("/get/:id", authenticate, fetchAddressById);

// Update address
router.put("/update/:id", authenticate, editUserAddress);

// Delete address
router.delete("/delete/:id", authenticate, removeUserAddress);

export default router;

// import {
//   createUserAddress,
//   getUserAddresses,
//   getAddressById,
//   updateUserAddress,
//   deleteUserAddress,
// } from "../../modules/usersModules/userAddressModule.mjs";

// // Create
// export const addUserAddress = async (req, res) => {
//   try {
//     const address = await createUserAddress(req.body);
//     res.status(201).json(address);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get all addresses for a user
// export const fetchUserAddresses = async (req, res) => {
//   try {
//     const { user_id } = req.params;
//     const addresses = await getUserAddresses(user_id);
//     res.json(addresses);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get single address
// export const fetchAddressById = async (req, res) => {
//   try {
//     const address = await getAddressById(req.params.id);
//     if (!address) return res.status(404).json({ message: "Address not found" });
//     res.json(address);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update
// export const editUserAddress = async (req, res) => {
//   try {
//     const updated = await updateUserAddress(req.params.id, req.body);
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete
// export const removeUserAddress = async (req, res) => {
//   try {
//     const result = await deleteUserAddress(req.params.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




import {
  createUserAddress,
  getUserAddresses,
  getAddressById,
  updateUserAddress,
  deleteUserAddress,
} from "../../modules/usersModules/userAddressModule.mjs";

// Create
export const addUserAddress = async (req, res) => {
  try {
    const addressData = { ...req.body, user_id: req.user.id }; // take from token
    const address = await createUserAddress(addressData);
    res.status(201).json({ success: true, data: address });
  } catch (error) {
    console.error("Controller Error (addUserAddress):", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all addresses (for logged-in user)
export const fetchMyAddresses = async (req, res) => {
  try {
    const addresses = await getUserAddresses(req.user.id);
    res.json({ success: true, data: addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all addresses by user_id (admin only)
export const fetchUserAddresses = async (req, res) => {
  try {
    const { user_id } = req.params;
    const addresses = await getUserAddresses(user_id);
    res.json({ success: true, data: addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single address
export const fetchAddressById = async (req, res) => {
  try {
    const address = await getAddressById(req.params.id);
    if (!address) return res.status(404).json({ success: false, message: "Address not found" });
    res.json({ success: true, data: address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update
export const editUserAddress = async (req, res) => {
  try {
    const updated = await updateUserAddress(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete
export const removeUserAddress = async (req, res) => {
  try {
    const result = await deleteUserAddress(req.params.id);
    res.json({ success: true, message: result.message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

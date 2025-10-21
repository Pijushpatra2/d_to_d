// import pool from "../../utils/db.js";

// // Create new address
// export const createUserAddress = async (addressData) => {
//   const [result] = await pool.query(
//     `INSERT INTO user_addresses 
//       (user_id, full_name, phone, address_line1, address_line2, city, state, zipcode, country, is_default) 
//      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//     [
//       addressData.user_id,
//       addressData.full_name,
//       addressData.phone,
//       addressData.address_line1,
//       addressData.address_line2,
//       addressData.city,
//       addressData.state,
//       addressData.zipcode,
//       addressData.country,
//       addressData.is_default || false,
//     ]
//   );
//   return { id: result.insertId, ...addressData };
// };

// // Get all addresses by user_id
// export const getUserAddresses = async (user_id) => {
//   const [rows] = await pool.query(
//     "SELECT * FROM user_addresses WHERE user_id = ?",
//     [user_id]
//   );
//   return rows;
// };

// // Get single address by id
// export const getAddressById = async (id) => {
//   const [rows] = await pool.query("SELECT * FROM user_addresses WHERE id = ?", [
//     id,
//   ]);
//   return rows[0];
// };

// // Update address
// export const updateUserAddress = async (id, addressData) => {
//   await pool.query(
//     `UPDATE user_addresses SET 
//       full_name = ?, phone = ?, address_line1 = ?, address_line2 = ?, city = ?, 
//       state = ?, zipcode = ?, country = ?, is_default = ?
//      WHERE id = ?`,
//     [
//       addressData.full_name,
//       addressData.phone,
//       addressData.address_line1,
//       addressData.address_line2,
//       addressData.city,
//       addressData.state,
//       addressData.zipcode,
//       addressData.country,
//       addressData.is_default,
//       id,
//     ]
//   );
//   return { id, ...addressData };
// };

// // Delete address
// export const deleteUserAddress = async (id) => {
//   await pool.query("DELETE FROM user_addresses WHERE id = ?", [id]);
//   return { message: "Address deleted successfully" };
// };




import pool from "../../utils/db.js";

// Create new address
export const createUserAddress = async (addressData) => {
  const [result] = await pool.query(
    `INSERT INTO user_addresses 
      (user_id, full_name, phone, address_line1, address_line2, city, state, zipcode, country, is_default) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      addressData.user_id,
      addressData.full_name,
      addressData.phone,
      addressData.address_line1,
      addressData.address_line2,
      addressData.city,
      addressData.state,
      addressData.zipcode,
      addressData.country,
      addressData.is_default || false,
    ]
  );
  return { id: result.insertId, ...addressData };
};

// Get all addresses by user_id
export const getUserAddresses = async (user_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM user_addresses WHERE user_id = ?",
    [user_id]
  );
  return rows;
};

// Get single address by id
export const getAddressById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM user_addresses WHERE id = ?", [id]);
  return rows[0];
};

// Update address
export const updateUserAddress = async (id, addressData) => {
  await pool.query(
    `UPDATE user_addresses SET 
      full_name = ?, phone = ?, address_line1 = ?, address_line2 = ?, city = ?, 
      state = ?, zipcode = ?, country = ?, is_default = ?
     WHERE id = ?`,
    [
      addressData.full_name,
      addressData.phone,
      addressData.address_line1,
      addressData.address_line2,
      addressData.city,
      addressData.state,
      addressData.zipcode,
      addressData.country,
      addressData.is_default || false,
      id,
    ]
  );
  return { id, ...addressData };
};

// Delete address
export const deleteUserAddress = async (id) => {
  await pool.query("DELETE FROM user_addresses WHERE id = ?", [id]);
  return { message: "Address deleted successfully" };
};

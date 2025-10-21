import pool from "../../utils/db.js";

// export const createOrder = async (orderData) => {
//   try {
//     const {
//       user_id,
//       address_id = null,
//       total_amount,
//       status = "pending",
//       rent_start_date = null,
//       rent_end_date = null
//     } = orderData;

//     // Validate required fields
//     if (!user_id || !total_amount) {
//       throw new Error("user_id and total_amount are required");
//     }

//     // If address_id provided, ensure it belongs to the user
//     if (address_id) {
//       const [addr] = await pool.query(
//         "SELECT id FROM user_addresses WHERE id = ? AND user_id = ?",
//         [address_id, user_id]
//       );
//       if (addr.length === 0) {
//         throw new Error("Address not found for this user");
//       }
//     }

//     // Insert order
//     const [result] = await pool.query(
//       `INSERT INTO orders 
//        (user_id, address_id, total_amount, status, rent_start_date, rent_end_date) 
//        VALUES (?,?,?,?,?,?)`,
//       [user_id, address_id, total_amount, status, rent_start_date, rent_end_date]
//     );

//     // Fetch the created order
//     const [rows] = await pool.query("SELECT * FROM orders WHERE id = ?", [result.insertId]);
//     return rows[0];
//   } catch (error) {
//     console.error("ordersModule.createOrder:", error.message);
//     throw error;
//   }
// };


export const createOrder = async (orderData, items) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert order (main)
    const [orderResult] = await connection.query(
      `INSERT INTO orders 
        (user_id, address_id, total_amount, status, rent_start_date, rent_end_date) 
       VALUES (?,?,?,?,?,?)`,
      [
        orderData.user_id,
        orderData.address_id || null,
        orderData.total_amount,
        orderData.status || "pending",
        orderData.rent_start_date || null,
        orderData.rent_end_date || null,
      ]
    );

    const orderId = orderResult.insertId;

    // Insert order items (loop through cart items)
    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items (order_id, variant_id, quantity, price) 
         VALUES (?,?,?,?)`,
        [orderId, item.variant_id, item.quantity, item.price]
      );
    }

    await connection.commit();

    // Return full order with items
    return {
      id: orderId,
      ...orderData,
      items,
    };
  } catch (error) {
    await connection.rollback();
    console.error("createOrderWithItems Error:", error.message);
    throw error;
  } finally {
    connection.release();
  }
};



export const getAllOrders = async () => {
  try {
    const [rows] = await pool.query(
      `SELECT o.*, ua.full_name AS recipient_name, ua.address_line1, ua.address_line2,
              ua.city, ua.state, ua.zipcode, ua.country
       FROM orders o
       LEFT JOIN user_addresses ua ON o.address_id = ua.id
       ORDER BY o.created_at DESC`
    );
    return rows;
  } catch (error) {
    console.error("ordersModule.getAllOrders:", error.message);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const [rows] = await pool.query(
      `SELECT o.*, ua.full_name AS recipient_name, ua.address_line1, ua.address_line2,
              ua.city, ua.state, ua.zipcode, ua.country
       FROM orders o
       LEFT JOIN user_addresses ua ON o.address_id = ua.id
       WHERE o.id = ?`,
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("ordersModule.getOrderById:", error.message);
    throw error;
  }
};

export const getOrdersByUserId = async (user_id) => {
  try {
    const [rows] = await pool.query(
      `SELECT o.*, ua.full_name AS recipient_name, ua.address_line1, ua.city, ua.state, ua.zipcode
       FROM orders o
       LEFT JOIN user_addresses ua ON o.address_id = ua.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [user_id]
    );
    return rows;
  } catch (error) {
    console.error("ordersModule.getOrdersByUserId:", error.message);
    throw error;
  }
};

export const updateOrder = async (id, orderData) => {
  try {
    // fetch existing order to validate address-owner if address_id changes
    const [existing] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
    if (existing.length === 0) throw new Error("Order not found");
    const order = existing[0];

    const { address_id = order.address_id, total_amount = order.total_amount, status = order.status } = orderData;

    // if address changed/was provided, ensure it belongs to the same user
    if (address_id !== null) {
      const [addr] = await pool.query(
        "SELECT id FROM user_addresses WHERE id = ? AND user_id = ?",
        [address_id, order.user_id]
      );
      if (addr.length === 0) throw new Error("Address not found for this user");
    }

    await pool.query(
      "UPDATE orders SET address_id = ?, total_amount = ?, status = ? WHERE id = ?",
      [address_id, total_amount, status, id]
    );

    const [rows] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("ordersModule.updateOrder:", error.message);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM orders WHERE id = ?", [id]);
    if (result.affectedRows === 0) throw new Error("Order not found");
    return { message: "Order deleted successfully" };
  } catch (error) {
    console.error("ordersModule.deleteOrder:", error.message);
    throw error;
  }
};

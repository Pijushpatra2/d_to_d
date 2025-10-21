import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
} from "../../modules/orderModules/ordersModule.mjs";

// Create Order
// Create Order
// export const addOrder = async (req, res) => {
//   try {
//     const { user_id, address_id, total_amount, status, rent_start_date, rent_end_date } = req.body;

//     // Validate required fields
//     if (!user_id || !total_amount) {
//       return res.status(400).json({
//         success: false,
//         message: "user_id and total_amount are required"
//       });
//     }

//     // Pass full payload to service
//     const order = await createOrder({
//       user_id,
//       address_id,
//       total_amount,
//       status,
//       rent_start_date,
//       rent_end_date
//     });

//     res.status(201).json({ success: true, data: order });
//   } catch (error) {
//     if (error.message && error.message.includes("Address not found")) {
//       return res.status(400).json({ success: false, message: error.message });
//     }
//     console.error("Controller Error (addOrder):", error.message);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

export const addOrder = async (req, res) => {
  try {
    console.log("📡 Incoming addOrder request body:", req.body);

    const { order, items } = req.body;

    if (!items || items.length === 0) {
      console.warn("⚠️ No items provided");
      return res.status(400).json({ success: false, message: "No items provided" });
    }

    // Ensure user_id comes from authenticated user (assuming you have middleware to attach it)
    const user_id = req.user?.id;
    if (!user_id) {
      console.error("❌ No user ID found in request. Is the user authenticated?");
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const orderWithUser = {
      ...order,
      user_id, // ✅ attach user_id from token/session
    };

    console.log("🟢 Order data sent to createOrder:", orderWithUser, items);

    const newOrder = await createOrder(orderWithUser, items);

    console.log("✅ Order created successfully:", newOrder);

    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error("Controller Error (placeOrder):", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Get All Orders
export const fetchAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Controller Error (fetchAllOrders):", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Order by ID
export const fetchOrderById = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("Controller Error (fetchOrderById):", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get Orders by User ID
export const fetchOrdersByUserId = async (req, res) => {
  try {
    const orders = await getOrdersByUserId(req.params.user_id);
    if (!orders || orders.length === 0) return res.status(404).json({ success: false, message: "No orders found for this user" });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Controller Error (fetchOrdersByUserId):", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update Order
export const editOrder = async (req, res) => {
  try {
    const updated = await updateOrder(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    if (error.message && (error.message.includes("Address not found") || error.message.includes("Order not found"))) {
      return res.status(400).json({ success: false, message: error.message });
    }
    console.error("Controller Error (editOrder):", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete Order
export const removeOrder = async (req, res) => {
  try {
    const result = await deleteOrder(req.params.id);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    if (error.message && error.message.includes("Order not found")) {
      return res.status(404).json({ success: false, message: error.message });
    }
    console.error("Controller Error (removeOrder):", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

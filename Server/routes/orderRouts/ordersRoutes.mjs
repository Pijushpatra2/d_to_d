import express from "express";
import {
  addOrder,
  fetchAllOrders,
  fetchOrderById,
  editOrder,
  removeOrder,
  fetchOrdersByUserId,
} from "../../controllers/orderControllers/ordersController.mjs";

const router = express.Router();


// Create order
router.post("/add", addOrder);

// Get all orders
router.get("/get", fetchAllOrders);

// Get order by id
router.get("/grt/:id", fetchOrderById);

// ✅ Get orders by user id
router.get("/get/user/:user_id", fetchOrdersByUserId);

// Update order
router.put("/update/:id", editOrder);

// Delete order
router.delete("/delete/:id", removeOrder);

export default router;

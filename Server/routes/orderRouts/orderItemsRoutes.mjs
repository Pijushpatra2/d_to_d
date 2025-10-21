import express from "express";
import {
  addOrderItem,
  fetchAllOrderItems,
  fetchOrderItemById,
  fetchOrderItemsByOrderId,
  editOrderItem,
  removeOrderItem,
} from "../../controllers/orderControllers/orderItemsController.mjs";

const router = express.Router();

// Create order item
router.post("/add", addOrderItem);

// Get all order items
router.get("/get", fetchAllOrderItems);

// Get order item by id
router.get("/get/:id", fetchOrderItemById);

// ✅ Get items by order id
router.get("/get/order/:order_id", fetchOrderItemsByOrderId);

// Update order item
router.put("/update/:id", editOrderItem);

// Delete order item
router.delete("/delete/:id", removeOrderItem);

export default router;

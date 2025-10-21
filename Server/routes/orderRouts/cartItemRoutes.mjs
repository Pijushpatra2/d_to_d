import express from "express";
import {
  addCartItem,
  getCartItems,
  editCartItem,
  removeCartItem,
  getUserCart
} from "../../controllers/orderControllers/cartItemController.mjs";

const router = express.Router();

// ➕ Add item to cart
router.post("/", addCartItem);

// 📌 Get all items in a cart (by cart_id)
router.get("/:cart_id", getCartItems);

// 📌 Get cart (with items) by user_id
router.get("/user/:user_id", getUserCart);

// 🔄 Update cart item quantity
router.put("/:id", editCartItem);

// ❌ Remove cart item
router.delete("/:id", removeCartItem);

export default router;

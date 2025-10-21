import express from "express";
import {
  addCart,
  fetchAllCarts,
  fetchCartById,
  fetchCartByUserId,
  removeCart,
} from "../../controllers/orderControllers/cartController.mjs";

const router = express.Router();

// Create cart
router.post("/", addCart);

// Get all carts
router.get("/", fetchAllCarts);

// Get cart by id
router.get("/:id", fetchCartById);

// Get cart by user id
router.get("/user/:user_id", fetchCartByUserId);

// Delete cart
router.delete("/:id", removeCart);

export default router;

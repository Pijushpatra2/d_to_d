
import {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  deleteCart,
} from "../../modules/orderModules/cartModule.mjs";

// Create Cart
export const addCart = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ error: "user_id is required" });

    const cart = await createCart(user_id);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Carts
export const fetchAllCarts = async (req, res) => {
  try {
    const carts = await getAllCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Cart by ID
export const fetchCartById = async (req, res) => {
  try {
    const cart = await getCartById(req.params.id);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Cart by User ID
export const fetchCartByUserId = async (req, res) => {
  try {
    const cart = await getCartByUserId(req.params.user_id);
    if (!cart)
      return res.status(404).json({ message: "No cart found for this user" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Cart
export const removeCart = async (req, res) => {
  try {
    const result = await deleteCart(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

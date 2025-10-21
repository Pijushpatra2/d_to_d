import {
  createCartItem,
  getCartItemsByCartId,
  updateCartItem,
  deleteCartItem
} from "../../modules/orderModules/cartItemModule.mjs";

// ➕ Add item to cart
export const addCartItem = async (req, res) => {
  try {
    const newItem = await createCartItem(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Get all items by cart_id
export const getCartItems = async (req, res) => {
  try {
    const { cart_id } = req.params;
    const items = await getCartItemsByCartId(cart_id);
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📌 Get cart by user_id (with items)
export const getUserCart = async (req, res) => {
  try {
    const { user_id } = req.params;
    const cart = await getCartByUserId(user_id);
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found for this user" });
    }
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔄 Update quantity
export const editCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updated = await updateCartItem(id, quantity);
    if (!updated) return res.status(404).json({ success: false, message: "Cart item not found" });
    res.status(200).json({ success: true, message: "Cart item updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ❌ Delete cart item
export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteCartItem(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Cart item not found" });
    res.status(200).json({ success: true, message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

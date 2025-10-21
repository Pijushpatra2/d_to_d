import {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  getOrderItemsByOrderId,
  updateOrderItem,
  deleteOrderItem,
} from "../../modules/orderModules/orderItemsModule.mjs";

// Add Order Item
export const addOrderItem = async (req, res) => {
  try {
    const item = await createOrderItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Order Items
export const fetchAllOrderItems = async (req, res) => {
  try {
    const items = await getAllOrderItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Order Item by ID
export const fetchOrderItemById = async (req, res) => {
  try {
    const item = await getOrderItemById(req.params.id);
    if (!item) return res.status(404).json({ message: "Order item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Items by Order ID
export const fetchOrderItemsByOrderId = async (req, res) => {
  try {
    const items = await getOrderItemsByOrderId(req.params.order_id);
    if (!items || items.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found for this order" });
    }
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Order Item
export const editOrderItem = async (req, res) => {
  try {
    const updated = await updateOrderItem(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Order Item
export const removeOrderItem = async (req, res) => {
  try {
    const result = await deleteOrderItem(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

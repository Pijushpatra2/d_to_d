import {
  createProductVariant,
  getAllProductVariants,
  getProductVariantById,
  updateProductVariant,
  deleteProductVariant,
  getProductVariantsByProductId
} from "../../modules/productsModules/productVariantModule.mjs";

// Create
export const addProductVariant = async (req, res) => {
  try {
    const variant = await createProductVariant(req.body);
    res.status(201).json({ success: true, data: variant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all
export const fetchAllProductVariants = async (req, res) => {
  try {
    const variants = await getAllProductVariants();
    res.json({ success: true, data: variants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get by ID
export const fetchProductVariantById = async (req, res) => {
  try {
    const variant = await getProductVariantById(req.params.id);
    if (!variant) {
      return res.status(404).json({ success: false, message: "Variant not found" });
    }
    res.json({ success: true, data: variant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get by Product ID
export const fetchProductVariantsByProductId = async (req, res) => {
  try {
    const { product_id } = req.params;
    const variants = await getProductVariantsByProductId(product_id);
    res.json({ success: true, data: variants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update
export const editProductVariant = async (req, res) => {
  try {
    const variant = await updateProductVariant(req.params.id, req.body);
    res.json({ success: true, data: variant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete
export const removeProductVariant = async (req, res) => {
  try {
    const result = await deleteProductVariant(req.params.id);
    res.json({ success: true, message: result.message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

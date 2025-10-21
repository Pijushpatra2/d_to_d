import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../../modules/productsModules/productModule.mjs";

// ✅ Add Product
export const addProduct = async (req, res) => {
  try {
    const result = await createProduct(req.body);
    if (!result.success) return res.status(400).json(result);
    res.status(201).json(result);
  } catch (error) {
    console.error("Controller Error (addProduct):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get All Products
export const fetchAllProducts = async (req, res) => {
  try {
    const result = await getAllProducts();
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (fetchAllProducts):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get Single Product
export const fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getProductById(id);
    if (!result.success) return res.status(404).json(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (fetchProductById):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Update Product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateProduct(id, req.body);
    if (!result.success) return res.status(400).json(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (editProduct):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Delete Product
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProduct(id);
    if (!result.success) return res.status(404).json(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (removeProduct):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

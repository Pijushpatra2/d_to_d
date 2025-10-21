import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";


import adminRoutes from "./routes/adminRoutes.mjs";
import categoryRoutes from "./routes/productsRouts/categoryRoutes.mjs";
import brandRoutes from "./routes/productsRouts/brandRoutes.mjs";
import productRoutes from "./routes/productsRouts/productRoutes.mjs";
import productImageRoutes from "./routes/productsRouts/productImageRoutes.mjs";
import productVariantRoutes from "./routes/productsRouts/productVariantRoutes.mjs";
import userRoutes from "./routes/usersRoutes/userRoutes.mjs";
import orderRoutes from "./routes/orderRouts/ordersRoutes.mjs";
import orderItemsRoutes from "./routes/orderRouts/orderItemsRoutes.mjs";
import cartRoutes from "./routes/orderRouts/cartRoutes.mjs";
import cartItemRoutes from "./routes/orderRouts/cartItemRoutes.mjs";
import userAddressRoutes from "./routes/usersRoutes/userAddressRoutes.mjs";


dotenv.config();




const app = express();
app.use(morgan("dev"));
app.use(express.json());   // ✅ Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // ✅ Parse form data
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("D2D Backend is running properly.");
});

//API routes should come first
app.use("/api/v1/admin/auth", adminRoutes);

// Category API Routes
app.use("/api/v1/categories", categoryRoutes);
// Brand API Routes
app.use("/api/v1/brands", brandRoutes);
// Product Routes
app.use("/api/v1/products", productRoutes);
// Product Images API
app.use("/api/v1/product-images", productImageRoutes);
// Product Variants API
app.use("/api/v1/product-variants", productVariantRoutes);


//User routes would go here

//user
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/user-addresses",userAddressRoutes);
//order
app.use("/api/v1/orders",orderRoutes);

//order items
app.use("/api/v1/order-items",orderItemsRoutes);

//cart
app.use("/api/v1/carts",cartRoutes);

//cart items

app.use("/api/v1/cart-items", cartItemRoutes);






// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

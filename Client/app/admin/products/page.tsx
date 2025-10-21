// "use client";

// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import {
//   Plus,
//   Search,
//   Eye,
//   Edit,
//   Trash2,
//   ArrowLeft,
//   Minus,
// } from "lucide-react";
// import Link from "next/link";
// import api from "@/lib/axiosInstance";

// const LOW_STOCK_THRESHOLD = 5;

// interface Product {
//   id: number;
//   name: string;
//   brand: string;
//   category: string;
//   price: number;
//   originalPrice: number;
//   status: string;
//   rentals: number;
//   rating: number;
//   sizes: string[];
//   colors: string[];
//   description: string;
//   image: string;
//   dateAdded: string;
//   stock: number;
// }

// interface Category {
//   id: number;
//   name: string;
// }

// interface Brand {
//   id: number;
//   name: string;
// }

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [brands, setBrands] = useState<Brand[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");

//   // Fetch all products
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/products/get");
//       const result = response.data;

//       if (result.success) {
//         setProducts(result.data);
//       } else {
//         setError("Failed to fetch products");
//       }
//     } catch (err) {
//       setError("An error occurred while fetching products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const response = await api.get("/categories/get");
//       const result = response.data;

//       if (result.success) {
//         setCategories(result.data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch categories");
//     }
//   };

//   // Fetch brands
//   const fetchBrands = async () => {
//     try {
//       const response = await api.get("/brands/get");
//       const result = response.data;

//       if (result.success) {
//         setBrands(result.data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch brands");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//     fetchBrands();
//   }, []);

//   // Get category name by ID
//   const getCategoryName = (categoryId: number) => {
//     const category = categories.find((c) => c.id === categoryId);
//     return category ? category.name : "Unknown";
//   };

//   // Get brand name by ID
//   const getBrandName = (brandId: number | null) => {
//     if (!brandId) return "None";
//     const brand = brands.find((b) => b.id === brandId);
//     return brand ? brand.name : "Unknown";
//   };

//   // Update low-stock badge
//   useEffect(() => {
//     if (products.length > 0) {
//       try {
//         const lowCount = products.filter(
//           (p) => (p.stock ?? 0) <= LOW_STOCK_THRESHOLD
//         ).length;
//         localStorage.setItem("lowStockCount", String(lowCount));
//         // Notify sidebar listeners
//         window.dispatchEvent(new Event("lowStockUpdated"));
//       } catch {}
//     }
//   }, [products]);

//   // Filter products based on search and filters
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch =
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.brand.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       filterCategory === "all" || product.category === filterCategory;
//     const matchesStatus =
//       filterStatus === "all" || product.status === filterStatus;
//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   const handleDeleteProduct = async (id: number) => {
//     try {
//       const response = await api.delete(`/products/delete/${id}`);
//       const result = response.data;

//       if (result.success) {
//         setProducts(products.filter((product) => product.id !== id));
//       } else {
//         setError("Failed to delete product");
//       }
//     } catch (err) {
//       setError("An error occurred while deleting the product");
//     }
//   };

//   // Adjust stock helpers
//   const adjustStock = async (id: number, delta: number) => {
//     try {
//       const product = products.find((p) => p.id === id);
//       if (!product) return;

//       const newStock = Math.max(0, (product.stock ?? 0) + delta);
//       const response = await api.put(`/products/update/${id}`, {
//         stock: newStock,
//       });
//       const result = response.data;

//       if (result.success) {
//         setProducts((prev) =>
//           prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
//         );
//       } else {
//         setError("Failed to update stock");
//       }
//     } catch (err) {
//       setError("An error occurred while updating stock");
//     }
//   };

//   const lowCount = products.filter(
//     (p) => (p.stock ?? 0) <= LOW_STOCK_THRESHOLD
//   ).length;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <p>Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-destructive">{error}</p>
//           <Button onClick={fetchProducts} className="mt-4">
//             Try Again
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="border-b border-border bg-card">
//         <div className="flex h-16 items-center px-6">
//           <Link
//             href="/admin"
//             className="flex items-center text-muted-foreground hover:text-foreground"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Dashboard
//           </Link>
//           <h1 className="ml-4 text-2xl font-bold text-foreground">Products</h1>
//           <div className="ml-auto">
//             <Link href="/admin/products/add">
//               <Button className="bg-black text-white hover:bg-gray-800">
//                 <Plus className="mr-2 h-4 w-4" />
//                 Add Product
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* Low stock banner */}
//         {lowCount > 0 && (
//           <Card className="mb-6 border-black/20">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between">
//                 <p className="text-sm">
//                   {lowCount} item{lowCount > 1 ? "s" : ""} at or below stock
//                   threshold ({LOW_STOCK_THRESHOLD}). Consider restocking.
//                 </p>
//                 <Link href="/admin/products" className="text-sm underline">
//                   Review
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Filters and Search */}
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle>Filter Products</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search products or brands..."
//                   className="pl-10"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <Select value={filterCategory} onValueChange={setFilterCategory}>
//                 <SelectTrigger className="w-full md:w-48">
//                   <SelectValue placeholder="All Categories" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Categories</SelectItem>
//                   {categories.map((category) => (
//                     <SelectItem key={category.id} value={category.name}>
//                       {category.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <Select value={filterStatus} onValueChange={setFilterStatus}>
//                 <SelectTrigger className="w-full md:w-48">
//                   <SelectValue placeholder="All Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="Available">Available</SelectItem>
//                   <SelectItem value="Rented">Rented</SelectItem>
//                   <SelectItem value="Maintenance">Maintenance</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Products Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Products ({filteredProducts.length})</CardTitle>
//             <CardDescription>Manage your rental inventory</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {filteredProducts.length === 0 ? (
//               <div className="text-center py-8">
//                 <p className="text-muted-foreground">
//                   {products.length === 0
//                     ? "No products found"
//                     : "No products match your filters"}
//                 </p>
//                 {products.length === 0 && (
//                   <Link href="/admin/products/new">
//                     <Button className="mt-4 bg-black text-white hover:bg-gray-800">
//                       <Plus className="mr-2 h-4 w-4" />
//                       Add Your First Product
//                     </Button>
//                   </Link>
//                 )}
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-border">
//                       <th className="text-left p-4 font-medium">Product</th>
//                       <th className="text-left p-4 font-medium">Brand</th>
//                       <th className="text-left p-4 font-medium">Category</th>
//                       <th className="text-left p-4 font-medium">Price</th>
//                       <th className="text-left p-4 font-medium">Stock</th>
//                       <th className="text-left p-4 font-medium">Status</th>
//                       <th className="text-left p-4 font-medium">Rentals</th>
//                       <th className="text-left p-4 font-medium">Rating</th>
//                       <th className="text-left p-4 font-medium">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredProducts.map((product) => {
//                       const isLow = (product.stock ?? 0) <= LOW_STOCK_THRESHOLD;
//                       return (
//                         <tr
//                           key={product.id}
//                           className="border-b border-border hover:bg-muted/50"
//                         >
//                           <td className="p-4">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
//                                 <img
//                                   src={product.image || "/placeholder.svg"}
//                                   alt={product.name}
//                                   className="w-full h-full object-cover rounded-lg"
//                                   onError={(e) => {
//                                     const target = e.target as HTMLImageElement;
//                                     target.style.display = "none";
//                                     const nextSibling =
//                                       target.nextSibling as HTMLElement;
//                                     nextSibling.style.display = "block";
//                                   }}
//                                 />
//                                 <div className="hidden text-xs text-muted-foreground">
//                                   No Image
//                                 </div>
//                               </div>
//                               <div>
//                                 <p className="font-medium">{product.name}</p>
//                                 <p className="text-sm text-muted-foreground">
//                                   Added {product.dateAdded}
//                                 </p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="py-3 px-4">
//                             {getCategoryName(product.category_id)}
//                           </td>
//                           <td className="py-3 px-4">
//                             {getBrandName(product.brand_id)}
//                           </td>
//                           <td className="p-4">
//                             <div>
//                               <p className="font-medium">${product.price}</p>
//                               <p className="text-sm text-muted-foreground">
//                                 Orig: ${product.originalPrice}
//                               </p>
//                             </div>
//                           </td>
//                           <td className="p-4">
//                             <div className="flex items-center gap-2">
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className="hover:bg-black hover:text-white"
//                                 onClick={() => adjustStock(product.id, -1)}
//                                 aria-label="Decrease stock"
//                               >
//                                 <Minus className="h-4 w-4" />
//                               </Button>
//                               <span className="min-w-6 text-center">
//                                 {product.stock ?? 0}
//                               </span>
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className="hover:bg-black hover:text-white"
//                                 onClick={() => adjustStock(product.id, +1)}
//                                 aria-label="Increase stock"
//                               >
//                                 <Plus className="h-4 w-4" />
//                               </Button>
//                               {isLow && (
//                                 <span className="ml-2 rounded border border-black px-1.5 py-0.5 text-xs leading-none">
//                                   Low
//                                 </span>
//                               )}
//                             </div>
//                           </td>
//                           <td className="p-4">
//                             <Badge
//                               variant={
//                                 product.status === "Available"
//                                   ? "default"
//                                   : product.status === "Rented"
//                                   ? "secondary"
//                                   : "destructive"
//                               }
//                             >
//                               {product.status}
//                             </Badge>
//                           </td>
//                           <td className="p-4">{product.rentals}</td>
//                           <td className="p-4">
//                             {product.rating > 0 ? (
//                               <div className="flex items-center">
//                                 <span className="text-sm font-medium">
//                                   {product.rating}
//                                 </span>
//                                 <span className="text-xs text-muted-foreground ml-1">
//                                   ★
//                                 </span>
//                               </div>
//                             ) : (
//                               <span className="text-sm text-muted-foreground">
//                                 No ratings
//                               </span>
//                             )}
//                           </td>
//                           <td className="p-4">
//                             <div className="flex items-center space-x-2">
//                               <Link href={`/admin/products/${product.id}`}>
//                                 <Button variant="ghost" size="sm">
//                                   <Eye className="h-4 w-4" />
//                                 </Button>
//                               </Link>
//                               <Link href={`/admin/products/${product.id}/edit`}>
//                                 <Button variant="ghost" size="sm">
//                                   <Edit className="h-4 w-4" />
//                                 </Button>
//                               </Link>
//                               <AlertDialog>
//                                 <AlertDialogTrigger asChild>
//                                   <Button variant="ghost" size="sm">
//                                     <Trash2 className="h-4 w-4" />
//                                   </Button>
//                                 </AlertDialogTrigger>
//                                 <AlertDialogContent>
//                                   <AlertDialogHeader>
//                                     <AlertDialogTitle>
//                                       Delete Product
//                                     </AlertDialogTitle>
//                                     <AlertDialogDescription>
//                                       Are you sure you want to delete "
//                                       {product.name}"? This action cannot be
//                                       undone.
//                                     </AlertDialogDescription>
//                                   </AlertDialogHeader>
//                                   <AlertDialogFooter>
//                                     <AlertDialogCancel>
//                                       Cancel
//                                     </AlertDialogCancel>
//                                     <AlertDialogAction
//                                       onClick={() =>
//                                         handleDeleteProduct(product.id)
//                                       }
//                                     >
//                                       Delete
//                                     </AlertDialogAction>
//                                   </AlertDialogFooter>
//                                 </AlertDialogContent>
//                               </AlertDialog>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  Minus,
  ImageIcon,
  IndianRupee,
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/axiosInstance";

const LOW_STOCK_THRESHOLD = 5;

interface Product {
  id: number;
  name: string;
  brand_id: number | null;
  category_id: number;
  price: number;
  originalPrice: number;
  status: string;
  rentals: number;
  rating: number;
  sizes: string[];
  colors: string[];
  description: string;
  dateAdded: string;
  stock: number;
}

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text: string | null;
  is_primary: boolean;
  created_at: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [productImages, setProductImages] = useState<Record<number, string>>({}); // productId -> primary image URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products/get");
      const result = response.data;

      if (result.success) {
        setProducts(result.data);
        
        // Fetch images for each product
        fetchProductImages(result.data);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      setError("An error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch product images
  const fetchProductImages = async (products: Product[]) => {
    try {
      const imagePromises = products.map(async (product) => {
        try {
          const response = await api.get(`/product-images/get/product/${product.id}`);
          const result = response.data;
          
          if (result.success && result.data.length > 0) {
            // Find primary image or use first image
            const primaryImage = result.data.find((img: ProductImage) => img.is_primary) || result.data[0];
            return { productId: product.id, imageUrl: primaryImage.image_url };
          }
        } catch (err) {
          console.error(`Failed to fetch images for product ${product.id}:`, err);
        }
        return null;
      });

      const imageResults = await Promise.all(imagePromises);
      const imagesMap: Record<number, string> = {};
      
      imageResults.forEach(result => {
        if (result) {
          imagesMap[result.productId] = result.imageUrl;
        }
      });
      
      setProductImages(imagesMap);
    } catch (err) {
      console.error("Failed to fetch product images:", err);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories/get");
      const result = response.data;

      if (result.success) {
        setCategories(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch categories");
    }
  };

  // Fetch brands
  const fetchBrands = async () => {
    try {
      const response = await api.get("/brands/get");
      const result = response.data;

      if (result.success) {
        setBrands(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch brands");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  // Get category name by ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  // Get brand name by ID
  const getBrandName = (brandId: number | null) => {
    if (!brandId) return "None";
    const brand = brands.find((b) => b.id === brandId);
    return brand ? brand.name : "Unknown";
  };

  // Update low-stock badge
  useEffect(() => {
    if (products.length > 0) {
      try {
        const lowCount = products.filter(
          (p) => (p.stock ?? 0) <= LOW_STOCK_THRESHOLD
        ).length;
        localStorage.setItem("lowStockCount", String(lowCount));
        // Notify sidebar listeners
        window.dispatchEvent(new Event("lowStockUpdated"));
      } catch {}
    }
  }, [products]);

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getBrandName(product.brand_id).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || product.category_id.toString() === filterCategory;
    const matchesStatus =
      filterStatus === "all" || product.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDeleteProduct = async (id: number) => {
    try {
      const response = await api.delete(`/products/delete/${id}`);
      const result = response.data;

      if (result.success) {
        setProducts(products.filter((product) => product.id !== id));
        // Remove from images map
        setProductImages(prev => {
          const newImages = { ...prev };
          delete newImages[id];
          return newImages;
        });
      } else {
        setError("Failed to delete product");
      }
    } catch (err) {
      setError("An error occurred while deleting the product");
    }
  };

  // Adjust stock helpers
  const adjustStock = async (id: number, delta: number) => {
    try {
      const product = products.find((p) => p.id === id);
      if (!product) return;

      const newStock = Math.max(0, (product.stock ?? 0) + delta);
      const response = await api.put(`/products/update/${id}`, {
        stock: newStock,
      });
      const result = response.data;

      if (result.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p))
        );
      } else {
        setError("Failed to update stock");
      }
    } catch (err) {
      setError("An error occurred while updating stock");
    }
  };

  const lowCount = products.filter(
    (p) => (p.stock ?? 0) <= LOW_STOCK_THRESHOLD
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">{error}</p>
          <Button onClick={fetchProducts} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6">
          <Link
            href="/admin"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="ml-4 text-2xl font-bold text-foreground">Products</h1>
          <div className="ml-auto">
            <Link href="/admin/products/add">
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Low stock banner */}
        {lowCount > 0 && (
          <Card className="mb-6 border-black/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm">
                  {lowCount} item{lowCount > 1 ? "s" : ""} at or below stock
                  threshold ({LOW_STOCK_THRESHOLD}). Consider restocking.
                </p>
                <Link href="/admin/products" className="text-sm underline">
                  Review
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products or brands..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Rented">Rented</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
            <CardDescription>Manage your rental inventory</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {products.length === 0
                    ? "No products found"
                    : "No products match your filters"}
                </p>
                {products.length === 0 && (
                  <Link href="/admin/products/add">
                    <Button className="mt-4 bg-black text-white hover:bg-gray-800">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Product
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-medium">Product</th>
                      <th className="text-left p-4 font-medium">Brand</th>
                      <th className="text-left p-4 font-medium">Category</th>
                      <th className="text-left p-4 font-medium">Price</th>
                      <th className="text-left p-4 font-medium">Stock</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Rentals</th>
                      <th className="text-left p-4 font-medium">Rating</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => {
                      const isLow = (product.stock ?? 0) <= LOW_STOCK_THRESHOLD;
                      const productImage = productImages[product.id];
                      
                      return (
                        <tr
                          key={product.id}
                          className="border-b border-border hover:bg-muted/50"
                        >
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                                {productImage ? (
                                  <img
                                    src={productImage}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = "none";
                                      const nextSibling = target.nextSibling as HTMLElement;
                                      if (nextSibling) nextSibling.style.display = "flex";
                                    }}
                                  />
                                ) : (
                                  <div className="flex items-center justify-center text-muted-foreground">
                                    <ImageIcon className="h-6 w-6" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Added {new Date(product.dateAdded).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            {getBrandName(product.brand_id)}
                          </td>
                          <td className="p-4">
                            {getCategoryName(product.category_id)}
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium flex items-center"><IndianRupee size={18}/>{product.price}</p>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <p className="text-sm text-muted-foreground line-through">
                                  <IndianRupee />{product.originalPrice}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-black hover:text-white"
                                onClick={() => adjustStock(product.id, -1)}
                                aria-label="Decrease stock"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="min-w-6 text-center">
                                {product.stock ?? 0}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-black hover:text-white"
                                onClick={() => adjustStock(product.id, +1)}
                                aria-label="Increase stock"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              {isLow && (
                                <Badge variant="destructive" className="ml-2">
                                  Low
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant={
                                product.status === "Available"
                                  ? "default"
                                  : product.status === "Rented"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {product.status}
                            </Badge>
                          </td>
                          <td className="p-4">{product.rentals || 0}</td>
                          <td className="p-4">
                            {product.rating > 0 ? (
                              <div className="flex items-center">
                                <span className="text-sm font-medium">
                                  {product.rating}
                                </span>
                                <span className="text-xs text-muted-foreground ml-1">
                                  ★
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                No ratings
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Link href={`/admin/products/${product.id}`}>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href={`/admin/products/${product.id}/edit`}>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Product
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "
                                      {product.name}"? This action cannot be
                                      undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteProduct(product.id)
                                      }
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
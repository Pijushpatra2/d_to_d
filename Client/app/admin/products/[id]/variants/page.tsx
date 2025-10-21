// // pages/admin/products/[id]/variants/page.tsx
// "use client";
// import { useState, useEffect } from 'react';
// import { NextPage } from 'next';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { ArrowLeft, Plus, Edit, Trash2, Search } from 'lucide-react';
// import api from '@/lib/axiosInstance';
// import VariantForm from '@/components/admin/VariantForm';

// interface ProductVariant {
//   id: number;
//   product_id: number;
//   sku: string;
//   color: string;
//   size: string;
//   stock: number;
//   price: number;
// }

// interface Product {
//   id: number;
//   name: string;
// }

// const ProductVariantsPage: NextPage = () => {
//   const params = useParams();
//   const router = useRouter();
//   const productId = Number(params.id);
  
//   const [variants, setVariants] = useState<ProductVariant[]>([]);
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
//   const [showForm, setShowForm] = useState(false);
//   const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);

//   // Fetch product and variants
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [productResponse, variantsResponse] = await Promise.all([
//           api.get(`/products/get/${productId}`),
//           api.get(`/product-variants/get?product_id=${productId}`),
//         ]);

//         const productResult = productResponse.data;
//         const variantsResult = variantsResponse.data;

//         if (productResult.success) {
//           setProduct(productResult.data);
//         }

//         if (variantsResult.success) {
//           setVariants(variantsResult.data);
//         }
//       } catch (err) {
//         setError('Failed to fetch data');
//         console.error('Failed to fetch data', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (productId) {
//       fetchData();
//     }
//   }, [productId]);

//   // Handle delete variant
//   const handleDeleteVariant = async (variantId: number) => {
//     if (!confirm('Are you sure you want to delete this variant?')) return;

//     try {
//       setDeleteLoading(variantId);
//       const response = await api.delete(`/product-variants/delete/${variantId}`);
//       const result = response.data;

//       if (result.success) {
//         setVariants(variants.filter(variant => variant.id !== variantId));
//       } else {
//         setError('Failed to delete variant');
//       }
//     } catch (err) {
//       setError('An error occurred while deleting the variant');
//     } finally {
//       setDeleteLoading(null);
//     }
//   };

//   // Handle edit variant
//   const handleEditVariant = (variant: ProductVariant) => {
//     setEditingVariant(variant);
//     setShowForm(true);
//   };

//   // Handle form close
//   const handleFormClose = () => {
//     setShowForm(false);
//     setEditingVariant(null);
//   };

//   // Handle form success
//   const handleFormSuccess = () => {
//     // Refresh the variants list
//     const fetchVariants = async () => {
//       try {
//         const response = await api.get(`/product-variants/get?product_id=${productId}`);
//         const result = response.data;

//         if (result.success) {
//           setVariants(result.data);
//         }
//       } catch (err) {
//         console.error('Failed to fetch updated variants', err);
//       }
//     };

//     fetchVariants();
//     handleFormClose();
//   };

//   // Filter variants based on search
//   const filteredVariants = variants.filter(variant =>
//     variant.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     variant.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     variant.size.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <p className="text-muted-foreground">Loading product variants...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-destructive mb-4">{error}</p>
//           <Link href="/admin/products">
//             <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
//               <ArrowLeft className="mr-2 h-4 w-4 inline" />
//               Back to Products
//             </button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // Show form if needed
//   if (showForm) {
//     return (
//       <VariantForm
//         productId={productId}
//         variantId={editingVariant?.id}
//         mode={editingVariant ? 'edit' : 'add'}
//         onSuccess={handleFormSuccess}
//         onCancel={handleFormClose}
//       />
//     );
//   }

//   return (
//     <div className="bg-background">
//       {/* Header */}
//       <div className="border-b border-border bg-card">
//         <div className="flex h-16 items-center px-6">
//           <h1 className="ml-4 text-2xl font-bold text-foreground">
//             Variants for {product?.name}
//           </h1>
//           <div className="ml-auto">
//             <button 
//               onClick={() => setShowForm(true)}
//               className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded flex items-center"
//             >
//               <Plus className="mr-2 h-4 w-4" />
//               Add Variant
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* Search and Filters */}
//         <div className="mb-6 bg-white rounded-lg shadow p-4">
//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <input
//                 type="text"
//                 placeholder="Search variants by SKU, color, or size..."
//                 className="w-full pl-10 pr-4 py-2 border rounded"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Variants Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           {filteredVariants.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground mb-4">
//                 {variants.length === 0 ? "No variants found for this product" : "No variants match your search"}
//               </p>
//               <button 
//                 onClick={() => setShowForm(true)}
//                 className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded flex items-center mx-auto"
//               >
//                 <Plus className="mr-2 h-4 w-4" />
//                 Add Your First Variant
//               </button>
//             </div>
//           ) : (
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="text-left p-4 font-medium">SKU</th>
//                   <th className="text-left p-4 font-medium">Color</th>
//                   <th className="text-left p-4 font-medium">Size</th>
//                   <th className="text-left p-4 font-medium">Price</th>
//                   <th className="text-left p-4 font-medium">Stock</th>
//                   <th className="text-left p-4 font-medium">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredVariants.map((variant) => (
//                   <tr key={variant.id} className="border-b border-border hover:bg-muted/50">
//                     <td className="p-4 font-medium">{variant.sku}</td>
//                     <td className="p-4">{variant.color}</td>
//                     <td className="p-4">{variant.size}</td>
//                     <td className="p-4">${variant.price}</td>
//                     <td className="p-4">{variant.stock}</td>
//                     <td className="p-4">
//                       <div className="flex items-center space-x-2">
//                         <button 
//                           onClick={() => handleEditVariant(variant)}
//                           className="p-2 text-blue-600 hover:bg-blue-50 rounded"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteVariant(variant.id)}
//                           disabled={deleteLoading === variant.id}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Summary */}
//         {variants.length > 0 && (
//           <div className="mt-6 bg-white rounded-lg shadow p-4">
//             <h3 className="font-medium mb-2">Variants Summary</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <p className="text-sm text-muted-foreground">Total Variants</p>
//                 <p className="text-lg font-bold">{variants.length}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Total Stock</p>
//                 <p className="text-lg font-bold">
//                   {variants.reduce((sum, variant) => sum + variant.stock, 0)}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Low Stock Variants</p>
//                 <p className="text-lg font-bold text-red-600">
//                   {variants.filter(variant => variant.stock <= 5).length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductVariantsPage;
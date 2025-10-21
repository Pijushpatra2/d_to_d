// // // components/admin/ProductVariants.tsx
// // "use client";
// // import { useState, useEffect } from 'react';
// // import Link from 'next/link';
// // import { ArrowLeft, Plus, Edit, Trash2, Search } from 'lucide-react';
// // import api from '@/lib/axiosInstance';
// // import VariantForm from '@/components/admin/VariantForm';

// // interface ProductVariant {
// //   id: number;
// //   product_id: number;
// //   sku: string;
// //   color: string;
// //   size: string;
// //   stock: number;
// //   price: number;
// // }

// // interface Product {
// //   id: number;
// //   name: string;
// // }

// // interface ProductVariantsProps {
// //   productId: number;
// //   onBack?: () => void; // Optional callback for back navigation
// // }

// // const ProductVariants: React.FC<ProductVariantsProps> = ({ productId, onBack }) => {
// //   const [variants, setVariants] = useState<ProductVariant[]>([]);
// //   const [product, setProduct] = useState<Product | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);

// //   // Reset state when productId changes
// //   useEffect(() => {
// //     setVariants([]);
// //     setProduct(null);
// //     setLoading(true);
// //     setError('');
// //     setSearchTerm('');
// //     setDeleteLoading(null);
// //     setShowForm(false);
// //     setEditingVariant(null);
// //   }, [productId]);

// //   // Fetch product and variants
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       // Don't fetch if productId is invalid or 0
// //       if (!productId || productId === 0) {
// //         setLoading(false);
// //         setProduct(null);
// //         setVariants([]);
// //         return;
// //       }

// //       try {
// //         setLoading(true);
// //         const [productResponse, variantsResponse] = await Promise.all([
// //           api.get(`/products/get/${productId}`),
// //           api.get(`/product-variants/get?product_id=${productId}`),
// //         ]);

// //         const productResult = productResponse.data;
// //         const variantsResult = variantsResponse.data;

// //         if (productResult.success) {
// //           setProduct(productResult.data);
// //         } else {
// //           setError('Product not found');
// //         }

// //         if (variantsResult.success) {
// //           setVariants(variantsResult.data);
// //         } else {
// //           setVariants([]);
// //         }
// //       } catch (err) {
// //         setError('Failed to fetch data');
// //         console.error('Failed to fetch data', err);
// //         setProduct(null);
// //         setVariants([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [productId]);

// //   // Handle delete variant
// //   const handleDeleteVariant = async (variantId: number) => {
// //     if (!confirm('Are you sure you want to delete this variant?')) return;

// //     try {
// //       setDeleteLoading(variantId);
// //       const response = await api.delete(`/product-variants/delete/${variantId}`);
// //       const result = response.data;

// //       if (result.success) {
// //         setVariants(variants.filter(variant => variant.id !== variantId));
// //       } else {
// //         setError('Failed to delete variant');
// //       }
// //     } catch (err) {
// //       setError('An error occurred while deleting the variant');
// //     } finally {
// //       setDeleteLoading(null);
// //     }
// //   };

// //   // Handle edit variant
// //   const handleEditVariant = (variant: ProductVariant) => {
// //     setEditingVariant(variant);
// //     setShowForm(true);
// //   };

// //   // Handle form close
// //   const handleFormClose = () => {
// //     setShowForm(false);
// //     setEditingVariant(null);
// //   };

// //   // Handle form success
// //   const handleFormSuccess = () => {
// //     // Refresh the variants list
// //     const fetchVariants = async () => {
// //       try {
// //         const response = await api.get(`/product-variants/get?product_id=${productId}`);
// //         const result = response.data;

// //         if (result.success) {
// //           setVariants(result.data);
// //         }
// //       } catch (err) {
// //         console.error('Failed to fetch updated variants', err);
// //       }
// //     };

// //     fetchVariants();
// //     handleFormClose();
// //   };

// //   // Filter variants based on search
// //   const filteredVariants = variants.filter(variant =>
// //     variant.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     variant.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     variant.size.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-background flex items-center justify-center">
// //         <p className="text-muted-foreground">Loading product variants...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-background flex items-center justify-center">
// //         <div className="text-center">
// //           <p className="text-destructive mb-4">{error}</p>
// //           {onBack ? (
// //             <button 
// //               onClick={onBack}
// //               className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
// //             >
// //               <ArrowLeft className="mr-2 h-4 w-4 inline" />
// //               Back to Products
// //             </button>
// //           ) : (
// //             <Link href="/admin/products">
// //               <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
// //                 <ArrowLeft className="mr-2 h-4 w-4 inline" />
// //                 Back to Products
// //               </button>
// //             </Link>
// //           )}
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Show form if needed
// //   if (showForm) {
// //     return (
// //       <VariantForm
// //         productId={productId}
// //         variantId={editingVariant?.id}
// //         mode={editingVariant ? 'edit' : 'add'}
// //         onSuccess={handleFormSuccess}
// //         onCancel={handleFormClose}
// //       />
// //     );
// //   }

// //   return (
// //     <div className="bg-background">
// //       {/* Header */}
// //       <div className="border-b border-border bg-card">
// //         <div className="flex h-16 items-center px-6">
// //           {onBack ? (
// //             <button 
// //               onClick={onBack}
// //               className="flex items-center text-muted-foreground hover:text-foreground"
// //             >
// //               <ArrowLeft className="mr-2 h-4 w-4" />
// //               Back to Products
// //             </button>
// //           ) : (
// //             <Link href="/admin/products" className="flex items-center text-muted-foreground hover:text-foreground">
// //               <ArrowLeft className="mr-2 h-4 w-4" />
// //               Back to Products
// //             </Link>
// //           )}
// //           <h1 className="ml-4 text-2xl font-bold text-foreground">
// //             {product ? `Variants for ${product.name}` : 'Product Variants'}
// //           </h1>
// //           <div className="ml-auto">
// //             <button 
// //               onClick={() => setShowForm(true)}
// //               className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded flex items-center"
// //               disabled={!productId || productId === 0}
// //             >
// //               <Plus className="mr-2 h-4 w-4" />
// //               Add Variant
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="p-6">
// //         {/* Show message if no product is loaded */}
// //         {!product && !loading && (
// //           <div className="mb-6 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
// //             <p>No product data available. Please select a valid product.</p>
// //           </div>
// //         )}

// //         {/* Search and Filters */}
// //         <div className="mb-6 bg-white rounded-lg shadow p-4">
// //           <div className="flex flex-col md:flex-row gap-4 items-center">
// //             <div className="relative flex-1">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //               <input
// //                 type="text"
// //                 placeholder="Search variants by SKU, color, or size..."
// //                 className="w-full pl-10 pr-4 py-2 border rounded"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 disabled={!product || variants.length === 0}
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Variants Table */}
// //         <div className="bg-white rounded-lg shadow overflow-hidden">
// //           {filteredVariants.length === 0 ? (
// //             <div className="text-center py-12">
// //               <p className="text-muted-foreground mb-4">
// //                 {!product ? "No product selected" : 
// //                  variants.length === 0 ? "No variants found for this product" : "No variants match your search"}
// //               </p>
// //               {product && (
// //                 <button 
// //                   onClick={() => setShowForm(true)}
// //                   className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded flex items-center mx-auto"
// //                 >
// //                   <Plus className="mr-2 h-4 w-4" />
// //                   Add Your First Variant
// //                 </button>
// //               )}
// //             </div>
// //           ) : (
// //             <table className="w-full">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="text-left p-4 font-medium">SKU</th>
// //                   <th className="text-left p-4 font-medium">Color</th>
// //                   <th className="text-left p-4 font-medium">Size</th>
// //                   <th className="text-left p-4 font-medium">Price</th>
// //                   <th className="text-left p-4 font-medium">Stock</th>
// //                   <th className="text-left p-4 font-medium">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filteredVariants.map((variant) => (
// //                   <tr key={variant.id} className="border-b border-border hover:bg-muted/50">
// //                     <td className="p-4 font-medium">{variant.sku}</td>
// //                     <td className="p-4">{variant.color}</td>
// //                     <td className="p-4">{variant.size}</td>
// //                     <td className="p-4">${variant.price}</td>
// //                     <td className="p-4">{variant.stock}</td>
// //                     <td className="p-4">
// //                       <div className="flex items-center space-x-2">
// //                         <button 
// //                           onClick={() => handleEditVariant(variant)}
// //                           className="p-2 text-blue-600 hover:bg-blue-50 rounded"
// //                         >
// //                           <Edit className="h-4 w-4" />
// //                         </button>
// //                         <button
// //                           onClick={() => handleDeleteVariant(variant.id)}
// //                           disabled={deleteLoading === variant.id}
// //                           className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
// //                         >
// //                           <Trash2 className="h-4 w-4" />
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           )}
// //         </div>

// //         {/* Summary */}
// //         {variants.length > 0 && (
// //           <div className="mt-6 bg-white rounded-lg shadow p-4">
// //             <h3 className="font-medium mb-2">Variants Summary</h3>
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //               <div>
// //                 <p className="text-sm text-muted-foreground">Total Variants</p>
// //                 <p className="text-lg font-bold">{variants.length}</p>
// //               </div>
// //               <div>
// //                 <p className="text-sm text-muted-foreground">Total Stock</p>
// //                 <p className="text-lg font-bold">
// //                   {variants.reduce((sum, variant) => sum + variant.stock, 0)}
// //                 </p>
// //               </div>
// //               <div>
// //                 <p className="text-sm text-muted-foreground">Low Stock Variants</p>
// //                 <p className="text-lg font-bold text-red-600">
// //                   {variants.filter(variant => variant.stock <= 5).length}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductVariants;



// // components/admin/ProductVariants.tsx
// "use client";
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { ArrowLeft, Plus, Edit, Trash2, Search } from 'lucide-react';
// import api from '@/lib/axiosInstance';

// // Interfaces
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

// interface ProductVariantsProps {
//   productId: number;
//   onBack?: () => void;
// }

// interface VariantFormProps {
//   productId: number;
//   variantId?: number;
//   mode: 'add' | 'edit';
//   onSuccess?: () => void;
//   onCancel?: () => void;
// }

// // VariantForm Component
// const VariantForm: React.FC<VariantFormProps> = ({ 
//   productId, 
//   variantId, 
//   mode, 
//   onSuccess, 
//   onCancel 
// }) => {
//   const router = useRouter();
  
//   const [product, setProduct] = useState<Product | null>(null);
//   const [variants, setVariants] = useState<ProductVariant[]>([]);
//   const [loading, setLoading] = useState(mode === 'edit');
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
  
//   const [formData, setFormData] = useState({
//     product_id: productId,
//     sku: '',
//     color: '',
//     size: '',
//     stock: '',
//     price: '',
//   });

//   // Reset state when productId changes
//   useEffect(() => {
//     setProduct(null);
//     setLoading(mode === 'edit');
//     setSubmitting(false);
//     setError('');
//     setFormData({
//       product_id: productId,
//       sku: '',
//       color: '',
//       size: '',
//       stock: '',
//       price: '',
//     });
//   }, [productId, mode]);

//   // Fetch product data and variant data (if in edit mode)
// const fetchData = async () => {
//   console.log('🔄 Fetching data for productId:', productId);
  
//   if (!productId || productId === 0) {
//     console.log('❌ Invalid productId:', productId);
//     setLoading(false);
//     setProduct(null);
//     setVariants([]);
//     return;
//   }

//   try {
//     setLoading(true);
//     console.log('📡 Making API calls for productId:', productId);
    
//     // Use the new API endpoint for getting variants by product ID
//     const [productResponse, variantsResponse] = await Promise.all([
//       api.get(`/products/get/${productId}`),
//       api.get(`/product-variants/get/product/${productId}`), // Updated endpoint
//     ]);

//     const productResult = productResponse.data;
//     const variantsResult = variantsResponse.data;

//     console.log('📦 Product API response - success:', productResult.success, 'data:', productResult.data);
//     console.log('📦 Variants API response - success:', variantsResult.success, 'data:', variantsResult.data);

//     if (productResult.success) {
//       console.log('✅ Product loaded:', productResult.data.name, '(ID:', productResult.data.id, ')');
//       setProduct(productResult.data);
//     } else {
//       console.log('❌ Product not found in response');
//       setError('Product not found');
//     }

//     if (variantsResult.success) {
//       console.log('✅ Variants loaded successfully');
//       console.log('Variants count:', variantsResult.data.length);
//       console.log('Variants data:', variantsResult.data);
      
//       // The API should already return only variants for this product
//       // But we'll still filter to be safe
//       const filteredVariants = variantsResult.data.filter(
//         (variant: ProductVariant) => {
//           const matches = variant.product_id === productId;
//           if (!matches) {
//             console.warn(`⚠️ Variant ${variant.id} has wrong product_id: ${variant.product_id} (expected: ${productId})`);
//           }
//           return matches;
//         }
//       );
      
//       console.log('✅ Final filtered variants count:', filteredVariants.length);
//       setVariants(filteredVariants);
//     } else {
//       console.log('❌ Variants API call was not successful');
//       setVariants([]);
//     }
//   } catch (err) {
//     console.error('💥 Failed to fetch data:', err);
//     console.error('Error details:', err.response?.data || err.message);
    
//     // Check if it's a 404 error (endpoint not found)
//     if (err.response?.status === 404) {
//       console.log('⚠️ API endpoint not found, trying fallback endpoint...');
//       // Fallback to the old endpoint if the new one doesn't exist
//       try {
//         const fallbackResponse = await api.get(`/product-variants/get?product_id=${productId}`);
//         const fallbackResult = fallbackResponse.data;
        
//         if (fallbackResult.success) {
//           console.log('✅ Fallback API call successful');
//           const filteredVariants = fallbackResult.data.filter(
//             (variant: ProductVariant) => variant.product_id === productId
//           );
//           setVariants(filteredVariants);
//         } else {
//           setError('Failed to fetch variants');
//         }
//       } catch (fallbackErr) {
//         setError('Failed to fetch variants from both endpoints');
//       }
//     } else {
//       setError('Failed to fetch data');
//     }
    
//     setProduct(null);
//     setVariants([]);
//   } finally {
//     console.log('🏁 Fetch completed, setting loading to false');
//     setLoading(false);
//   }
// };

//   // Handle form input changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setError('');

//     try {
//       const payload = {
//         ...formData,
//         stock: parseInt(formData.stock),
//         price: parseFloat(formData.price),
//       };

//       let response;
      
//       if (mode === 'add') {
//         response = await api.post('/product-variants/add', payload);
//       } else if (mode === 'edit' && variantId) {
//         response = await api.put(`/product-variants/update/${variantId}`, payload);
//       }

//       if (response) {
//         const result = response.data;
//         if (result.success) {
//           if (onSuccess) {
//             onSuccess();
//           } else {
//             router.push(`/admin/products/${productId}/variants`);
//           }
//           return;
//         } else {
//           setError(result.message || 'Something went wrong');
//         }
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.message || `An error occurred while ${mode === 'add' ? 'creating' : 'updating'} the variant`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <p className="text-muted-foreground">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="border-b border-border bg-card">
//         <div className="flex h-16 items-center px-6">
//           {onCancel ? (
//             <button 
//               onClick={onCancel}
//               className="flex items-center text-muted-foreground hover:text-foreground"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Variants
//             </button>
//           ) : (
//             <Link 
//               href={`/admin/products/${productId}/variants`} 
//               className="flex items-center text-muted-foreground hover:text-foreground"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Variants
//             </Link>
//           )}
//           <h1 className="ml-4 text-2xl font-bold text-foreground">
//             {mode === 'add' ? 'Add' : 'Edit'} Variant for {product?.name}
//           </h1>
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2" htmlFor="sku">
//                 SKU
//               </label>
//               <input
//                 type="text"
//                 id="sku"
//                 name="sku"
//                 value={formData.sku}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2" htmlFor="color">
//                 Color
//               </label>
//               <input
//                 type="text"
//                 id="color"
//                 name="color"
//                 value={formData.color}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2" htmlFor="size">
//                 Size
//               </label>
//               <input
//                 type="text"
//                 id="size"
//                 name="size"
//                 value={formData.size}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded"
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block text-gray-700 mb-2" htmlFor="price">
//                   Price
//                 </label>
//                 <input
//                   type="number"
//                   id="price"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border rounded"
//                   step="0.01"
//                   min="0"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 mb-2" htmlFor="stock">
//                   Stock
//                 </label>
//                 <input
//                   type="number"
//                   id="stock"
//                   name="stock"
//                   value={formData.stock}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border rounded"
//                   min="0"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={onCancel || (() => router.push(`/admin/products/${productId}/variants`))}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
//                 disabled={submitting}
//               >
//                 {submitting 
//                   ? (mode === 'add' ? 'Creating...' : 'Updating...') 
//                   : (mode === 'add' ? 'Create Variant' : 'Update Variant')
//                 }
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ProductVariants Component
// const ProductVariants: React.FC<ProductVariantsProps> = ({ productId, onBack }) => {
//   const [variants, setVariants] = useState<ProductVariant[]>([]);
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
//   const [showForm, setShowForm] = useState(false);
//   const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);

//   // Reset state when productId changes
//   useEffect(() => {
//     setVariants([]);
//     setProduct(null);
//     setLoading(true);
//     setError('');
//     setSearchTerm('');
//     setDeleteLoading(null);
//     setShowForm(false);
//     setEditingVariant(null);
//   }, [productId]);

//   // Fetch product and variants
// // Fetch product and variants
// useEffect(() => {
//   const fetchData = async () => {
//     if (!productId || productId === 0) {
//       setLoading(false);
//       setProduct(null);
//       setVariants([]);
//       return;
//     }

//     try {
//       setLoading(true);
//       const [productResponse, variantsResponse] = await Promise.all([
//         api.get(`/products/get/${productId}`),
//         // Use the new API endpoint for getting variants by product ID
//         api.get(`/product-variants/get/product/${productId}`),
//       ]);

//       const productResult = productResponse.data;
//       const variantsResult = variantsResponse.data;

//       if (productResult.success) {
//         setProduct(productResult.data);
//       } else {
//         setError('Product not found');
//       }

//       if (variantsResult.success) {
//         // The new API endpoint should return only variants for this product
//         setVariants(variantsResult.data);
//       } else {
//         setVariants([]);
//       }
//     } catch (err) {
//       console.error('Failed to fetch data', err);
      
//       // If the new endpoint fails, try the old endpoint as fallback
//       try {
//         console.log('Trying fallback endpoint...');
//         const fallbackResponse = await api.get(`/product-variants/get?product_id=${productId}`);
//         const fallbackResult = fallbackResponse.data;
        
//         if (fallbackResult.success) {
//           // Filter variants to ensure only this product's variants are shown
//           const filteredVariants = fallbackResult.data.filter(
//             (variant: ProductVariant) => variant.product_id === productId
//           );
//           setVariants(filteredVariants);
//         } else {
//           setError('Failed to fetch variants');
//           setVariants([]);
//         }
//       } catch (fallbackErr) {
//         setError('Failed to fetch data from both endpoints');
//         setVariants([]);
//       }
      
//       setProduct(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, [productId]);

// // Also update the handleFormSuccess function to use the new endpoint
// const handleFormSuccess = () => {
//   const fetchVariants = async () => {
//     try {
//       // Use the new API endpoint
//       const response = await api.get(`/product-variants/get/product/${productId}`);
//       const result = response.data;

//       if (result.success) {
//         setVariants(result.data);
//       }
//     } catch (err) {
//       console.error('Failed to fetch updated variants', err);
      
//       // Fallback to old endpoint
//       try {
//         const fallbackResponse = await api.get(`/product-variants/get?product_id=${productId}`);
//         const fallbackResult = fallbackResponse.data;
        
//         if (fallbackResult.success) {
//           const filteredVariants = fallbackResult.data.filter(
//             (variant: ProductVariant) => variant.product_id === productId
//           );
//           setVariants(filteredVariants);
//         }
//       } catch (fallbackErr) {
//         console.error('Failed to fetch variants from fallback endpoint', fallbackErr);
//       }
//     }
//   };

//   fetchVariants();
//   handleFormClose();
// };

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
//           {onBack ? (
//             <button 
//               onClick={onBack}
//               className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4 inline" />
//               Back to Products
//             </button>
//           ) : (
//             <Link href="/admin/products">
//               <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
//                 <ArrowLeft className="mr-2 h-4 w-4 inline" />
//                 Back to Products
//               </button>
//             </Link>
//           )}
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
//           {/* {onBack ? (
//             <button 
//               onClick={onBack}
//               className="flex items-center text-muted-foreground hover:text-foreground"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Products
//             </button>
//           ) : (
//             <Link href="/admin/products" className="flex items-center text-muted-foreground hover:text-foreground">
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Products
//             </Link>
//           )} */}
//           <h1 className="ml-4 text-2xl font-bold text-foreground">
//             {product ? `Variants for ${product.name}` : 'Product Variants'}
//           </h1>
//           <div className="ml-auto">
//             <button 
//               onClick={() => setShowForm(true)}
//               className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded flex items-center"
//               disabled={!productId || productId === 0}
//             >
//               <Plus className="mr-2 h-4 w-4" />
//               Add Variant
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* Show message if no product is loaded */}
//         {!product && !loading && (
//           <div className="mb-6 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//             <p>No product data available. Please select a valid product.</p>
//           </div>
//         )}

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
//                 disabled={!product || variants.length === 0}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Variants Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           {filteredVariants.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground mb-4">
//                 {!product ? "No product selected" : 
//                  variants.length === 0 ? "No variants found for this product" : "No variants match your search"}
//               </p>
//               {product && (
//                 <button 
//                   onClick={() => setShowForm(true)}
//                   className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded flex items-center mx-auto"
//                 >
//                   <Plus className="mr-2 h-4 w-4" />
//                   Add Your First Variant
//                 </button>
//               )}
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

// // Export both components
// export { VariantForm, ProductVariants };
// export default ProductVariants;









"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Search, X } from 'lucide-react';
import api from '@/lib/axiosInstance';

// Interfaces
interface ProductVariant {
  id: number;
  product_id: number;
  sku: string;
  color: string;
  size: string;
  stock: number;
  price: number;
}

interface Product {
  id: number;
  name: string;
}

interface ProductVariantsProps {
  productId: number;
  onBack?: () => void;
}

// ProductVariants Component with integrated form
const ProductVariants: React.FC<ProductVariantsProps> = ({ productId, onBack }) => {
  const router = useRouter();
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);
  const [formData, setFormData] = useState({
    product_id: productId,
    sku: '',
    color: '',
    size: '',
    stock: '',
    price: '',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Reset state when productId changes
  useEffect(() => {
    setVariants([]);
    setProduct(null);
    setLoading(true);
    setError('');
    setSearchTerm('');
    setDeleteLoading(null);
    setShowForm(false);
    setEditingVariant(null);
    resetForm();
  }, [productId]);

  // Reset form function
  const resetForm = () => {
    setFormData({
      product_id: productId,
      sku: '',
      color: '',
      size: '',
      stock: '',
      price: '',
    });
    setFormError('');
    setFormSubmitting(false);
  };

  // Fetch product and variants
  useEffect(() => {
    const fetchData = async () => {
      if (!productId || productId === 0) {
        setLoading(false);
        setProduct(null);
        setVariants([]);
        return;
      }

      try {
        setLoading(true);
        const [productResponse, variantsResponse] = await Promise.all([
          api.get(`/products/get/${productId}`),
          api.get(`/product-variants/get?product_id=${productId}`),
        ]);

        const productResult = productResponse.data;
        const variantsResult = variantsResponse.data;

        if (productResult.success) {
          setProduct(productResult.data);
        } else {
          setError('Product not found');
        }

        if (variantsResult.success) {
          // Filter variants to ensure only this product's variants are shown
          const filteredVariants = variantsResult.data.filter(
            (variant: ProductVariant) => variant.product_id === productId
          );
          setVariants(filteredVariants);
        } else {
          setVariants([]);
        }
      } catch (err) {
        console.error('Failed to fetch data', err);
        setError('Failed to fetch data');
        setProduct(null);
        setVariants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      const payload = {
        ...formData,
        stock: parseInt(formData.stock),
        price: parseFloat(formData.price),
      };

      let response;
      
      if (editingVariant) {
        // Edit mode
        response = await api.put(`/product-variants/update/${editingVariant.id}`, payload);
      } else {
        // Add mode
        response = await api.post('/product-variants/add', payload);
      }

      if (response) {
        const result = response.data;
        if (result.success) {
          // Refresh variants list
          const variantsResponse = await api.get(`/product-variants/get?product_id=${productId}`);
          if (variantsResponse.data.success) {
            setVariants(variantsResponse.data.data);
          }
          // Reset form and close
          resetForm();
          setShowForm(false);
          setEditingVariant(null);
        } else {
          setFormError(result.message || 'Something went wrong');
        }
      }
    } catch (err: any) {
      setFormError(err.response?.data?.message || `An error occurred while ${editingVariant ? 'updating' : 'creating'} the variant`);
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handle edit variant
  const handleEditVariant = (variant: ProductVariant) => {
    setEditingVariant(variant);
    setFormData({
      product_id: productId,
      sku: variant.sku,
      color: variant.color,
      size: variant.size,
      stock: variant.stock.toString(),
      price: variant.price.toString(),
    });
    setShowForm(true);
  };

  // Handle cancel form
  const handleFormCancel = () => {
    resetForm();
    setShowForm(false);
    setEditingVariant(null);
  };

  // Handle delete variant
  const handleDeleteVariant = async (variantId: number) => {
    if (!confirm('Are you sure you want to delete this variant?')) return;

    try {
      setDeleteLoading(variantId);
      const response = await api.delete(`/product-variants/delete/${variantId}`);
      const result = response.data;

      if (result.success) {
        setVariants(variants.filter(variant => variant.id !== variantId));
      } else {
        setError('Failed to delete variant');
      }
    } catch (err) {
      setError('An error occurred while deleting the variant');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Filter variants based on search
  const filteredVariants = variants.filter(variant =>
    variant.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    variant.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
    variant.size.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading product variants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          {onBack ? (
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4 inline" />
              Back to Products
            </button>
          ) : (
            <Link href="/admin/products">
              <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                <ArrowLeft className="mr-2 h-4 w-4 inline" />
                Back to Products
              </button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6">
          {onBack ? (
            <button 
              onClick={onBack}
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </button>
          ) : (
            <Link href="/admin/products" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          )}
          <h1 className="ml-4 text-2xl font-bold text-foreground">
            {product ? `Variants for ${product.name}` : 'Product Variants'}
          </h1>
          <div className="ml-auto">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded flex items-center"
              disabled={!productId || productId === 0}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Variant
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Show message if no product is loaded */}
        {!product && !loading && (
          <div className="mb-6 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p>No product data available. Please select a valid product.</p>
          </div>
        )}

        {/* Variant Form (shown at the top when active) */}
        {showForm && (
          <div className="mb-6 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingVariant ? 'Edit Variant' : 'Add New Variant'}
              </h2>
              <button
                onClick={handleFormCancel}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="sku">
                    SKU
                  </label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="color">
                    Color
                  </label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="size">
                    Size
                  </label>
                  <input
                    type="text"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="price">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="stock">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleFormCancel}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                  disabled={formSubmitting}
                >
                  {formSubmitting 
                    ? (editingVariant ? 'Updating...' : 'Creating...') 
                    : (editingVariant ? 'Update Variant' : 'Create Variant')
                  }
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search variants by SKU, color, or size..."
                className="w-full pl-10 pr-4 py-2 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={!product || variants.length === 0}
              />
            </div>
          </div>
        </div>

        {/* Variants Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredVariants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {!product ? "No product selected" : 
                 variants.length === 0 ? "No variants found for this product" : "No variants match your search"}
              </p>
              {product && !showForm && (
                <button 
                  onClick={() => setShowForm(true)}
                  className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded flex items-center mx-auto"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Variant
                </button>
              )}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium">SKU</th>
                  <th className="text-left p-4 font-medium">Color</th>
                  <th className="text-left p-4 font-medium">Size</th>
                  <th className="text-left p-4 font-medium">Price</th>
                  <th className="text-left p-4 font-medium">Stock</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVariants.map((variant) => (
                  <tr key={variant.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4 font-medium">{variant.sku}</td>
                    <td className="p-4">{variant.color}</td>
                    <td className="p-4">{variant.size}</td>
                    <td className="p-4">${variant.price}</td>
                    <td className="p-4">{variant.stock}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleEditVariant(variant)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVariant(variant.id)}
                          disabled={deleteLoading === variant.id}
                          className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Summary */}
        {variants.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <h3 className="font-medium mb-2">Variants Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Variants</p>
                <p className="text-lg font-bold">{variants.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Stock</p>
                <p className="text-lg font-bold">
                  {variants.reduce((sum, variant) => sum + variant.stock, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Variants</p>
                <p className="text-lg font-bold text-red-600">
                  {variants.filter(variant => variant.stock <= 5).length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductVariants;
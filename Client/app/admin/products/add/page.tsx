// "use client";
// import { useState, useEffect } from 'react';
// import { NextPage } from 'next';
// import Head from 'next/head';
// // import { useRouter } from 'next/router';
// import api from '@/lib/axiosInstance';

// interface Category {
//   id: number;
//   name: string;
//   slug: string;
//   parent_id: number | null;
// }

// interface Brand {
//   id: number;
//   name: string;
//   slug: string;
//   image_url: string | null;
// }

// const AddProductPage: NextPage = () => {
//   // const router = useRouter();
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [brands, setBrands] = useState<Brand[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     price: '',
//     stock: '',
//     category_id: '',
//     brand_id: '',
//   });

// // Fetch categories and brands
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const [categoriesResponse, brandsResponse] = await Promise.all([
//         api.get('/categories/get'),
//         api.get('/brands/get'),
//       ]);

//       const categoriesResult = categoriesResponse.data;
//       const brandsResult = brandsResponse.data;

//       if (categoriesResult.success) {
//         setCategories(categoriesResult.data);
//       }

//       if (brandsResult.success) {
//         setBrands(brandsResult.data);
//       }
//     } catch (err) {
//       console.error('Failed to fetch data');
//     }
//   };

//   fetchData();
// }, []);


//   // Handle form input changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

// // Handle form submission
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setLoading(true);
//   setError('');

//   try {
//     const payload = {
//       ...formData,
//       price: parseFloat(formData.price),
//       stock: parseInt(formData.stock),
//       category_id: parseInt(formData.category_id),
//       brand_id: formData.brand_id ? parseInt(formData.brand_id) : null,
//     };

//     const response = await api.post('/products/add', payload);
//     const result = response.data;

//     if (result.success) {
//       window.location.href = '/admin/products';
//     } else {
//       setError(result.message || 'Something went wrong');
//     }
//   } catch (err) {
//     setError('An error occurred while creating the product');
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Head>
//         <title>Add Product</title>
//       </Head>

//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="name">
//               Product Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="slug">
//               Slug
//             </label>
//             <input
//               type="text"
//               id="slug"
//               name="slug"
//               value={formData.slug}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="description">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded"
//               rows={4}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-gray-700 mb-2" htmlFor="price">
//                 Price
//               </label>
//               <input
//                 type="number"
//                 id="price"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded"
//                 step="0.01"
//                 min="0"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2" htmlFor="stock">
//                 Stock
//               </label>
//               <input
//                 type="number"
//                 id="stock"
//                 name="stock"
//                 value={formData.stock}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded"
//                 min="0"
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="block text-gray-700 mb-2" htmlFor="category_id">
//                 Category
//               </label>
//               <select
//                 id="category_id"
//                 name="category_id"
//                 value={formData.category_id}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded"
//                 required
//               >
//                 <option value="">Select a category</option>
//                 {categories.map(category => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2" htmlFor="brand_id">
//                 Brand (Optional)
//               </label>
//               <select
//                 id="brand_id"
//                 name="brand_id"
//                 value={formData.brand_id}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded"
//               >
//                 <option value="">No brand</option>
//                 {brands.map(brand => (
//                   <option key={brand.id} value={brand.id}>
//                     {brand.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={() => window.location.href = '/admin/products'}
//               className="px-4 py-2 border rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//               disabled={loading}
//             >
//               {loading ? 'Creating...' : 'Create Product'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProductPage;







"use client";
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import api from '@/lib/axiosInstance';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
}

interface Brand {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
}

const AddProductPage: NextPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    brand_id: '',
  });

  // Fetch categories and brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, brandsResponse] = await Promise.all([
          api.get('/categories/get'),
          api.get('/brands/get'),
        ]);

        const categoriesResult = categoriesResponse.data;
        const brandsResult = brandsResponse.data;

        if (categoriesResult.success) {
          setCategories(categoriesResult.data);
        }

        if (brandsResult.success) {
          setBrands(brandsResult.data);
        }
      } catch (err) {
        console.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category_id: parseInt(formData.category_id),
        brand_id: formData.brand_id ? parseInt(formData.brand_id) : null,
      };

      const response = await api.post('/products/add', payload);
      const result = response.data;

      if (result.success) {
        router.push('/admin/products');
      } else {
        setError(result.message || 'Something went wrong');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while creating the product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6">
          <Link
            href="/admin/products"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
          <h1 className="ml-4 text-2xl font-bold text-foreground">
            Add New Product
          </h1>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                Fill in the details for your new product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="product-slug"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your product..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category_id">Category</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => handleSelectChange('category_id', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand_id">Brand (Optional)</Label>
                    <Select
                      value={formData.brand_id}
                      onValueChange={(value) => handleSelectChange('brand_id', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="No brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map(brand => (
                          <SelectItem key={brand.id} value={brand.id.toString()}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/admin/products')}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-black text-white hover:bg-gray-800"
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Product'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
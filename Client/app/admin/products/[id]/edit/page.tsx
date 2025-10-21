// pages/admin/products/[id]/edit/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/axiosInstance';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  brand_id: number | null;
  status: string;
  originalPrice: number;
  rentals: number;
  rating: number;
  sizes: string[];
  colors: string[];
  image: string;
  dateAdded: string;
}

const EditProductPage: NextPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    originalPrice: '',
    stock: '',
    category_id: '',
    brand_id: '',
    status: 'Available',
    sizes: '',
    colors: '',
  });

  // Fetch product data, categories and brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchLoading(true);
        const [productResponse, categoriesResponse, brandsResponse] = await Promise.all([
          api.get(`/products/get/${productId}`),
          api.get('/categories/get'),
          api.get('/brands/get'),
        ]);

        const productResult = productResponse.data;
        const categoriesResult = categoriesResponse.data;
        const brandsResult = brandsResponse.data;

        if (productResult.success) {
          const product = productResult.data;
          setFormData({
            name: product.name || '',
            slug: product.slug || '',
            description: product.description || '',
            price: product.price?.toString() || '',
            originalPrice: product.originalPrice?.toString() || '',
            stock: product.stock?.toString() || '',
            category_id: product.category_id?.toString() || '',
            brand_id: product.brand_id?.toString() || '',
            status: product.status || 'Available',
            sizes: product.sizes?.join(', ') || '',
            colors: product.colors?.join(', ') || '',
          });
        } else {
          setError('Product not found');
        }

        if (categoriesResult.success) {
          setCategories(categoriesResult.data);
        }

        if (brandsResult.success) {
          setBrands(brandsResult.data);
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Failed to fetch data', err);
      } finally {
        setFetchLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
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
        originalPrice: parseFloat(formData.originalPrice),
        stock: parseInt(formData.stock),
        category_id: parseInt(formData.category_id),
        brand_id: formData.brand_id ? parseInt(formData.brand_id) : null,
        sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s),
        colors: formData.colors.split(',').map(c => c.trim()).filter(c => c),
      };

      const response = await api.put(`/products/update/${productId}`, payload);
      const result = response.data;

      if (result.success) {
        router.push('/admin/products');
      } else {
        setError(result.message || 'Something went wrong');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while updating the product');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading product data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6">
          <Link href="/admin/products" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
          <h1 className="ml-4 text-2xl font-bold text-foreground">Edit Product</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="slug">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="price">
                  Rental Price
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
                <label className="block text-gray-700 mb-2" htmlFor="originalPrice">
                  Original Price
                </label>
                <input
                  type="number"
                  id="originalPrice"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="sizes">
                  Sizes (comma separated)
                </label>
                <input
                  type="text"
                  id="sizes"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="XS, S, M, L"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="colors">
                  Colors (comma separated)
                </label>
                <input
                  type="text"
                  id="colors"
                  name="colors"
                  value={formData.colors}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Black, Navy, Red"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="category_id">
                  Category
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="brand_id">
                  Brand (Optional)
                </label>
                <select
                  id="brand_id"
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">No brand</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/products')}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
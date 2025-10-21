// pages/brands/index.tsx
"use client"
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import api from '@/lib/axiosInstance';

interface Brand {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
}

const BrandsPage: NextPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch all brands
const fetchBrands = async () => {
  try {
    setLoading(true);
    const response = await api.get('/brands/get');
    const result = response.data;

    if (result.success) {
      setBrands(result.data);
    } else {
      setError('Failed to fetch brands');
    }
  } catch (err) {
    setError('An error occurred while fetching brands');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchBrands();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

// Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  try {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('slug', formData.slug);
    if (formData.image) {
      data.append('image', formData.image);
    }

    let response;
    if (editingBrand) {
      response = await api.put(`/brands/update/${editingBrand.id}`, data);
    } else {
      response = await api.post(`/brands/add`, data);
    }

    const result = response.data;

    if (result.success) {
      setSuccess(editingBrand ? 'Brand updated successfully' : 'Brand created successfully');
      setShowModal(false);
      resetForm();
      fetchBrands();
    } else {
      setError(result.message || 'Something went wrong');
    }
  } catch (err) {
    setError('An error occurred while saving the brand');
  }
};

  // Edit brand
  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      slug: brand.slug,
      image: null,
    });
    setImagePreview(brand.image_url);
    setShowModal(true);
  };



// Delete brand
const handleDelete = async (id: number) => {
  if (!confirm('Are you sure you want to delete this brand?')) return;

  try {
    const response = await api.delete(`/brands/delete/${id}`);
    const result = response.data;

    if (result.success) {
      setSuccess('Brand deleted successfully');
      fetchBrands();
    } else {
      setError(result.message || 'Failed to delete brand');
    }
  } catch (err) {
    setError('An error occurred while deleting the brand');
  }
};

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      image: null,
    });
    setImagePreview(null);
    setEditingBrand(null);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Brand Management</title>
      </Head>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Brand Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Brand
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Slug</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 px-4 text-center">
                    No brands found
                  </td>
                </tr>
              ) : (
                brands.map((brand) => (
                  <tr key={brand.id} className="border-t">
                    <td className="py-3 px-4">
                      {brand.image_url ? (
                        <img
                          src={brand.image_url}
                          alt={brand.name}
                          className="h-10 w-10 object-cover rounded"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-500">No image</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">{brand.name}</td>
                    <td className="py-3 px-4">{brand.slug}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEdit(brand)}
                        className="text-blue-500 hover:text-blue-700 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingBrand ? 'Edit Brand' : 'Add New Brand'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Name
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
                  <label className="block text-gray-700 mb-2" htmlFor="image">
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border rounded"
                    accept="image/*"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {editingBrand ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandsPage;
"use client";
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import api from '@/lib/axiosInstance';

interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  children?: Category[];
}

const CategoriesPage: NextPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [flatCategories, setFlatCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    parent_id: '' as string | number,
  });

  // Build hierarchical structure from flat categories
  const buildCategoryTree = (categories: Category[]): Category[] => {
    const categoryMap: Record<number, Category> = {};
    const roots: Category[] = [];
    
    // Create a map of all categories
    categories.forEach(category => {
      categoryMap[category.id] = { ...category, children: [] };
    });
    
    // Build the tree structure
    categories.forEach(category => {
      if (category.parent_id && categoryMap[category.parent_id]) {
        categoryMap[category.parent_id].children!.push(categoryMap[category.id]);
      } else {
        roots.push(categoryMap[category.id]);
      }
    });
    
    return roots;
  };

  // Fetch all categories
const fetchCategories = async () => {
  try {
    setLoading(true);
    const response = await api.get('/categories/get');
    const result = response.data;

    if (result.success) {
      setFlatCategories(result.data);
      const hierarchicalCategories = buildCategoryTree(result.data);
      setCategories(hierarchicalCategories);
    } else {
      setError('Failed to fetch categories');
    }
  } catch (err) {
    setError('An error occurred while fetching categories');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'parent_id' ? (value === '' ? '' : Number(value)) : value 
    }));
  };

  // Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  try {
    const payload = {
      ...formData,
      parent_id: formData.parent_id === '' ? null : formData.parent_id,
    };

    let response;
    if (editingCategory) {
      response = await api.put(`/categories/update/${editingCategory.id}`, payload);
    } else {
      response = await api.post('/categories/add', payload);
    }

    const result = response.data;

    if (result.success) {
      setSuccess(editingCategory ? 'Category updated successfully' : 'Category created successfully');
      setShowModal(false);
      resetForm();
      fetchCategories();
    } else {
      setError(result.message || 'Something went wrong');
    }
  } catch (err) {
    setError('An error occurred while saving the category');
  }
};


  // Edit category
  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      parent_id: category.parent_id || '',
    });
    setShowModal(true);
  };

  // Delete category
const handleDelete = async (id: number) => {
  if (!confirm('Are you sure you want to delete this category? This will also delete all its subcategories.')) return;

  try {
    const response = await api.delete(`/categories/delete/${id}`);
    const result = response.data;

    if (result.success) {
      setSuccess('Category deleted successfully');
      fetchCategories();
    } else {
      setError(result.message || 'Failed to delete category');
    }
  } catch (err) {
    setError('An error occurred while deleting the category');
  }
};


  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      parent_id: '',
    });
    setEditingCategory(null);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Render category tree
  const renderCategoryTree = (categories: Category[], level = 0) => {
    return categories.map(category => (
      <div key={category.id} className="ml-4">
        <div className="flex items-center justify-between p-2 border rounded mb-2">
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 border-l border-t" style={{ marginLeft: `${level * 16}px` }}></div>
            <span>{category.name}</span>
            <span className="text-gray-500 text-sm ml-2">({category.slug})</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(category)}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(category.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
        {category.children && category.children.length > 0 && (
          <div className="ml-4">
            {renderCategoryTree(category.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Category Management</title>
      </Head>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Category
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
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Categories</h2>
          </div>
          <div className="p-4">
            {categories.length === 0 ? (
              <div className="text-center py-4">
                No categories found. Create your first category.
              </div>
            ) : (
              renderCategoryTree(categories)
            )}
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
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
                  <label className="block text-gray-700 mb-2" htmlFor="parent_id">
                    Parent Category
                  </label>
                  <select
                    id="parent_id"
                    name="parent_id"
                    value={formData.parent_id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">No Parent (Top Level)</option>
                    {flatCategories
                      .filter(cat => !editingCategory || cat.id !== editingCategory.id)
                      .map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
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
                    {editingCategory ? 'Update' : 'Create'}
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

export default CategoriesPage;
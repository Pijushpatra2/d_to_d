// components/admin/ImageGallery.tsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Search, ImageIcon, Star } from 'lucide-react';
import api from '@/lib/axiosInstance';

interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text: string | null;
  is_primary: boolean;
  created_at: string;
}

interface Product {
  id: number;
  name: string;
}

interface ImageGalleryProps {
  productId: number;
  onBack?: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ productId, onBack }) => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [setPrimaryLoading, setSetPrimaryLoading] = useState<number | null>(null);
  const [uploadForm, setUploadForm] = useState({
    image: null as File | null,
    alt_text: '',
    is_primary: false
  });

  // Fetch product and images
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productResponse, imagesResponse] = await Promise.all([
          api.get(`/products/get/${productId}`),
          api.get(`/product-images/get/product/${productId}`),
        ]);

        const productResult = productResponse.data;
        const imagesResult = imagesResponse.data;

        if (productResult.success) {
          setProduct(productResult.data);
        }

        if (imagesResult.success) {
          setImages(imagesResult.data);
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm({
        ...uploadForm,
        image: e.target.files[0]
      });
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setUploadForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Handle image upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.image) {
      setError('Please select an image to upload');
      return;
    }

    try {
      setUploadLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('image', uploadForm.image);
      formData.append('product_id', productId.toString());
      formData.append('alt_text', uploadForm.alt_text);
      formData.append('is_primary', uploadForm.is_primary.toString());

      const response = await api.post('/product-images/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = response.data;

      if (result.success) {
        // Refresh the images list
        const imagesResponse = await api.get(`/product-images/get/product/${productId}`);
        if (imagesResponse.data.success) {
          setImages(imagesResponse.data.data);
        }
        
        // Reset form
        setUploadForm({
          image: null,
          alt_text: '',
          is_primary: false
        });
        
        // Clear file input
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setError(result.message || 'Failed to upload image');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred while uploading the image');
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle delete image
  const handleDeleteImage = async (imageId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      setDeleteLoading(imageId);
      const response = await api.delete(`/product-images/delete/${imageId}`);
      const result = response.data;

      if (result.success) {
        setImages(images.filter(image => image.id !== imageId));
      } else {
        setError('Failed to delete image');
      }
    } catch (err) {
      setError('An error occurred while deleting the image');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Handle set primary image
  const handleSetPrimary = async (imageId: number) => {
    try {
      setSetPrimaryLoading(imageId);
      
      // First, set all images to non-primary
      await Promise.all(
        images.map(image => 
          api.put(`/product-images/update/${image.id}`, {
            ...image,
            is_primary: image.id === imageId
          })
        )
      );

      // Then set the selected image as primary
      const response = await api.put(`/product-images/update/${imageId}`, {
        is_primary: true
      });
      
      const result = response.data;

      if (result.success) {
        // Refresh the images list
        const imagesResponse = await api.get(`/product-images/get/product/${productId}`);
        if (imagesResponse.data.success) {
          setImages(imagesResponse.data.data);
        }
      } else {
        setError('Failed to set primary image');
      }
    } catch (err) {
      setError('An error occurred while setting primary image');
    } finally {
      setSetPrimaryLoading(null);
    }
  };

  // Filter images based on search
  const filteredImages = images.filter(image =>
    image.alt_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.image_url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading product images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background flex items-center justify-center">
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6">
          {/* {onBack ? (
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
          )} */}
          <h1 className="ml-4 text-2xl font-bold text-foreground">
            Images for {product?.name}
          </h1>
        </div>
      </div>

      <div className="p-6">
        {/* Upload Form */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-4">Upload New Image</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="image">
                Image File
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="alt_text">
                Alt Text
              </label>
              <input
                type="text"
                id="alt_text"
                name="alt_text"
                value={uploadForm.alt_text}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Description of the image"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_primary"
                name="is_primary"
                checked={uploadForm.is_primary}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="is_primary" className="text-gray-700">
                Set as primary image
              </label>
            </div>

            <button
              type="submit"
              className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded flex items-center"
              disabled={uploadLoading || !uploadForm.image}
            >
              {uploadLoading ? 'Uploading...' : 'Upload Image'}
              {!uploadLoading && <ImageIcon className="ml-2 h-4 w-4" />}
            </button>
          </form>
        </div>

        {/* Search */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search images by alt text or URL..."
                className="w-full pl-10 pr-4 py-2 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Images Grid */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                {images.length === 0 ? "No images found for this product" : "No images match your search"}
              </p>
              <p className="text-sm text-muted-foreground">
                Upload your first image using the form above
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {filteredImages.map((image) => (
                <div key={image.id} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={image.image_url}
                      alt={image.alt_text || 'Product image'}
                      className="w-full h-48 object-cover"
                    />
                    {image.is_primary && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Primary
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-2 truncate">
                      {image.alt_text || 'No description'}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleSetPrimary(image.id)}
                        disabled={setPrimaryLoading === image.id || image.is_primary}
                        className="text-blue-600 hover:text-blue-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {setPrimaryLoading === image.id ? 'Setting...' : 'Set Primary'}
                      </button>
                      
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        disabled={deleteLoading === image.id}
                        className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deleteLoading === image.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {images.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <h3 className="font-medium mb-2">Images Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Images</p>
                <p className="text-lg font-bold">{images.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Primary Image</p>
                <p className="text-lg font-bold">
                  {images.filter(image => image.is_primary).length > 0 ? 'Set' : 'Not Set'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Images without Alt Text</p>
                <p className="text-lg font-bold text-yellow-600">
                  {images.filter(image => !image.alt_text).length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
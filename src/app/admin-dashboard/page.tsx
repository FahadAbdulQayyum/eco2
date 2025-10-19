"use client";
import React, { useState, useEffect } from "react";
import { productFormSchema, ProductFormData, validateProductForm, defaultProductFormValues } from "@/lib/schemas/productSchema";

interface UploadedImage {
  filename: string;
  url: string;
  uploadTime: string;
}

// ProductForm Component
interface ProductFormProps {
  formData: Partial<ProductFormData>;
  formErrors: { field: string; message: string }[];
  isSubmitting: boolean;
  onInputChange: (field: string, value: any) => void;
  onArrayInputChange: (field: 'colors' | 'sizes', value: string) => void;
  removeArrayItem: (field: 'colors' | 'sizes', value: string) => void;
  onFileChange: (field: 'mainImage' | 'galleryImages', files: FileList | null) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  formErrors,
  isSubmitting,
  onInputChange,
  onArrayInputChange,
  removeArrayItem,
  onFileChange,
  onSubmit
}) => {
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');

  const getFieldError = (field: string) => {
    return formErrors.find(error => error.field === field)?.message;
  };

  return (
    <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#333", marginBottom: "30px" }}>Create New Product</h2>
      
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Basic Information */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>
              Product Title *
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => onInputChange('title', e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${getFieldError('title') ? '#dc3545' : '#ddd'}`,
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="Enter product title"
            />
            {getFieldError('title') && (
              <span style={{ color: "#dc3545", fontSize: "12px" }}>{getFieldError('title')}</span>
            )}
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>
              Price ($) *
            </label>
            <input
              type="number"
              value={formData.price || ''}
              onChange={(e) => onInputChange('price', parseFloat(e.target.value) || 0)}
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${getFieldError('price') ? '#dc3545' : '#ddd'}`,
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="0.00"
              step="0.01"
            />
            {getFieldError('price') && (
              <span style={{ color: "#dc3545", fontSize: "12px" }}>{getFieldError('price')}</span>
            )}
          </div>
        </div>

        {/* Category and Brand */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>
              Category *
            </label>
            <select
              value={formData.category || ''}
              onChange={(e) => onInputChange('category', e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${getFieldError('category') ? '#dc3545' : '#ddd'}`,
                borderRadius: "4px",
                fontSize: "14px"
              }}
            >
              <option value="">Select Category</option>
              <option value="shoes">Shoes</option>
              <option value="clothes">Clothes</option>
              <option value="watches">Watches</option>
            </select>
            {getFieldError('category') && (
              <span style={{ color: "#dc3545", fontSize: "12px" }}>{getFieldError('category')}</span>
            )}
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>
              Brand *
            </label>
            <input
              type="text"
              value={formData.brand || ''}
              onChange={(e) => onInputChange('brand', e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${getFieldError('brand') ? '#dc3545' : '#ddd'}`,
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="Enter brand name"
            />
            {getFieldError('brand') && (
              <span style={{ color: "#dc3545", fontSize: "12px" }}>{getFieldError('brand')}</span>
            )}
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>
              Dress Style *
            </label>
            <select
              value={formData.dressStyle || ''}
              onChange={(e) => onInputChange('dressStyle', e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${getFieldError('dressStyle') ? '#dc3545' : '#ddd'}`,
                borderRadius: "4px",
                fontSize: "14px"
              }}
            >
              <option value="">Select Style</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="performance">Performance</option>
              <option value="outdoor">Outdoor</option>
              <option value="formal">Formal</option>
            </select>
            {getFieldError('dressStyle') && (
              <span style={{ color: "#dc3545", fontSize: "12px" }}>{getFieldError('dressStyle')}</span>
            )}
          </div>
        </div>

        {/* Rating and Discount */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>
              Rating (0-5) *
            </label>
            <input
              type="number"
              value={formData.rating || ''}
              onChange={(e) => onInputChange('rating', parseFloat(e.target.value) || 0)}
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${getFieldError('rating') ? '#dc3545' : '#ddd'}`,
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="0.0"
              min="0"
              max="5"
              step="0.1"
            />
            {getFieldError('rating') && (
              <span style={{ color: "#dc3545", fontSize: "12px" }}>{getFieldError('rating')}</span>
            )}
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>
              Discount Amount ($)
            </label>
            <input
              type="number"
              value={formData.discountAmount || ''}
              onChange={(e) => onInputChange('discountAmount', parseFloat(e.target.value) || 0)}
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${getFieldError('discountAmount') ? '#dc3545' : '#ddd'}`,
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {getFieldError('discountAmount') && (
              <span style={{ color: "#dc3545", fontSize: "12px" }}>{getFieldError('discountAmount')}</span>
            )}
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>
              Discount Percentage (%)
            </label>
            <input
              type="number"
              value={formData.discountPercentage || ''}
              onChange={(e) => onInputChange('discountPercentage', parseFloat(e.target.value) || 0)}
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${getFieldError('discountPercentage') ? '#dc3545' : '#ddd'}`,
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="0"
              min="0"
              max="100"
              step="1"
            />
            {getFieldError('discountPercentage') && (
              <span style={{ color: "#dc3545", fontSize: "12px" }}>{getFieldError('discountPercentage')}</span>
            )}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>
            Colors *
          </label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              type="text"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="Add a color"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (newColor.trim()) {
                    onArrayInputChange('colors', newColor.trim());
                    setNewColor('');
                  }
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (newColor.trim()) {
                  onArrayInputChange('colors', newColor.trim());
                  setNewColor('');
                }
              }}
              style={{
                padding: "10px 20px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Add
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {(formData.colors || []).map((color, index) => (
              <span
                key={index}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 10px",
                  background: "#e9ecef",
                  borderRadius: "15px",
                  fontSize: "12px"
                }}
              >
                {color}
                <button
                  type="button"
                  onClick={() => removeArrayItem('colors', color)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontSize: "14px"
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {getFieldError('colors') && (
            <span style={{ color: "#dc3545", fontSize: "12px" }}>{getFieldError('colors')}</span>
          )}
        </div>

        {/* Sizes */}
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>
            Sizes *
          </label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              type="text"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="Add a size (e.g., S, M, L, EU 42)"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (newSize.trim()) {
                    onArrayInputChange('sizes', newSize.trim());
                    setNewSize('');
                  }
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (newSize.trim()) {
                  onArrayInputChange('sizes', newSize.trim());
                  setNewSize('');
                }
              }}
              style={{
                padding: "10px 20px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Add
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {(formData.sizes || []).map((size, index) => (
              <span
                key={index}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 10px",
                  background: "#e9ecef",
                  borderRadius: "15px",
                  fontSize: "12px"
                }}
              >
                {size}
                <button
                  type="button"
                  onClick={() => removeArrayItem('sizes', size)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#dc3545",
                    fontSize: "14px"
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {getFieldError('sizes') && (
            <span style={{ color: "#dc3545", fontSize: "12px" }}>{getFieldError('sizes')}</span>
          )}
        </div>

        {/* Images */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>
              Main Image *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onFileChange('mainImage', e.target.files)}
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${getFieldError('mainImage') ? '#dc3545' : '#ddd'}`,
                borderRadius: "4px",
                fontSize: "14px"
              }}
            />
            {formData.mainImage && (
              <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                Selected: {formData.mainImage.name}
              </p>
            )}
            {getFieldError('mainImage') && (
              <span style={{ color: "#dc3545", fontSize: "12px" }}>{getFieldError('mainImage')}</span>
            )}
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>
              Gallery Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => onFileChange('galleryImages', e.target.files)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
            />
            {formData.galleryImages && formData.galleryImages.length > 0 && (
              <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                Selected: {formData.galleryImages.length} image(s)
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "500", color: "#333" }}>
            Description
          </label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => onInputChange('description', e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
              minHeight: "80px",
              resize: "vertical"
            }}
            placeholder="Enter product description (optional)"
            maxLength={500}
          />
          <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
            {(formData.description || '').length}/500 characters
          </p>
        </div>

        {/* Checkboxes */}
        <div style={{ display: "flex", gap: "20px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={formData.inStock || false}
              onChange={(e) => onInputChange('inStock', e.target.checked)}
            />
            <span style={{ fontSize: "14px" }}>In Stock</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={formData.featured || false}
              onChange={(e) => onInputChange('featured', e.target.checked)}
            />
            <span style={{ fontSize: "14px" }}>Featured Product</span>
          </label>
        </div>

        {/* General Errors */}
        {getFieldError('general') && (
          <div style={{ color: "#dc3545", fontSize: "14px", textAlign: "center" }}>
            {getFieldError('general')}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            background: isSubmitting ? "#6c757d" : "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            fontWeight: "500",
            marginTop: "20px"
          }}
        >
          {isSubmitting ? "Creating Product..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'gallery' | 'products'>('upload');
  
  // Product form state
  const [formData, setFormData] = useState<Partial<ProductFormData>>(defaultProductFormValues);
  const [formErrors, setFormErrors] = useState<{ field: string; message: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Image upload state
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedImage[]>([]);
  const [uploadError, setUploadError] = useState<string>("");
  
  // Gallery state
  const [showGallery, setShowGallery] = useState(false);

  // Fetch uploaded images on component mount and after uploads
  useEffect(() => {
    if (authenticated) {
      fetchUploadedImages();
    }
  }, [authenticated]);

  const fetchUploadedImages = async () => {
    try {
      const response = await fetch('/api/upload');
      if (response.ok) {
        const data = await response.json();
        setUploadedFiles(data.images || []);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "iamfahad") {
      setAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  // Form handling functions
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors for this field
    setFormErrors(prev => prev.filter(error => error.field !== field));
  };

  const handleArrayInputChange = (field: 'colors' | 'sizes', value: string) => {
    const currentArray = formData[field] || [];
    if (!currentArray.includes(value)) {
      setFormData(prev => ({ 
        ...prev, 
        [field]: [...currentArray, value] 
      }));
    }
  };

  const removeArrayItem = (field: 'colors' | 'sizes', value: string) => {
    const currentArray = formData[field] || [];
    setFormData(prev => ({ 
      ...prev, 
      [field]: currentArray.filter(item => item !== value) 
    }));
  };

  const handleFileChange = (field: 'mainImage' | 'galleryImages', files: FileList | null) => {
    if (field === 'mainImage' && files && files.length > 0) {
      setFormData(prev => ({ ...prev, mainImage: files[0] }));
    } else if (field === 'galleryImages' && files) {
      setFormData(prev => ({ ...prev, galleryImages: Array.from(files) }));
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors([]);

    // Validate form data
    const validation = validateProductForm(formData);
    if (!validation.success) {
      setFormErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically send the data to your API
      // For now, we'll just log it and show success
      console.log('Product data:', validation.data);
      alert('Product created successfully! (Check console for data)');
      
      // Reset form
      setFormData(defaultProductFormValues);
    } catch (error) {
      console.error('Error creating product:', error);
      setFormErrors([{ field: 'general', message: 'Failed to create product' }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSimpleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
    setUploadError("");
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setUploadError("Please select files to upload");
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      
      // Add all selected files to form data
      Array.from(selectedFiles).forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // Refresh the uploaded images list
        await fetchUploadedImages();
        setSelectedFiles(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setUploadError(result.error || 'Upload failed');
      }
    } catch (error) {
      setUploadError('Upload failed. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (filename: string) => {
    if (confirm(`Are you sure you want to delete ${filename}?`)) {
      try {
        const response = await fetch(`/api/upload/${filename}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove from local state and refresh
          setUploadedFiles(prev => prev.filter(img => img.filename !== filename));
        } else {
          alert('Failed to delete image');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Error deleting image');
      }
    }
  };

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: 12, fontSize: 16, borderRadius: 4, border: "1px solid #ccc" }}
          />
          <button type="submit" style={{ padding: 12, fontSize: 16, background: "#222", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#f5f5f5" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
          <h1 style={{ color: "#333", fontSize: "2rem", fontWeight: "bold" }}>Admin Dashboard</h1>
          <div style={{ display: "flex", gap: 10 }}>
            <button 
              onClick={() => setActiveTab('upload')}
              style={{ 
                padding: "10px 20px", 
                background: activeTab === 'upload' ? "#007bff" : "#6c757d", 
                color: "#fff", 
                border: "none", 
                borderRadius: 4, 
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Product Form
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              style={{ 
                padding: "10px 20px", 
                background: activeTab === 'gallery' ? "#007bff" : "#6c757d", 
                color: "#fff", 
                border: "none", 
                borderRadius: 4, 
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Image Gallery
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              style={{ 
                padding: "10px 20px", 
                background: activeTab === 'products' ? "#007bff" : "#6c757d", 
                color: "#fff", 
                border: "none", 
                borderRadius: 4, 
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Simple Upload
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'upload' && (
          <ProductForm 
            formData={formData}
            formErrors={formErrors}
            isSubmitting={isSubmitting}
            onInputChange={handleInputChange}
            onArrayInputChange={handleArrayInputChange}
            removeArrayItem={removeArrayItem}
            onFileChange={handleFileChange}
            onSubmit={handleProductSubmit}
          />
        )}

        {activeTab === 'gallery' && (
          <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Image Gallery ({uploadedFiles.length} images)</h2>
            {uploadedFiles.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666" }}>No images uploaded yet.</p>
            ) : (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
                gap: 20,
                marginTop: 20
              }}>
                {uploadedFiles.map((image) => (
                  <div key={image.filename} style={{ 
                    border: "1px solid #ddd", 
                    borderRadius: 8, 
                    padding: 15,
                    textAlign: "center"
                  }}>
                    <img 
                      src={image.url} 
                      alt={image.filename}
                      style={{ 
                        width: "100%", 
                        height: 200, 
                        objectFit: "cover", 
                        borderRadius: 4,
                        marginBottom: 10
                      }}
                    />
                    <p style={{ 
                      fontSize: 12, 
                      color: "#666", 
                      margin: "5px 0",
                      wordBreak: "break-word"
                    }}>
                      {image.filename}
                    </p>
                    <p style={{ fontSize: 11, color: "#999", margin: "5px 0" }}>
                      {image.uploadTime}
                    </p>
                    <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 10 }}>
                      <a 
                        href={image.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          padding: "5px 10px", 
                          background: "#007bff", 
                          color: "#fff", 
                          textDecoration: "none", 
                          borderRadius: 4,
                          fontSize: 12
                        }}
                      >
                        View
                      </a>
                      <button 
                        onClick={() => handleDeleteImage(image.filename)}
                        style={{ 
                          padding: "5px 10px", 
                          background: "#dc3545", 
                          color: "#fff", 
                          border: "none", 
                          borderRadius: 4,
                          cursor: "pointer",
                          fontSize: 12
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Simple Image Upload</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 600, alignItems: "center" }}>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleSimpleFileChange}
                style={{ padding: 8, width: "100%" }}
              />
              
              {selectedFiles && selectedFiles.length > 0 && (
                <div style={{ textAlign: "center", width: "100%" }}>
                  <h4>Selected Images ({selectedFiles.length}):</h4>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {Array.from(selectedFiles).map((file, idx) => (
                      <li key={idx} style={{ margin: "4px 0" }}>{file.name}</li>
                    ))}
                  </ul>
                  <button 
                    onClick={handleUpload}
                    disabled={uploading}
                    style={{ 
                      padding: "12px 24px", 
                      fontSize: 16, 
                      background: uploading ? "#ccc" : "#007bff", 
                      color: "#fff", 
                      border: "none", 
                      borderRadius: 4, 
                      cursor: uploading ? "not-allowed" : "pointer",
                      marginTop: 16
                    }}
                  >
                    {uploading ? "Uploading..." : "Upload Images"}
                  </button>
                </div>
              )}

              {uploadError && (
                <div style={{ color: "red", textAlign: "center" }}>
                  {uploadError}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Uploads Section (always visible) */}
        {uploadedFiles.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <h3>Recent Uploads</h3>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", 
              gap: 15,
              marginTop: 15
            }}>
              {uploadedFiles.slice(0, 8).map((image) => (
                <div key={image.filename} style={{ textAlign: "center" }}>
                  <img 
                    src={image.url} 
                    alt={image.filename}
                    style={{ 
                      width: "100%", 
                      height: 100, 
                      objectFit: "cover", 
                      borderRadius: 4,
                      border: "2px solid #ddd"
                    }}
                  />
                  <p style={{ fontSize: 10, color: "#666", margin: "5px 0" }}>
                    {image.filename.length > 20 ? image.filename.substring(0, 20) + '...' : image.filename}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

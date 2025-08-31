import { useState, useEffect, useCallback } from 'react';

export interface UploadedImage {
  url: string;
  filename: string;
  uploadedAt: string;
  size?: number;
  type?: string;
}

const STORAGE_KEY = 'uploadedImages';
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB limit for localStorage

export const useImageStorage = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch images from Vercel Blob API
  const fetchImagesFromBlob = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/images?limit=100');
      if (!response.ok) {
        throw new Error('Failed to fetch images from Vercel Blob');
      }
      
      const data = await response.json();
      if (data.images && Array.isArray(data.images)) {
        setImages(data.images);
        // Also save to localStorage as backup
        saveImagesToLocalStorage(data.images);
      }
    } catch (error) {
      console.error('Error fetching images from Vercel Blob:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch images');
      // Fallback to localStorage if API fails
      loadImagesFromLocalStorage();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load images from localStorage (fallback)
  const loadImagesFromLocalStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setImages(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading images from localStorage:', error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save images to localStorage with size checking
  const saveImagesToLocalStorage = useCallback((newImages: UploadedImage[]) => {
    try {
      const dataString = JSON.stringify(newImages);
      const dataSize = new Blob([dataString]).size;
      
      if (dataSize > MAX_STORAGE_SIZE) {
        console.warn('Storage size limit exceeded, keeping only recent images');
        // Keep only the most recent images to fit within storage limit
        const recentImages = newImages.slice(-50); // Keep last 50 images
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recentImages));
      } else {
        localStorage.setItem(STORAGE_KEY, dataString);
      }
    } catch (error) {
      console.error('Error saving images to localStorage:', error);
    }
  }, []);

  // Add new images (both to state and localStorage)
  const addImages = useCallback((newImages: { url: string; filename: string }[]) => {
    const imagesWithMetadata = newImages.map(img => ({
      ...img,
      uploadedAt: new Date().toISOString(),
    }));
    
    setImages(prev => {
      const updated = [...prev, ...imagesWithMetadata];
      saveImagesToLocalStorage(updated);
      return updated;
    });
  }, [saveImagesToLocalStorage]);

  // Remove an image by index
  const removeImage = useCallback((index: number) => {
    setImages(prev => {
      const updated = prev.filter((_, i) => i !== index);
      saveImagesToLocalStorage(updated);
      return updated;
    });
  }, [saveImagesToLocalStorage]);

  // Remove all images
  const clearAllImages = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setImages([]);
  }, []);

  // Get image count
  const getImageCount = useCallback(() => images.length, [images]);

  // Get recent images (last N)
  const getRecentImages = useCallback((count: number = 3) => {
    return images.slice(-count);
  }, [images]);

  // Check if image exists
  const imageExists = useCallback((url: string) => {
    return images.some(img => img.url === url);
  }, [images]);

  // Refresh images from Vercel Blob
  const refreshImages = useCallback(() => {
    fetchImagesFromBlob();
  }, [fetchImagesFromBlob]);

  // Load images on mount - fetch from Vercel Blob first
  useEffect(() => {
    fetchImagesFromBlob();
  }, [fetchImagesFromBlob]);

  return {
    images,
    isLoading,
    error,
    addImages,
    removeImage,
    clearAllImages,
    getImageCount,
    getRecentImages,
    imageExists,
    refreshImages,
  };
};

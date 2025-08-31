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

  // Load images from localStorage
  const loadImages = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setImages(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading images from storage:', error);
      // Clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save images to localStorage with size checking
  const saveImages = useCallback((newImages: UploadedImage[]) => {
    try {
      const dataString = JSON.stringify(newImages);
      const dataSize = new Blob([dataString]).size;
      
      if (dataSize > MAX_STORAGE_SIZE) {
        console.warn('Storage size limit exceeded, keeping only recent images');
        // Keep only the most recent images to fit within storage limit
        const recentImages = newImages.slice(-50); // Keep last 50 images
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recentImages));
        setImages(recentImages);
      } else {
        localStorage.setItem(STORAGE_KEY, dataString);
        setImages(newImages);
      }
    } catch (error) {
      console.error('Error saving images to storage:', error);
    }
  }, []);

  // Add new images
  const addImages = useCallback((newImages: { url: string; filename: string }[]) => {
    const imagesWithMetadata = newImages.map(img => ({
      ...img,
      uploadedAt: new Date().toISOString(),
    }));
    
    setImages(prev => {
      const updated = [...prev, ...imagesWithMetadata];
      saveImages(updated);
      return updated;
    });
  }, [saveImages]);

  // Remove an image by index
  const removeImage = useCallback((index: number) => {
    setImages(prev => {
      const updated = prev.filter((_, i) => i !== index);
      saveImages(updated);
      return updated;
    });
  }, [saveImages]);

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

  // Load images on mount
  useEffect(() => {
    loadImages();
  }, [loadImages]);

  return {
    images,
    isLoading,
    addImages,
    removeImage,
    clearAllImages,
    getImageCount,
    getRecentImages,
    imageExists,
  };
};

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SpinnerbLoader from '@/components/ui/SpinnerbLoader';
import { CheckCircle } from 'lucide-react';

interface ImageUploadProps {
  onUploadSuccess: (files: { url: string; filename: string }[]) => void;
  onUploadError?: (error: string) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
}

export default function ImageUpload({
  onUploadSuccess,
  onUploadError,
  multiple = true,
  accept = 'image/*',
  maxSize = 5
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error('Only image files are allowed');
        }

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
          throw new Error(`File size must be less than ${maxSize}MB`);
        }

        formData.append('images', file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      onUploadSuccess(result.files);
      setUploadSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      onUploadError?.(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleUpload(e.target.files);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleUpload(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : uploadSuccess
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        
        <div className="space-y-2">
          {isUploading ? (
            <div className="flex items-center justify-center space-x-2">
              <SpinnerbLoader />
              <span className="text-sm text-gray-600">Uploading to Vercel Blob...</span>
            </div>
          ) : uploadSuccess ? (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Successfully uploaded to Vercel Blob!</span>
            </div>
          ) : (
            <>
              <div className="text-gray-600">
                <p className="text-sm">
                  {multiple ? 'Drag and drop images here, or click to select' : 'Drag and drop an image here, or click to select'}
                </p>
                <p className="text-xs mt-1">
                  Maximum file size: {maxSize}MB
                </p>
                <p className="text-xs mt-1 text-blue-600">
                  Images will be stored in Vercel Blob Storage
                </p>
              </div>
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isUploading}
                className="mt-2"
              >
                Choose Files
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

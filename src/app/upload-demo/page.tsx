'use client';

import { useState } from 'react';
import ImageUpload from '@/components/common/ImageUpload';
import ImageGallery from '@/components/common/ImageGallery';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useImageStorage } from '@/lib/hooks/useImageStorage';
import { RefreshCw } from 'lucide-react';

export default function UploadDemoPage() {
  const [showAllImages, setShowAllImages] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const {
    images,
    isLoading,
    error: fetchError,
    addImages,
    removeImage,
    clearAllImages,
    getImageCount,
    refreshImages,
  } = useImageStorage();

  const handleUploadSuccess = (files: { url: string; filename: string }[]) => {
    addImages(files);
    setUploadError(null);
    // Refresh images from Vercel Blob after successful upload
    setTimeout(() => {
      refreshImages();
    }, 1000); // Small delay to ensure upload is processed
  };

  const handleUploadError = (errorMessage: string) => {
    setUploadError(errorMessage);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  const toggleShowAllImages = () => {
    setShowAllImages(!showAllImages);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Fetching images from Vercel Blob...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Vercel Blob Storage Demo</h1>
        <p className="text-gray-600">
          Test your image upload functionality with Vercel Blob Storage
        </p>
      </div>

      {/* Error Display */}
      {fetchError && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 mb-2">Error fetching images from Vercel Blob:</p>
              <p className="text-red-500 text-sm mb-3">{fetchError}</p>
              <Button onClick={refreshImages} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Show All Images Button and Refresh */}
      {getImageCount() > 0 && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <Button
                  onClick={toggleShowAllImages}
                  variant={showAllImages ? "outline" : "default"}
                  size="lg"
                  className="px-8"
                >
                  {showAllImages ? 'Hide All Images' : `Show All Uploaded Images (${getImageCount()})`}
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  {showAllImages ? 'Click to hide all previously uploaded images' : 'Click to view all images you have uploaded'}
                </p>
              </div>
              <Button
                onClick={refreshImages}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>
            Drag and drop images here or click to select. Images will be stored in Vercel Blob Storage and fetched from there.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            multiple={true}
            maxSize={5}
          />
          
          {uploadError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{uploadError}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Display All Uploaded Images */}
      {showAllImages && getImageCount() > 0 && (
        <ImageGallery
          images={images}
          title="All Images from Vercel Blob"
          description="Your images are now stored in Vercel Blob Storage and fetched from there"
          showUploadDate={true}
          showActions={true}
          onRemoveImage={removeImage}
          onCopyUrl={copyToClipboard}
          onClearAll={clearAllImages}
          className="mb-6"
        />
      )}

      {/* Show Recently Uploaded Images (if not showing all) */}
      {!showAllImages && getImageCount() > 0 && (
        <ImageGallery
          images={images}
          title="Recently Uploaded from Vercel Blob"
          description="Your most recent uploads fetched from Vercel Blob Storage (click 'Show All Images' above to see all)"
          showUploadDate={true}
          showActions={true}
          onRemoveImage={removeImage}
          onCopyUrl={copyToClipboard}
          onClearAll={clearAllImages}
          maxDisplay={3}
          className="mb-6"
        />
      )}

      <Separator className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>
            Understanding the Vercel Blob Storage integration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
              <h3 className="font-semibold mb-2">Upload</h3>
              <p className="text-sm text-gray-600">
                Images are uploaded to Vercel Blob Storage via the API
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">2</div>
              <h3 className="font-semibold mb-2">Store</h3>
              <p className="text-sm text-gray-600">
                Images are securely stored in Vercel's global infrastructure
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">3</div>
              <h3 className="font-semibold mb-2">Fetch</h3>
              <p className="text-sm text-gray-600">
                Images are fetched from Vercel Blob via the API endpoint
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">4</div>
              <h3 className="font-semibold mb-2">Serve</h3>
              <p className="text-sm text-gray-600">
                Images are served via global CDN for fast loading worldwide
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">New Features:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Images are now fetched from Vercel Blob Storage</li>
              <li>• Real-time synchronization with cloud storage</li>
              <li>• Automatic refresh after uploads</li>
              <li>• Fallback to localStorage if API fails</li>
              <li>• Manual refresh button for manual updates</li>
              <li>• Better error handling and user feedback</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Benefits:</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• 100GB free storage per month</li>
              <li>• Global CDN for fast image delivery</li>
              <li>• No credit card required</li>
              <li>• Seamless Vercel integration</li>
              <li>• Automatic scaling and reliability</li>
              <li>• Images persist across project restarts</li>
              <li>• Smart localStorage management</li>
              <li>• Reusable image gallery component</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

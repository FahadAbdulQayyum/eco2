'use client';

import { useState } from 'react';
import ImageUpload from '@/components/common/ImageUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface UploadedFile {
  url: string;
  filename: string;
}

export default function UploadDemoPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleUploadSuccess = (files: UploadedFile[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
    setError(null);
  };

  const handleUploadError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setUploadedFiles([]);
    setError(null);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Vercel Blob Storage Demo</h1>
        <p className="text-gray-600">
          Test your image upload functionality with Vercel Blob Storage
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>
            Drag and drop images here or click to select. Images will be stored in Vercel Blob Storage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            multiple={true}
            maxSize={5}
          />
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Uploaded Images ({uploadedFiles.length})</CardTitle>
                <CardDescription>
                  Your images are now stored in Vercel Blob Storage and accessible worldwide
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
              >
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={file.url}
                      alt={file.filename}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCAxMDBDODAgODkuNTQ4NyA4OC4wNDg3IDgxIDk4IDgxQzEwNy45NTEgODEgMTE2IDg5LjA0ODcgMTE2IDEwMEMxMTYgMTEwLjk1MSAxMDcuOTUxIDExOSA5OCAxMTlDODguMDQ4NyAxMTkgODAgMTEwLjk1MSA4MCAxMDBaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0xMDAgMTQwQzExMC45NTEgMTQwIDEyMCAxMzAuOTUxIDEyMCAxMjBMMTIwIDExMEMxMjAgOTkuMDQ4NyAxMTAuOTUxIDkwIDEwMCA5MEM4OS4wNDg3IDkwIDgwIDk5LjA0ODcgODAgMTEwTDgwIDEyMEM4MCAxMzAuOTUxIDg5LjA0ODcgMTQwIDEwMCAxNDBaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo=';
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate mb-2">
                      {file.filename}
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(file.url)}
                        className="flex-1"
                      >
                        Copy URL
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <h3 className="font-semibold mb-2">Serve</h3>
              <p className="text-sm text-gray-600">
                Images are served via global CDN for fast loading worldwide
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Benefits:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 100GB free storage per month</li>
              <li>• Global CDN for fast image delivery</li>
              <li>• No credit card required</li>
              <li>• Seamless Vercel integration</li>
              <li>• Automatic scaling and reliability</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

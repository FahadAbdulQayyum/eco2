'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadedImage } from '@/lib/hooks/useImageStorage';

interface ImageGalleryProps {
  images: UploadedImage[];
  title?: string;
  description?: string;
  showUploadDate?: boolean;
  showActions?: boolean;
  onRemoveImage?: (index: number) => void;
  onCopyUrl?: (url: string) => void;
  onClearAll?: () => void;
  maxDisplay?: number;
  className?: string;
}

export default function ImageGallery({
  images,
  title = "Image Gallery",
  description = "Your uploaded images",
  showUploadDate = true,
  showActions = true,
  onRemoveImage,
  onCopyUrl,
  onClearAll,
  maxDisplay,
  className = ""
}: ImageGalleryProps) {
  const [showAll, setShowAll] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  const displayImages = maxDisplay && !showAll ? images.slice(-maxDisplay) : images;
  const hasMoreImages = maxDisplay ? images.length > maxDisplay : false;

  const copyToClipboard = (url: string) => {
    if (onCopyUrl) {
      onCopyUrl(url);
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (onRemoveImage) {
      // Find the actual index in the original images array
      const actualIndex = images.findIndex(img => img.url === displayImages[index].url);
      if (actualIndex !== -1) {
        onRemoveImage(actualIndex);
      }
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title} ({images.length})</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {hasMoreImages && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? `Show ${maxDisplay}` : `Show All (${images.length})`}
              </Button>
            )}
            {onClearAll && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearAll}
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayImages.map((image, index) => (
            <div key={index} className="border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={image.url}
                  alt={image.filename}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCAxMDBDODAgODkuNTQ4NyA4OC4wNDg3IDgxIDk4IDgxQzEwNy45NTEgODEgMTE2IDg5LjA0ODcgMTE2IDEwMEMxMTYgMTEwLjk1MSAxMDcuOTUxIDExOSA5OCAxMTlDODguMDQ4NyAxMTkgODAgMTEwLjk1MSA4MCAxMDBaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0xMDAgMTQwQzExMC45NTEgMTQwIDEyMCAxMzAuOTUxIDEyMCAxMjBMMTIwIDExMEMxMjAgOTkuMDQ4NyAxMTAuOTUxIDkwIDEwMCA5MEM4OS4wNDg3IDkwIDgwIDk5LjA0ODcgODAgMTEwTDgwIDEyMEM4MCAxMzAuOTUxIDg5LjA0ODcgMTQwIDEwMCAxNDBaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo=';
                  }}
                />
                {showActions && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => copyToClipboard(image.url)}
                        className="mr-2"
                      >
                        Copy URL
                      </Button>
                      {onRemoveImage && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveImage(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate mb-2">
                  {image.filename}
                </p>
                {showUploadDate && (
                  <p className="text-xs text-gray-500 mb-2">
                    Uploaded: {new Date(image.uploadedAt).toLocaleDateString()}
                  </p>
                )}
                {showActions && !onRemoveImage && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(image.url)}
                      className="flex-1"
                    >
                      Copy URL
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

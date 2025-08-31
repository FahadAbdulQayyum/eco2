"use client";
import React, { useState, useEffect } from "react";

interface UploadedImage {
  filename: string;
  url: string;
  uploadedAt: string;
  size?: number;
  type?: string;
}

export default function UploadDemo() {
  // Add CSS animation for spinner
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedImage[]>([]);
  const [uploadError, setUploadError] = useState<string>("");
  const [currentView, setCurrentView] = useState<"main" | "upload" | "gallery">("main");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch uploaded images on component mount and after uploads
  useEffect(() => {
    if (authenticated) {
      fetchUploadedImages();
    }
  }, [authenticated]);

  const fetchUploadedImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/images?limit=100');
      if (response.ok) {
        const data = await response.json();
        setUploadedFiles(data.images || []);
      } else {
        console.error('Failed to fetch images:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setCurrentView("main");
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
        const response = await fetch(`/api/images?filename=${encodeURIComponent(filename)}`, {
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
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>Upload Demo Login</h2>
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

  if (currentView === "main") {
    return (
      <div style={{ minHeight: "100vh", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 800, textAlign: "center" }}>
          <h1 style={{ marginBottom: 40, fontSize: "2.5rem" }}>Upload Demo Dashboard</h1>
          
          <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
            <button 
              onClick={() => setCurrentView("upload")}
              style={{ 
                padding: "30px 60px", 
                fontSize: "1.5rem", 
                background: "#007bff", 
                color: "#fff", 
                border: "none", 
                borderRadius: 8, 
                cursor: "pointer",
                minWidth: 250,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}
            >
              Upload Images
            </button>
            
            <button 
              onClick={() => setCurrentView("gallery")}
              style={{ 
                padding: "30px 60px", 
                fontSize: "1.5rem", 
                background: "#28a745", 
                color: "#fff", 
                border: "none", 
                borderRadius: 8, 
                cursor: "pointer",
                minWidth: 250,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}
            >
              Show All Images
            </button>
          </div>
          
          <button 
            onClick={() => setAuthenticated(false)}
            style={{ 
              marginTop: 40,
              padding: "10px 20px", 
              background: "#6c757d", 
              color: "#fff", 
              border: "none", 
              borderRadius: 4, 
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  if (currentView === "upload") {
    return (
      <div style={{ minHeight: "100vh", padding: "20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
            <h1>Upload Images</h1>
            <button 
              onClick={() => setCurrentView("main")}
              style={{ 
                padding: "10px 20px", 
                background: "#6c757d", 
                color: "#fff", 
                border: "none", 
                borderRadius: 4, 
                cursor: "pointer" 
              }}
            >
              Back to Main
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center", marginBottom: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 600, alignItems: "center" }}>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleFileChange}
                style={{ padding: 8 }}
              />
              
              {selectedFiles && selectedFiles.length > 0 && (
                <div style={{ textAlign: "center" }}>
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
        </div>
      </div>
    );
  }

  if (currentView === "gallery") {
    return (
      <div style={{ minHeight: "100vh", padding: "20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
            <h1>Image Gallery ({uploadedFiles.length} images)</h1>
            <div style={{ display: "flex", gap: 10 }}>
              <button 
                onClick={fetchUploadedImages}
                style={{ 
                  padding: "10px 20px", 
                  background: "#17a2b8", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: 4, 
                  cursor: "pointer" 
                }}
              >
                Refresh
              </button>
              <button 
                onClick={() => setCurrentView("main")}
                style={{ 
                  padding: "10px 20px", 
                  background: "#6c757d", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: 4, 
                  cursor: "pointer" 
                }}
              >
                Back to Main
              </button>
            </div>
          </div>

          {isLoading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <div style={{ 
                display: "inline-block",
                width: "40px", 
                height: "40px", 
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #007bff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }}></div>
              <p style={{ marginTop: "20px", color: "#666" }}>Loading images...</p>
            </div>
          ) : uploadedFiles.length === 0 ? (
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
                      {new Date(image.uploadedAt).toLocaleDateString()}
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
      </div>
    );
  }

  return null;
}

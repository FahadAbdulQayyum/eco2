"use client";
import React, { useState, useEffect } from "react";

interface UploadedImage {
  filename: string;
  url: string;
  uploadedAt: string;
  size?: number;
  type?: string;
}

interface Review {
  id: number;
  user: string;
  content: string;
  rating: number;
  date: string;
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
  const [currentView, setCurrentView] = useState<"main" | "upload" | "gallery" | "reviews">("main");
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    user: "",
    content: "",
    rating: 5,
    date: new Date().toISOString().split('T')[0]
  });

  // Sample reviews data
  const sampleReviews: Review[] = [
    {
      id: 1,
      user: "Alex K.",
      content: "Finding clothes that align with my personal style used to be a challenge until I discovered TAHIRZAI.CO. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
      rating: 5,
      date: "2024-01-15"
    },
    {
      id: 2,
      user: "Sarah M.",
      content: "I'm blown away by the quality and comfort of the shoes I received from TAHIRZAI.CO. From lifestyle to performance pairs, every purchase has exceeded my expectations.",
      rating: 5,
      date: "2024-01-20"
    },
    {
      id: 3,
      user: "Ethan R.",
      content: "These sneakers are a must-have for anyone who appreciates good design. The minimal yet stylish silhouette caught my eye, and the fit is perfect.",
      rating: 4,
      date: "2024-01-25"
    }
  ];

  // Fetch uploaded images on component mount and after uploads
  useEffect(() => {
    if (authenticated) {
      fetchUploadedImages();
      setReviews(sampleReviews);
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

  const handleAddReview = () => {
    if (newReview.user.trim() && newReview.content.trim()) {
      const review: Review = {
        id: Date.now(),
        user: newReview.user,
        content: newReview.content,
        rating: newReview.rating,
        date: newReview.date
      };
      setReviews(prev => [...prev, review]);
      setNewReview({
        user: "",
        content: "",
        rating: 5,
        date: new Date().toISOString().split('T')[0]
      });
      setShowAddReview(false);
    }
  };

  const handleDeleteReview = (id: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setReviews(prev => prev.filter(review => review.id !== id));
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
      <div style={{ minHeight: "100vh", padding: "20px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h1 style={{ 
              fontSize: "3.5rem", 
              color: "#fff", 
              marginBottom: "20px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              fontWeight: "bold"
            }}>
              🚀 Upload Demo Dashboard
            </h1>
            <p style={{ 
              fontSize: "1.2rem", 
              color: "rgba(255,255,255,0.9)",
              maxWidth: "600px",
              margin: "0 auto"
            }}>
              Manage your images and reviews with our powerful dashboard interface
            </p>
          </div>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
            gap: "30px",
            marginBottom: "50px"
          }}>
            {/* Upload Images Card */}
            <div style={{ 
              background: "rgba(255,255,255,0.95)", 
              borderRadius: "20px", 
              padding: "40px 30px",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
            }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📤</div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "15px", color: "#2c3e50" }}>Upload Images</h3>
              <p style={{ color: "#7f8c8d", marginBottom: "25px", lineHeight: "1.6" }}>
                Upload multiple images to Vercel Blob storage with drag & drop support
              </p>
              <button 
                onClick={() => setCurrentView("upload")}
                style={{ 
                  padding: "15px 30px", 
                  fontSize: "1.1rem", 
                  background: "linear-gradient(45deg, #007bff, #0056b3)", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: "25px", 
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow: "0 8px 20px rgba(0,123,255,0.3)",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,123,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,123,255,0.3)";
                }}
              >
                Get Started →
              </button>
            </div>

            {/* Show All Images Card */}
            <div style={{ 
              background: "rgba(255,255,255,0.95)", 
              borderRadius: "20px", 
              padding: "40px 30px",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
            }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🖼️</div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "15px", color: "#2c3e50" }}>Show All Images</h3>
              <p style={{ color: "#7f8c8d", marginBottom: "25px", lineHeight: "1.6" }}>
                Browse and manage all uploaded images with preview and delete options
              </p>
              <button 
                onClick={() => setCurrentView("gallery")}
                style={{ 
                  padding: "15px 30px", 
                  fontSize: "1.1rem", 
                  background: "linear-gradient(45deg, #28a745, #1e7e34)", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: "25px", 
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow: "0 8px 20px rgba(40,167,69,0.3)",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 12px 25px rgba(40,167,69,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(40,167,69,0.3)";
                }}
              >
                View Gallery →
              </button>
            </div>

            {/* Add Reviews Card */}
            <div style={{ 
              background: "rgba(255,255,255,0.95)", 
              borderRadius: "20px", 
              padding: "40px 30px",
              textAlign: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
            }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>⭐</div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "15px", color: "#2c3e50" }}>Review Data</h3>
              <p style={{ color: "#7f8c8d", marginBottom: "25px", lineHeight: "1.6" }}>
                Manage customer reviews and ratings with a beautiful interface
              </p>
              <button 
                onClick={() => setCurrentView("reviews")}
                style={{ 
                  padding: "15px 30px", 
                  fontSize: "1.1rem", 
                  background: "linear-gradient(45deg, #ff6b35, #f7931e)", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: "25px", 
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow: "0 8px 20px rgba(255,107,53,0.3)",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 12px 25px rgba(255,107,53,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,107,53,0.3)";
                }}
              >
                Manage Reviews →
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div style={{ 
            background: "rgba(255,255,255,0.1)", 
            borderRadius: "20px", 
            padding: "30px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: "20px",
              textAlign: "center"
            }}>
              <div>
                <div style={{ fontSize: "2.5rem", color: "#fff", fontWeight: "bold" }}>{uploadedFiles.length}</div>
                <div style={{ color: "rgba(255,255,255,0.8)" }}>Total Images</div>
              </div>
              <div>
                <div style={{ fontSize: "2.5rem", color: "#fff", fontWeight: "bold" }}>{reviews.length}</div>
                <div style={{ color: "rgba(255,255,255,0.8)" }}>Total Reviews</div>
              </div>
              <div>
                <div style={{ fontSize: "2.5rem", color: "#fff", fontWeight: "bold" }}>
                  {reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1) : "0"}
                </div>
                <div style={{ color: "rgba(255,255,255,0.8)" }}>Avg Rating</div>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button 
              onClick={() => setAuthenticated(false)}
              style={{ 
                padding: "12px 25px", 
                background: "rgba(255,255,255,0.2)", 
                color: "#fff", 
                border: "1px solid rgba(255,255,255,0.3)", 
                borderRadius: "25px", 
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              }}
            >
              🔓 Logout
            </button>
          </div>
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

  if (currentView === "reviews") {
    return (
      <div style={{ minHeight: "100vh", padding: "20px", background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <h1 style={{ color: "#fff", fontSize: "2.5rem", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
              ⭐ Review Management Dashboard
            </h1>
            <div style={{ display: "flex", gap: "15px" }}>
              <button 
                onClick={() => setShowAddReview(!showAddReview)}
                style={{ 
                  padding: "12px 20px", 
                  background: "rgba(255,255,255,0.2)", 
                  color: "#fff", 
                  border: "1px solid rgba(255,255,255,0.3)", 
                  borderRadius: "25px", 
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                }}
              >
                {showAddReview ? "Cancel" : "➕ Add Review"}
              </button>
              <button 
                onClick={() => setCurrentView("main")}
                style={{ 
                  padding: "12px 20px", 
                  background: "rgba(255,255,255,0.2)", 
                  color: "#fff", 
                  border: "1px solid rgba(255,255,255,0.3)", 
                  borderRadius: "25px", 
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                }}
              >
                ← Back to Main
              </button>
            </div>
          </div>

          {/* Add Review Form */}
          {showAddReview && (
            <div style={{ 
              background: "rgba(255,255,255,0.95)", 
              borderRadius: "20px", 
              padding: "30px",
              marginBottom: "30px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              backdropFilter: "blur(10px)"
            }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#2c3e50" }}>Add New Review</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", color: "#2c3e50", fontWeight: "600" }}>User Name</label>
                  <input
                    type="text"
                    value={newReview.user}
                    onChange={(e) => setNewReview(prev => ({ ...prev, user: e.target.value }))}
                    placeholder="Enter user name"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "2px solid #e1e8ed",
                      borderRadius: "10px",
                      fontSize: "16px",
                      transition: "border-color 0.3s ease"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#667eea"}
                    onBlur={(e) => e.target.style.borderColor = "#e1e8ed"}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", color: "#2c3e50", fontWeight: "600" }}>Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "2px solid #e1e8ed",
                      borderRadius: "10px",
                      fontSize: "16px",
                      transition: "border-color 0.3s ease"
                    }}
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                    <option value={3}>⭐⭐⭐ 3 Stars</option>
                    <option value={2}>⭐⭐ 2 Stars</option>
                    <option value={1}>⭐ 1 Star</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", color: "#2c3e50", fontWeight: "600" }}>Date</label>
                  <input
                    type="date"
                    value={newReview.date}
                    onChange={(e) => setNewReview(prev => ({ ...prev, date: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "2px solid #e1e8ed",
                      borderRadius: "10px",
                      fontSize: "16px",
                      transition: "border-color 0.3s ease"
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", color: "#2c3e50", fontWeight: "600" }}>Review Content</label>
                <textarea
                  value={newReview.content}
                  onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter review content..."
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #e1e8ed",
                    borderRadius: "10px",
                    fontSize: "16px",
                    resize: "vertical",
                    transition: "border-color 0.3s ease"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e1e8ed"}
                />
              </div>
              <button
                onClick={handleAddReview}
                disabled={!newReview.user.trim() || !newReview.content.trim()}
                style={{
                  marginTop: "20px",
                  padding: "15px 30px",
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  boxShadow: "0 8px 20px rgba(102,126,234,0.3)",
                  transition: "all 0.3s ease",
                  opacity: (!newReview.user.trim() || !newReview.content.trim()) ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (newReview.user.trim() && newReview.content.trim()) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 25px rgba(102,126,234,0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(102,126,234,0.3)";
                }}
              >
                ✨ Add Review
              </button>
            </div>
          )}

          {/* Reviews Grid */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
            gap: "25px"
          }}>
            {reviews.map((review) => (
              <div key={review.id} style={{ 
                background: "rgba(255,255,255,0.95)", 
                borderRadius: "20px", 
                padding: "25px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.1)";
              }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                  <div>
                    <h4 style={{ fontSize: "1.3rem", color: "#2c3e50", marginBottom: "5px" }}>{review.user}</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ fontSize: "1.2rem" }}>
                          {i < review.rating ? "⭐" : "☆"}
                        </span>
                      ))}
                      <span style={{ marginLeft: "10px", color: "#7f8c8d", fontSize: "0.9rem" }}>
                        {review.rating}/5
                      </span>
                    </div>
                  </div>
                  <span style={{ 
                    color: "#7f8c8d", 
                    fontSize: "0.9rem",
                    background: "rgba(127,140,141,0.1)",
                    padding: "5px 10px",
                    borderRadius: "15px"
                  }}>
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ 
                  color: "#34495e", 
                  lineHeight: "1.6", 
                  marginBottom: "20px",
                  fontSize: "1rem"
                }}>
                  "{review.content}"
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    style={{
                      padding: "8px 15px",
                      background: "linear-gradient(45deg, #e74c3c, #c0392b)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {reviews.length === 0 && (
            <div style={{ 
              textAlign: "center", 
              padding: "60px 20px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "20px",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📝</div>
              <h3 style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "10px" }}>No Reviews Yet</h3>
              <p style={{ color: "rgba(255,255,255,0.8)" }}>Start adding reviews to build your customer feedback system</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

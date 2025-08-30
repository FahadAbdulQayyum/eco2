"use client";
import React, { useState } from "react";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

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
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {!authenticated ? (
        <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: 8, fontSize: 16 }}
          />
          <button type="submit" style={{ padding: 8, fontSize: 16, background: "#222", color: "#fff", border: "none", borderRadius: 4 }}>
            Login
          </button>
        </form>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <h2>Admin Dashboard: Add Images</h2>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} />
          {selectedFiles && (
            <div style={{ marginTop: 16 }}>
              <h4>Selected Images:</h4>
              <ul>
                {Array.from(selectedFiles).map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

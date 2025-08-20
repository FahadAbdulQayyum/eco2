"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Import build timestamp from generated file
// This will be automatically updated during each build
import { BUILD_TIMESTAMP } from "@/lib/buildInfo";

function getTimeSinceBuild(buildTime: number) {
  const now = Date.now();
  let diff = Math.floor((now - buildTime) / 1000); // in seconds
  const days = Math.floor(diff / (3600 * 24));
  diff -= days * 3600 * 24;
  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff - minutes * 60;
  return { days, hours, minutes, seconds };
}

const BuildTimer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(getTimeSinceBuild(BUILD_TIMESTAMP));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeSinceBuild(BUILD_TIMESTAMP));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        minWidth: open ? 180 : 48,
        minHeight: 48,
        transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        borderRadius: 12,
        background: open ? "rgba(255,255,255,0.95)" : "#222",
        color: open ? "#222" : "#fff",
        border: "1px solid #eee",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: open ? "center" : "flex-start",
        padding: open ? "12px 20px" : "0 16px",
        fontFamily: "var(--font-satoshi, sans-serif)",
        fontSize: 14,
        overflow: "hidden",
      }}
      onClick={() => setOpen((v) => !v)}
      title={open ? "Hide live timer" : "Show live timer"}
    >
      {open ? (
        <div style={{ width: "100%", textAlign: "center", position: "relative" }}>
          <div 
            style={{ 
              position: "absolute", 
              top: -8, 
              right: -8, 
              width: 20, 
              height: 20, 
              padding: 5,
              borderRadius: "50%", 
              background: "black", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              cursor: "pointer",
              fontSize: 12,
              fontWeight: "bold",
              color: "red",
              border: "1px solid #ddd"
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            title="Close timer"
          >
            <Image
              src="/icons/times.svg"
              height={13}
              width={13}
              alt="close timer"
            />
          </div>
          <span style={{ fontWeight: 600 }}>Live Since:</span>
          <div style={{ marginTop: 4 }}>
            {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
          </div>
          <div style={{ fontSize: 12, marginTop: 8, color: "#888" }}>(Click to hide)</div>
        </div>
      ) : (
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{ marginRight: 4 }}><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          <span style={{ fontWeight: 600, fontSize: 13 }}>Live</span>
        </span>
      )}
    </div>
  );
};

export default BuildTimer;

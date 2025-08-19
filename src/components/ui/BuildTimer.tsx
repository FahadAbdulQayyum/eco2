"use client";
import React, { useEffect, useState } from "react";

// Use build time from env or fallback to now
const BUILD_TIMESTAMP =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_BUILD_TIMESTAMP
    ? parseInt(process.env.NEXT_PUBLIC_BUILD_TIMESTAMP)
    : Date.now();

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
        background: "rgba(255,255,255,0.95)",
        color: "#222",
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        padding: "12px 20px",
        fontFamily: "var(--font-satoshi, sans-serif)",
        fontSize: 14,
        border: "1px solid #eee",
        minWidth: 180,
        textAlign: "center",
      }}
    >
      <span style={{ fontWeight: 600 }}>Build Age:</span>
      <div style={{ marginTop: 4 }}>
        {time.days}d {time.hours}h {time.minutes}m {time.seconds}s
      </div>
    </div>
  );
};

export default BuildTimer;

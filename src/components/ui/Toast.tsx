"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface ToastContextType {
  showToast: (message: string, type?: "error" | "success") => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((message: string, type: "error" | "success" = "error") => {
    setToast({ message, type });
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            right: 32,
            zIndex: 10000,
            minWidth: 220,
            padding: "14px 28px",
            background: toast.type === "error" ? "#ff4d4f" : "#4caf50",
            color: "#fff",
            borderRadius: 10,
            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            fontWeight: 500,
            fontSize: 15,
            opacity: visible ? 1 : 0,
            pointerEvents: visible ? "auto" : "none",
            transition: "opacity 0.3s cubic-bezier(.4,0,.2,1)",
          }}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

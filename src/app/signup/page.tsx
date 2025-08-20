"use client";
import InputGroup from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.showToast("User registration is currently managed by administrators. Please contact support or use existing credentials to sign in.", "error");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg border border-border">
        <h1 className="text-2xl font-bold mb-2 text-center tracking-tight">Sign Up</h1>
        <p className="text-muted-foreground text-center mb-8 text-sm">Create your account to get started.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputGroup>
            <InputGroup.Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <div className="relative w-full">
              <InputGroup.Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-transparent border-0 cursor-pointer"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye open SVG
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                ) : (
                  // Eye closed SVG
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.362-2.568A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.03M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L6 6" /></svg>
                )}
              </button>
            </div>
          </InputGroup>
          <Button type="submit" className="w-full mt-2">Sign Up</Button>
        </form>
        <div className="text-center mt-6 text-sm">
          Already have an account?{' '}
          <Link href="/signin" className="text-primary hover:underline font-medium">Sign in</Link>
        </div>
        
        {/* Info about existing accounts */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-xs text-blue-700">
          <p className="font-medium mb-2">ℹ️ Account Information:</p>
          <p>User accounts are managed by administrators. Please contact support to create a new account or use existing credentials to sign in.</p>
        </div>
      </div>
    </div>
  );
}

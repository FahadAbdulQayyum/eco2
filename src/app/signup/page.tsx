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
            <InputGroup.Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
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

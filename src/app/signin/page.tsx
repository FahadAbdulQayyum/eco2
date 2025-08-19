"use client";
import InputGroup from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add sign-in logic
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg border border-border">
        <h1 className="text-2xl font-bold mb-2 text-center tracking-tight">Sign In</h1>
        <p className="text-muted-foreground text-center mb-8 text-sm">Welcome back! Please sign in to your account.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <Button type="submit" className="w-full mt-2">Sign In</Button>
        </form>
        <div className="text-center mt-6 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

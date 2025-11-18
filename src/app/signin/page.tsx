"use client";
import InputGroup from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { useAppDispatch } from "@/lib/hooks/redux";
import { signInSuccess } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Fetch users from the JSON file
      const response = await fetch('/users.json');
      if (!response.ok) {
        throw new Error('Failed to fetch users data');
      }
      
      const users: User[] = await response.json();
      
      // Find user with matching credentials
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Remove password from user object before storing in state
        const { password: _, ...userWithoutPassword } = user;
        dispatch(signInSuccess(userWithoutPassword));
        toast.showToast(`Welcome back, ${user.name}!`, "success");
        
        // Clear form
        setEmail("");
        setPassword("");
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        toast.showToast("Invalid email or password. Please try again.", "error");
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      toast.showToast("An error occurred during sign in. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg bg-card p-8 rounded-2xl shadow-lg border border-border text-center">
        <h1 className="text-2xl font-bold mb-2 tracking-tight">Sign In — Disabled</h1>
        <p className="text-muted-foreground mb-4">The sign-in functionality is disabled in this build. User accounts are managed by administrators.</p>
        <p className="text-sm mb-4">If you are an administrator or need access, please contact support.</p>
        <a href="/" className="text-primary font-medium">Return to Home</a>
      </div>
    </div>
  );
}

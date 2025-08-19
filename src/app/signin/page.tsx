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
              disabled={isLoading}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </InputGroup>
          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <div className="text-center mt-6 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
        </div>
        
        {/* Demo credentials info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
          <p className="font-medium mb-2">Demo Credentials:</p>
          <p>Email: john@example.com | Password: password123</p>
          <p>Email: jane@example.com | Password: password456</p>
          <p>Email: admin@tahirzai.co | Password: admin123</p>
        </div>
      </div>
    </div>
  );
}

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
            <div className="relative w-full">
              <InputGroup.Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={isLoading}
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

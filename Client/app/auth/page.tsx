"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api, { setAuthToken, userApi } from "@/lib/api";

export default function UserAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

// Use userApi for user-related requests
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");
  setSuccess("");

  try {
    if (isLogin) {
      // --- LOGIN ---
      const res = await api.post("/users/login", { name, email, password });
      const data = res.data;

      console.log("Data extracted", data);

      if (data?.accessToken && data?.user) {
        // Store user token
        setAuthToken("user", data.accessToken);

        // Store full user info
        localStorage.setItem("currentUser", JSON.stringify(data.user));

        // ✅ Store userId for OrderPage & other components
        localStorage.setItem("userId", data.user.id);

        // Optionally store refreshToken if needed
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);

        // Redirect after login
        router.push("/");
      } else {
        setError("Invalid response from server");
      }
    } else {
      // --- REGISTER ---
      const res = await api.post("/users/register", { name, email, password });
      const data = res.data;

      setSuccess(data.message || "Account created successfully! Please sign in.");
      setIsLogin(true);
      setName("");
      setEmail("");
      setPassword("");
    }
  } catch (err: any) {
    console.error("Error during auth:", err);
    setError(err.response?.data?.message || err.message || "Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};





  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              LuxeRent
            </h1>
          </Link>
          <p className="text-muted-foreground">
            {isLogin
              ? "Welcome back to luxury rentals"
              : "Join our exclusive rental community"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {isLogin ? "Sign In" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Fill in your details to create a new account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      isLogin ? "Enter your password" : "Create a password"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? isLogin
                    ? "Signing in..."
                    : "Creating account..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <Button
                  variant="link"
                  className="p-0 ml-1 h-auto font-medium"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setSuccess("");
                  }}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </Button>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

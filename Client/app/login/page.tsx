"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/lib/axiosInstance";
import { useToast } from "@/hooks/use-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/admin");
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/admin/auth/login", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const data = response.data;

      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        document.cookie = `token=${data.accessToken}; path=/; secure; samesite=strict`;

        toast({ title: "Login successful", description: "Welcome to the admin dashboard" });
        router.push("/admin");
      } else {
        throw new Error("No token received from server");
      }
    } catch (error: any) {
      let description = error.response?.data?.message || error.message || "Login failed";
      toast({ title: "Login failed", description, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}



// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { Building } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/hooks/use-toast"
// import { adminApi, setAuthToken } from "@/lib/api"

// export default function AdminLoginPage() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState({ email: "", password: "" })

//   // Redirect if already logged in
//   useEffect(() => {
//     const token = localStorage.getItem("adminToken")
//     if (token) router.push("/admin")
//   }, [router])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       console.log("Attempting admin login with:", formData.email)

//       const res = await adminApi.post("/admin/auth/login", formData)
//       const data = res.data

//       console.log("Admin login response:", data)

//       if (data?.accessToken) {
//         // Store token
//         setAuthToken("admin", data.accessToken)

//         // Store full admin info if returned
//         if (data.admin) localStorage.setItem("currentAdmin", JSON.stringify(data.admin))

//         toast({
//           title: "Login successful",
//           description: "Welcome to the Admin Dashboard",
//         })

//         router.push("/admin")
//       } else {
//         throw new Error("No token received from server")
//       }
//     } catch (error: any) {
//       console.error("Admin login error:", error)
//       let title = "Login failed"
//       let description = "Something went wrong. Please try again."

//       if (error.response) {
//         const { status, data } = error.response
//         switch (status) {
//           case 400:
//             title = "Invalid Input"
//             description = data?.message || "Check your email and password."
//             break
//           case 401:
//             title = "Invalid Credentials"
//             description = data?.message || "Incorrect email or password."
//             break
//           case 404:
//             title = "Admin Not Found"
//             description = data?.message || "No admin account found with this email."
//             break
//           case 500:
//             title = "Server Error"
//             description = "Internal server error. Try again later."
//             break
//           default:
//             description = data?.message || "An unexpected error occurred."
//         }
//       } else if (error.request) {
//         title = "Network Error"
//         description = "Unable to reach the server. Check your connection."
//       } else {
//         description = error.message || "An unexpected error occurred."
//       }

//       toast({ title, description, variant: "destructive" })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         <div className="flex justify-center mb-6">
//           <div className="flex items-center">
//             <div className="bg-gradient-to-r from-green-800 to-green-600 p-2 rounded-lg mr-2">
//               <Building className="h-6 w-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold">Evernal Group Admin</span>
//           </div>
//         </div>

//         <div className="bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-2 text-gray-900">Admin Login</h2>
//           <p className="text-sm text-gray-500 mb-6">
//             Enter your credentials to access the admin dashboard
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="admin@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 disabled={isLoading}
//                 required
//               />
//             </div>

//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 disabled={isLoading}
//                 required
//               />
//             </div>

//             <Button type="submit" className="w-full mt-2" disabled={isLoading}>
//               {isLoading ? "Logging in..." : "Login"}
//             </Button>
//           </form>

//           <div className="text-center mt-4">
//             <Link href="/" className="text-sm text-gray-600 hover:text-green-600">
//               ← Back to Website
//             </Link>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

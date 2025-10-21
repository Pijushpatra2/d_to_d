"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Package,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  LogOut,
  User,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

// Mock data for dashboard
const dashboardStats = [
  { title: "Total Products", value: "1,234", change: "+12%", icon: Package, color: "text-chart-1" },
  { title: "Active Customers", value: "856", change: "+8%", icon: Users, color: "text-chart-2" },
  { title: "Monthly Revenue", value: "$45,678", change: "+15%", icon: DollarSign, color: "text-chart-3" },
  { title: "Active Rentals", value: "342", change: "+5%", icon: TrendingUp, color: "text-chart-4" },
]

const revenueData = [
  { month: "Jan", revenue: 32000, rentals: 120 },
  { month: "Feb", revenue: 38000, rentals: 145 },
  { month: "Mar", revenue: 42000, rentals: 160 },
  { month: "Apr", revenue: 45000, rentals: 175 },
  { month: "May", revenue: 48000, rentals: 190 },
  { month: "Jun", revenue: 52000, rentals: 210 },
]

const categoryData = [
  { name: "Dresses", value: 35, color: "#6366f1" },
  { name: "Accessories", value: 25, color: "#f97316" },
  { name: "Outerwear", value: 20, color: "#15803d" },
  { name: "Shoes", value: 20, color: "#ea580c" },
]

const recentProducts = [
  { id: 1, name: "Elegant Silk Evening Gown", brand: "Valentino", price: "$299", status: "Available", rentals: 45 },
  { id: 2, name: "Designer Leather Handbag", brand: "Hermès", price: "$199", status: "Rented", rentals: 32 },
  { id: 3, name: "Cashmere Winter Coat", brand: "Max Mara", price: "$249", status: "Available", rentals: 28 },
  {
    id: 4,
    name: "Statement Diamond Earrings",
    brand: "Tiffany & Co.",
    price: "$149",
    status: "Maintenance",
    rentals: 67,
  },
]

const recentCustomers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    totalRentals: 12,
    totalSpent: "$2,340",
    status: "Premium",
  },
  { id: 2, name: "Emily Chen", email: "emily@example.com", totalRentals: 8, totalSpent: "$1,560", status: "Standard" },
  {
    id: 3,
    name: "Jessica Williams",
    email: "jessica@example.com",
    totalRentals: 15,
    totalSpent: "$3,120",
    status: "Premium",
  },
  { id: 4, name: "Amanda Davis", email: "amanda@example.com", totalRentals: 5, totalSpent: "$890", status: "Standard" },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [adminUser, setAdminUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const adminUserData = localStorage.getItem("adminUser")
    if (adminUserData) {
      setAdminUser(JSON.parse(adminUserData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminUser")
    // router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{adminUser?.name || "Admin"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex">


        {/* Main Content */}
        <div className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-chart-3">{stat.change}</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Monthly revenue and rental count</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Categories</CardTitle>
                    <CardDescription>Distribution by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Products</CardTitle>
                    <CardDescription>Latest product additions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.brand} • {product.price}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                product.status === "Available"
                                  ? "default"
                                  : product.status === "Rented"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {product.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{product.rentals} rentals</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Customers</CardTitle>
                    <CardDescription>Most active customers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentCustomers.map((customer) => (
                        <div
                          key={customer.id}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={customer.status === "Premium" ? "default" : "secondary"}>
                              {customer.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">
                              {customer.totalRentals} rentals • {customer.totalSpent}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Product Management</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Product
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search products..." className="pl-10" />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-4 font-medium">Product</th>
                          <th className="text-left p-4 font-medium">Brand</th>
                          <th className="text-left p-4 font-medium">Price</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Rentals</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentProducts.map((product) => (
                          <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                            <td className="p-4 font-medium">{product.name}</td>
                            <td className="p-4 text-muted-foreground">{product.brand}</td>
                            <td className="p-4">{product.price}</td>
                            <td className="p-4">
                              <Badge
                                variant={
                                  product.status === "Available"
                                    ? "default"
                                    : product.status === "Rented"
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {product.status}
                              </Badge>
                            </td>
                            <td className="p-4">{product.rentals}</td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tabs would be implemented similarly */}
            <TabsContent value="rentals">
              <div className="text-center py-12">
                <Calendar className ="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Rental Management</h3>
                <p className="text-muted-foreground">Track and manage all rental activities</p>
              </div>
            </TabsContent>

            <TabsContent value="customers">
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Customer Management</h3>
                <p className="text-muted-foreground">Manage customer accounts and rental history</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}





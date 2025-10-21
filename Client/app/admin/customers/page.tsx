"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Eye, Edit, Mail, Phone, MapPin, Calendar, CreditCard, Package } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

// Mock customer data
const mockCustomers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fashion Ave, New York, NY 10001",
    membershipTier: "Premium",
    joinDate: "2023-06-15",
    totalRentals: 12,
    totalSpent: 2340,
    averageRating: 4.8,
    status: "Active",
    lastRental: "2024-01-20",
    notes: "VIP customer, prefers designer evening wear",
    preferences: ["Evening Wear", "Designer Brands", "Size M"],
    paymentMethods: [
      { type: "Credit Card", last4: "4567", brand: "Visa", isDefault: true },
      { type: "Credit Card", last4: "8901", brand: "Mastercard", isDefault: false },
    ],
    rentalHistory: [
      {
        id: "R001",
        productName: "Elegant Silk Evening Gown",
        brand: "Valentino",
        rentalDate: "2024-01-20",
        returnDate: "2024-01-23",
        price: 299,
        status: "Completed",
      },
      {
        id: "R005",
        productName: "Designer Cocktail Dress",
        brand: "Tom Ford",
        rentalDate: "2023-12-15",
        returnDate: "2023-12-18",
        price: 249,
        status: "Completed",
      },
    ],
  },
  {
    id: 2,
    name: "Emily Chen",
    email: "emily@example.com",
    phone: "+1 (555) 234-5678",
    address: "456 Style St, Los Angeles, CA 90210",
    membershipTier: "Standard",
    joinDate: "2023-08-22",
    totalRentals: 8,
    totalSpent: 1560,
    averageRating: 4.6,
    status: "Active",
    lastRental: "2024-01-15",
    notes: "Prefers casual and business attire",
    preferences: ["Business Wear", "Casual", "Size S"],
    paymentMethods: [{ type: "Credit Card", last4: "2345", brand: "Amex", isDefault: true }],
    rentalHistory: [
      {
        id: "R002",
        productName: "Designer Leather Handbag",
        brand: "Hermès",
        rentalDate: "2024-01-15",
        returnDate: "2024-01-18",
        price: 199,
        status: "Completed",
      },
    ],
  },
  {
    id: 3,
    name: "Jessica Williams",
    email: "jessica@example.com",
    phone: "+1 (555) 345-6789",
    address: "789 Luxury Ln, Miami, FL 33101",
    membershipTier: "Premium",
    joinDate: "2023-04-10",
    totalRentals: 15,
    totalSpent: 3120,
    averageRating: 4.9,
    status: "Active",
    lastRental: "2024-01-10",
    notes: "Frequent renter, excellent customer",
    preferences: ["Luxury Items", "Evening Wear", "Size L"],
    paymentMethods: [{ type: "Credit Card", last4: "6789", brand: "Visa", isDefault: true }],
    rentalHistory: [
      {
        id: "R003",
        productName: "Cashmere Winter Coat",
        brand: "Max Mara",
        rentalDate: "2024-01-10",
        returnDate: "2024-01-15",
        price: 249,
        status: "Overdue",
      },
    ],
  },
  {
    id: 4,
    name: "Amanda Davis",
    email: "amanda@example.com",
    phone: "+1 (555) 456-7890",
    address: "321 Chic Blvd, Chicago, IL 60601",
    membershipTier: "Standard",
    joinDate: "2023-11-05",
    totalRentals: 5,
    totalSpent: 890,
    averageRating: 4.4,
    status: "Active",
    lastRental: "2024-01-25",
    notes: "New customer, shows great potential",
    preferences: ["Accessories", "Jewelry", "One Size"],
    paymentMethods: [{ type: "Credit Card", last4: "3456", brand: "Mastercard", isDefault: true }],
    rentalHistory: [
      {
        id: "R004",
        productName: "Statement Diamond Earrings",
        brand: "Tiffany & Co.",
        rentalDate: "2024-01-25",
        returnDate: "2024-01-28",
        price: 149,
        status: "Active",
      },
    ],
  },
]

const customerStats = [
  { title: "Total Customers", value: "856", icon: Package, color: "text-chart-1" },
  { title: "Premium Members", value: "234", icon: CreditCard, color: "text-chart-2" },
  { title: "New This Month", value: "42", icon: Calendar, color: "text-chart-3" },
  { title: "Average LTV", value: "$1,847", icon: MapPin, color: "text-chart-4" },
]

export default function CustomerManagement() {
  const [customers, setCustomers] = useState(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTier, setFilterTier] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [editingCustomer, setEditingCustomer] = useState(null)

  // Filter customers based on search and filters
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    const matchesTier = filterTier === "all" || customer.membershipTier === filterTier
    const matchesStatus = filterStatus === "all" || customer.status === filterStatus
    return matchesSearch && matchesTier && matchesStatus
  })

  const getTierColor = (tier) => {
    switch (tier) {
      case "Premium":
        return "default"
      case "Standard":
        return "secondary"
      case "VIP":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "default"
      case "Inactive":
        return "secondary"
      case "Suspended":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const handleUpdateCustomer = (customerId, updates) => {
    setCustomers(customers.map((customer) => (customer.id === customerId ? { ...customer, ...updates } : customer)))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6">
          <Link href="/admin" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-foreground ml-4">Customer Management</h1>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {customerStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterTier} onValueChange={setFilterTier}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Tiers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
            <CardDescription>Manage customer accounts and rental history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Customer</th>
                    <th className="text-left p-4 font-medium">Contact</th>
                    <th className="text-left p-4 font-medium">Membership</th>
                    <th className="text-left p-4 font-medium">Rentals</th>
                    <th className="text-left p-4 font-medium">Total Spent</th>
                    <th className="text-left p-4 font-medium">Last Rental</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Member since {format(new Date(customer.joinDate), "MMM yyyy")}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {customer.email}
                          </p>
                          <p className="text-sm flex items-center text-muted-foreground">
                            <Phone className="h-3 w-3 mr-1" />
                            {customer.phone}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getTierColor(customer.membershipTier)}>{customer.membershipTier}</Badge>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{customer.totalRentals}</p>
                          <p className="text-sm text-muted-foreground">★ {customer.averageRating}</p>
                        </div>
                      </td>
                      <td className="p-4 font-medium">${customer.totalSpent.toLocaleString()}</td>
                      <td className="p-4 text-sm">{format(new Date(customer.lastRental), "MMM dd, yyyy")}</td>
                      <td className="p-4">
                        <Badge variant={getStatusColor(customer.status)}>{customer.status}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(customer)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Customer Details - {customer.name}</DialogTitle>
                                <DialogDescription>Complete customer profile and rental history</DialogDescription>
                              </DialogHeader>
                              {selectedCustomer && (
                                <Tabs defaultValue="profile" className="w-full">
                                  <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="profile">Profile</TabsTrigger>
                                    <TabsTrigger value="rentals">Rental History</TabsTrigger>
                                    <TabsTrigger value="payments">Payment Methods</TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="profile" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-4">
                                        <div>
                                          <h4 className="font-medium mb-2">Personal Information</h4>
                                          <div className="space-y-2">
                                            <p className="text-sm">
                                              <strong>Name:</strong> {selectedCustomer.name}
                                            </p>
                                            <p className="text-sm">
                                              <strong>Email:</strong> {selectedCustomer.email}
                                            </p>
                                            <p className="text-sm">
                                              <strong>Phone:</strong> {selectedCustomer.phone}
                                            </p>
                                            <p className="text-sm">
                                              <strong>Address:</strong> {selectedCustomer.address}
                                            </p>
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="font-medium mb-2">Membership Details</h4>
                                          <div className="space-y-2">
                                            <p className="text-sm">
                                              <strong>Tier:</strong>{" "}
                                              <Badge variant={getTierColor(selectedCustomer.membershipTier)}>
                                                {selectedCustomer.membershipTier}
                                              </Badge>
                                            </p>
                                            <p className="text-sm">
                                              <strong>Join Date:</strong>{" "}
                                              {format(new Date(selectedCustomer.joinDate), "PPP")}
                                            </p>
                                            <p className="text-sm">
                                              <strong>Status:</strong>{" "}
                                              <Badge variant={getStatusColor(selectedCustomer.status)}>
                                                {selectedCustomer.status}
                                              </Badge>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="space-y-4">
                                        <div>
                                          <h4 className="font-medium mb-2">Rental Statistics</h4>
                                          <div className="space-y-2">
                                            <p className="text-sm">
                                              <strong>Total Rentals:</strong> {selectedCustomer.totalRentals}
                                            </p>
                                            <p className="text-sm">
                                              <strong>Total Spent:</strong> $
                                              {selectedCustomer.totalSpent.toLocaleString()}
                                            </p>
                                            <p className="text-sm">
                                              <strong>Average Rating:</strong> ★ {selectedCustomer.averageRating}
                                            </p>
                                            <p className="text-sm">
                                              <strong>Last Rental:</strong>{" "}
                                              {format(new Date(selectedCustomer.lastRental), "PPP")}
                                            </p>
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="font-medium mb-2">Preferences</h4>
                                          <div className="flex flex-wrap gap-1">
                                            {selectedCustomer.preferences.map((pref, index) => (
                                              <Badge key={index} variant="outline">
                                                {pref}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="font-medium mb-2">Notes</h4>
                                          <p className="text-sm">{selectedCustomer.notes}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="rentals" className="space-y-4">
                                    <div className="space-y-4">
                                      {selectedCustomer.rentalHistory.map((rental, index) => (
                                        <div key={index} className="border border-border rounded-lg p-4">
                                          <div className="flex justify-between items-start">
                                            <div>
                                              <h5 className="font-medium">{rental.productName}</h5>
                                              <p className="text-sm text-muted-foreground">{rental.brand}</p>
                                              <p className="text-sm">
                                                {format(new Date(rental.rentalDate), "MMM dd")} -{" "}
                                                {format(new Date(rental.returnDate), "MMM dd, yyyy")}
                                              </p>
                                            </div>
                                            <div className="text-right">
                                              <p className="font-medium">${rental.price}</p>
                                              <Badge
                                                variant={
                                                  rental.status === "Completed"
                                                    ? "secondary"
                                                    : rental.status === "Active"
                                                      ? "default"
                                                      : "destructive"
                                                }
                                              >
                                                {rental.status}
                                              </Badge>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="payments" className="space-y-4">
                                    <div className="space-y-4">
                                      {selectedCustomer.paymentMethods.map((method, index) => (
                                        <div key={index} className="border border-border rounded-lg p-4">
                                          <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                              <CreditCard className="h-5 w-5" />
                                              <div>
                                                <p className="font-medium">
                                                  {method.brand} •••• {method.last4}
                                                </p>
                                                <p className="text-sm text-muted-foreground">{method.type}</p>
                                              </div>
                                            </div>
                                            {method.isDefault && <Badge variant="outline">Default</Badge>}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm" onClick={() => setEditingCustomer(customer)}>
                            <Edit className="h-4 w-4" />
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
      </div>
    </div>
  )
}

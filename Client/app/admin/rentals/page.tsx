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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ArrowLeft, Search, Eye, CalendarIcon, Download, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock rental data
const mockRentals = [
  {
    id: "R001",
    customerName: "Sarah Johnson",
    customerEmail: "sarah@example.com",
    productName: "Elegant Silk Evening Gown",
    productBrand: "Valentino",
    rentalPrice: 299,
    startDate: "2024-01-20",
    endDate: "2024-01-23",
    status: "Active",
    paymentStatus: "Paid",
    totalDays: 3,
    lateFee: 0,
    securityDeposit: 500,
    orderDate: "2024-01-18",
    returnCondition: null,
    notes: "Customer requested early pickup",
  },
  {
    id: "R002",
    customerName: "Emily Chen",
    customerEmail: "emily@example.com",
    productName: "Designer Leather Handbag",
    productBrand: "Hermès",
    rentalPrice: 199,
    startDate: "2024-01-15",
    endDate: "2024-01-18",
    status: "Returned",
    paymentStatus: "Paid",
    totalDays: 3,
    lateFee: 0,
    securityDeposit: 800,
    orderDate: "2024-01-13",
    returnCondition: "Excellent",
    notes: "Returned in perfect condition",
  },
  {
    id: "R003",
    customerName: "Jessica Williams",
    customerEmail: "jessica@example.com",
    productName: "Cashmere Winter Coat",
    productBrand: "Max Mara",
    rentalPrice: 249,
    startDate: "2024-01-10",
    endDate: "2024-01-15",
    status: "Overdue",
    paymentStatus: "Paid",
    totalDays: 5,
    lateFee: 50,
    securityDeposit: 400,
    orderDate: "2024-01-08",
    returnCondition: null,
    notes: "Customer contacted about extension",
  },
  {
    id: "R004",
    customerName: "Amanda Davis",
    customerEmail: "amanda@example.com",
    productName: "Statement Diamond Earrings",
    productBrand: "Tiffany & Co.",
    rentalPrice: 149,
    startDate: "2024-01-25",
    endDate: "2024-01-28",
    status: "Upcoming",
    paymentStatus: "Paid",
    totalDays: 3,
    lateFee: 0,
    securityDeposit: 1000,
    orderDate: "2024-01-22",
    returnCondition: null,
    notes: "Special occasion rental",
  },
]

const rentalStats = [
  { title: "Active Rentals", value: "342", icon: Clock, color: "text-chart-1" },
  { title: "Completed This Month", value: "156", icon: CheckCircle, color: "text-chart-3" },
  { title: "Overdue Items", value: "12", icon: AlertCircle, color: "text-destructive" },
  { title: "Total Revenue", value: "$45,678", icon: CalendarIcon, color: "text-chart-2" },
]

export default function RentalTracking() {
  const [rentals, setRentals] = useState(mockRentals)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedRental, setSelectedRental] = useState(null)
  const [dateRange, setDateRange] = useState({ from: null, to: null })

  // Filter rentals based on search and filters
  const filteredRentals = rentals.filter((rental) => {
    const matchesSearch =
      rental.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || rental.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "default"
      case "Returned":
        return "secondary"
      case "Overdue":
        return "destructive"
      case "Upcoming":
        return "outline"
      default:
        return "default"
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "default"
      case "Pending":
        return "secondary"
      case "Failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleUpdateStatus = (rentalId, newStatus) => {
    setRentals(
      rentals.map((rental) =>
        rental.id === rentalId
          ? {
              ...rental,
              status: newStatus,
              returnCondition: newStatus === "Returned" ? "Good" : rental.returnCondition,
            }
          : rental,
      ),
    )
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
          <h1 className="text-2xl font-bold text-foreground ml-4">Rental Tracking</h1>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {rentalStats.map((stat, index) => (
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
            <CardTitle>Filter Rentals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer, product, or rental ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Returned">Returned</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Rentals Table */}
        <Card>
          <CardHeader>
            <CardTitle>Rentals ({filteredRentals.length})</CardTitle>
            <CardDescription>Track and manage all rental activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Rental ID</th>
                    <th className="text-left p-4 font-medium">Customer</th>
                    <th className="text-left p-4 font-medium">Product</th>
                    <th className="text-left p-4 font-medium">Rental Period</th>
                    <th className="text-left p-4 font-medium">Price</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Payment</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRentals.map((rental) => (
                    <tr key={rental.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-4 font-medium">{rental.id}</td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{rental.customerName}</p>
                          <p className="text-sm text-muted-foreground">{rental.customerEmail}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{rental.productName}</p>
                          <p className="text-sm text-muted-foreground">{rental.productBrand}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm">
                            {format(new Date(rental.startDate), "MMM dd")} -{" "}
                            {format(new Date(rental.endDate), "MMM dd")}
                          </p>
                          <p className="text-sm text-muted-foreground">{rental.totalDays} days</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">${rental.rentalPrice}</p>
                          {rental.lateFee > 0 && (
                            <p className="text-sm text-destructive">+${rental.lateFee} late fee</p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getStatusColor(rental.status)}>{rental.status}</Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={getPaymentStatusColor(rental.paymentStatus)}>{rental.paymentStatus}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedRental(rental)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Rental Details - {rental.id}</DialogTitle>
                                <DialogDescription>
                                  Complete rental information and management options
                                </DialogDescription>
                              </DialogHeader>
                              {selectedRental && (
                                <div className="grid grid-cols-2 gap-4 py-4">
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Customer Information</h4>
                                      <p className="text-sm">
                                        <strong>Name:</strong> {selectedRental.customerName}
                                      </p>
                                      <p className="text-sm">
                                        <strong>Email:</strong> {selectedRental.customerEmail}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Product Information</h4>
                                      <p className="text-sm">
                                        <strong>Product:</strong> {selectedRental.productName}
                                      </p>
                                      <p className="text-sm">
                                        <strong>Brand:</strong> {selectedRental.productBrand}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Rental Period</h4>
                                      <p className="text-sm">
                                        <strong>Start:</strong> {format(new Date(selectedRental.startDate), "PPP")}
                                      </p>
                                      <p className="text-sm">
                                        <strong>End:</strong> {format(new Date(selectedRental.endDate), "PPP")}
                                      </p>
                                      <p className="text-sm">
                                        <strong>Duration:</strong> {selectedRental.totalDays} days
                                      </p>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Financial Details</h4>
                                      <p className="text-sm">
                                        <strong>Rental Price:</strong> ${selectedRental.rentalPrice}
                                      </p>
                                      <p className="text-sm">
                                        <strong>Security Deposit:</strong> ${selectedRental.securityDeposit}
                                      </p>
                                      {selectedRental.lateFee > 0 && (
                                        <p className="text-sm text-destructive">
                                          <strong>Late Fee:</strong> ${selectedRental.lateFee}
                                        </p>
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Status Information</h4>
                                      <div className="flex items-center space-x-2 mb-2">
                                        <Badge variant={getStatusColor(selectedRental.status)}>
                                          {selectedRental.status}
                                        </Badge>
                                        <Badge variant={getPaymentStatusColor(selectedRental.paymentStatus)}>
                                          {selectedRental.paymentStatus}
                                        </Badge>
                                      </div>
                                      {selectedRental.returnCondition && (
                                        <p className="text-sm">
                                          <strong>Return Condition:</strong> {selectedRental.returnCondition}
                                        </p>
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Notes</h4>
                                      <p className="text-sm">{selectedRental.notes || "No notes available"}</p>
                                    </div>
                                  </div>
                                  <div className="col-span-2 flex justify-end space-x-2 pt-4 border-t">
                                    {selectedRental.status === "Active" && (
                                      <Button
                                        size="sm"
                                        onClick={() => handleUpdateStatus(selectedRental.id, "Returned")}
                                      >
                                        Mark as Returned
                                      </Button>
                                    )}
                                    {selectedRental.status === "Overdue" && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleUpdateStatus(selectedRental.id, "Returned")}
                                      >
                                        Mark as Returned
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
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

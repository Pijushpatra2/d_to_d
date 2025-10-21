"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CreditCard } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { usePlaceOrder, OrderData, OrderItem } from "@/hooks/usePlaceOrder";
import { userApi, getAuthToken } from "@/lib/api";

interface Address {
  id: number;
  full_name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  is_default: boolean;
}

export default function OrderPage() {
  const searchParams = useSearchParams();
  const productIdFromUrl = searchParams.get("productId");
  const variantIdFromUrl = searchParams.get("variantId");

  const { products, loading: loadingProducts } = useProducts();
  const { placeOrder, loading: isSubmitting, error, success: orderSuccess } = usePlaceOrder();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [rentalDates, setRentalDates] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
  });

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    full_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "India",
    is_default: false,
  });

  // Prefill product + variant from URL
  useEffect(() => {
    if (!loadingProducts && products.length && productIdFromUrl) {
      const product = products.find((p) => p.id === Number(productIdFromUrl));
      setSelectedProduct(product || null);

      if (product && variantIdFromUrl) {
        const variant = product.variants?.find((v: any) => v.id === Number(variantIdFromUrl));
        setSelectedVariant(variant || null);
      }
    }
  }, [loadingProducts, products, productIdFromUrl, variantIdFromUrl]);

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = getAuthToken("user");
        if (!token) {
          console.error("❌ No user token found. Please login first.");
          return;
        }

        const { data } = await userApi.get(`/user-addresses/get/user/${JSON.parse(localStorage.getItem("currentUser") || "{}")?.id}`);
        console.log("Fetched addresses:", data);

        setAddresses(data.data || []);
        setSelectedAddress(data.data.find((a: Address) => a.is_default)?.id || data.data[0]?.id || null);
      } catch (err: any) {
        console.error("❌ Failed to load addresses", err.response?.data || err.message || err);
      }
    };

    fetchAddresses();
  }, []);

  const rentalDays = Math.ceil((rentalDates.to.getTime() - rentalDates.from.getTime()) / (1000 * 60 * 60 * 24));
  const basePrice = selectedVariant?.price ?? selectedProduct?.price ?? 0;
  const totalAmount = selectedProduct && selectedVariant ? basePrice * quantity * rentalDays : 0;

  const handlePlaceOrder = async () => {
    if (!selectedProduct || !selectedVariant || !selectedAddress) {
      alert("Select product, variant and address");
      return;
    }

    const orderData: OrderData = {
      address_id: selectedAddress,
      total_amount: totalAmount,
      status: "pending",
      rent_start_date: rentalDates.from.toISOString().split("T")[0],
      rent_end_date: rentalDates.to.toISOString().split("T")[0],
    };

    const items: OrderItem[] = [
      {
        variant_id: selectedVariant.id,
        quantity,
        price: basePrice,
      },
    ];

    try {
      console.log("Submitting order:", { orderData, items });
      await placeOrder(orderData, items);
    } catch (err) {
      console.error("❌ Place order error:", err);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = JSON.parse(localStorage.getItem("currentUser") || "{}")?.id;
      if (!userId) {
        console.error("❌ No user found in localStorage. Cannot add address.");
        return;
      }

      const { data } = await userApi.post("/user-addresses", {
        user_id: userId,
        ...newAddress,
      });
      console.log("New address added:", data);

      // Refresh addresses
      const res = await userApi.get(`/user-addresses/get/user/${userId}`);
      setAddresses(res.data.data || []);
      setSelectedAddress(res.data.data.find((a: Address) => a.is_default)?.id || null);

      // Reset form
      setShowAddAddress(false);
      setNewAddress({
        full_name: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        zipcode: "",
        country: "India",
        is_default: false,
      });
    } catch (err: any) {
      console.error("❌ Failed to add address:", err.response?.data || err.message || err);
    }
  };

  if (loadingProducts) return <div>Loading products...</div>;
  if (orderSuccess) return <div>Order placed successfully! Redirecting...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Place Your Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {selectedProduct && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedProduct.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{selectedProduct.description}</p>
                {selectedProduct.images?.[0] && (
                  <img
                    src={selectedProduct.images[0].image_url}
                    alt={selectedProduct.name}
                    className="w-40 h-40 object-cover rounded-md"
                  />
                )}
              </CardContent>
            </Card>
          )}

          {selectedVariant && (
            <Card>
              <CardHeader>
                <CardTitle>Variant & Quantity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>Variant: {selectedVariant.variant_name}</p>
                <p>Price: ₹{selectedVariant.price}</p>
                <p>Stock: {selectedVariant.stock_quantity}</p>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </CardContent>
            </Card>
          )}

          {/* Rental Dates */}
          <Card>
            <CardHeader>
              <CardTitle>Rental Period</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button>{format(rentalDates.from, "PPP")}</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={rentalDates.from}
                    onSelect={(date) => date && setRentalDates({ ...rentalDates, from: date })}
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button>{format(rentalDates.to, "PPP")}</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={rentalDates.to}
                    onSelect={(date) => date && setRentalDates({ ...rentalDates, to: date })}
                    disabled={(date) => date <= rentalDates.from}
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
            <p>{rentalDays} day{rentalDays !== 1 ? "s" : ""}</p>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent>
              {addresses.length ? (
                <>
                  <RadioGroup
                    value={selectedAddress ? String(selectedAddress) : undefined}
                    onValueChange={(v) => setSelectedAddress(parseInt(v))}
                  >
                    {addresses.map((addr) => (
                      <div key={addr.id} className="flex items-start space-x-3 border p-4 rounded-md mb-2">
                        <RadioGroupItem value={String(addr.id)} id={`addr-${addr.id}`} />
                        <Label htmlFor={`addr-${addr.id}`}>
                          <p>{addr.full_name}</p>
                          <p>{addr.address_line1}, {addr.address_line2}, {addr.city}, {addr.state} {addr.zipcode}</p>
                          <p>{addr.country}</p>
                          {addr.is_default && <Badge>Default</Badge>}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button className="mt-4" onClick={() => setShowAddAddress(true)}>+ Add New Address</Button>
                </>
              ) : (
                <div>
                  <p>No addresses found.</p>
                  <Button className="mt-4" onClick={() => setShowAddAddress(true)}>+ Add Address</Button>
                </div>
              )}

              {showAddAddress && (
                <form onSubmit={handleAddAddress} className="mt-4 space-y-3 border p-4 rounded-md">
                  <div><Label>Full Name</Label><Input value={newAddress.full_name} onChange={(e) => setNewAddress({ ...newAddress, full_name: e.target.value })} required /></div>
                  <div><Label>Address Line 1</Label><Input value={newAddress.address_line1} onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })} required /></div>
                  <div><Label>Address Line 2</Label><Input value={newAddress.address_line2} onChange={(e) => setNewAddress({ ...newAddress, address_line2: e.target.value })} /></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label>City</Label><Input value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} required /></div>
                    <div><Label>State</Label><Input value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} required /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label>Zipcode</Label><Input value={newAddress.zipcode} onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })} required /></div>
                    <div><Label>Country</Label><Input value={newAddress.country} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })} required /></div>
                  </div>
                  <Button type="submit">Save Address</Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Total & Place Order */}
          <Card>
            <CardHeader>
              <CardTitle>Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <p>₹{totalAmount}</p>
              <Button onClick={handlePlaceOrder} disabled={isSubmitting}>
                {isSubmitting ? "Placing..." : "Place Order"}
              </Button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (optional summary) */}
        <div>
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {selectedProduct && selectedVariant && (
            <div className="space-y-2">
              <p>Product: {selectedProduct.name}</p>
              <p>Variant: {selectedVariant.variant_name}</p>
              <p>Quantity: {quantity}</p>
              <p>Rental Days: {rentalDays}</p>
              <p>Total: ₹{totalAmount}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




// =================




// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Badge } from "@/components/ui/badge";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { CalendarIcon, Check, CreditCard, MapPin } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useProducts } from "@/hooks/useProducts";
// import { usePlaceOrder, OrderData } from "@/hooks/usePlaceOrder";
// import { userApi } from "@/lib/api";

// interface Address {
//   id: number;
//   full_name: string;
//   address_line1: string;
//   address_line2?: string;
//   city: string;
//   state: string;
//   zipcode: string;
//   country: string;
//   is_default: boolean;
// }

// export default function OrderPage() {
//   const searchParams = useSearchParams();
//   const productIdFromUrl = searchParams.get("productId");
//   const variantIdFromUrl = searchParams.get("variantId");

//   const { products, loading: loadingProducts } = useProducts();
//   const { placeOrder, loading: isSubmitting, error, success: orderSuccess } = usePlaceOrder();

//   const [selectedProduct, setSelectedProduct] = useState<any>(null);
//   const [selectedVariant, setSelectedVariant] = useState<any>(null);
//   const [quantity, setQuantity] = useState(1);
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
//   const [rentalDates, setRentalDates] = useState<{ from: Date; to: Date }>({
//     from: new Date(),
//     to: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
//   });

//   // Prefill product + variant from URL
//   useEffect(() => {
//     if (!loadingProducts && products.length && productIdFromUrl) {
//       const product = products.find((p) => p.id === Number(productIdFromUrl));
//       setSelectedProduct(product || null);

//       if (product && variantIdFromUrl) {
//         const variant = product.variants?.find((v: any) => v.id === Number(variantIdFromUrl));
//         setSelectedVariant(variant || null);
//       }
//     }
//   }, [loadingProducts, products, productIdFromUrl, variantIdFromUrl]);

//   // Mock addresses (replace with API call later)


//   const rentalDays = Math.ceil((rentalDates.to.getTime() - rentalDates.from.getTime()) / (1000 * 60 * 60 * 24));
//   const basePrice = selectedVariant?.price ?? selectedProduct?.price ?? 0;
//   const totalAmount = selectedProduct && selectedVariant ? basePrice * quantity * rentalDays : 0;

// const handlePlaceOrder = async () => {
//   if (!selectedProduct || !selectedVariant || !selectedAddress) {
//     alert("Select product, variant and address");
//     return;
//   }

//   const orderData = {
//     address_id: selectedAddress,
//     total_amount: totalAmount,
//     status: "pending",
//     items: [
//       {
//         product_variant_id: selectedVariant.id,
//         quantity,
//         price: basePrice,
//       },
//     ],
//     rental_start_date: rentalDates.from.toISOString().split("T")[0],
//     rental_end_date: rentalDates.to.toISOString().split("T")[0],
//   };

//   try {
//     await placeOrder(orderData); // ✅ now uses tokenized userApi
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Add this new state
// const [showAddAddress, setShowAddAddress] = useState(false);
// const [newAddress, setNewAddress] = useState({
//   full_name: "",
//   address_line1: "",
//   address_line2: "",
//   city: "",
//   state: "",
//   zipcode: "",
//   country: "India",
//   is_default: false,
// });

// // Fetch addresses (already updated earlier)
// useEffect(() => {
//   const fetchAddresses = async () => {
//     try {
//       const userId = localStorage.getItem("userId");
//       if (!userId) {
//         console.warn("⚠️ No userId found in localStorage");
//         return;
//       }

//       console.log("📡 Fetching addresses for user:", userId);
//       const { data } = await userApi.get(`/user-addresses/get/user/${userId}`);
//       console.log("✅ Addresses API response:", data);

//       setAddresses(data.data || []);
//       setSelectedAddress(
//         data.data.find((a: Address) => a.is_default)?.id || data.data[0]?.id || null
//       );
//     } catch (err: any) {
//       console.error("❌ Failed to load addresses", err.response?.data || err.message);
//     }
//   };

//   fetchAddresses();
// }, []);


// // Add new address
// const handleAddAddress = async (e: React.FormEvent) => {
//   e.preventDefault();
//   try {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       console.warn("⚠️ No userId found in localStorage, cannot add address");
//       return;
//     }

//     const payload = {
//       user_id: userId,
//       ...newAddress,
//     };

//     console.log("📡 Sending new address payload:", payload);

//     const { data } = await userApi.post(`/user-addresses/add`, payload, {
//       headers: { "Content-Type": "application/json" },
//     });

//     console.log("✅ Address added response:", data);

//     // Refresh list
//     const res = await userApi.get(`/user-addresses/get/user/${userId}`);
//     console.log("🔄 Refreshed addresses:", res.data);

//     setAddresses(res.data.data || []);
//     setSelectedAddress(res.data.data.find((a: Address) => a.is_default)?.id || null);

//     // Reset form
//     setShowAddAddress(false);
//     setNewAddress({
//       full_name: "",
//       address_line1: "",
//       address_line2: "",
//       city: "",
//       state: "",
//       zipcode: "",
//       country: "India",
//       is_default: false,
//     });
//   } catch (err: any) {
//     console.error("❌ Failed to add address", err.response?.data || err.message);
//   }
// };






// // Replace it with API call

// // useEffect(() => {
// //   const fetchAddresses = async () => {
// //     try {
// //       const userId = localStorage.getItem("userId"); // ✅ adjust if you store differently
// //       if (!userId) return;

// //       const { data } = await userApi.get(`/user-addresses/get/user/${userId}`);
// //       setAddresses(data.data || []);
// //       setSelectedAddress(
// //         data.data.find((a: Address) => a.is_default)?.id || data.data[0]?.id || null
// //       );
// //     } catch (err) {
// //       console.error("Failed to load addresses", err);
// //     }
// //   };

// //   fetchAddresses();
// // }, []);




//   if (loadingProducts) return <div>Loading products...</div>;
//   if (orderSuccess) return <div>Order placed successfully! Redirecting...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Place Your Order</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Left Column - Product & Address */}
//         <div className="space-y-6">
//           {/* Product Card */}
//           {selectedProduct && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>{selectedProduct.name}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p>{selectedProduct.description}</p>
//                 {selectedProduct.images?.[0] && (
//                   <img
//                     src={selectedProduct.images[0].image_url}
//                     alt={selectedProduct.name}
//                     className="w-40 h-40 object-cover rounded-md"
//                   />
//                 )}
//               </CardContent>
//             </Card>
//           )}

//           {/* Variant & Quantity */}
//           {selectedVariant && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Variant & Quantity</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 <p>Variant: {selectedVariant.variant_name}</p>
//                 <p>Price: ₹{selectedVariant.price}</p>
//                 <p>Stock: {selectedVariant.stock_quantity}</p>
//                 <Label>Quantity</Label>
//                 <Input
//                   type="number"
//                   min={1}
//                   value={quantity}
//                   onChange={(e) => setQuantity(parseInt(e.target.value))}
//                 />
//               </CardContent>
//             </Card>
//           )}

//           {/* Rental Dates */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Rental Period</CardTitle>
//             </CardHeader>
//             <CardContent className="grid grid-cols-2 gap-4">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button>{rentalDates.from ? format(rentalDates.from, "PPP") : "Start Date"}</Button>
//                 </PopoverTrigger>
//                 <PopoverContent>
//                   <Calendar
//                     mode="single"
//                     selected={rentalDates.from}
//                     onSelect={(date) => date && setRentalDates({ ...rentalDates, from: date })}
//                   />
//                 </PopoverContent>
//               </Popover>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button>{rentalDates.to ? format(rentalDates.to, "PPP") : "End Date"}</Button>
//                 </PopoverTrigger>
//                 <PopoverContent>
//                   <Calendar
//                     mode="single"
//                     selected={rentalDates.to}
//                     onSelect={(date) => date && setRentalDates({ ...rentalDates, to: date })}
//                     disabled={(date) => date <= rentalDates.from}
//                   />
//                 </PopoverContent>
//               </Popover>
//             </CardContent>
//             <p>{rentalDays} day{rentalDays !== 1 ? "s" : ""}</p>
//           </Card>

//           {/* Address */}
// {/* Address */}
// <Card>
//   <CardHeader>
//     <CardTitle>Delivery Address</CardTitle>
//   </CardHeader>
//   <CardContent>
//     {addresses.length ? (
//       <>
//         <RadioGroup
//           value={selectedAddress ? String(selectedAddress) : undefined}
//           onValueChange={(v) => setSelectedAddress(parseInt(v))}
//         >
//           {addresses.map((addr) => (
//             <div key={addr.id} className="flex items-start space-x-3 border p-4 rounded-md mb-2">
//               <RadioGroupItem value={String(addr.id)} id={`addr-${addr.id}`} />
//               <Label htmlFor={`addr-${addr.id}`}>
//                 <p>{addr.full_name}</p>
//                 <p>
//                   {addr.address_line1}, {addr.address_line2}, {addr.city},{" "}
//                   {addr.state} {addr.zipcode}
//                 </p>
//                 <p>{addr.country}</p>
//                 {addr.is_default && <Badge>Default</Badge>}
//               </Label>
//             </div>
//           ))}
//         </RadioGroup>

//         <Button className="mt-4" onClick={() => setShowAddAddress(true)}>
//           + Add New Address
//         </Button>
//       </>
//     ) : (
//       <div>
//         <p>No addresses found.</p>
//         <Button className="mt-4" onClick={() => setShowAddAddress(true)}>
//           + Add Address
//         </Button>
//       </div>
//     )}

//     {/* Add Address Form */}
//     {showAddAddress && (
//       <form onSubmit={handleAddAddress} className="mt-4 space-y-3 border p-4 rounded-md">
//         <div>
//           <Label>Full Name</Label>
//           <Input
//             value={newAddress.full_name}
//             onChange={(e) => setNewAddress({ ...newAddress, full_name: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <Label>Address Line 1</Label>
//           <Input
//             value={newAddress.address_line1}
//             onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <Label>Address Line 2</Label>
//           <Input
//             value={newAddress.address_line2}
//             onChange={(e) => setNewAddress({ ...newAddress, address_line2: e.target.value })}
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-2">
//           <div>
//             <Label>City</Label>
//             <Input
//               value={newAddress.city}
//               onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
//               required
//             />
//           </div>
//           <div>
//             <Label>State</Label>
//             <Input
//               value={newAddress.state}
//               onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
//               required
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-2">
//           <div>
//             <Label>Zipcode</Label>
//             <Input
//               value={newAddress.zipcode}
//               onChange={(e) => setNewAddress({ ...newAddress, zipcode: e.target.value })}
//               required
//             />
//           </div>
//           <div>
//             <Label>Country</Label>
//             <Input
//               value={newAddress.country}
//               onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
//               required
//             />
//           </div>
//         </div>
//         <div className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             checked={newAddress.is_default}
//             onChange={(e) => setNewAddress({ ...newAddress, is_default: e.target.checked })}
//           />
//           <Label>Set as default</Label>
//         </div>
//         <div className="flex space-x-2">
//           <Button type="submit">Save Address</Button>
//           <Button type="button" variant="outline" onClick={() => setShowAddAddress(false)}>
//             Cancel
//           </Button>
//         </div>
//       </form>
//     )}
//   </CardContent>
// </Card>

//         </div>

//         {/* Right Column - Summary & Payment */}
//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Order Summary</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <div className="flex justify-between">
//                 <span>Product</span>
//                 <span>{selectedProduct?.name}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Variant</span>
//                 <span>{selectedVariant?.variant_name}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Quantity</span>
//                 <span>{quantity}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Rental Days</span>
//                 <span>{rentalDays}</span>
//               </div>
//               <div className="flex justify-between font-bold">
//                 <span>Total</span>
//                 <span>₹{totalAmount}</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Payment Method</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <RadioGroup defaultValue="card">
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="card" id="card" />
//                     <Label htmlFor="card">
//                       <CreditCard className="w-4 h-4 mr-2" /> Credit/Debit Card
//                     </Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="upi" id="upi" />
//                     <Label htmlFor="upi">UPI</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="cod" id="cod" />
//                     <Label htmlFor="cod">Cash on Delivery</Label>
//                   </div>
//                 </div>
//               </RadioGroup>
//             </CardContent>
//           </Card>

//           <Button
//             className="w-full py-4 text-lg"
//             onClick={handlePlaceOrder}
//             disabled={!selectedProduct || !selectedVariant || !selectedAddress || isSubmitting}
//           >
//             {isSubmitting ? "Processing..." : `Place Order - ₹${totalAmount}`}
//           </Button>

//           {error && <p className="text-red-600">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

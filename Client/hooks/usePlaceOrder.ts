// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { userApi } from "@/lib/api";

// export interface OrderItem {
//   variant_id: number; // backend expects "variant_id"
//   quantity: number;
//   price: number;
// }

// export interface OrderData {
//   address_id: number | null;
//   total_amount: number;
//   status?: string;
//   rent_start_date: string;
//   rent_end_date: string;
// }

// export const usePlaceOrder = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   const placeOrder = async (orderData: OrderData, items: OrderItem[]) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     console.log("Placing order with:", { orderData, items });

//     try {
//       if (!items || items.length === 0) throw new Error("No items provided for order");

//       // Backend expects { order, items } in body
//       const { data } = await userApi.post("/orders/add", {
//         order: orderData,
//         items,
//       });

//       console.log("Order response:", data);

//       if (!data.success) {
//         throw new Error(data.message || "Failed to create order");
//       }

//       setSuccess(true);

//       // Redirect to order confirmation page
//       setTimeout(() => router.push(`/order-confirmation/${data.data.id}`), 2000);

//       return data.data;
//     } catch (err: any) {
//       console.error("❌ Failed to place order:", err.response?.data || err.message || err);
//       setError(err.response?.data?.message || err.message || "Something went wrong");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { placeOrder, loading, error, success };
// };




"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { userApi } from "@/lib/api";

export interface OrderItem {
  product_variant_id: number;
  quantity: number;
  price: number;
}

export interface OrderData {
  address_id: number | null;
  total_amount: number;
  status?: string;
  items?: OrderItem[];
  rental_start_date: string;
  rental_end_date: string;
}

export const usePlaceOrder = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const placeOrder = async (orderData: OrderData, items: OrderItem[]) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // ✅ Log the data before sending
      console.log("🟢 Sending order to backend:", {
        order: orderData,
        items,
      });

      const { data } = await userApi.post("/orders/add", {
        order: orderData,
        items,
      });

      console.log("🟢 Backend response:", data);

      if (!data.success) {
        throw new Error(data.message || "Failed to create order");
      }

      setSuccess(true);
      setTimeout(() => router.push(`/order-confirmation/${data.data.id}`), 2000);

      return data.data;
    } catch (err: any) {
      console.error("❌ Failed to place order:", err);
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { placeOrder, loading, error, success };
};

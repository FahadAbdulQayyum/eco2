"use client";

import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import Link from "next/link";

export default function MyOrdersPage() {
  const orders = useAppSelector((state: RootState) => state.orders.orders);
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated || !currentUser) {
    return (
      <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        <div className="text-gray-500 mb-4">You must be logged in to view your orders.</div>
        <Link href="/signin" className="text-primary hover:underline font-medium">Sign in</Link>
      </main>
    );
  }

  const userOrders = orders.filter(order => order.userId === currentUser.id);

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 py-10">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {userOrders.length === 0 ? (
        <div className="text-gray-500">No orders found.</div>
      ) : (
        <div className="space-y-6">
          {userOrders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="mb-2 text-sm text-gray-400">Order Date: {new Date(order.createdAt).toLocaleString()}</div>
              <div className="mb-2 font-semibold">Total: ${order.total}</div>
              <div className="mb-2">Card: **** **** **** {order.cardInfo.cardNumber.slice(-4)}</div>
              <div>
                <table className="w-full text-left border-t mt-2">
                  <thead>
                    <tr>
                      <th className="py-1">Product</th>
                      <th className="py-1">Quantity</th>
                      <th className="py-1">Price</th>
                      <th className="py-1">Attributes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product) => (
                      <tr key={product.id + product.name}>
                        <td className="py-1">{product.name}</td>
                        <td className="py-1">{product.quantity}</td>
                        <td className="py-1">${product.price}</td>
                        <td className="py-1">{product.attributes.join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

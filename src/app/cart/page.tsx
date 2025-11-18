"use client";

import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbBasketExclamation } from "react-icons/tb";
import React from "react";
import { RootState } from "@/lib/store";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { v4 as uuidv4 } from "uuid";
import { cartsSlice } from "@/lib/features/carts/cartsSlice";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", whatsapp: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!form.name || !form.address || !form.whatsapp) {
      setError("Please fill all fields.");
      return;
    }
    if (!cart) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: uuidv4(),
          userId: currentUser?.id ?? null,
          userName: currentUser?.name ?? form.name,
          customerName: form.name,
          address: form.address,
          whatsapp: form.whatsapp,
          products: cart.items,
          total: adjustedTotalPrice,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to create order");
      }

      dispatch(cartsSlice.actions.clearCart());
      setShowModal(false);
      alert("Order submitted — we'll contact you on WhatsApp.");
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2
              className={cn([
                integralCF.className,
                "font-bold text-[32px] md:text-[40px] text-black uppercase mb-5 md:mb-6",
              ])}
            >
              your cart
            </h2>
            <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-5 items-start">
              <div className="w-full p-3.5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                {cart?.items.map((product, idx, arr) => (
                  <React.Fragment key={idx}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && (
                      <hr className="border-t-black/10" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="w-full lg:max-w-[505px] p-5 md:px-6 flex-col space-y-4 md:space-y-6 rounded-[20px] border border-black/10">
                <h6 className="text-xl md:text-2xl font-bold text-black">
                  Order Summary
                </h6>
                <div className="flex flex-col space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">Subtotal</span>
                    <span className="md:text-xl font-bold">QR {totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">
                      Discount (-
                      {Math.round(
                        ((totalPrice - adjustedTotalPrice) / totalPrice) * 100
                      )}
                      %)
                    </span>
                    <span className="md:text-xl font-bold text-red-600">
                      -QAR {Math.round(totalPrice - adjustedTotalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black/60">
                      Delivery Fee
                    </span>
                    <span className="md:text-xl font-bold">Free</span>
                  </div>
                  <hr className="border-t-black/10" />
                  <div className="flex items-center justify-between">
                    <span className="md:text-xl text-black">Total</span>
                    <span className="text-xl md:text-2xl font-bold">
                      QAR {Math.round(adjustedTotalPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <InputGroup className="bg-[#F0F0F0]">
                    <InputGroup.Text>
                      <MdOutlineLocalOffer className="text-black/40 text-2xl" />
                    </InputGroup.Text>
                    <InputGroup.Input
                      type="text"
                      name="code"
                      placeholder="Add promo code"
                      className="bg-transparent placeholder:text-black/40"
                    />
                  </InputGroup>
                  <Button
                    type="button"
                    className="bg-black rounded-full w-full max-w-[119px] h-[48px]"
                  >
                    Apply
                  </Button>
                </div>
                <Button
                  type="button"
                  className="text-sm md:text-base font-medium bg-black rounded-full w-full py-4 h-[54px] md:h-[60px] group"
                  onClick={handleCheckout}
                >
                  Go to Checkout{" "}
                  <FaArrowRight className="text-xl ml-2 group-hover:translate-x-1 transition-all" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center flex-col text-gray-300 mt-32">
            <TbBasketExclamation strokeWidth={1} className="text-6xl" />
            <span className="block mb-4">Your shopping cart is empty.</span>
            <Button className="rounded-full w-24" asChild>
              <Link href="/shop">Shop</Link>
            </Button>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Checkout — Shipping Info</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full mb-2 p-2 border rounded"
              value={form.name}
              onChange={handleFormChange}
            />
            <textarea
              name="address"
              placeholder="Delivery address"
              className="w-full mb-2 p-2 border rounded"
              value={form.address}
              onChange={handleFormChange}
            />
            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp number (with country code)"
              className="w-full mb-2 p-2 border rounded"
              value={form.whatsapp}
              onChange={handleFormChange}
            />
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded"
                onClick={handleOrder}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

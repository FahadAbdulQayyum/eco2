"use client";
import React from "react";
import CategoriesSection from "@/components/shop-page/filters/CategoriesSection";
import ColorsSection from "@/components/shop-page/filters/ColorsSection";
// Removed dress style for shoe-only store
import BrandSection from "@/components/shop-page/filters/BrandSection";
import PriceSection from "@/components/shop-page/filters/PriceSection";
import SizeSection from "@/components/shop-page/filters/SizeSection";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { clearFilters, resetFilters } from "@/lib/features/shop/shopSlice";
import { useToast } from "@/components/ui/Toast";

const Filters = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const filters = useAppSelector((state) => state.shop.filters);
  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== null
  );

  const handleApplyFilters = () => {
    toast.showToast("Filters applied successfully!", "success");
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    toast.showToast("All filters cleared!", "success");
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    toast.showToast("Filters reset to default!", "success");
  };

  return (
    <>
      <hr className="border-t-black/10" />
      <CategoriesSection />
      <hr className="border-t-black/10" />
      <PriceSection />
      <hr className="border-t-black/10" />
      <ColorsSection />
      <hr className="border-t-black/10" />
      <SizeSection />
      <hr className="border-t-black/10" />
      <BrandSection />
      
      <div className="space-y-3 pt-2">
        <Button
          type="button"
          onClick={handleApplyFilters}
          className="bg-black w-full rounded-full text-sm font-medium py-4 h-12 hover:bg-gray-800"
        >
          Apply Filters
        </Button>
        
        {hasActiveFilters && (
          <Button
            type="button"
            onClick={handleClearFilters}
            variant="outline"
            className="w-full rounded-full text-sm font-medium py-3 h-10"
          >
            Clear All
          </Button>
        )}
        
        <Button
          type="button"
          onClick={handleResetFilters}
          variant="ghost"
          className="w-full rounded-full text-sm font-medium py-2 h-8 text-gray-600 hover:text-black"
        >
          Reset to Default
        </Button>
      </div>
    </>
  );
};

export default Filters;

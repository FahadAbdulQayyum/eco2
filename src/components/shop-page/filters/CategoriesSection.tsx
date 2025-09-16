"use client";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { setCategory } from "@/lib/features/shop/shopSlice";

type Category = {
  title: string;
  slug: string;
  value: string;
};

const categoriesData: Category[] = [
  {
    title: "Shoes",
    slug: "/shop?category=shoes",
    value: "shoes",
  },
  {
    title: "Shirts",
    slug: "/shop?category=clothes",
    value: "clothes",
  },
  {
    title: "Watches",
    slug: "/shop?category=watches",
    value: "watches",
  },
];

const CategoriesSection = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector((state) => state.shop.filters.category);

  const handleCategoryClick = (categoryValue: string) => {
    if (selectedCategory === categoryValue) {
      dispatch(setCategory(null)); // Deselect if already selected
    } else {
      dispatch(setCategory(categoryValue));
    }
  };

  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      <h3 className="text-black font-bold text-xl mb-3">Categories</h3>
      {categoriesData.map((category, idx) => (
        <button
          key={idx}
          onClick={() => handleCategoryClick(category.value)}
          className={`flex items-center justify-between py-2 text-left w-full transition-colors ${
            selectedCategory === category.value 
              ? "text-black font-medium" 
              : "hover:text-black/80"
          }`}
        >
          {category.title} 
          <MdKeyboardArrowRight />
        </button>
      ))}
    </div>
  );
};

export default CategoriesSection;

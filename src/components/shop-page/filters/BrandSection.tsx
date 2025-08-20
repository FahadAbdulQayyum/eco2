"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { setBrands } from "@/lib/features/shop/shopSlice";

const BrandSection = () => {
  const dispatch = useAppDispatch();
  const selectedBrands = useAppSelector((state) => state.shop.filters.brands);

  const brandOptions = [
    "Nike",
    "Adidas",
    "Puma",
    "Reebok",
    "New Balance",
    "Asics",
    "Vans",
    "Converse",
    "Skechers",
  ];

  const handleBrandClick = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      dispatch(setBrands(selectedBrands.filter((b) => b !== brand)));
    } else {
      dispatch(setBrands([...selectedBrands, brand]));
    }
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-brand">
      <AccordionItem value="filter-brand" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Brand
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex items-center flex-wrap">
            {brandOptions.map((brand, index) => (
              <button
                key={index}
                type="button"
                className={cn([
                  "bg-[#F0F0F0] m-1 flex items-center justify-center px-5 py-2.5 text-sm rounded-full max-h-[39px] transition-colors",
                  selectedBrands.includes(brand) && "bg-black font-medium text-white",
                ])}
                onClick={() => handleBrandClick(brand)}
              >
                {brand}
              </button>
            ))}
          </div>
          {selectedBrands.length > 0 && (
            <div className="mt-3 text-sm text-gray-600">
              Selected: {selectedBrands.join(", ")}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BrandSection;



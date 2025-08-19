"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { setSizes } from "@/lib/features/shop/shopSlice";

const SizeSection = () => {
  const dispatch = useAppDispatch();
  const selectedSizes = useAppSelector((state) => state.shop.filters.sizes);

  const sizeOptions = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];

  const handleSizeClick = (size: string) => {
    if (selectedSizes.includes(size)) {
      // Remove size if already selected
      dispatch(setSizes(selectedSizes.filter(s => s !== size)));
    } else {
      // Add size to selection
      dispatch(setSizes([...selectedSizes, size]));
    }
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-size">
      <AccordionItem value="filter-size" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Size
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex items-center flex-wrap">
            {sizeOptions.map((size, index) => (
              <button
                key={index}
                type="button"
                className={cn([
                  "bg-[#F0F0F0] m-1 flex items-center justify-center px-5 py-2.5 text-sm rounded-full max-h-[39px] transition-colors",
                  selectedSizes.includes(size) && "bg-black font-medium text-white",
                ])}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>
          {selectedSizes.length > 0 && (
            <div className="mt-3 text-sm text-gray-600">
              Selected: {selectedSizes.join(", ")}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SizeSection;

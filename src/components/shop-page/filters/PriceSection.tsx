"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { setPriceRange } from "@/lib/features/shop/shopSlice";

const PriceSection = () => {
  const dispatch = useAppDispatch();
  const priceRange = useAppSelector((state) => state.shop.filters.priceRange);

  const handlePriceChange = (value: number[]) => {
    dispatch(setPriceRange([value[0], value[1]]);
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Price
        </AccordionTrigger>
        <AccordionContent className="pt-4" contentClassName="overflow-visible">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={250}
            step={1}
            label="$"
          />
          <div className="mt-3 text-sm text-gray-600">
            ${priceRange[0]} - ${priceRange[1]}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;

"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoMdCheckmark } from "react-icons/io";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { setColors } from "@/lib/features/shop/shopSlice";

const ColorsSection = () => {
  const dispatch = useAppDispatch();
  const selectedColors = useAppSelector((state) => state.shop.filters.colors);

  const colorOptions = [
    { value: "green", class: "bg-green-600" },
    { value: "red", class: "bg-red-600" },
    { value: "yellow", class: "bg-yellow-300" },
    { value: "orange", class: "bg-orange-600" },
    { value: "cyan", class: "bg-cyan-400" },
    { value: "blue", class: "bg-blue-600" },
    { value: "purple", class: "bg-purple-600" },
    { value: "pink", class: "bg-pink-600" },
    { value: "white", class: "bg-white" },
    { value: "black", class: "bg-black" },
  ];

  const handleColorClick = (colorValue: string) => {
    if (selectedColors.includes(colorValue)) {
      // Remove color if already selected
      dispatch(setColors(selectedColors.filter(c => c !== colorValue)));
    } else {
      // Add color to selection
      dispatch(setColors([...selectedColors, colorValue]));
    }
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-colors">
      <AccordionItem value="filter-colors" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Colors
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex space-2.5 flex-wrap md:grid grid-cols-5 gap-2.5">
            {colorOptions.map((color, index) => (
              <button
                key={index}
                type="button"
                className={cn([
                  color.class,
                  "rounded-full w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center border border-black/20 transition-transform hover:scale-110",
                ])}
                onClick={() => handleColorClick(color.value)}
                title={color.value}
              >
                {selectedColors.includes(color.value) && (
                  <IoMdCheckmark className="text-base text-white" />
                )}
              </button>
            ))}
          </div>
          {selectedColors.length > 0 && (
            <div className="mt-3 text-sm text-gray-600">
              Selected: {selectedColors.join(", ")}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColorsSection;

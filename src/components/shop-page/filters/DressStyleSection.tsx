"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { setDressStyle } from "@/lib/features/shop/shopSlice";

type DressStyle = {
  title: string;
  value: string;
};

const dressStylesData: DressStyle[] = [
  {
    title: "Lifestyle",
    value: "lifestyle",
  },
  {
    title: "Performance",
    value: "performance",
  },
  {
    title: "Outdoor",
    value: "outdoor",
  },
  {
    title: "Formal",
    value: "formal",
  },
];

const DressStyleSection = () => {
  const dispatch = useAppDispatch();
  const selectedDressStyle = useAppSelector((state) => state.shop.filters.dressStyle);

  const handleDressStyleClick = (styleValue: string) => {
    if (selectedDressStyle === styleValue) {
      dispatch(setDressStyle(null)); // Deselect if already selected
    } else {
      dispatch(setDressStyle(styleValue));
    }
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-style">
      <AccordionItem value="filter-style" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Shoe Style
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col text-black/60 space-y-0.5">
            {dressStylesData.map((dStyle, idx) => (
              <button
                key={idx}
                onClick={() => handleDressStyleClick(dStyle.value)}
                className={`flex items-center justify-between py-2 text-left w-full transition-colors ${
                  selectedDressStyle === dStyle.value 
                    ? "text-black font-medium" 
                    : "hover:text-black/80"
                }`}
              >
                {dStyle.title} <MdKeyboardArrowRight />
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DressStyleSection;

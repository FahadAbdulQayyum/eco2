import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const faqsData: FaqItem[] = [
  {
    question: "What materials are the shoes made from?",
    answer:
      "Provide details about the upper (e.g., leather, mesh, knit), midsole cushioning, outsole rubber, and any special technologies.",
  },
  {
    question: "How do I care for these shoes?",
    answer:
      "Outline cleaning tips (e.g., wipe with damp cloth, use mild soap), drying guidelines, and storage recommendations.",
  },
  {
    question: "What type of cushioning and support do these shoes provide?",
    answer:
      "Explain midsole foam, air units, arch support, heel counter, and overall stability or flexibility.",
  },
  {
    question: "Are these shoes unisex or designed for specific genders?",
    answer:
      "Indicate whether the shoes are unisex or targeted towards a particular gender.",
  },
  {
    question: "What are the shipping options and costs?",
    answer:
      "Provide information about shipping methods, estimated delivery times, and associated fees.",
  },
  {
    question: "What is the return policy for these shoes?",
    answer:
      "Outline the return window, conditions, and refund or exchange procedures.",
  },
];

const FaqContent = () => {
  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Frequently asked questions
      </h3>
      <Accordion type="single" collapsible>
        {faqsData.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqContent;

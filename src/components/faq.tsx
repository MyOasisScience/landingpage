import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

interface FaqAccordionProps {
  className?: string;
  id?: string;
}

// FAQ data object
const questions = [
  {
    id: "item-1",
    question: "What kinds of topics can I ask about?",
    answer: (
      <>
        <p>
          Anything with a scientific angle: climate, behavior, health, tech, and more.
        </p>
      </>
    ),
  },
  {
    id: "item-2",
    question: "How fast is turnaround?",
    answer: (
      <>
        <p>
          Basic briefs in 2–4 days. Deeper consulting by request.
        </p>
      </>
    ),
  },
  {
    id: "item-3",
    question: "Who writes the briefs?",
    answer: (
      <>
        <p>
          We blend AI with expert editors. Every report is reviewed by a human.
        </p>
      </>
    ),
  },
  {
    id: "item-4",
    question: "Can I try it before subscribing?",
    answer: (
      <>
        <p>
          Yes! Start with the free TikTok digest or join the early access list for samples.
        </p>
      </>
    ),
  },
];

export function FaqAccordion({ className = "", id }: FaqAccordionProps) {
  return (
    <div id={id} className={`max-w-6xl mx-auto px-5 py-24 ${className}`}>
      <h2 className="font-logo text-3xl font-medium text-neutral-900 mb-12">
        You may be wondering...
      </h2>
      <Accordion
        type="single"
        collapsible
        className="border-b border-neutral-800"
      >
        {questions.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="font-logo text-4xl font-normal">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

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
    question: "Who is Lagels for?",
    answer: (
      <>
        <p>
          We&apos;ve built Lagels as a single platform for all your legal needs,
          starting with a tailored solution for sole traders and
          micro-companies. As we grow, Lagels will expand to support a diverse
          set of legal needs for individuals and small businesses.
        </p>
        <p className="mt-4">
          If you have a particular legal issue you&apos;re needing assistance with,
          we&apos;d love to hear from you! Contact us at{" "}
          <a href="mailto:hello@lagels.com" className="text-brand-400">
            hello@lagels.com
          </a>
          , and{" "}
          <a href="https://x.com/trylagels" className="text-brand-400">
            follow us on socials
          </a>{" "}
          for the latest updates.
        </p>
      </>
    ),
  },
  {
    id: "item-2",
    question: "Have we released our product yet?",
    answer: (
      <>
        Legal support can be sensitive, so it&apos;s critical for us to get the
        product right. We&apos;re now working to refine the platform. Be the first to
        know when we launch by{" "}
        <a href="#signup" className="text-brand-400">
          registering for the beta.
        </a>
      </>
    ),
  },
  {
    id: "item-3",
    question: "What's the pricing?",
    answer: (
      <>
        At Lagels, we empower our clients with flexible pricing options tailored
        to their needs, ensuring anyone can access top-quality legal support. We&apos;ll be considering both subscription and pay-as-you-go models, with the goal of ensuring our platform can be accessible to everyone.
      </>
    ),
  },
  {
    id: "item-4",
    question: "I'm a legal professional. How can I get involved?",
    answer: (
      <>
        We&apos;re looking for forward-thinking legal professionals to join our
        beta program. Your insights will help shape the future of legal
        services. If you&apos;re interested in being part of this journey,{" "}
        <a href="#signup" className="text-brand-400">
          Join the beta
        </a>{" "}
        or reach out to us directly.
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

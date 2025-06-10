import { FaqAccordion } from "@/components/faq";
import AnimatedText from "@/components/animated-text";
import "react-tooltip/dist/react-tooltip.css";
import { WaitlistCard } from "@/components/waitlist-card";
import Hero from "@/components/hero";
import Product from "@/components/product";
import ExplanationCard from "@/components/explanationCard";
import ExplanationQuestions from "@/components/explanationQuestions";
export default function Home() {
  return (
    <div className="w-full z-10">
      <Hero />
      <ExplanationQuestions />
      <ExplanationCard />
      <AnimatedText>
        <Product />
      </AnimatedText>
      <div className="pt-12" id="waitlist">
        <AnimatedText>
          <WaitlistCard />
        </AnimatedText>
      </div>
      <div id="faq">
        <AnimatedText>
          <FaqAccordion />
        </AnimatedText>
      </div>
    </div>
  );
}

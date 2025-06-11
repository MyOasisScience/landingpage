import AnimatedText from "@/components/animated-text";
import "react-tooltip/dist/react-tooltip.css";
import { WaitlistCard } from "@/components/waitlist-card";
import Hero from "@/components/hero";
import HowItWorks from "@/components/howitworks";
import ClientSubheadingWrapper from "@/components/ClientSubheadingWrapper";

export default function Home() {
  return (
    <div className="w-full z-10">
      <Hero />
      <ClientSubheadingWrapper />
      <AnimatedText>
        <HowItWorks />
      </AnimatedText>
      <div className="pt-6" id="waitlist">
        <AnimatedText>
          <WaitlistCard />
        </AnimatedText>
      </div>
    </div>
  );
}

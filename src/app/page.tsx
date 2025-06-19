import AnimatedText from "@/components/animations/animated-text";
import "react-tooltip/dist/react-tooltip.css";
import { PaymentCard } from "@/components/payment-card";
import Hero from "@/components/hero";
import HowItWorks from "@/components/howitworks";
import AboutUs from "@/components/aboutus";
import ContactUs from "@/components/contactus";
import ClientSubheadingWrapper from "@/components/ClientSubheadingWrapper";
import TrustedBy from "@/components/trusted-by";

export default function Home() {
  return (
    <div className="w-full z-10">
      <Hero />
      <ClientSubheadingWrapper />
      <TrustedBy />
      <div className="pt-6" id="payment">
        <AnimatedText>
          <PaymentCard />
        </AnimatedText>
      </div>
      <AnimatedText>
        <HowItWorks />
      </AnimatedText>
      <AnimatedText>
        <AboutUs />
      </AnimatedText>
      <AnimatedText>
        <ContactUs />
      </AnimatedText>
    </div>
  );
}

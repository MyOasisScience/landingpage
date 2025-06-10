import AnimatedText from "@/components/animated-text";
import "react-tooltip/dist/react-tooltip.css";

//Google Analytics
export default function About() {
  return (
    <div className="w-full z-10">
      {/* Centered Hero Mission Statement */}
      <div className="w-full flex flex-col items-center justify-center pt-32 pb-8 px-4">
        <h1 className="font-logo text-4xl md:text-6xl font-medium text-center text-brand-900 max-w-3xl mb-4">
          We translate the law into something accessible, affordable, and
          effortless.
        </h1>
        <p className="text-lg md:text-2xl text-neutral-700 text-center max-w-2xl">
          Our mission is to empower individuals and small businesses with
          instant, expert legal guidance—no barriers, no stress.
        </p>
      </div>

      {/* Main Centered Card */}
      <div className="w-full flex justify-center mb-12 px-2">
        <div className="w-full max-w-3xl rounded-3xl bg-[#F9FAFB] border border-neutral-200 p-8 md:p-12 shadow-sm text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-brand-900 mb-4">
            Legal help, when you need it most
          </h2>
          <p className="text-neutral-700 text-lg md:text-xl">
            Whether you&apos;re facing a contract, a dispute, or just need advice,
            Oasis is here to help. Get answers fast, stay protected, and focus
            on what matters most.
          </p>
        </div>
      </div>
      <div className="flex justify-between gap-8 m-4">
        <div className="flex-1 max-w-3xl">
          <AnimatedText>
            <h2 className="font-logo text-left text-semibold text-3xl text-brand-900">
              Half of the UK recieves no legal advice whatsoever on matters
              requiring it. Worse yet, people are turning to ChatGPT and other
              unqualified sources for advice.
            </h2>
          </AnimatedText>
        </div>
        <div className="flex-1 max-w-2xl">
          <AnimatedText>
            <p className="text-gray-900">
              We believe that everyone should have access to legal advice.
              Unnessary legal risks and a lack of legal support are a major
              cause of stress and anxiety in the UK. Stop worrying about the law
              and focus on what really matters.
            </p>
          </AnimatedText>
        </div>
      </div>
    </div>
  );
}

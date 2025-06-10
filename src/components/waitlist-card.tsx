import WaitlistForm from "./waitlist-form";
import { PulseChip } from "./ui/PulseChip";

export function WaitlistCard() {
  return (
    <div className="relative max-w-7xl mx-auto w-[calc(100%-1rem)] sm:w-full px-2 sm:px-4 sm:my-24 rounded-3xl overflow-hidden">
      {/* Unicorn Studio Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div
          className="unicorn-embed w-full h-full"
          data-us-project="Lc1vntWoZEyvpGS2N7W0"
          data-us-scale="1"
          data-us-dpi="1.5"
          data-us-lazyload="true"
          data-us-disablemobile="true"
          data-us-alttext="Waitlist Background"
          data-us-arialabel="Decorative background pattern"
        ></div>
      </div>
      {/* Card Content */}
      <div className="relative z-10 p-8 md:p-12 rounded-3xl">
        {/* Status Chip */}
        <div className="flex justify-center mb-8">
          <PulseChip text="Coming soon" color="orange" />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-logo text-4xl md:text-5xl font-medium mb-4 tracking-tighter">
            Get science you can use. Without the noise.
          </h2>
          <p className="text-neutral-700 text-lg">
            Join the waitlist for early access to our scientific briefings platform.
          </p>
        </div>

        {/* Waitlist Form */}
        <WaitlistForm 
          containerClassName="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          inputClassName="flex-1"
          buttonClassName="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-brand-50"
        />
      </div>
    </div>
  );
}

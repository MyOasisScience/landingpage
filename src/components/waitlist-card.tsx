import WaitlistForm from "./waitlist-form";
import { PulseChip } from "./ui/PulseChip";

export function WaitlistCard() {
  return (
    <div className="relative max-w-7xl mx-auto w-[calc(100%-1rem)] sm:w-full px-2 sm:px-4 sm:my-8 rounded-3xl overflow-hidden">
      {/* Card Content */}
      <div className="relative z-10 p-8 md:p-12 rounded-3xl">
        {/* Status Chip */}
        <div className="flex justify-center mb-8">
          <PulseChip text="Coming soon" />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-logo text-xl md:text-3xl font-medium mb-4 tracking-tighter">
            Get science you can use. Without the noise.
          </h2>
          <p className="text-neutral-700 text-sm">
            Join the waitlist for early access to our scientific briefings platform.
          </p>
        </div>

        {/* Waitlist Form */}
        <WaitlistForm 
          containerClassName="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          inputClassName="flex-1"
        />
      </div>
    </div>
  );
}

import { PulseChip } from "./ui/PulseChip";

export function PaymentCard() {
  return (
    <div className="relative max-w-7xl mx-auto w-[calc(100%-1rem)] sm:w-full px-2 sm:px-4 sm:my-8 rounded-3xl overflow-hidden">
      {/* Card Content */}
      <div className="relative z-10 p-8 md:p-12 rounded-3xl">
        {/* Status Chip */}
        <div className="flex justify-center mb-8">
          <PulseChip text="Limited time offer" />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-logo text-2xl md:text-4xl font-medium mb-4 tracking-tighter">
            Want 50% off your first year?
          </h2>
          <p className="text-neutral-700 text-base mb-6">
            Pre-order your annual subscription now for just £60 and become a Founding Member.
          </p>
        </div>

        {/* Benefits List */}
        <div className="max-w-md mx-auto mb-8">
          <ul className="space-y-4 text-neutral-700 text-base">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              Priority access at launch
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              50% off your first year (normally £120)
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              A chance to help shape the platform as we build
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a 
            href="https://buy.stripe.com/6oUbJ06TTbyf52BcRU1ck00"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-3 rounded-full text-[#2B3D3B] font-medium
                     bg-[#C6FF00] hover:bg-[#B2E600]
                     active:bg-[#9ECC00]
                     border border-[#C6FF00]/50
                     shadow-[0_4px_10px_rgba(0,0,0,0.15)] 
                     hover:shadow-[0_6px_15px_rgba(0,0,0,0.25)] 
                     active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]
                     transition-all duration-200
                     active:translate-y-0.5"
          >
            <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
              Pre-order Now – £60 for 1st year
            </span>
            <span
              className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/5 opacity-50 
                      group-hover:opacity-80 group-active:opacity-30 rounded-full"
            ></span>
            <span
              className="absolute inset-0 border-t border-white/20 rounded-full group-active:opacity-0"
            ></span>
            <span
              className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-[#C6FF00]/50 to-[#B2E600]/50 opacity-0 
                       group-hover:opacity-100 -z-10 group-active:opacity-0 transition-opacity"
            ></span>
          </a>
        </div>

        {/* Note */}
        <p className="text-center text-xs text-neutral-600 mt-6">
          💡 Your early support funds the beta and locks in your discount for launch.
        </p>
      </div>
    </div>
  );
} 
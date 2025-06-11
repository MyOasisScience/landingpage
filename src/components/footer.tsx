import Image from "next/image";

export function Footer() {
  return (
    <footer className="font-mono relative bg-[#F3F2ED] text-brand-50 border-t border-brand-300/20 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left side */}
          <div className="text-xs text-[#1B4D3E]">
            MyOasis.science — science translated for action
          </div>
          
          {/* Right side */}
          <div className="text-xs text-[#1B4D3E]/80">
            v0.3.2 beta • Last update: June 2025
          </div>
        </div>
      </div>
    </footer>
  );
}
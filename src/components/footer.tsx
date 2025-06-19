export function Footer() {
  return (
    <footer className="font-mono relative bg-[#F3F2ED] text-brand-50 border-t border-brand-300/20 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left side */}
          <div className="text-[11px] text-[#1B4D3E]">
            MyOasis.science — curated science translated for action
          </div>
          
          {/* Right side */}
          <div className="text-[11px] text-[#1B4D3E]/80 text-right">
            <div>v0.1.2 beta • Last update: June 2025</div>
            <div>hello@myoasis.science</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
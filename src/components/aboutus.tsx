"use client";

export default function AboutUs() {
  return (
    <section className="w-full justify-center px-4 mt-16 pb-16">
      <div className="w-full flex flex-col items-center mx-auto gap-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-logo text-2xl md:text-3xl lg:text-4xl font-medium text-[#2B3D3B] mb-8">
            About us
          </h2>
        </div>

        {/* Content */}
        <div className="text-center lg:text-left max-w-3xl">
          <p className="text-sm text-[#444444] mb-6 leading-relaxed">
            Hi! We&apos;re three long-time friends from Imperial College London:
          </p>
          
          <ul className="text-sm text-[#444444] mb-8 space-y-2 leading-relaxed">
            <li>
              <strong>
                <a 
                  href="https://www.linkedin.com/in/george-fry/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#2B3D3B] hover:text-[#1A2A28] underline decoration-[#C6FF00] hover:decoration-[#B2E600] transition-colors"
                >
                  George
                </a>
              </strong> is a machine learning and data scientist, formerly at Anglo American.
            </li>
            <li>
              <strong>
                <a 
                  href="https://www.linkedin.com/in/william-veness-9512a6119/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#2B3D3B] hover:text-[#1A2A28] underline decoration-[#C6FF00] hover:decoration-[#B2E600] transition-colors"
                >
                  Will
                </a>
              </strong> is a postdoctoral researcher focused on water, climate, and disaster risk (he never left Imperial).
            </li>
            <li>
              <strong>
                <a 
                  href="https://www.linkedin.com/in/jack-dunning/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#2B3D3B] hover:text-[#1A2A28] underline decoration-[#C6FF00] hover:decoration-[#B2E600] transition-colors"
                >
                  Jack
                </a>
              </strong> builds commercial teams in early-stage startups and is an ex-founder.
            </li>
          </ul>

          <p className="text-sm text-[#444444] mb-6 leading-relaxed">
            This project began with a simple frustration we all shared: staying on top of scientific research and emerging trends is hard. Especially when the pace of change is accelerating. And especially now with with AI flooding every feed with content, it&apos;s only getting harder to know what to pay attention to and what actually matters.
          </p>

          <p className="text-sm text-[#444444] mb-6 leading-relaxed">
            We don&apos;t think the world needs another platform. But it <em>does</em> need more <strong>personalisation</strong>.
          </p>

          <p className="text-sm text-[#444444] mb-6 leading-relaxed">
            That&apos;s what we&apos;re building: a newsletter that cuts through the noise and delivers the exact research and insight that actually matters to your work. No more relying on your network or endlessly scrolling through Reddit, X, or Bluesky.
          </p>

          <p className="text-sm text-[#444444] mb-8 leading-relaxed">
            If that resonates with you, we&apos;d love for you to support the mission and become a Founding Member.
          </p>

          <p className="text-sm text-[#444444] mb-12 leading-relaxed">
            We&apos;re excited to build this with you!
          </p>

          {/* CTA Button */}
          <div className="w-full flex justify-center">
            <a 
              href="https://buy.stripe.com/6oUbJ06TTbyf52BcRU1ck00"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block group relative px-8 py-3 rounded-full text-[#2B3D3B] font-medium
                       bg-[#C6FF00] hover:bg-[#B2E600]
                       active:bg-[#9ECC00]
                       border border-[#C6FF00]/50
                       shadow-[0_4px_10px_rgba(0,0,0,0.15)] 
                       hover:shadow-[0_6px_15px_rgba(0,0,0,0.25)] 
                       active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]
                       transition-all duration-200
                       active:translate-y-0.5"
            >
              <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] text-center block">
                Become a Founding Member
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
        </div>
      </div>
    </section>
  );
}

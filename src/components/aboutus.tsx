"use client";

export default function AboutUs() {
  return (
    <div className="w-full">
      <div className="text-center lg:text-left max-w-3xl mx-auto">
        <p className="text-sm text-gray-800 mb-6 leading-relaxed">
          Hi! We&apos;re three long-time friends from Imperial College London:
        </p>
        
        <ul className="text-sm text-gray-800 mb-8 space-y-2 leading-relaxed">
          <li>
            <strong>
              <a 
                href="https://www.linkedin.com/in/george-fry/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-700 underline decoration-[#C6FF00] hover:decoration-[#B2E600] transition-colors"
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
                className="text-gray-900 hover:text-gray-700 underline decoration-[#C6FF00] hover:decoration-[#B2E600] transition-colors"
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
                className="text-gray-900 hover:text-gray-700 underline decoration-[#C6FF00] hover:decoration-[#B2E600] transition-colors"
              >
                Jack
              </a>
            </strong> builds commercial teams in early-stage startups and is an ex-founder.
          </li>
        </ul>

        <p className="text-sm text-gray-800 mb-6 leading-relaxed">
          This project began with a simple frustration we all shared: staying on top of scientific research and emerging trends is hard. Especially when the pace of change is accelerating. And especially now with with AI flooding every feed with content, it&apos;s only getting harder to know what to pay attention to and what actually matters.
        </p>

        <p className="text-sm text-gray-800 mb-6 leading-relaxed">
          We don&apos;t think the world needs another platform. But it <em>does</em> need more <strong>personalisation</strong>.
        </p>

        <p className="text-sm text-gray-800 mb-6 leading-relaxed">
          That&apos;s what we&apos;re building: a newsletter that cuts through the noise and delivers the exact research and insight that actually matters to your work. No more relying on your network or endlessly scrolling through Reddit, X, or Bluesky.
        </p>

        <p className="text-sm text-gray-800 mb-8 leading-relaxed">
          If that resonates with you, we&apos;d love for you to support the mission and become a Founding Member.
        </p>

        <p className="text-sm text-gray-800 mb-8 leading-relaxed">
          We&apos;re excited to build this with you!
        </p>
      </div>
    </div>
  );
}

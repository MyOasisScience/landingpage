"use client";

import { useState } from "react";

export function PaymentCard() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const stripeLinks = {
    monthly: "https://buy.stripe.com/eVq3cu5PPdGneDb5ps1ck01",
    annual: "https://buy.stripe.com/28E3cufqp6dV8eNf021ck02"
  };

  return (
    <div className="relative max-w-7xl mx-auto w-[calc(100%-1rem)] sm:w-full px-2 sm:px-4 sm:my-8 rounded-3xl overflow-hidden">
      {/* Card Content */}
      <div className="relative z-10 p-8 md:p-12 rounded-3xl">
        {/* Status Chip */}
        <div className="flex justify-center mb-8">
          <h3 className="text-lg md:text-2xl font-medium text-neutral-700 mb-2 text-center">
            Founding Member Access — 50% Off for the first 3 years. 
          </h3>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="text-center mb-3">
            <p className="text-sm text-neutral-600">
              222 out of 250 spots left
            </p>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-[#C6FF00] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((250 - 222) / 250) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-neutral-700 text-sm mb-6">
            Just <strong>£5/month or £50/year</strong>, for the first 3 years.
          </p>
        </div>

        {/* Benefits List */}
        <div className="max-w-md mx-auto mb-8">
          <ul className="space-y-4 text-neutral-700 text-sm">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              Day-one beta access
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              Founder rate — 50% off for 3 yrs
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              Private Discord to steer roadmap
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              100% refund if we don&apos;t launch
            </li>
          </ul>
        </div>

        {/* Plan Selection and CTA Button */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label htmlFor="plan-select-payment" className="text-sm font-medium text-neutral-700">
              Choose your plan:
            </label>
            <select 
              id="plan-select-payment" 
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#C6FF00] focus:border-transparent"
            >
              <option value="monthly">Monthly – £5</option>
              <option value="annual">Annual – £50</option>
            </select>
          </div>
          
          <a 
            href={stripeLinks[selectedPlan as keyof typeof stripeLinks]}
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

        {/* Note */}
        <p className="text-center text-[11px] text-neutral-600 mt-6">
          Note - <strong>You&apos;ll only be billed once today, nothing recurring until we launch.</strong>
          <br />
          If we don&apos;t ship, you&apos;ll get a full refund. No questions asked.
        </p>
      </div>
    </div>
  );
} 
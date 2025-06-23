"use client";

import { useState } from "react";

export function PaymentCard() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const stripeLinks = {
    monthly: "https://buy.stripe.com/eVq3cu5PPdGneDb5ps1ck01",
    annual: "https://buy.stripe.com/28E3cufqp6dV8eNf021ck02"
  };

  return (
    <div className="relative w-full">
      {/* Card Content */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        {/* Status Chip */}
        <div className="flex justify-center mb-6">
          <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-800 mb-2 text-center">
            Founding Member Access — 50% Off for the first 3 years. 
          </h3>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="text-center mb-3">
            <p className="text-sm text-gray-700">
              222 out of 250 spots left
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#C6FF00] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((250 - 222) / 250) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <p className="text-gray-800 text-sm mb-4">
            Just <strong>£5/month or £50/year</strong>, for the first 3 years.
          </p>
        </div>

        {/* Benefits List */}
        <div className="max-w-md mx-auto mb-6">
          <ul className="space-y-3 text-gray-800 text-sm">
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
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <label htmlFor="plan-select-payment" className="text-sm font-medium text-gray-800">
              Choose your plan:
            </label>
            <select 
              id="plan-select-payment" 
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#C6FF00] focus:border-transparent w-full sm:w-auto min-h-[44px]"
            >
              <option value="monthly">Monthly – £5</option>
              <option value="annual">Annual – £50</option>
            </select>
          </div>
          
          <a 
            href={stripeLinks[selectedPlan as keyof typeof stripeLinks]}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 sm:px-8 py-3 rounded-full text-[#2B3D3B] font-medium
                     bg-[#C6FF00] hover:bg-[#B2E600]
                     active:bg-[#9ECC00]
                     border border-[#C6FF00]/50
                     shadow-sm 
                     hover:shadow-md 
                     active:shadow-inner
                     transition-all duration-200
                     active:translate-y-0.5
                     min-h-[44px] flex items-center justify-center w-full sm:w-auto"
          >
            <span className="relative z-10 text-center block">
              Become a Founding Member
            </span>
          </a>
        </div>

        {/* Note */}
        <p className="text-center text-[11px] text-gray-700 mt-4">
          Note - <strong>You&apos;ll only be billed once today, nothing recurring until we launch.</strong>
          <br />
          If we don&apos;t ship, you&apos;ll get a full refund. No questions asked.
        </p>
      </div>
    </div>
  );
} 
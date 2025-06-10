'use client'
import { useState } from "react";

const TABS = [
  {
    label: "Build your workflows",
    content: (
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Left: Large image placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-xs aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
            <span className="text-4xl text-gray-400">🛠️</span>
          </div>
        </div>
        {/* Right: Feature cards */}
        <div className="flex-1 grid gap-4">
          <div className="bg-brand-50/80 rounded-xl p-6 shadow border border-neutral-100">
            <h3 className="font-medium text-lg mb-2">Automate legal tasks</h3>
            <p className="text-neutral-700">Create, manage, and automate your legal workflows with ease.</p>
          </div>
          <div className="bg-brand-50/80 rounded-xl p-6 shadow border border-neutral-100">
            <h3 className="font-medium text-lg mb-2">Custom templates</h3>
            <p className="text-neutral-700">Use or build templates for contracts, advice, and more.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "Curate expertise",
    content: (
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-xs aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
            <span className="text-4xl text-gray-400">📚</span>
          </div>
        </div>
        <div className="flex-1 grid gap-4">
          <div className="bg-brand-50/80 rounded-xl p-6 shadow border border-neutral-100">
            <h3 className="font-medium text-lg mb-2">Expert knowledge base</h3>
            <p className="text-neutral-700">Curate and share legal expertise with your team or clients.</p>
          </div>
          <div className="bg-brand-50/80 rounded-xl p-6 shadow border border-neutral-100">
            <h3 className="font-medium text-lg mb-2">Collaborative tools</h3>
            <p className="text-neutral-700">Work together to refine and expand your legal resources.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "Expand reach",
    content: (
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-xs aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
            <span className="text-4xl text-gray-400">🌍</span>
          </div>
        </div>
        <div className="flex-1 grid gap-4">
          <div className="bg-brand-50/80 rounded-xl p-6 shadow border border-neutral-100">
            <h3 className="font-medium text-lg mb-2">Reach more clients</h3>
            <p className="text-neutral-700">Offer your services to a wider audience with digital tools.</p>
          </div>
          <div className="bg-brand-50/80 rounded-xl p-6 shadow border border-neutral-100">
            <h3 className="font-medium text-lg mb-2">Seamless onboarding</h3>
            <p className="text-neutral-700">Easily onboard and support new clients from anywhere.</p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function Lawyers() {
  const [tab, setTab] = useState(0);

  return (
    <div className="relative font-raleway text-neutral-900 w-full max-w-7xl mx-auto mt-32 px-4 py-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
        {/* Left: Hero Title */}
        <div className="flex-1">
          <h1 className="font-serif text-4xl md:text-6xl font-medium mb-4">
            Your new clients are waiting here<br className="hidden md:block" />
            <span className="block md:inline font-serif italic font-normal">assist them all</span>
          </h1>
        </div>
        {/* Right: Supporting Text + CTA */}
        <div className="flex-1 flex flex-col items-start md:items-end">
          <p className="text-lg md:text-xl mb-6 max-w-md text-neutral-700">
            Use Lagels to scale your practice to more clients, without taking more time. You can focus on the law, and let Lagels handle the rest. Happier clients is our guarantee.
          </p>
          <button className="bg-brand-800 hover:bg-brand-900 text-brand-50 font-semibold px-6 py-3 rounded-xl shadow transition">Book a call with us.</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full border-b border-neutral-200 flex gap-8 mb-2 overflow-x-auto">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            className={`pb-2 px-1 font-medium whitespace-nowrap transition border-b-2 ${tab === i ? 'border-brand-800 text-brand-900' : 'border-transparent text-neutral-500 hover:text-brand-700'}`}
            onClick={() => setTab(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div>{TABS[tab].content}</div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import AnimatedText from "@/components/animations/animated-text";
import "react-tooltip/dist/react-tooltip.css";
import Hero from "@/components/hero";
import AboutUs from "@/components/aboutus";
import ContactUs from "@/components/contactus";
import ClientSubheadingWrapper from "@/components/ClientSubheadingWrapper";
import TrustedBy from "@/components/trusted-by";
import RedditCard from "@/components/reddit-card";
import { PaymentCard } from "@/components/payment-card";
import { PaymentCard as CTA2PaymentCard } from "@/components/CTA2";
import HowItWorksCard from "@/components/HowItWorksCard";

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const subredditSections = [
    { name: "hero", id: "hero", image: "/images/Hero.png" },
    { name: "subheading", id: "subheading", image: "/images/subheading.jpg" },
    { name: "HowItWorks", id: "howitworks", image: "/images/howitworks.webp" },
    { name: "CTA", id: "cta-card", image: "/images/man_calling.jpg" },
    { name: "TrustedBy", id: "trustedby", image: "/images/logocollage.jpg" },
    { name: "About", id: "about", image: "/images/AMA.png" },
    { name: "Oasis4client", id: "oasis4client", image: "/images/4.png" },
    { name: "CTA2", id: "cta2", image: "/images/man_calling.jpg" },
    { name: "Meme", id: "meme", image: "/images/meme_logo.png" },
  ];

  // Filter sections based on search term
  const filteredSections = subredditSections.filter(section =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setSearchTerm(""); // Clear search term after selection
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSearchFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
      setSearchTerm(""); // Clear search term when dropdown closes
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Reddit-style header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="MyOasis.science logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="text-lg font-bold text-gray-900">MyOasis.science</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-4 flex-1 justify-center">
              <div className="max-w-md relative w-full">
                <input 
                  type="text" 
                  placeholder="Search r/MyOasis.science" 
                  value={searchTerm}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C6FF00] focus:border-transparent"
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  onChange={handleSearchChange}
                />
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
                    <div className="py-2">
                      {filteredSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={section.image}
                              alt={`${section.name} icon`}
                              width={16}
                              height={16}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-gray-700">{section.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden sm:block">
              <a 
                href="#cta-card" 
                className="bg-[#C6FF00] text-[#2B3D3B] px-6 py-2 rounded-full text-sm font-medium hover:bg-[#B2E600] transition-colors cursor-pointer whitespace-nowrap"
              >
                Create Newsletter
              </a>
            </div>

            {/* Mobile Burger Menu Button */}
            <button
              className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search r/MyOasis.science" 
                    value={searchTerm}
                    className="w-full px-3 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C6FF00] focus:border-transparent"
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    onChange={handleSearchChange}
                  />
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                      <div className="py-2">
                        {filteredSections.map((section) => (
                          <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={section.image}
                                alt={`${section.name} icon`}
                                width={16}
                                height={16}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-gray-700">{section.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile CTA */}
                <a 
                  href="#cta-card" 
                  className="block w-full bg-[#C6FF00] text-[#2B3D3B] px-6 py-3 rounded-full text-sm font-medium hover:bg-[#B2E600] transition-colors cursor-pointer text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Newsletter
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content before story */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <RedditCard 
          id="hero"
          title=""
          subreddit="hero"
          subredditImage="/images/Hero.png"
          author="MyOasis.science"
          timestamp="2 hours ago"
          upvotes={2047}
          comments={156}
          isSticky={true}
        >
          <Hero />
        </RedditCard>

        {/* Client Subheading */}
        <RedditCard 
          id="subheading"
          subreddit="subheading"
          subredditImage="/images/subheading.jpg"
          author="MyOasis.science"
          timestamp="1 hour ago"
          upvotes={892}
          comments={23}
        >
          <ClientSubheadingWrapper />
        </RedditCard>

        {/* How It Works */}
        <RedditCard 
          id="howitworks"
          title=""
          subreddit="HowItWorks"
          subredditImage="/images/howitworks.webp"
          author="MyOasis.science"
          timestamp="1 hour ago"
          upvotes={1567}
          comments={89}
        >
          <HowItWorksCard />
        </RedditCard>

        {/* CTA Card */}
        <RedditCard 
          id="cta-card"
          title=""
          subreddit="CTA"
          subredditImage="/images/man_calling.jpg"
          author="MyOasis.science"
          timestamp="30 minutes ago"
          upvotes={1234}
          comments={89}
        >
          <AnimatedText>
            <PaymentCard />
          </AnimatedText>
        </RedditCard>

        {/* Trusted By */}
        <RedditCard 
          id="trustedby"
          title=""
          subreddit="TrustedBy"
          subredditImage="/images/logocollage.jpg"
          author="MyOasis.science"
          timestamp="45 minutes ago"
          upvotes={567}
          comments={12}
        >
          <TrustedBy />
        </RedditCard>

        {/* About Us */}
        <RedditCard 
          id="about"
          title="About Our Mission"
          subreddit="About"
          subredditImage="/images/AMA.png"
          author="MyOasis.science"
          timestamp="10 minutes ago"
          upvotes={432}
          comments={18}
        >
          <AnimatedText>
            <AboutUs />
          </AnimatedText>
        </RedditCard>

        {/* Contact Us */}
        <RedditCard 
          id="oasis4client"
          title="Get in Touch"
          subreddit="Oasis4client"
          subredditImage="/images/4.png"
          author="MyOasis.science"
          timestamp="5 minutes ago"
          upvotes={298}
          comments={7}
        >
          <AnimatedText>
            <ContactUs />
          </AnimatedText>
        </RedditCard>

        {/* CTA Card Button */}
        <RedditCard 
          id="cta2"
          title=""
          subreddit="CTA2"
          subredditImage="/images/man_calling.jpg"
          author="MyOasis.science"
          timestamp="27 minutes ago"
          upvotes={869}
          comments={1}
        >
          <AnimatedText>
            <CTA2PaymentCard />
          </AnimatedText>
        </RedditCard>

        {/* Meme Card */}
        <RedditCard 
          id="meme"
          title=""
          subreddit="Meme"
          subredditImage="/images/meme_logo.png"
          author="MyOasis.science"
          timestamp="1 minute ago"
          upvotes={1337}
          comments={42}
        >
          <div className="flex justify-center">
            <Image 
              src="/images/meme.png" 
              alt="Meme" 
              width={500}
              height={300}
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </RedditCard>
      </div>
    </div>
  );
}

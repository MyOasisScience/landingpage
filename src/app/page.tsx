"use client";

import { useState } from "react";
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
import StorySection from "@/components/StorySection";

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const subredditSections = [
    { name: "r/hero", id: "hero" },
    { name: "r/subheading", id: "subheading" },
    { name: "r/CTA", id: "cta-card" },
    { name: "r/TrustedBy", id: "trustedby" },
    { name: "r/AMA", id: "ama" },
    { name: "r/Oasis4client", id: "oasis4client" },
    { name: "r/CTA2", id: "cta2" },
    { name: "r/Meme", id: "meme" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Reddit-style header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
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
            <div className="flex-1 w-full sm:w-auto">
              <div className="max-w-md relative w-full">
                <input 
                  type="text" 
                  placeholder="Search r/MyOasis.science" 
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C6FF00] focus:border-transparent"
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                />
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
                    <div className="py-2">
                      {subredditSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <div className="w-4 h-4 bg-[#C6FF00] rounded-full flex items-center justify-center">
                            <span className="text-[#2B3D3B] text-xs font-bold">r</span>
                          </div>
                          <span className="text-gray-700">{section.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <a 
              href="#cta-card" 
              className="bg-[#C6FF00] text-[#2B3D3B] px-6 py-2 rounded-full text-sm font-medium hover:bg-[#B2E600] transition-colors cursor-pointer whitespace-nowrap"
            >
              Create Newsletter
            </a>
          </div>
        </div>
      </div>

      {/* Content before story */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <RedditCard 
          id="hero"
          title=""
          subreddit="r/hero"
          subredditImage="/images/Hero.webp"
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
          subreddit="r/subheading"
          subredditImage="/images/subheading.jpg"
          author="MyOasis.science"
          timestamp="1 hour ago"
          upvotes={892}
          comments={23}
        >
          <ClientSubheadingWrapper />
        </RedditCard>
      </div>

      {/* Story Section - sticky scrollytelling */}
      <StorySection />

      {/* Content after story */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* CTA Card */}
        <RedditCard 
          id="cta-card"
          title=""
          subreddit="r/CTA"
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
          subreddit="r/TrustedBy"
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
          id="ama"
          title="About Our Mission"
          subreddit="r/AMA"
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
          subreddit="r/Oasis4client"
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
          subreddit="r/CTA2"
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
          subreddit="r/Meme"
          subredditImage="/images/meme.png"
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

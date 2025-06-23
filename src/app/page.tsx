import AnimatedText from "@/components/animations/animated-text";
import "react-tooltip/dist/react-tooltip.css";
import Hero from "@/components/hero";
import AboutUs from "@/components/aboutus";
import ContactUs from "@/components/contactus";
import ClientSubheadingWrapper from "@/components/ClientSubheadingWrapper";
import TrustedBy from "@/components/trusted-by";
import RedditCard from "@/components/reddit-card";
import { PaymentCard } from "@/components/payment-card";
import StorySection from "@/components/StorySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Reddit-style header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#C6FF00] rounded-full flex items-center justify-center">
                <span className="text-[#2B3D3B] text-sm font-bold">r</span>
              </div>
              <span className="text-lg font-bold text-gray-900">MyOasis.science</span>
            </div>
            <div className="flex-1">
              <div className="max-w-md">
                <input 
                  type="text" 
                  placeholder="Search r/MyOasis.science" 
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C6FF00] focus:border-transparent"
                />
              </div>
            </div>
            <button className="bg-[#C6FF00] text-[#2B3D3B] px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#B2E600] transition-colors">
              Create Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Content before story */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <RedditCard 
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
          title=""
          subreddit="r/CTA"
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
          title=""
          subreddit="r/TrustedBy"
          author="MyOasis.science"
          timestamp="45 minutes ago"
          upvotes={567}
          comments={12}
        >
          <TrustedBy />
        </RedditCard>

        {/* About Us */}
        <RedditCard 
          title="About Our Mission"
          subreddit="r/AMA"
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
          title="Get in Touch"
          subreddit="r/Oasis4client"
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
          title=""
          subreddit="r/CTA2"
          author="MyOasis.science"
          timestamp="27 minutes ago"
          upvotes={869}
          comments={1}
        >
          <AnimatedText>
            <PaymentCard />
          </AnimatedText>
        </RedditCard>
      </div>
    </div>
  );
}

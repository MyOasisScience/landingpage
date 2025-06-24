"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface RedditCardProps {
  children: React.ReactNode;
  title?: string;
  author?: string;
  subreddit?: string;
  subredditImage?: string;
  timestamp?: string;
  upvotes?: number;
  comments?: number;
  className?: string;
  id?: string;
}

export default function RedditCard({
  children,
  title,
  subreddit = "MyOasis.science",
  subredditImage,
  className = "",
  id
}: RedditCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`max-w-4xl mx-auto mb-4 ${className}`}
      id={id}
    >
      <div className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Reddit Post Header */}
        <div className="flex items-center p-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            {subredditImage ? (
              <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={subredditImage}
                  alt={`${subreddit} icon`}
                  width={24}
                  height={24}
                  className="w-full h-full object-contain object-center"
                />
              </div>
            ) : (
              <div className="w-6 h-6 bg-[#C6FF00] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#2B3D3B] text-xs font-bold">r</span>
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium text-gray-900">{subreddit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reddit Post Content */}
        <div className="flex">
          {/* Vote Column - just for visual border */}
          <div className="flex flex-col items-center w-10 bg-gray-50 py-2">
            {/* Empty space to maintain visual structure */}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4">
            {title && (
              <h2 className="text-lg font-medium text-gray-900 mb-3">{title}</h2>
            )}
            <div className="text-gray-900">
              {children}
            </div>
          </div>
        </div>

        {/* Reddit Post Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50 gap-3 sm:gap-0">
          {/* Footer content removed - keeping only the styling for card appearance */}
        </div>
      </div>
    </motion.div>
  );
} 
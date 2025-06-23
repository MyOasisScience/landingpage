"use client";

import React, { useState } from "react";
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
  isSticky?: boolean;
  className?: string;
  id?: string;
}

export default function RedditCard({
  children,
  title,
  subreddit = "MyOasis.science",
  subredditImage,
  upvotes = 1337,
  isSticky = false,
  className = "",
  id
}: RedditCardProps) {
  const [voteCount, setVoteCount] = useState(upvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleUpvote = () => {
    if (userVote === 'up') {
      // Remove upvote
      setVoteCount(voteCount - 1);
      setUserVote(null);
    } else if (userVote === 'down') {
      // Change from downvote to upvote
      setVoteCount(voteCount + 2);
      setUserVote('up');
    } else {
      // Add upvote
      setVoteCount(voteCount + 1);
      setUserVote('up');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      // Remove downvote
      setVoteCount(voteCount + 1);
      setUserVote(null);
    } else if (userVote === 'up') {
      // Change from upvote to downvote
      setVoteCount(voteCount - 2);
      setUserVote('down');
    } else {
      // Add downvote
      setVoteCount(voteCount - 1);
      setUserVote('down');
    }
  };

  const formatVoteCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

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
                {isSticky && (
                  <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                    STICKY
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reddit Post Content */}
        <div className="flex">
          {/* Vote Column */}
          <div className="flex flex-col items-center w-10 bg-gray-50 py-2">
            <button 
              onClick={handleUpvote}
              className={`${
                userVote === 'up' 
                  ? 'text-[#9ECC00] scale-110' 
                  : 'text-gray-500 hover:text-[#B2E600] hover:scale-110'
              } transition-all duration-200 p-1 group cursor-pointer`}
            >
              <svg className="w-5 h-5 group-hover:w-6 group-hover:h-6 group-hover:font-bold transition-all duration-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <span className={`text-xs font-medium py-1 transition-colors duration-200 ${
              userVote === 'up' ? 'text-[#8BB800] font-semibold' : userVote === 'down' ? 'text-blue-600' : 'text-gray-900'
            }`}>
              {formatVoteCount(voteCount)}
            </span>
            <button 
              onClick={handleDownvote}
              className={`${
                userVote === 'down' 
                  ? 'text-blue-500 scale-110' 
                  : 'text-gray-500 hover:text-blue-500 hover:scale-110'
              } transition-all duration-200 p-1 group cursor-pointer`}
            >
              <svg className="w-5 h-5 group-hover:w-6 group-hover:h-6 group-hover:font-bold transition-all duration-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
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
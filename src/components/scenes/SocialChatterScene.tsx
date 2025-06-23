import { motion } from "framer-motion"
import Scene from "./Scene"

interface SocialChatterSceneProps {
  scrollProgress?: number
}

export default function SocialChatterScene({ scrollProgress = 0 }: SocialChatterSceneProps) {
  const redditPostEnter = Math.max(0, (scrollProgress - 0.3) / 0.3)

  return (
    <Scene scrollProgress={scrollProgress}>
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-900">
          Track social media discussions and sentiment
        </h2>
        <p className="text-lg text-gray-800 mb-10 text-center">
          We monitor Reddit, X, Bluesky, and other platforms to capture sentiment and emerging discussions.
        </p>

        {/* Social Media UMAP Graph */}
        <div className="relative">
          <img 
            src="/images/Social_media_umap.png" 
            alt="Social Media UMAP Visualization" 
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
          />
          
          {/* Reddit Post appearing from purple node */}
          <motion.div
            className="absolute top-1/2 left-0"
            style={{
              opacity: redditPostEnter,
              scale: redditPostEnter,
              transform: `translate(${redditPostEnter * 80}px, ${redditPostEnter * -20}px)`
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img 
              src="/images/Reddit_influencer_post.png" 
              alt="Reddit Influencer Post" 
              className="w-64 h-auto rounded-lg shadow-xl border-2 border-purple-300"
            />
          </motion.div>
        </div>
      </div>
    </Scene>
  )
}

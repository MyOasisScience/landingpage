import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface ScrollProgressConfig {
  containerRef: React.RefObject<HTMLDivElement | null>;
  sceneCount: number;
}

interface ScrollProgressReturn {
  scrollYProgress: MotionValue<number>;
  sceneVisibility: MotionValue<boolean>[];
  emailAnimation: MotionValue<number>;
  reportAnimation: MotionValue<number>;
  currentScene: number;
  isComponentActive: boolean;
}

export function useScrollProgress({ 
  containerRef, 
  sceneCount 
}: ScrollProgressConfig): ScrollProgressReturn {
  const [currentScene, setCurrentScene] = useState(0);
  const [isComponentActive, setIsComponentActive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Track when component enters viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Handle scroll snapping and scene navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let transitionTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // Check if component is in view and active
      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      
      if (isInView && !isTransitioning) {
        e.preventDefault();
        e.stopPropagation();
        
        setIsComponentActive(true);
        
        // Set transitioning state to prevent rapid scrolling
        setIsTransitioning(true);
        
        // Determine scroll direction and navigate scenes
        if (e.deltaY > 0 && currentScene < sceneCount - 1) {
          // Scroll down to next scene
          setCurrentScene(prev => prev + 1);
        } else if (e.deltaY < 0 && currentScene > 0) {
          // Scroll up to previous scene
          setCurrentScene(prev => prev - 1);
        }
        
        // Reset transitioning state after animation
        transitionTimeout = setTimeout(() => {
          setIsTransitioning(false);
        }, 800); // Match the animation duration
      } else if (!isInView) {
        setIsComponentActive(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      
      if (isInView && !isTransitioning && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ')) {
        e.preventDefault();
        e.stopPropagation();
        
        setIsTransitioning(true);
        
        if (e.key === 'ArrowDown' || e.key === ' ') {
          if (currentScene < sceneCount - 1) {
            setCurrentScene(prev => prev + 1);
          }
        } else if (e.key === 'ArrowUp') {
          if (currentScene > 0) {
            setCurrentScene(prev => prev - 1);
          }
        }
        
        transitionTimeout = setTimeout(() => {
          setIsTransitioning(false);
        }, 800);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      
      if (isInView) {
        setIsComponentActive(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      
      if (isInView && !isTransitioning) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Add event listeners with proper options
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scroll when component is active
    if (isComponentActive) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    }

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (transitionTimeout) clearTimeout(transitionTimeout);
    };
  }, [containerRef, currentScene, sceneCount, isComponentActive, isTransitioning]);

  // Calculate scene visibility based on current scene
  const sceneVisibility = Array.from({ length: sceneCount }, (_, index) => {
    return useTransform(
      scrollYProgress,
      [0, 1],
      [index === currentScene, index === currentScene]
    );
  });

  // Email animation triggers when scene 2 is active
  const emailAnimation = useTransform(
    scrollYProgress,
    [0, 1],
    [currentScene === 1 ? 1 : 0, currentScene === 1 ? 1 : 0]
  );

  // Report animation triggers after email animation
  const reportAnimation = useTransform(
    scrollYProgress,
    [0, 1],
    [currentScene === 1 ? 1 : 0, currentScene === 1 ? 1 : 0]
  );

  return {
    scrollYProgress,
    sceneVisibility,
    emailAnimation,
    reportAnimation,
    currentScene,
    isComponentActive
  };
} 
"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import React, {
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  useRef,
  useState,
  useEffect,
  useMemo,
  memo,
} from "react";

import { cn } from "@/lib/utils";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string | ReactNode[];
  // className will be applied to the root motion.div for styling (font, size, color, layout, etc.)
}

// BlinkingCursor component defined within TextReveal.tsx
const BlinkingCursor: FC = memo(() => (
  <motion.span
    className="inline-block w-[2.5px] bg-blue-500" // Wider, brand-blue (adjust as needed)
    style={{
      height: "1em", // Adjust height to match cap height or x-height as preferred
      verticalAlign: "text-bottom", // Aligns bottom of cursor with bottom of text line
      marginRight: "2px",
    }}
    animate={{ opacity: [1, 0] }}
    transition={{
      duration: 0.55,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "linear",
    }}
  />
));

BlinkingCursor.displayName = "BlinkingCursor";

interface AnimatedProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

// Individual character component to fix hooks rule violation
interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  charStartTime: number;
  charEndTime: number;
  wordEndTime: number;
  index: number;
}

const Character: FC<CharacterProps> = memo(
  ({ char, progress, charStartTime, charEndTime, wordEndTime }) => {
    const opacity = useTransform(
      progress,
      [charStartTime, charEndTime],
      [0, 1]
    );
    const fullyVisibleOpacity = useTransform(
      progress,
      [charEndTime, wordEndTime],
      [1, 1]
    );
    const finalOpacity = useTransform(progress, (v) =>
      v >= charEndTime ? fullyVisibleOpacity.get() : opacity.get()
    );

    return (
      <motion.span
        style={{ opacity: finalOpacity, display: "inline-block" }}
        className={cn("relative mr-[0.01em]")}
      >
        {char}
      </motion.span>
    );
  }
);

Character.displayName = "Character";

const WordAnimator: FC<AnimatedProps> = memo(
  ({ children, progress, range }) => {
    const word = children as string;
    const characters = word.split("");
    const wordDuration = range[1] - range[0];
    const charRevealDurationFactor = 0.8;
    const revealSegmentDuration = wordDuration * charRevealDurationFactor;

    // Process characters in larger batches for better performance
    const characterElements = useMemo(() => {
      return characters.map((char, i) => {
        const charStartTime =
          range[0] + revealSegmentDuration * (i / characters.length);
        const charEndTime =
          range[0] + revealSegmentDuration * ((i + 1) / characters.length);

        return (
          <Character
            key={i}
            char={char}
            progress={progress}
            charStartTime={charStartTime}
            charEndTime={charEndTime}
            wordEndTime={range[1]}
            index={i}
          />
        );
      });
    }, [characters, progress, range, revealSegmentDuration]);

    return (
      <motion.span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        {characterElements}
      </motion.span>
    );
  }
);

WordAnimator.displayName = "WordAnimator";

const SpaceAnimator: FC<AnimatedProps> = memo(
  ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
      <motion.span
        style={{ opacity, display: "inline-block", whiteSpace: "pre" }}
      >
        {children}
      </motion.span>
    );
  }
);

SpaceAnimator.displayName = "SpaceAnimator";

const ElementAnimator: FC<AnimatedProps> = memo(
  ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
      <motion.div style={{ opacity }} className="w-fit">
        {children}
      </motion.div>
    );
  }
);

ElementAnimator.displayName = "ElementAnimator";

const BreakElement: FC<AnimatedProps> = memo(
  ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0.01, 1]); // Quick fade-in for the break effect
    return (
      <motion.div
        className="w-full h-12" // Takes full width to force wrap, height 0 as <br> handles space
        style={{ opacity }}
        aria-hidden="true"
      >
        {children} {/* This will render the <br /> tag */}
      </motion.div>
    );
  }
);

BreakElement.displayName = "BreakElement";

// Define a more type-safe throttle function
function throttle<Args extends unknown[], R>(
  func: (this: unknown, ...args: Args) => R,
  limit: number
): (this: unknown, ...args: Args) => R {
  let inThrottle = false;
  let lastResult: R | undefined;
  
  return function(this: unknown, ...args: Args): R {
    if (!inThrottle) {
      lastResult = func.apply(this, args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
    // Since the function might not run if throttled, we need to handle the undefined case.
    // Returning undefined might be better, but assuming the original func always returns R,
    // and the first call sets lastResult, we cast here. Consider implications.
    return lastResult as R; 
  };
}

export const TextReveal: FC<TextRevealProps> = memo(
  ({ children, className }) => {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start 0.95", "start 0.15"],
    });

    // Process content once using useMemo
    const { items } = useMemo(() => {
      const generatedItems: Array<{
        type: "word" | "space" | "element" | "break";
        content: ReactNode;
      }> = [];

      const processNodes = (nodesToProcess: ReactNode | ReactNode[]) => {
        const nodesArray = Array.isArray(nodesToProcess)
          ? nodesToProcess
          : [nodesToProcess];
        nodesArray.forEach((node) => {
          if (typeof node === "string") {
            const parts = node.split(/(\s+)/).filter(Boolean); // Split by spaces, keep spaces, filter empty
            parts.forEach((part) => {
              if (part.match(/^\s+$/)) {
                generatedItems.push({ type: "space", content: part });
              } else {
                generatedItems.push({ type: "word", content: part });
              }
            });
          } else if (React.isValidElement(node) && node.type === "br") {
            generatedItems.push({ type: "break", content: node });
          } else if (node !== null && node !== undefined) {
            generatedItems.push({ type: "element", content: node });
          }
        });
      };

      processNodes(children);
      return { items: generatedItems };
    }, [children]);

    const [effectiveCursorPos, setEffectiveCursorPos] = useState(0);

    // Optimize scroll event handling with throttling
    useEffect(() => {
      const handleScrollProgress = throttle((latest: number) => {
        let pos = 0;
        if (items.length > 0) {
          if (latest <= 0.001) pos = 0;
          else if (latest >= 0.999) pos = items.length;
          else pos = Math.round(latest * items.length);
        }
        setEffectiveCursorPos(pos);
      }, 50); // 50ms throttle for smoother updates

      const unsubscribe = scrollYProgress.on("change", handleScrollProgress);
      return unsubscribe;
    }, [scrollYProgress, items.length]);

    // Generate elements only when necessary
    const renderedElements = useMemo(() => {
      const result: ReactNode[] = [];

      if (
        items.length === 0 &&
        typeof children !== "string" &&
        (!Array.isArray(children) || children.length === 0)
      ) {
        result.push(<BlinkingCursor key="empty-cursor" />);
      } else {
        if (effectiveCursorPos === 0) {
          result.push(<BlinkingCursor key="cursor-start" />);
        }

        items.forEach((item, i) => {
          const start = i / items.length;
          const end = start + 1 / items.length;
          let ComponentToRender: FC<AnimatedProps>;

          switch (item.type) {
            case "word":
              ComponentToRender = WordAnimator;
              break;
            case "space":
              ComponentToRender = SpaceAnimator;
              break;
            case "break":
              ComponentToRender = BreakElement;
              break;
            case "element":
              ComponentToRender = ElementAnimator;
              break;
            default:
              ComponentToRender = ElementAnimator; // Fallback, should not happen
          }

          result.push(
            <ComponentToRender
              key={`${item.type}-${i}`}
              progress={scrollYProgress}
              range={[start, end]}
            >
              {item.content}
            </ComponentToRender>
          );

          if (effectiveCursorPos === i + 1) {
            result.push(<BlinkingCursor key={`cursor-after-${i}`} />);
          }
        });
      }

      return result;
    }, [items, effectiveCursorPos, scrollYProgress, children]);

    // Use the will-change CSS property to hint to the browser about transforms
    return (
      <motion.div
        ref={targetRef}
        className={cn(
          "flex flex-wrap items-baseline will-change-transform", // Added will-change-transform for GPU hints
          className
        )}
      >
        {renderedElements}
      </motion.div>
    );
  }
);

TextReveal.displayName = "TextReveal";

# Story Scenes.

This directory contains the individual scene components for the MyOasis.science landing page story section.

## Current Architecture

The story section uses a **sticky scrollytelling** pattern with Framer Motion's `useScroll` hook:

- **`StorySection.tsx`** - The main container that manages scroll-based scene transitions
- **Scene Components** - Individual scenes that render based on scroll progress
- **Sticky Container** - Each scene is displayed in a sticky viewport that stays in place while scrolling

## Scene Flow

1. **Scroll Detection**: `StorySection` uses `useScroll` to track scroll progress through the section
2. **Scene Calculation**: Scroll progress (0-1) is mapped to scene indices (0-5)
3. **Scene Rendering**: The active scene is rendered with `AnimatePresence` for smooth transitions

## Scene Components

- **`IntroScene.tsx`** - Introduction to how MyOasis.science works
- **`BuildScene.tsx`** - Building your personalized newsletter
- **`ResearchScene.tsx`** - Research and content curation process
- **`CitationScene.tsx`** - Citation and source management
- **`IndustryScene.tsx`** - Industry-specific customization
- **`ComingSoonScene.tsx`** - Final call-to-action and coming soon message

## Usage

```tsx
import StorySection from "@/components/StorySection";

// In your page component
<StorySection />
```

## Technical Details

- **Section Height**: 6 viewport heights (one per scene)
- **Sticky Positioning**: Top of viewport during scroll
- **Scene Transitions**: Smooth fade transitions with `AnimatePresence`
- **Scroll Progress**: 0-1 mapped to scene indices 0-5 
# Story Overlay System

This directory contains the new story overlay system that provides a smooth, scroll-triggered animation experience.

## Architecture

The new system follows a clean separation of concerns:

### Core Components

- **`StoryTrigger.tsx`** - The Reddit-style card that users scroll to
- **`StoryOverlay.tsx`** - The full-screen overlay that manages the story experience
- **`useStoryController.ts`** - Zustand store for managing story state

### Scene Components

- **`Scene.tsx`** - Base scene component with common animation variants
- **`IntroScene.tsx`** - First scene: "Tell us what you're working on"
- **`BuildScene.tsx`** - Second scene: Email notification and report generation
- **`ComingSoonScene.tsx`** - Final scene: Placeholder for future features

## How It Works

1. **Trigger Detection**: `StoryTrigger` uses `useInView` to detect when the user scrolls to it
2. **State Management**: `useStoryController` manages the global story mode state
3. **Overlay Rendering**: `StoryOverlay` renders as a portal to avoid layout thrashing
4. **Scene Navigation**: Keyboard (arrow keys, space, escape) and wheel events control scene progression
5. **Smooth Transitions**: Each scene has consistent 0.8s duration animations with easeInOut

## Key Improvements Over Previous System

- **Better Performance**: Portal rendering prevents layout recalculation
- **Cleaner State Management**: Centralized Zustand store
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Reduced Motion Support**: Respects user preferences
- **Mobile Friendly**: Touch events and close button
- **SEO Friendly**: Overlay only renders client-side

## Usage

```tsx
// In your page component
import StoryTrigger from "@/components/StoryTrigger";
import StoryOverlay from "@/components/StoryOverlay";

export default function Page() {
  return (
    <>
      {/* Your content */}
      <StoryTrigger />
      {/* More content */}
      
      {/* Overlay at root level */}
      <StoryOverlay />
    </>
  );
}
```

## Adding New Scenes

1. Create a new scene component in `scenes/`
2. Add it to the `sceneMap` array in `StoryOverlay.tsx`
3. Update the scene count in `useStoryController.ts`

## Animation Guidelines

- Use consistent timing: 0.8s duration with easeInOut
- Prefer GPU-friendly transforms (opacity, transform, clip-path)
- Avoid width/height animations inside the overlay
- Use `useReducedMotion()` to respect accessibility preferences 
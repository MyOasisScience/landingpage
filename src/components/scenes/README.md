# Scene Components

This directory contains individual scene components for the ExpandableCard. Each scene represents a step in the process and can be easily added, removed, or modified.

## Structure

- `Scene1.tsx` - "Tell us what you're working on"
- `Scene2.tsx` - "We build your weekly brief" (with email and report animations)
- `Scene3.tsx` - Placeholder for future steps
- `Scene4.tsx` - Example success scene
- `index.ts` - Exports all scene components

## Adding a New Scene

1. **Create the scene component**:
   ```tsx
   import React from "react";
   import { motion } from "framer-motion";

   const fadeInVariants = {
     initial: { opacity: 0 },
     animate: { opacity: 1 },
     exit: { opacity: 0 }
   };

   interface Scene5Props {
     isVisible: boolean;
   }

   export default function Scene5({ isVisible }: Scene5Props) {
     return (
       <motion.div
         variants={fadeInVariants}
         initial="initial"
         animate={isVisible ? "animate" : "initial"}
         exit="exit"
         className="text-center space-y-6"
         role="region"
         aria-label="Step 5: Your new step"
       >
         <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight px-4">
           5. <strong>Your New Step</strong>
         </h1>
         <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto px-4">
           Description of your new step.
         </p>
       </motion.div>
     );
   }
   ```

2. **Add to index.ts**:
   ```tsx
   export { default as Scene5 } from './Scene5';
   ```

3. **Update ExpandableCard.tsx**:
   - Import the new scene
   - Add it to the scene container
   - Update the `sceneCount` in `useScrollProgress`

## Scene Props

All scenes receive:
- `isVisible: boolean` - Whether the scene should be visible based on scroll position

Some scenes (like Scene2) may receive additional props for animations:
- `emailAnimation: MotionValue<number>` - Email animation progress
- `reportAnimation: MotionValue<number>` - Report animation progress

## Best Practices

1. **Accessibility**: Always include proper ARIA labels and roles
2. **Responsive Design**: Use responsive classes for mobile/desktop layouts
3. **Animation**: Use Framer Motion variants for consistent animations
4. **Performance**: Keep animations lightweight and use `aria-hidden` for hidden elements
5. **TypeScript**: Use proper interfaces for props

## Alternative: React Router Approach

For more complex multi-step processes, consider using React Router:

```tsx
// In your main component
<Routes>
  <Route path="/step/1" element={<Scene1 />} />
  <Route path="/step/2" element={<Scene2 />} />
  <Route path="/step/3" element={<Scene3 />} />
</Routes>
```

This approach is better for:
- Deep linking to specific steps
- Browser back/forward navigation
- SEO-friendly URLs
- Complex state management between steps 
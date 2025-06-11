"use client";

import dynamic from "next/dynamic";

// Dynamically import Subheading so it's fully client-side
const Subheading = dynamic(() => import("./subheading"), { ssr: false });

export default function ClientSubheadingWrapper() {
  return <Subheading />;
} 
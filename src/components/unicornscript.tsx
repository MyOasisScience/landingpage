"use client";

import { useEffect } from "react";

export default function UnicornScript() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.UnicornStudio) return;

    const s = document.createElement("script");
    s.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.4/dist/unicornStudio.umd.js";
    s.async = true;
    s.onload = () => window.UnicornStudio?.init().catch(console.error);
    s.onerror = () =>
      console.error("Failed to load UnicornStudio. Check the CDN URL.");

    document.head.appendChild(s);
    return () => {
      window.UnicornStudio?.destroy();
      document.head.removeChild(s);
    };
  }, []);

  return null;
}
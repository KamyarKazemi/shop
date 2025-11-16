import { useEffect, useState } from "react";
import {
  isMobileDevice,
  shouldReduceAnimations,
} from "../utils/performanceOptimization";

export const useAnimationOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [reduceAnimations, setReduceAnimations] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice());
      setReduceAnimations(shouldReduceAnimations());
    };

    // Check on mount
    handleResize();

    // Listen for media query changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMediaChange = () => {
      setReduceAnimations(shouldReduceAnimations());
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    window.addEventListener("resize", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile, reduceAnimations };
};

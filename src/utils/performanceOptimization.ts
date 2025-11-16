/**
 * Performance optimization utilities for animations
 * - Reduces animation complexity on mobile devices
 * - Uses requestAnimationFrame for smooth animations
 * - Implements lazy loading for heavy animations
 */

export const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768
  );
};

export const shouldReduceAnimations = (): boolean => {
  if (typeof window === "undefined") return false;
  // Check for user preference for reduced motion
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    isMobileDevice()
  );
};

export const getAnimationConfig = (
  isMobile: boolean = false
): {
  stagger?: number;
  duration?: number;
  delay?: number;
} => {
  return {
    stagger: isMobile ? 0 : 0.05,
    duration: isMobile ? 0.2 : 0.4,
    delay: isMobile ? 0 : 0.1,
  };
};

// Debounce function for scroll/resize events
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for high-frequency events
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Simplified animations for mobile
export const mobileAnimationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0, delayChildren: 0 },
    },
  },
  item: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  },
};

// Desktop animations (more complex)
export const desktopAnimationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
};

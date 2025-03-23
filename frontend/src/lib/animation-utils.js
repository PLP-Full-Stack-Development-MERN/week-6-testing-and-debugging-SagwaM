import { ReactNode } from "react";

export type AnimationVariant = 
  | "fade-in"
  | "fade-in-up"
  | "fade-in-down"
  | "scale-in"
  | "slide-in-right"
  | "slide-in-left"
  | "none";

export interface AnimationProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number; // in ms
  duration?: number; // in ms
  className?: string;
}

// Helper function to get animation classes based on variant
export const getAnimationClasses = (
  variant: AnimationVariant = "fade-in",
  delay: number = 0,
  duration: number = 300
): string => {
  // Base animation classes
  let classes = `animate-duration-${duration}ms`;
  
  // Add delay class if specified
  if (delay > 0) {
    classes += ` animate-delay-${delay}ms`;
  }
  
  // Add variant-specific classes
  switch (variant) {
    case "fade-in":
      classes += " animate-fade-in";
      break;
    case "fade-in-up":
      classes += " animate-fade-in-up";
      break;
    case "fade-in-down":
      classes += " animate-fade-in-down";
      break;
    case "scale-in":
      classes += " animate-scale-in";
      break;
    case "slide-in-right":
      classes += " animate-slide-in-right";
      break;
    case "slide-in-left":
      classes += " animate-slide-in-left";
      break;
    case "none":
    default:
      return "";
  }
  
  return classes;
};

// Helper to stagger children animations
export const staggeredDelay = (index: number, baseDelay: number = 50): number => {
  return baseDelay * index;
};

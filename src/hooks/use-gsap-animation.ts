
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// A custom hook for applying GSAP animations
export function useGsapAnimation<T extends HTMLElement>(
  animationConfig: {
    animation: gsap.TweenVars;
    delay?: number;
    duration?: number;
    ease?: string;
    repeat?: number;
    paused?: boolean;
    onComplete?: () => void;
  },
  dependencies: any[] = []
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (elementRef.current) {
      const { animation, delay = 0, duration = 0.5, ease = "power2.inOut", repeat = 0, paused = false, onComplete } = animationConfig;
      
      const tween = gsap.to(elementRef.current, {
        ...animation,
        delay,
        duration,
        ease,
        repeat,
        paused,
        onComplete
      });
      
      return () => {
        tween.kill();
      };
    }
  }, dependencies);

  return elementRef;
}

// Create staggered animations for multiple elements
export function useGsapStaggerAnimation<T extends HTMLElement>(
  selector: string,
  animationConfig: {
    animation: gsap.TweenVars;
    stagger?: number;
    delay?: number;
    duration?: number;
    ease?: string;
  },
  dependencies: any[] = []
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(selector);
      const { animation, stagger = 0.1, delay = 0, duration = 0.5, ease = "power2.inOut" } = animationConfig;

      const tween = gsap.to(elements, {
        ...animation,
        stagger,
        delay,
        duration,
        ease
      });

      return () => {
        tween.kill();
      };
    }
  }, dependencies);

  return containerRef;
}

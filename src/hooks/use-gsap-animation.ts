
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

// Hook for animating page entry
export function usePageEntryAnimation<T extends HTMLElement>() {
  const pageRef = useRef<T>(null);

  useEffect(() => {
    if (pageRef.current) {
      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" }
      });

      // Animate the main container
      timeline.from(pageRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6
      });

      // Find and animate child sections with staggered delay
      const sections = pageRef.current.querySelectorAll("section");
      if (sections.length > 0) {
        timeline.from(sections, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.15
        }, "-=0.3");
      }

      return () => {
        timeline.kill();
      };
    }
  }, []);

  return pageRef;
}

// Hook for creating floating/hovering animations
export function useFloatingAnimation<T extends HTMLElement>(
  config: {
    y?: number;
    duration?: number;
    repeat?: number;
    yoyo?: boolean;
    delay?: number;
    ease?: string;
  } = {}
) {
  const elementRef = useRef<T>(null);
  
  useEffect(() => {
    if (elementRef.current) {
      const { 
        y = 10, 
        duration = 2, 
        repeat = -1, 
        yoyo = true,
        delay = 0,
        ease = "sine.inOut" 
      } = config;
      
      const tween = gsap.to(elementRef.current, {
        y: y,
        duration: duration,
        repeat: repeat,
        yoyo: yoyo,
        delay: delay,
        ease: ease
      });
      
      return () => {
        tween.kill();
      };
    }
  }, []);

  return elementRef;
}

// Hook for creating animated counters
export function useCountAnimation(
  startValue: number,
  endValue: number,
  duration: number = 2,
  onUpdate: (value: number) => void
) {
  const valueRef = useRef({ value: startValue });

  useEffect(() => {
    const tween = gsap.to(valueRef.current, {
      value: endValue,
      duration: duration,
      onUpdate: () => onUpdate(Math.round(valueRef.current.value)),
      ease: "power1.inOut"
    });

    return () => {
      tween.kill();
    };
  }, [endValue, duration, onUpdate]);
}

// Hook for creating playful button animations
export function useButtonAnimation<T extends HTMLElement>() {
  const buttonRef = useRef<T>(null);

  useEffect(() => {
    if (buttonRef.current) {
      // Setup hover animations
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.2
        });
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.2
        });
      });

      buttonRef.current.addEventListener('mousedown', () => {
        gsap.to(buttonRef.current, {
          scale: 0.95,
          duration: 0.1
        });
      });

      buttonRef.current.addEventListener('mouseup', () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.1
        });
      });
    }
    
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('mouseenter', () => {});
        buttonRef.current.removeEventListener('mouseleave', () => {});
        buttonRef.current.removeEventListener('mousedown', () => {});
        buttonRef.current.removeEventListener('mouseup', () => {});
      }
    };
  }, []);

  return buttonRef;
}


import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { usePulseAnimation } from "@/hooks/use-gsap-animation";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const { elementRef: pulseRef, applyPulse } = usePulseAnimation<HTMLDivElement>();

  // Avoid hydration mismatch by only rendering after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle theme with animation
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // Animate theme change
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotate: 360,
        scale: 0.6,
        duration: 0.3,
        onComplete: () => {
          setTheme(newTheme);
          gsap.to(iconRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(1, 0.5)"
          });
        }
      });
    } else {
      setTheme(newTheme);
    }
    
    // Apply page transition animation
    const body = document.querySelector('body');
    if (body) {
      gsap.to(body, {
        opacity: 0.8,
        duration: 0.2,
        onComplete: () => {
          gsap.to(body, {
            opacity: 1,
            duration: 0.3
          });
        }
      });
    }
  };

  // Hover animation
  useEffect(() => {
    const button = pulseRef.current;
    if (button) {
      button.addEventListener('mouseenter', applyPulse);
    }
    return () => {
      if (button) {
        button.removeEventListener('mouseenter', applyPulse);
      }
    };
  }, [applyPulse]);

  if (!mounted) return null;

  return (
    <div ref={pulseRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-full"
        aria-label="Toggle theme"
      >
        <div ref={iconRef} className="transition-all">
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </div>
      </Button>
    </div>
  );
}

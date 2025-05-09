
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Award, Star, Trophy } from 'lucide-react';
import { gsap } from 'gsap';

interface RewardBadgeProps {
  type: 'bronze' | 'silver' | 'gold' | 'perfect';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
}

const RewardBadge: React.FC<RewardBadgeProps> = ({ 
  type, 
  size = 'md', 
  animate = true,
  className
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  
  // Map sizes to tailwind classes
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  // Map types to colors and icons
  const typeMap = {
    bronze: {
      bgClass: "from-amber-200 to-amber-400",
      icon: Award,
      label: "Bronze"
    },
    silver: {
      bgClass: "from-gray-300 to-gray-400",
      icon: Star,
      label: "Silver"
    },
    gold: {
      bgClass: "from-yellow-200 to-yellow-500",
      icon: Award,
      label: "Gold"
    },
    perfect: {
      bgClass: "from-purple-400 to-purple-600",
      icon: Trophy,
      label: "Perfect"
    }
  };
  
  const IconComponent = typeMap[type].icon;

  // Apply GSAP animations
  useEffect(() => {
    if (badgeRef.current && animate) {
      // Create a shine effect timeline
      const shineTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      
      // Create a gradient overlay for the shine effect
      const shine = document.createElement('div');
      shine.style.position = 'absolute';
      shine.style.width = '100%';
      shine.style.height = '100%';
      shine.style.top = '0';
      shine.style.left = '-100%';
      shine.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)';
      shine.style.borderRadius = '50%';
      shine.style.pointerEvents = 'none';
      badgeRef.current.appendChild(shine);
      
      // Add shine animation to timeline
      shineTl.to(shine, {
        left: '100%',
        duration: 1.5,
        ease: "power1.inOut",
      });
      
      // Badge entry animation
      gsap.fromTo(
        badgeRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.3)" }
      );
      
      // Subtle floating animation
      gsap.to(badgeRef.current, {
        y: -5,
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        ease: "power1.inOut"
      });
      
      // Label fade in
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.5 }
        );
      }
      
      return () => {
        shineTl.kill();
        badgeRef.current?.removeChild(shine);
      };
    }
  }, [animate, type]);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div 
        ref={badgeRef} 
        className={cn(
          "rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg relative overflow-hidden",
          typeMap[type].bgClass,
          sizeMap[size]
        )}
      >
        <IconComponent className={cn(
          "text-white",
          size === "sm" ? "w-5 h-5" : size === "md" ? "w-7 h-7" : "w-10 h-10"
        )} />
      </div>
      <span ref={labelRef} className="text-xs font-medium mt-1">{typeMap[type].label}</span>
    </div>
  );
};

export default RewardBadge;

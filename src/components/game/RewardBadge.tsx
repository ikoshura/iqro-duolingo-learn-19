
import React from 'react';
import { cn } from '@/lib/utils';
import { Award, Star, Trophy } from 'lucide-react';

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

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn(
        "rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg",
        typeMap[type].bgClass,
        sizeMap[size],
        animate && "animate-float"
      )}>
        <IconComponent className={cn(
          "text-white",
          size === "sm" ? "w-5 h-5" : size === "md" ? "w-7 h-7" : "w-10 h-10"
        )} />
      </div>
      <span className="text-xs font-medium mt-1">{typeMap[type].label}</span>
    </div>
  );
};

export default RewardBadge;


import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  total: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, total, className }) => {
  const percentage = Math.min(100, Math.max(0, (progress / total) * 100));
  
  return (
    <div className={cn("w-full h-2 bg-gray-100 rounded-full overflow-hidden", className)}>
      <div 
        className="h-full bg-primary transition-all duration-500 ease-out" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;

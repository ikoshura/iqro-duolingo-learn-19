
import React from 'react';

interface LessonProgressProps {
  currentIndex: number;
  total: number;
  isReview?: boolean;
  reviewIndex?: number;
  totalReview?: number;
}

const LessonProgress: React.FC<LessonProgressProps> = ({ 
  currentIndex, 
  total,
  isReview = false,
  reviewIndex = 0,
  totalReview = 0
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
        <span>
          {isReview 
            ? `Review Question ${reviewIndex + 1} of ${totalReview}`
            : 'Progress'
          }
        </span>
        <span>
          {currentIndex + 1} / {total}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out ${isReview ? 'bg-amber-500' : 'bg-primary'}`}
          style={{
            width: `${((currentIndex + 1) / total) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default LessonProgress;

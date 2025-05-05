import React from 'react';
import { Lesson } from '../data/lessonData';
import { Clock, Award, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ 
  lesson, 
  isCompleted
}) => {
  const navigate = useNavigate();
  const { title, description, duration, xpReward, isUnlocked } = lesson;

  const handleClick = () => {
    if (isUnlocked) {
      navigate(`/lesson/${lesson.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "border rounded-lg overflow-hidden transition-all duration-200",
        isUnlocked
          ? "cursor-pointer hover:shadow-md hover:-translate-y-1 border-primary/20 bg-white dark:bg-gray-900"
          : "opacity-70 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700",
        isCompleted && "border-green-200 bg-green-50 dark:bg-green-950"
      )}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className={cn(
            "font-semibold text-lg text-gray-900 dark:text-gray-100",
            isCompleted && "text-green-600 dark:text-green-400"
          )}>
            {title}
          </h3>

          {!isUnlocked && (
            <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          )}

          {isCompleted && (
            <div className="flex items-center justify-center bg-green-100 dark:bg-green-800 rounded-full p-1">
              <Award className="h-4 w-4 text-green-600 dark:text-green-300" />
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <span>{xpReward} XP</span>
          </div>
        </div>
      </div>

      <div className="flex border-t border-gray-100 dark:border-gray-700 divide-x divide-gray-100 dark:divide-gray-700">
        {lesson.letters.map((letter) => (
          <div key={letter.id} className="flex-1 p-3 text-center">
            <p className="font-arabic text-2xl mb-1 text-gray-900 dark:text-white">{letter.arabic}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{letter.transliteration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonCard;

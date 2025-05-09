
import React from 'react';
import { cn } from '@/lib/utils';

interface CharacterGuideProps {
  message?: string;
  emotion: 'happy' | 'thinking' | 'celebrating' | 'explaining';
  className?: string;
}

const CharacterGuide: React.FC<CharacterGuideProps> = ({ 
  message = "Let's learn Arabic together!", 
  emotion = 'happy',
  className 
}) => {
  // Simple character representations using emojis (can be replaced with images)
  const emotionMap = {
    happy: "😊",
    thinking: "🤔",
    celebrating: "🎉",
    explaining: "👨‍🏫"
  };

  const bgColorMap = {
    happy: "bg-blue-100 dark:bg-blue-900/30",
    thinking: "bg-purple-100 dark:bg-purple-900/30",
    celebrating: "bg-green-100 dark:bg-green-900/30",
    explaining: "bg-amber-100 dark:bg-amber-900/30"
  };

  return (
    <div className={cn("flex items-center p-4 rounded-lg mb-6", bgColorMap[emotion], className)}>
      <div className="text-4xl mr-4 animate-bounce">
        {emotionMap[emotion]}
      </div>
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default CharacterGuide;

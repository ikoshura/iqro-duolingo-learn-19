
import React, { useState } from 'react';
import { Exercise } from '../data/lessonData';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LetterExerciseProps {
  exercise: Exercise;
  onComplete: (isCorrect: boolean) => void;
}

const LetterExercise: React.FC<LetterExerciseProps> = ({ exercise, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;
    
    const correct = selectedOption === exercise.content.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    
    // Add a small delay to show feedback before moving to next exercise
    setTimeout(() => {
      onComplete(correct);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">
        {exercise.instructions}
      </h3>
      
      {/* Question display */}
      <div className="mb-6">
        {exercise.type === 'match' && (
          <div className="text-center font-arabic text-5xl mb-4">
            {exercise.content.question}
          </div>
        )}
        
        {exercise.type === 'selection' && (
          <div className="text-center text-lg mb-4">
            {exercise.content.question}
          </div>
        )}
      </div>
      
      {/* Options */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {exercise.content.options?.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionSelect(option)}
            disabled={isSubmitted}
            className={cn(
              "p-4 border rounded-lg text-center transition-all",
              selectedOption === option && !isSubmitted && "border-primary bg-primary/5",
              isSubmitted && selectedOption === option && isCorrect && "border-green-500 bg-green-50",
              isSubmitted && selectedOption === option && !isCorrect && "border-red-500 bg-red-50",
              isSubmitted && option === exercise.content.correctAnswer && "border-green-500 bg-green-50",
              isSubmitted ? "cursor-default" : "cursor-pointer hover:bg-gray-50"
            )}
          >
            {/* Show Arabic font for selection exercises */}
            {exercise.type === 'selection' ? (
              <span className="font-arabic text-3xl">{option}</span>
            ) : (
              <span className="text-lg">{option}</span>
            )}
            
            {/* Show correct/incorrect icon */}
            {isSubmitted && selectedOption === option && (
              <span className="ml-2 inline-flex">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </span>
            )}
          </button>
        ))}
      </div>
      
      <button 
        onClick={handleSubmit}
        disabled={!selectedOption || isSubmitted}
        className={cn(
          "w-full py-3 px-4 rounded-lg font-medium text-white transition-all",
          selectedOption && !isSubmitted 
            ? "bg-primary hover:bg-primary/90" 
            : "bg-gray-300 cursor-not-allowed"
        )}
      >
        {isSubmitted ? (isCorrect ? "Correct!" : "Try again next time") : "Check"}
      </button>
    </div>
  );
};

export default LetterExercise;

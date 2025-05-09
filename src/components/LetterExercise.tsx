
import React, { useState, useEffect } from 'react';
import { Exercise } from '../data/lessonData';
import { CheckCircle, XCircle, Volume2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';

interface LetterExerciseProps {
  exercise: Exercise;
  onComplete: (isCorrect: boolean) => void;
}

const LetterExercise: React.FC<LetterExerciseProps> = ({ exercise, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);
  const { t } = useLanguage();

  // Reset state when exercise changes
  useEffect(() => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowCorrectAnimation(false);
  }, [exercise.id, exercise]);

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;
    
    const correct = selectedOption === exercise.content.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    
    if (correct) {
      setShowCorrectAnimation(true);
      setTimeout(() => {
        setShowCorrectAnimation(false);
      }, 1000);
    }
    
    // Call onComplete after a delay to show the results
    setTimeout(() => {
      onComplete(correct);
    }, 1500);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to set Arabic language
      utterance.lang = 'ar-SA';
      
      // Check if there are Arabic voices available
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(voice => voice.lang.includes('ar'));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Content to be spoken
  let contentToSpeak = '';
  if (exercise.type === 'match') {
    contentToSpeak = exercise.content.question;
  } else if (exercise.type === 'selection' && selectedOption) {
    contentToSpeak = selectedOption;
  } else if (exercise.type === 'selection' && exercise.content.correctAnswer) {
    contentToSpeak = exercise.content.correctAnswer;
  }

  return (
    <div className={cn(
      "max-w-md mx-auto rounded-xl shadow-sm p-6 dark:text-gray-100 transition-all relative",
      isSubmitted && isCorrect ? "correct-answer" : 
      isSubmitted && !isCorrect ? "wrong-answer" : 
      "bg-white dark:bg-gray-800 border border-primary/10"
    )}>
      {/* Stars animation on correct answer */}
      {showCorrectAnimation && (
        <div className="reward-animation">
          {Array.from({ length: 10 }).map((_, i) => (
            <Star 
              key={i} 
              className={`absolute text-yellow-400 animate-bounce`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                width: `${10 + Math.random() * 20}px`,
                height: `${10 + Math.random() * 20}px`,
              }}
            />
          ))}
        </div>
      )}

      <h3 className="text-lg font-semibold mb-4">
        {exercise.instructions}
      </h3>
      
      {/* Question display with speech button */}
      <div className="mb-6">
        {exercise.type === 'match' && (
          <div className="flex items-center justify-center gap-3">
            <div className="text-center font-arabic text-5xl animate-pulse-slow">
              {exercise.content.question}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={() => speakText(exercise.content.question)}
              disabled={isSpeaking}
            >
              <Volume2 className={cn(
                "h-5 w-5", 
                isSpeaking ? "text-primary animate-pulse" : "text-gray-500"
              )} />
              <span className="sr-only">{t('speak')}</span>
            </Button>
          </div>
        )}
        
        {exercise.type === 'selection' && (
          <div className="text-center text-lg mb-4">
            {exercise.content.question}
          </div>
        )}
      </div>
      
      {/* Options - Modified to always show the correct answer after submission */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {exercise.content.options?.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionSelect(option)}
            disabled={isSubmitted}
            className={cn(
              "p-4 border rounded-lg text-center transition-all dark:border-gray-600",
              selectedOption === option && !isSubmitted && "border-primary bg-primary/5 dark:bg-primary/10 transform scale-105",
              isSubmitted && selectedOption === option && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20",
              isSubmitted && selectedOption === option && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/20",
              // Always highlight the correct answer when submitted
              isSubmitted && option === exercise.content.correctAnswer && "border-green-500 bg-green-50 dark:bg-green-900/20",
              isSubmitted ? "cursor-default" : "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 active:scale-95"
            )}
          >
            <div className="flex items-center justify-center gap-3">
              {/* Show Arabic font for selection exercises */}
              {exercise.type === 'selection' ? (
                <span className="font-arabic text-3xl">{option}</span>
              ) : (
                <span className="text-lg">{option}</span>
              )}
              
              {/* Speech button for options in selection exercises */}
              {exercise.type === 'selection' && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(option);
                  }}
                  disabled={isSpeaking}
                >
                  <Volume2 className={cn(
                    "h-4 w-4", 
                    isSpeaking && selectedOption === option ? "text-primary animate-pulse" : "text-gray-500"
                  )} />
                  <span className="sr-only">{t('speak')}</span>
                </Button>
              )}
              
              {/* Show correct/incorrect icon for the selected option */}
              {isSubmitted && selectedOption === option && (
                <span className="inline-flex">
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-500 animate-bounce" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500" />
                  )}
                </span>
              )}
              
              {/* Always show correct icon for the correct answer when submitted */}
              {isSubmitted && option === exercise.content.correctAnswer && option !== selectedOption && (
                <span className="inline-flex">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      
      <div>
        <button 
          onClick={handleSubmit}
          disabled={!selectedOption || isSubmitted}
          className={cn(
            "w-full py-3 px-4 rounded-lg font-medium text-white transition-all",
            selectedOption && !isSubmitted 
              ? "bg-primary hover:bg-primary/90 dark:hover:bg-primary/80 hover:shadow-md hover:scale-105 active:scale-95" 
              : "bg-gray-300 cursor-not-allowed dark:bg-gray-600"
          )}
        >
          {isSubmitted ? (isCorrect ? "Correct! ✨" : "Try again next time") : "Check"}
        </button>
      </div>
    </div>
  );
};

export default LetterExercise;

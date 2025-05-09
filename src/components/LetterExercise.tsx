import React, { useState, useEffect, useRef } from 'react';
import { Exercise } from '../data/lessonData';
import { CheckCircle, XCircle, Volume2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useLanguage } from '../context/LanguageContext';
import { gsap } from 'gsap';

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

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  
  // Reset state when exercise changes
  useEffect(() => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowCorrectAnimation(false);
    
    // Entry animation for the whole exercise
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
    
    // Question animation
    if (questionRef.current) {
      gsap.fromTo(
        questionRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.7, delay: 0.1, ease: "back.out(1.2)" }
      );
    }
    
    // Options animation - staggered entry
    if (optionsContainerRef.current) {
      const options = optionsContainerRef.current.querySelectorAll('.option-button');
      gsap.fromTo(
        options,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5, 
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out"
        }
      );
    }
  }, [exercise.id, exercise]);

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    
    setSelectedOption(option);
    
    // Animate the selected option
    const selectedElement = document.querySelector(`[data-option="${option}"]`);
    if (selectedElement) {
      gsap.to(selectedElement, {
        scale: 1.05,
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        borderColor: 'rgb(79, 70, 229)',
        duration: 0.2
      });
      
      // Reset scale for other options
      const otherOptions = Array.from(document.querySelectorAll('.option-button')).filter(
        el => el !== selectedElement
      );
      gsap.to(otherOptions, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(209, 213, 219, 1)',
        duration: 0.2
      });
    }
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;
    
    const correct = selectedOption === exercise.content.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    
    // Animate the result
    if (correct) {
      setShowCorrectAnimation(true);
      
      // Correct answer animations
      if (containerRef.current) {
        // Flash effect
        gsap.fromTo(
          containerRef.current,
          { boxShadow: "0 0 0 0px rgba(34, 197, 94, 0)" },
          { 
            boxShadow: "0 0 0 6px rgba(34, 197, 94, 0.2)", 
            duration: 0.5,
            yoyo: true,
            repeat: 1 
          }
        );
      }
      
      // Create star animation
      if (starsContainerRef.current) {
        for (let i = 0; i < 10; i++) {
          const star = document.createElement('div');
          star.className = 'absolute text-yellow-400';
          star.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
          star.style.top = `${Math.random() * 100}%`;
          star.style.left = `${Math.random() * 100}%`;
          starsContainerRef.current.appendChild(star);
          
          gsap.to(star, {
            y: -100 - Math.random() * 100,
            x: Math.random() * 100 - 50,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: 1 + Math.random(),
            onComplete: () => {
              if (starsContainerRef.current?.contains(star)) {
                starsContainerRef.current.removeChild(star);
              }
            }
          });
        }
      }
    } else {
      // Incorrect answer animation
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          x: 0, // Start with 0
          keyframes: [
            { x: -5, duration: 0.1 },
            { x: 5, duration: 0.1 },
            { x: -5, duration: 0.1 },
            { x: 5, duration: 0.1 },
            { x: 0, duration: 0.1 },
          ],
          duration: 0.4,
          ease: "power1.inOut"
        });
      }
    }
    
    // Highlight correct answer
    const correctElement = document.querySelector(`[data-option="${exercise.content.correctAnswer}"]`);
    if (correctElement) {
      gsap.to(correctElement, {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: 'rgb(34, 197, 94)',
        duration: 0.3
      });
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
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        // Animate the speech button
        const speechButtons = document.querySelectorAll('.speech-button');
        gsap.to(speechButtons, {
          scale: 1.2,
          color: 'rgb(79, 70, 229)',
          duration: 0.3,
          yoyo: true,
          repeat: 3
        });
      };
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
    <div 
      ref={containerRef}
      className={cn(
        "max-w-md mx-auto rounded-xl shadow-sm p-6 dark:text-gray-100 transition-all relative",
        isSubmitted && isCorrect ? "correct-answer" : 
        isSubmitted && !isCorrect ? "wrong-answer" : 
        "bg-white dark:bg-gray-800 border border-primary/10"
      )}
    >
      {/* Container for star animations */}
      <div ref={starsContainerRef} className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"></div>
      
      <h3 className="text-lg font-semibold mb-4">
        {exercise.instructions}
      </h3>
      
      {/* Question display with speech button */}
      <div className="mb-6" ref={questionRef}>
        {exercise.type === 'match' && (
          <div className="flex items-center justify-center gap-3">
            <div className="text-center font-arabic text-5xl">
              {exercise.content.question}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full speech-button"
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
      
      {/* Options */}
      <div ref={optionsContainerRef} className="grid grid-cols-1 gap-3 mb-6">
        {exercise.content.options?.map((option) => (
          <button
            key={option}
            data-option={option}
            onClick={() => handleOptionSelect(option)}
            disabled={isSubmitted}
            className={cn(
              "option-button p-4 border rounded-lg text-center transition-all dark:border-gray-600",
              isSubmitted ? "cursor-default" : "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
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
                  className="rounded-full h-8 w-8 speech-button"
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
                    <CheckCircle className="h-6 w-6 text-green-500" />
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
              ? "bg-primary hover:bg-primary/90 dark:hover:bg-primary/80 hover:shadow-md" 
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

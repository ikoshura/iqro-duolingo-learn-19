import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { lessons } from '../data/lessonData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';
import { gsap } from 'gsap';

// Import refactored components
import LessonHeader from '../components/lesson/LessonHeader';
import LessonProgress from '../components/lesson/LessonProgress';
import LessonExerciseContainer from '../components/lesson/LessonExerciseContainer';
import CompletionScreen from '../components/lesson/CompletionScreen';
import CharacterGuide from '../components/game/CharacterGuide';
import Confetti from '../components/game/Confetti';

const LessonView: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { userStats, completeLesson } = useUser();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Refs for GSAP animations
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const lessonContainerRef = useRef<HTMLDivElement>(null);
  
  const lesson = lessons.find((l) => l.id === lessonId);

  // Page animation on mount
  useEffect(() => {
    if (mainContainerRef.current) {
      gsap.fromTo(
        mainContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power1.out" }
      );
    }
  }, []);

  useEffect(() => {
    // Reset state when navigating to a new lesson
    setCurrentExerciseIndex(0);
    setExerciseResults([]);
    setIsCompleted(false);
    setShowConfetti(false);
    
    // Animate the lesson container when lesson changes
    if (lessonContainerRef.current) {
      gsap.fromTo(
        lessonContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [lessonId]);

  // Add debugging logs to track exercise completion
  useEffect(() => {
    // Log whenever we're at the end of exercises
    const totalExercises = lesson?.exercises.length || 0;
    console.log('Current exercise index:', currentExerciseIndex);
    console.log('Total exercises:', totalExercises);
  }, [currentExerciseIndex, lesson]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <p className="text-xl mb-4 dark:text-gray-100">Lesson not found</p>
      </div>
    );
  }

  // Check if the lesson is unlocked for the user
  const isUnlocked =
    lesson.isUnlocked ||
    userStats.completedLessons.includes(
      `lesson-${parseInt(lesson.id.split('-')[1]) - 1}`
    ) ||
    lesson.id === 'lesson-1';

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <p className="text-xl mb-4 dark:text-gray-100">This lesson is locked</p>
      </div>
    );
  }

  // Function to handle exercise completion
  const handleExerciseComplete = (isCorrect: boolean) => {
    const newResults = [...exerciseResults];
    newResults[currentExerciseIndex] = isCorrect;
    setExerciseResults(newResults);
    
    // Show encouragement toast based on result
    if (isCorrect) {
      toast({
        title: "Excellent! ✨",
        description: "You got it right!",
        variant: "default",
      });
    }
    
    // If this is the last exercise, complete the lesson
    if (currentExerciseIndex === lesson.exercises.length - 1) {
      setIsCompleted(true);
      
      // Calculate accuracy for the lesson - ensure it doesn't exceed 100%
      const totalQuestions = lesson.exercises.length;
      const correctAnswers = [...newResults, isCorrect].filter(result => result === true).length;
      const accuracy = Math.min(100, Math.round((correctAnswers / totalQuestions) * 100));
      
      // Show confetti for completion
      setShowConfetti(true);
      
      // Pass the accuracy to the completeLesson function
      completeLesson(lesson.id, lesson.xpReward, accuracy);
    } else {
      // Otherwise, move to the next exercise with animation
      if (lessonContainerRef.current) {
        const exerciseElement = lessonContainerRef.current.querySelector('.exercise-container');
        
        gsap.to(exerciseElement, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          onComplete: () => {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            gsap.fromTo(
              exerciseElement,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" }
            );
          }
        });
      } else {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      }
    }
  };

  // Handle retrying the lesson
  const handleRetryLesson = () => {
    // Animate out current content
    if (lessonContainerRef.current) {
      gsap.to(lessonContainerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        onComplete: () => {
          setCurrentExerciseIndex(0);
          setExerciseResults([]);
          setIsCompleted(false);
          setShowConfetti(false);
          
          // Animate back in
          gsap.to(lessonContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1
          });
        }
      });
    } else {
      setCurrentExerciseIndex(0);
      setExerciseResults([]);
      setIsCompleted(false);
      setShowConfetti(false);
    }
  };

  // Handle continuing to next lesson
  const handleContinueToNextLesson = () => {
    const nextLessonNum = parseInt(lesson.id.split('-')[1]) + 1;
    const nextLessonId = `lesson-${nextLessonNum}`;
    const nextLesson = lessons.find((l) => l.id === nextLessonId);
    
    // Animate out current content
    if (mainContainerRef.current) {
      gsap.to(mainContainerRef.current, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          if (nextLesson) {
            navigate(`/lesson/${nextLessonId}`);
          } else {
            navigate('/lessons');
          }
        }
      });
    } else {
      if (nextLesson) {
        navigate(`/lesson/${nextLessonId}`);
      } else {
        navigate('/lessons');
      }
    }
  };

  // Determine character emotion based on progress
  const getCharacterEmotion = () => {
    if (isCompleted) {
      // Check performance
      const correctAnswers = exerciseResults.filter(result => result === true).length;
      const accuracy = Math.round((correctAnswers / lesson.exercises.length) * 100);
      
      if (accuracy >= 100) return 'celebrating';
      if (accuracy >= 70) return 'happy';
      return 'thinking';
    }
    
    // During lesson
    if (currentExerciseIndex === 0) return 'explaining';
    
    // Default
    return 'happy';
  };

  // Determine character message based on progress
  const getCharacterMessage = () => {
    if (isCompleted) {
      // Check performance
      const correctAnswers = exerciseResults.filter(result => result === true).length;
      const accuracy = Math.round((correctAnswers / lesson.exercises.length) * 100);
      
      if (accuracy >= 100) return "Fantastic job! You've mastered this lesson!";
      if (accuracy >= 70) return "Good work! Keep practicing to get even better!";
      return "Don't worry, learning takes time. Let's try again!";
    }
    
    // During lesson
    if (currentExerciseIndex === 0) {
      return `Welcome to learning ${lesson.title}! Let's get started!`;
    }
    
    if (exerciseResults[currentExerciseIndex - 1]) {
      return "Great job! Let's continue!";
    }
    
    // Default
    return "You can do this! Keep going!";
  };

  // Get the current exercise
  const currentExercise = lesson.exercises[currentExerciseIndex];

  // Calculate performance metrics for the lesson completion screen
  const getPerformanceReview = () => {
    if (!isCompleted) return null;
    
    const totalQuestions = lesson.exercises.length;
    const correctAnswers = exerciseResults.filter(result => result === true).length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const accuracy = Math.min(100, Math.round((correctAnswers / totalQuestions) * 100));

    let performanceLevel = "";
    let feedbackMessage = "";

    if (accuracy >= 100) {
      performanceLevel = "Excellent";
      feedbackMessage = "You've mastered this content! Excellent job on this lesson.";
    } else if (accuracy >= 70) {
      performanceLevel = "Good";
      feedbackMessage = "Good progress! You're on the right track, but might need a little more practice.";
    } else {
      performanceLevel = "Needs Improvement";
      feedbackMessage = "You're making progress, but this lesson needs more review. Keep practicing!";
    }

    return { totalQuestions, correctAnswers, incorrectAnswers, accuracy, performanceLevel, feedbackMessage };
  };

  const performance = getPerformanceReview();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pattern-bg flex flex-col" ref={mainContainerRef}>
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-6 mb-16" ref={lessonContainerRef}>
          {/* Lesson header */}
          <LessonHeader title={lesson.title} />
          
          {/* Character guide */}
          <CharacterGuide 
            emotion={getCharacterEmotion()} 
            message={getCharacterMessage()}
          />
          
          {/* Progress bar */}
          {!isCompleted && (
            <LessonProgress
              currentIndex={currentExerciseIndex}
              total={lesson.exercises.length}
            />
          )}

          {!isCompleted ? (
            /* Exercise */
            <div className="exercise-container">
              <LessonExerciseContainer 
                currentExercise={currentExercise}
                exerciseIndex={currentExerciseIndex}
                onComplete={handleExerciseComplete}
              />
            </div>
          ) : (
            /* Lesson completed screen with detailed review */
            performance && (
              <CompletionScreen 
                lessonId={lesson.id}
                xpReward={lesson.xpReward}
                performance={performance}
                onRetry={handleRetryLesson}
                onContinue={handleContinueToNextLesson}
              />
            )
          )}
        </div>
      </main>
      <Footer currentPage="Lessons" />
      
      {/* Confetti effect on completion */}
      <Confetti active={showConfetti} duration={5000} />
    </div>
  );
};

export default LessonView;

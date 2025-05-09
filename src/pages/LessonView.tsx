
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

// Import custom hooks
import { usePageEntryAnimation, useFloatingAnimation } from '../hooks/use-gsap-animation';

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

  // GSAP animation references
  const pageRef = usePageEntryAnimation<HTMLDivElement>();
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const lessonContainerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const exerciseRef = useRef<HTMLDivElement>(null);
  
  // Use floating animation for the character
  const floatingElementRef = useFloatingAnimation<HTMLDivElement>({
    y: 8,
    duration: 3,
    ease: "sine.inOut"
  });
  
  const lesson = lessons.find((l) => l.id === lessonId);

  // Page entrance animation enhancement
  useEffect(() => {
    if (mainContainerRef.current) {
      // Create timeline for coordinated animations
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      
      // Fade in the main container
      tl.fromTo(
        mainContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );
      
      // Animate the character guide if present
      if (characterRef.current) {
        tl.fromTo(
          characterRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3" // Overlap with previous animation
        );
      }
      
      // Animate progress bar if present
      if (progressRef.current) {
        tl.fromTo(
          progressRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5 },
          "-=0.3"
        );
      }
      
      // Animate the exercise container
      if (exerciseRef.current) {
        tl.fromTo(
          exerciseRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.4)" },
          "-=0.2"
        );
      }
    }
  }, []);

  // Reset state and animate when navigating to a new lesson
  useEffect(() => {
    setCurrentExerciseIndex(0);
    setExerciseResults([]);
    setIsCompleted(false);
    setShowConfetti(false);
    
    // Enhanced animation for lesson container when lesson changes
    if (lessonContainerRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        lessonContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      
      // Add subtle bounce to character
      if (characterRef.current) {
        tl.fromTo(
          characterRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.4"
        );
      }
    }
  }, [lessonId]);

  useEffect(() => {
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

  // Function to handle exercise completion with enhanced animations
  const handleExerciseComplete = (isCorrect: boolean) => {
    const newResults = [...exerciseResults];
    newResults[currentExerciseIndex] = isCorrect;
    setExerciseResults(newResults);
    
    // Enhanced toast with animation
    if (isCorrect) {
      toast({
        title: "Excellent! ✨",
        description: "You got it right!",
        variant: "default",
      });
      
      // Add celebration animation for correct answers
      if (exerciseRef.current) {
        gsap.fromTo(
          exerciseRef.current,
          { scale: 1 },
          { 
            scale: 1.03, 
            duration: 0.2,
            ease: "power1.out",
            onComplete: () => {
              gsap.to(exerciseRef.current, { 
                scale: 1, 
                duration: 0.3,
                ease: "elastic.out(1, 0.3)" 
              });
            }
          }
        );
      }
    }
    
    // If this is the last exercise, complete the lesson with animation
    if (currentExerciseIndex === lesson.exercises.length - 1) {
      setIsCompleted(true);
      
      const totalQuestions = lesson.exercises.length;
      const correctAnswers = [...newResults, isCorrect].filter(result => result === true).length;
      const accuracy = Math.min(100, Math.round((correctAnswers / totalQuestions) * 100));
      
      // Show confetti with delay to sync with transition animation
      setTimeout(() => setShowConfetti(true), 300);
      
      // Animate completion screen appearance
      if (lessonContainerRef.current) {
        gsap.fromTo(
          lessonContainerRef.current,
          { opacity: 0, scale: 0.95 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.8, 
            ease: "back.out(1.7)",
            delay: 0.2
          }
        );
      }
      
      completeLesson(lesson.id, lesson.xpReward, accuracy);
    } else {
      // Enhanced animation for moving to the next exercise
      if (exerciseRef.current) {
        const tl = gsap.timeline();
        
        tl.to(exerciseRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
          }
        });
        
        tl.fromTo(
          exerciseRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            ease: "back.out(1.5)",
            delay: 0.1
          }
        );
      } else {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      }
    }
  };

  // Handle retrying the lesson with enhanced animations
  const handleRetryLesson = () => {
    if (lessonContainerRef.current) {
      const tl = gsap.timeline();
      
      tl.to(lessonContainerRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setCurrentExerciseIndex(0);
          setExerciseResults([]);
          setIsCompleted(false);
          setShowConfetti(false);
        }
      });
      
      tl.to(lessonContainerRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.5)",
        delay: 0.2
      });
    } else {
      setCurrentExerciseIndex(0);
      setExerciseResults([]);
      setIsCompleted(false);
      setShowConfetti(false);
    }
  };

  // Enhanced page transition for continuing to next lesson
  const handleContinueToNextLesson = () => {
    const nextLessonNum = parseInt(lesson.id.split('-')[1]) + 1;
    const nextLessonId = `lesson-${nextLessonNum}`;
    const nextLesson = lessons.find((l) => l.id === nextLessonId);
    
    if (mainContainerRef.current) {
      gsap.to(mainContainerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
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
    <div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 pattern-bg flex flex-col theme-transition" 
      ref={pageRef}
    >
      <Header />
      <main className="flex-1 pb-20" ref={mainContainerRef}>
        <div className="container mx-auto px-4 py-6 mb-16" ref={lessonContainerRef}>
          {/* Lesson header */}
          <LessonHeader title={lesson.title} />
          
          {/* Character guide with floating animation */}
          <div ref={characterRef}>
            <div ref={floatingElementRef}>
              <CharacterGuide 
                emotion={getCharacterEmotion()} 
                message={getCharacterMessage()}
              />
            </div>
          </div>
          
          {/* Progress bar */}
          {!isCompleted && (
            <div ref={progressRef}>
              <LessonProgress
                currentIndex={currentExerciseIndex}
                total={lesson.exercises.length}
              />
            </div>
          )}

          {!isCompleted ? (
            /* Exercise */
            <div className="exercise-container" ref={exerciseRef}>
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

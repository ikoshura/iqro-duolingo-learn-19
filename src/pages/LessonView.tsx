
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { lessons } from '../data/lessonData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LetterExercise from '../components/LetterExercise';
import { ArrowLeft, ArrowRight, Award, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '../context/LanguageContext';

const LessonView: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { userStats, completeLesson } = useUser();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([]);
  const [incorrectExercises, setIncorrectExercises] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const lesson = lessons.find((l) => l.id === lessonId);

  useEffect(() => {
    // Reset state when navigating to a new lesson
    setCurrentExerciseIndex(0);
    setExerciseResults([]);
    setIncorrectExercises([]);
    setIsCompleted(false);
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <p className="text-xl mb-4 dark:text-gray-100">Lesson not found</p>
        <Button onClick={() => navigate('/lessons')}>Back to Lessons</Button>
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
        <Button onClick={() => navigate('/lessons')}>Back to Lessons</Button>
      </div>
    );
  }

  // Get the current exercise based on the current index and incorrect exercises
  let exercisePool = lesson.exercises; // Original exercises
  if (incorrectExercises.length > 0 && currentExerciseIndex >= exercisePool.length) {
    // If we've gone through all original exercises but have incorrect ones to retry
    const incorrectIndex = currentExerciseIndex - exercisePool.length;
    const incorrectExerciseIndex = incorrectExercises[incorrectIndex];
    const currentExercise = exercisePool[incorrectExerciseIndex];
    
    // Show the exercise with a "retry" flag
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pattern-bg flex flex-col">
        <Header />
        <main className="flex-1 pb-20">
          <div className="container mx-auto px-4 py-6 mb-16">
            {/* Lesson header */}
            <div className="flex items-center mb-6">
              <button
                onClick={() => navigate('/lessons')}
                className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 dark:text-gray-200" />
              </button>
              <h1 className="text-2xl font-bold dark:text-gray-100">{lesson.title}</h1>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
                <div className="flex items-center">
                  <span>Review Question {incorrectIndex + 1} of {incorrectExercises.length}</span>
                  <AlertTriangle className="h-4 w-4 ml-2 text-amber-500" />
                </div>
                <span>
                  {currentExerciseIndex + 1 - exercisePool.length + incorrectExercises.length} / {exercisePool.length + incorrectExercises.length}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-500 ease-out"
                  style={{
                    width: `${
                      ((currentExerciseIndex + 1) / (exercisePool.length + incorrectExercises.length)) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Exercise */}
            <div className="mb-6">
              {currentExercise && (
                <div>
                  <div className="mb-3 bg-amber-100 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/50">
                    <p className="text-sm text-amber-800 dark:text-amber-300 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Let's try this question again!
                    </p>
                  </div>
                  <LetterExercise
                    key={`retry-exercise-${incorrectExerciseIndex}-${currentExerciseIndex}`}
                    exercise={currentExercise}
                    onComplete={(isCorrect) => {
                      // If correct this time, update results
                      handleExerciseComplete(isCorrect, incorrectExerciseIndex);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer currentPage="Lessons" />
      </div>
    );
  }

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === lesson.exercises.length - 1 && incorrectExercises.length === 0;
  const isLastRetryExercise = incorrectExercises.length > 0 && 
                              currentExerciseIndex === lesson.exercises.length + incorrectExercises.length - 1;
  
  // Function to handle exercise completion
  const handleExerciseComplete = (isCorrect: boolean, originalIndex?: number) => {
    const newResults = [...exerciseResults];
    
    // If we're retrying an exercise, update its original index result
    if (originalIndex !== undefined) {
      newResults[originalIndex] = isCorrect;
    } else {
      newResults[currentExerciseIndex] = isCorrect;
      
      // If answer is incorrect and not already in the retry list
      if (!isCorrect) {
        setIncorrectExercises([...incorrectExercises, currentExerciseIndex]);
        
        // Show notification
        toast({
          title: "Incorrect Answer",
          description: "You'll get another chance to answer this question at the end.",
          className: "bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800/50"
        });
      }
    }
    
    setExerciseResults(newResults);

    // Move to next exercise after a delay
    setTimeout(() => {
      // Check if this is the last exercise (including retries)
      if (isLastExercise || isLastRetryExercise) {
        setIsCompleted(true);
        // Complete the lesson
        completeLesson(lesson.id, lesson.xpReward);
      } else {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      }
    }, 1000);
  };

  // Calculate performance metrics for the lesson completion screen
  const getPerformanceReview = () => {
    if (!isCompleted) return null;
    
    const totalQuestions = lesson.exercises.length;
    const correctAnswers = exerciseResults.filter(result => result === true).length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

    let performanceLevel = "";
    let feedbackMessage = "";

    if (accuracy >= 90) {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pattern-bg flex flex-col">
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-6 mb-16">
          {/* Lesson header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/lessons')}
              className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <ArrowLeft className="w-5 h-5 dark:text-gray-200" />
            </button>
            <h1 className="text-2xl font-bold dark:text-gray-100">{lesson.title}</h1>
          </div>

          {/* Progress bar */}
          {!isCompleted && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
                <span>Progress</span>
                <span>
                  {currentExerciseIndex + 1} / {lesson.exercises.length + incorrectExercises.length}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{
                    width: `${
                      ((currentExerciseIndex + 1) / (lesson.exercises.length + incorrectExercises.length)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          )}

          {!isCompleted ? (
            <>
              {/* Exercise */}
              <div className="mb-6">
                {currentExercise && (
                  <LetterExercise
                    key={`exercise-${currentExerciseIndex}`}
                    exercise={currentExercise}
                    onComplete={handleExerciseComplete}
                  />
                )}
              </div>
            </>
          ) : (
            /* Lesson completed screen with detailed review */
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2 dark:text-gray-100">Lesson Completed!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Congratulations! You've earned {lesson.xpReward} XP
              </p>

              {/* Performance Review Section */}
              {performance && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6 text-left">
                  <h3 className="text-lg font-semibold mb-3 dark:text-gray-200">Your Performance Review</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Accuracy</span>
                      <span className="text-sm font-medium">{performance.accuracy}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-600 rounded-full">
                      <div
                        className={`h-full rounded-full ${
                          performance.accuracy >= 90 ? 'bg-green-500' : 
                          performance.accuracy >= 70 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${performance.accuracy}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg flex items-center">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Correct</p>
                        <p className="font-semibold">{performance.correctAnswers} of {performance.totalQuestions}</p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg flex items-center">
                      <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Incorrect</p>
                        <p className="font-semibold">{performance.incorrectAnswers} of {performance.totalQuestions}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      Performance Level: <span className={`${
                        performance.performanceLevel === "Excellent" ? 'text-green-600 dark:text-green-400' : 
                        performance.performanceLevel === "Good" ? 'text-amber-600 dark:text-amber-400' : 
                        'text-red-600 dark:text-red-400'
                      }`}>{performance.performanceLevel}</span>
                    </p>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {performance.feedbackMessage}
                  </p>
                </div>
              )}
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button
                  onClick={() => navigate('/lessons')}
                  variant="outline"
                >
                  Back to Lessons
                </Button>
                <Button
                  onClick={() => {
                    const nextLessonNum = parseInt(lesson.id.split('-')[1]) + 1;
                    const nextLessonId = `lesson-${nextLessonNum}`;
                    const nextLesson = lessons.find((l) => l.id === nextLessonId);
                    if (nextLesson) {
                      navigate(`/lesson/${nextLessonId}`);
                    } else {
                      navigate('/lessons');
                    }
                  }}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer currentPage="Lessons" />
    </div>
  );
};

export default LessonView;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { lessons } from '../data/lessonData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LetterExercise from '../components/LetterExercise';
import { ArrowLeft, ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LessonView: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { userStats, completeLesson } = useUser();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const lesson = lessons.find((l) => l.id === lessonId);

  useEffect(() => {
    // Reset state when navigating to a new lesson
    setCurrentExerciseIndex(0);
    setExerciseResults([]);
    setIsCompleted(false);
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Lesson not found</p>
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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-xl mb-4">This lesson is locked</p>
        <Button onClick={() => navigate('/lessons')}>Back to Lessons</Button>
      </div>
    );
  }

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === lesson.exercises.length - 1;

  const handleExerciseComplete = (isCorrect: boolean) => {
    const newResults = [...exerciseResults];
    newResults[currentExerciseIndex] = isCorrect;
    setExerciseResults(newResults);

    // Move to next exercise after delay
    setTimeout(() => {
      if (isLastExercise) {
        setIsCompleted(true);
        // Complete the lesson
        completeLesson(lesson.id, lesson.xpReward);
      } else {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pattern-bg flex flex-col">
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-6 mb-16">
          {/* Lesson header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/lessons')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>
                {currentExerciseIndex + 1} / {lesson.exercises.length}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{
                  width: `${
                    ((isCompleted ? lesson.exercises.length : currentExerciseIndex) /
                      lesson.exercises.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          {!isCompleted ? (
            <>
              {/* Letters display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {lesson.letters.map((letter) => (
                  <div
                    key={letter.id}
                    className="bg-white rounded-lg p-4 text-center shadow-sm"
                  >
                    <p className="font-arabic text-4xl mb-2">{letter.arabic}</p>
                    <p className="text-sm text-gray-600">{letter.transliteration}</p>
                  </div>
                ))}
              </div>

              {/* Exercise */}
              <div className="mb-6">
                {currentExercise && (
                  <LetterExercise
                    exercise={currentExercise}
                    onComplete={handleExerciseComplete}
                  />
                )}
              </div>
            </>
          ) : (
            /* Lesson completed screen */
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Lesson Completed!</h2>
              <p className="text-gray-600 mb-6">
                Congratulations! You've earned {lesson.xpReward} XP
              </p>
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
      <Footer />
    </div>
  );
};

export default LessonView;

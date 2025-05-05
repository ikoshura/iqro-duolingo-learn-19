import React, { useState } from 'react';
import { lessons } from '../data/lessonData';
import { UserProvider, useUser } from '../context/UserContext';
import Header from '../components/Header';
import LessonCard from '../components/LessonCard';
import LetterExercise from '../components/LetterExercise';
import ProfileSection from '../components/ProfileSection';
import Footer from '../components/Footer';

const MainContent: React.FC = () => {
  const { userStats, completeLesson } = useUser();
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<boolean[]>([]);
  
  const handleStartLesson = (lessonId: string) => {
    setActiveLesson(lessonId);
    setCurrentExerciseIndex(0);
    setExerciseResults([]);
  };
  
  const handleExerciseComplete = (isCorrect: boolean) => {
    setExerciseResults([...exerciseResults, isCorrect]);
    
    const currentLesson = lessons.find(l => l.id === activeLesson);
    
    if (!currentLesson) return;
    
    if (currentExerciseIndex < currentLesson.exercises.length - 1) {
      // Move to next exercise
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      // Lesson completed
      const correctAnswers = [...exerciseResults, isCorrect].filter(Boolean).length;
      const totalExercises = currentLesson.exercises.length;
      const successRate = correctAnswers / totalExercises;
      
      // Award XP based on success rate, at least 50% of the possible XP
      const earnedXp = Math.max(
        Math.round(currentLesson.xpReward * successRate), 
        Math.round(currentLesson.xpReward * 0.5)
      );
      
      completeLesson(currentLesson.id, earnedXp);
      setActiveLesson(null);
    }
  };
  
  const handleCloseLesson = () => {
    setActiveLesson(null);
    setCurrentExerciseIndex(0);
    setExerciseResults([]);
  };
  
  // If a lesson is active, show the exercise component
  if (activeLesson) {
    const currentLesson = lessons.find(l => l.id === activeLesson);
    
    if (!currentLesson) return null;
    
    const currentExercise = currentLesson.exercises[currentExerciseIndex];
    
    return (
      <div className="container mx-auto px-4 py-6 mb-16">
        {/* Lesson header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{currentLesson.title}</h2>
          <button 
            onClick={handleCloseLesson}
            className="text-sm text-gray-500"
          >
            Exit
          </button>
        </div>
        
        {/* Exercise progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>
              Exercise {currentExerciseIndex + 1} of {currentLesson.exercises.length}
            </span>
            <span>
              {exerciseResults.filter(Boolean).length}/{exerciseResults.length} correct
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{
                width: `${((currentExerciseIndex) / currentLesson.exercises.length) * 100}%`
              }}
            />
          </div>
        </div>
        
        {/* Current exercise */}
        <LetterExercise 
          exercise={currentExercise} 
          onComplete={handleExerciseComplete} 
        />
      </div>
    );
  }
  
  // Otherwise, show the home screen
  return (
    <div className="container mx-auto px-4 py-6 mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Start Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson) => (
            <LessonCard 
              key={lesson.id}
              lesson={{
                ...lesson,
                isUnlocked: lesson.isUnlocked || userStats.completedLessons.includes(
                  `lesson-${parseInt(lesson.id.split('-')[1]) - 1}`
                ) || lesson.id === 'lesson-1'
              }}
              isCompleted={userStats.completedLessons.includes(lesson.id)}
              onClick={() => handleStartLesson(lesson.id)}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">My Progress</h2>
        <ProfileSection />
      </div>
      
      <div className="mb-10 islamic-pattern rounded-lg p-6 text-center">
        <h3 className="font-bold text-xl mb-2">Keep Learning Every Day</h3>
        <p className="text-gray-600">
          Complete your daily goal to maintain your streak and progress faster!
        </p>
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50 pattern-bg flex flex-col">
        <Header />
        <main className="flex-1 pb-20">
          <MainContent />
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
};

export default Index;


import React from 'react';
import { useUser } from '../context/UserContext';
import { lessons } from '../data/lessonData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LessonCard from '../components/LessonCard';
import { Book } from 'lucide-react';

const Lessons: React.FC = () => {
  const { userStats } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 pattern-bg flex flex-col bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-6 mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Book className="w-7 h-7 text-primary" />
            <h1 className="text-2xl font-bold">All Lessons</h1>
          </div>

          <div className="mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-2">Your Progress</h2>
              <p className="text-gray-600 mb-2">{userStats.completedLessons.length} of {lessons.length} lessons completed</p>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out" 
                  style={{ width: `${(userStats.completedLessons.length / lessons.length) * 100}%` }}
                />
              </div>
            </div>
            
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
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer currentPage="Lessons" />
    </div>
  );
};

export default Lessons;

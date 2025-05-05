
import React from 'react';
import { lessons } from '../data/lessonData';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import LessonCard from '../components/LessonCard';
import ProfileSection from '../components/ProfileSection';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const { userStats } = useUser();
  
  return (
    <div className="min-h-screen bg-gray-50 pattern-bg flex flex-col">
      <Header />
      <main className="flex-1 pb-20">
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
                  onClick={() => {}}
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
      </main>
      <Footer />
    </div>
  );
};

export default Home;

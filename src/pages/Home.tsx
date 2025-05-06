
import React, { useMemo } from 'react';
import { lessons } from '../data/lessonData';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import LessonCard from '../components/LessonCard';
import ProfileSection from '../components/ProfileSection';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { Book } from 'lucide-react';

const Home: React.FC = () => {
  const { userStats } = useUser();
  const { t } = useLanguage();
  
  // Group lessons by Iqro level
  const lessonsByIqroLevel = useMemo(() => {
    const groupedLessons: Record<number, typeof lessons> = {};
    
    lessons.forEach(lesson => {
      if (!groupedLessons[lesson.iqroLevel]) {
        groupedLessons[lesson.iqroLevel] = [];
      }
      
      groupedLessons[lesson.iqroLevel].push({
        ...lesson,
        isUnlocked: lesson.isUnlocked || 
          userStats.completedLessons.includes(
            `lesson-${parseInt(lesson.id.split('-')[1]) - 1}`
          ) || lesson.id === 'lesson-1'
      });
    });
    
    return groupedLessons;
  }, [userStats.completedLessons]);
  
  return (
    <div className="min-h-screen bg-gray-50 pattern-bg flex flex-col bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-6 mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">{t('start_learning')}</h2>
            
            {/* Display lessons grouped by Iqro level */}
            {Object.keys(lessonsByIqroLevel).map((iqroLevel) => (
              <div key={iqroLevel} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Book className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold">{t('iqro')} {iqroLevel}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {lessonsByIqroLevel[Number(iqroLevel)]?.map((lesson) => (
                    <LessonCard 
                      key={lesson.id}
                      lesson={lesson}
                      isCompleted={userStats.completedLessons.includes(lesson.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">{t('my_progress')}</h2>
            <ProfileSection />
          </div>
          
          <div className="mb-10 islamic-pattern rounded-lg p-6 text-center">
            <h3 className="font-bold text-xl mb-2">{t('keep_learning')}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('streak_message')}
            </p>
          </div>
        </div>
      </main>
      <Footer currentPage="Home" />
    </div>
  );
};

export default Home;

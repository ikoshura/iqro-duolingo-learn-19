
import React, { useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { lessons } from '../data/lessonData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LessonCard from '../components/LessonCard';
import { Book } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Lessons: React.FC = () => {
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
          <div className="flex items-center gap-2 mb-6">
            <Book className="w-7 h-7 text-primary" />
            <h1 className="text-2xl font-bold">{t('all_lessons')}</h1>
          </div>

          <div className="mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-2">{t('your_progress')}</h2>
              <p className="text-gray-600 mb-2 dark:text-gray-300">
                {userStats.completedLessons.length} {t('of')} {lessons.length} {t('lessons_completed')}
              </p>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out" 
                  style={{ width: `${(userStats.completedLessons.length / lessons.length) * 100}%` }}
                />
              </div>
            </div>
            
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
        </div>
      </main>
      <Footer currentPage="Lessons" />
    </div>
  );
};

export default Lessons;

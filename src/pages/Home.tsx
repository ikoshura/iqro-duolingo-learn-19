
import React, { useMemo, useState } from 'react';
import { lessons } from '../data/lessonData';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import LessonCard from '../components/LessonCard';
import ProfileSection from '../components/ProfileSection';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { Book, Star, ChevronUp, ChevronDown } from 'lucide-react';
import CharacterGuide from '../components/game/CharacterGuide';
import { Button } from '@/components/ui/button';
import Confetti from '../components/game/Confetti';

const Home: React.FC = () => {
  const { userStats } = useUser();
  const { t } = useLanguage();
  const [showConfetti, setShowConfetti] = useState(false);
  const [expandedLevels, setExpandedLevels] = useState<number[]>([1]);
  
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

  // Calculate user progress
  const totalLessons = lessons.length;
  const completedLessons = userStats.completedLessons.length;
  const completionPercentage = Math.round((completedLessons / totalLessons) * 100);
  
  // Handle level toggle
  const toggleLevel = (level: number) => {
    if (expandedLevels.includes(level)) {
      setExpandedLevels(expandedLevels.filter(l => l !== level));
    } else {
      setExpandedLevels([...expandedLevels, level]);
    }
  };
  
  // Trigger confetti for demo purposes
  const handleCelebrate = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pattern-bg flex flex-col dark:bg-gray-800">
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-6 mb-16">
          {/* Welcome message with character guide */}
          <div className="mb-6">
            <CharacterGuide 
              emotion="happy" 
              message={`Welcome back! You have ${userStats.dailyGoal - userStats.dailyProgress} XP left to reach your daily goal.`}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Left column - Profile */}
            <div className="col-span-1">
              <ProfileSection />
              
              <div className="mt-4 p-4 bg-white rounded-xl shadow-sm dark:bg-gray-800 border-2 border-primary/10">
                <h3 className="font-semibold mb-2">Quick Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Lessons Completed:</span>
                    <span className="font-medium">{completedLessons}/{totalLessons}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-value"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Daily Goal:</span>
                    <span className="font-medium">{userStats.dailyProgress}/{userStats.dailyGoal} XP</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-value from-green-400 to-green-600"
                      style={{ width: `${(userStats.dailyProgress / userStats.dailyGoal) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Demo button for confetti effect */}
              <Button
                onClick={handleCelebrate}
                className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600"
              >
                <Star className="w-4 h-4 mr-2" /> 
                Celebrate Progress
              </Button>
            </div>
            
            {/* Right column - Lessons */}
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">{t('start_learning')}</h2>
              
              {/* Display lessons grouped by Iqro level */}
              {Object.keys(lessonsByIqroLevel).map((iqroLevel) => {
                const level = Number(iqroLevel);
                const isExpanded = expandedLevels.includes(level);
                
                return (
                  <div key={iqroLevel} className="mb-8 game-card bg-white dark:bg-gray-800 p-4 rounded-xl">
                    <div 
                      className="flex items-center justify-between mb-4 cursor-pointer"
                      onClick={() => toggleLevel(level)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Book className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{t('iqro')} {iqroLevel}</h3>
                      </div>
                      
                      <Button variant="ghost" size="icon" className="rounded-full">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </Button>
                    </div>
                    
                    {isExpanded && (
                      <div className="grid grid-cols-1 gap-4 mb-3">
                        {lessonsByIqroLevel[level]?.map((lesson) => (
                          <LessonCard 
                            key={lesson.id}
                            lesson={lesson}
                            isCompleted={userStats.completedLessons.includes(lesson.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
      
      {/* Confetti effect */}
      <Confetti active={showConfetti} />
    </div>
  );
};

export default Home;

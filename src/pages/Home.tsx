
import React, { useMemo, useState, useEffect, useRef } from 'react';
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
import { gsap } from 'gsap';
import { usePageEntryAnimation, useFloatingAnimation } from '../hooks/use-gsap-animation';

const Home: React.FC = () => {
  const { userStats } = useUser();
  const { t } = useLanguage();
  const [showConfetti, setShowConfetti] = useState(false);
  const [expandedLevels, setExpandedLevels] = useState<number[]>([1]);
  
  // GSAP references
  const pageRef = usePageEntryAnimation<HTMLDivElement>();
  const characterRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const celebrateButtonRef = useRef<HTMLButtonElement>(null);
  const floatingStarRef = useFloatingAnimation<HTMLDivElement>({ 
    y: 10, 
    duration: 2.5, 
    ease: "sine.inOut" 
  });
  
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
  
  // Handle level toggle with animation
  const toggleLevel = (level: number) => {
    if (expandedLevels.includes(level)) {
      setExpandedLevels(expandedLevels.filter(l => l !== level));
    } else {
      setExpandedLevels([...expandedLevels, level]);
    }
  };
  
  // Trigger confetti with enhanced animation
  const handleCelebrate = () => {
    setShowConfetti(true);
    
    // Add button press animation
    if (celebrateButtonRef.current) {
      gsap.to(celebrateButtonRef.current, {
        scale: 0.95,
        duration: 0.1,
        onComplete: () => {
          gsap.to(celebrateButtonRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(1, 0.3)"
          });
        }
      });
    }
    
    // Hide confetti after animation completes
    setTimeout(() => setShowConfetti(false), 5000);
  };
  
  // Progress bar animation
  useEffect(() => {
    if (statsRef.current) {
      const progressBars = statsRef.current.querySelectorAll('.progress-bar .progress-value');
      
      gsap.fromTo(progressBars, 
        { width: '0%' },
        { 
          width: (index) => index === 0 ? `${completionPercentage}%` : `${(userStats.dailyProgress / userStats.dailyGoal) * 100}%`, 
          duration: 1.2, 
          ease: "power2.out",
          stagger: 0.3,
          delay: 0.5
        }
      );
    }
    
    // Character guide animation
    if (characterRef.current) {
      gsap.from(characterRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      });
    }
  }, [completionPercentage, userStats.dailyProgress, userStats.dailyGoal]);
  
  // Lesson item hover animation setup
  useEffect(() => {
    const lessonCards = document.querySelectorAll('.lesson-card');
    
    lessonCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          duration: 0.3
        });
      });
    });
    
    return () => {
      lessonCards.forEach(card => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, [expandedLevels]); // Re-run when expanded levels change
  
  // Animation for level expansion/collapse
  useEffect(() => {
    const levelSections = document.querySelectorAll('.level-content');
    
    levelSections.forEach(section => {
      const isExpanded = section.classList.contains('expanded');
      
      if (isExpanded) {
        gsap.fromTo(section,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  }, [expandedLevels]);
  
  return (
    <div className="min-h-screen bg-gray-50 pattern-bg flex flex-col dark:bg-gray-800 theme-transition" ref={pageRef}>
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-6 mb-16">
          {/* Welcome message with character guide */}
          <div className="mb-6" ref={characterRef}>
            <CharacterGuide 
              emotion="happy" 
              message={`Welcome back! You have ${userStats.dailyGoal - userStats.dailyProgress} XP left to reach your daily goal.`}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Left column - Profile */}
            <div className="col-span-1">
              <ProfileSection />
              
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 border-primary/10 theme-transition" ref={statsRef}>
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
              <div ref={floatingStarRef} className="flex justify-center mb-2 mt-1 opacity-70">
                <Star className="w-5 h-5 text-amber-400" />
              </div>
              
              <Button
                ref={celebrateButtonRef}
                onClick={handleCelebrate}
                className="w-full mt-1 bg-gradient-to-r from-indigo-500 to-purple-600 interactive-element"
              >
                <Star className="w-4 h-4 mr-2" /> 
                Celebrate Progress
              </Button>
            </div>
            
            {/* Right column - Lessons */}
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">{t('start_learning')}</h2>
              
              {/* Display lessons grouped by Iqro level */}
              {Object.keys(lessonsByIqroLevel).map((iqroLevel, index) => {
                const level = Number(iqroLevel);
                const isExpanded = expandedLevels.includes(level);
                
                return (
                  <div 
                    key={iqroLevel} 
                    className="mb-8 game-card bg-white dark:bg-gray-800 p-4 rounded-xl theme-transition"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div 
                      className="flex items-center justify-between mb-4 cursor-pointer interactive-element"
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
                      <div className={`grid grid-cols-1 gap-4 mb-3 level-content expanded`}>
                        {lessonsByIqroLevel[level]?.map((lesson) => (
                          <div className="lesson-card" key={lesson.id}>
                            <LessonCard 
                              lesson={lesson}
                              isCompleted={userStats.completedLessons.includes(lesson.id)}
                            />
                          </div>
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

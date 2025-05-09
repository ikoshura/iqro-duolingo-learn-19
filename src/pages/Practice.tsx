
import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, CheckCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';
import { practiceExercises } from '../data/practiceData';
import { gsap } from 'gsap';
import { usePageEntryAnimation } from '../hooks/use-gsap-animation';

const PracticeCard: React.FC<{
  exercise: typeof practiceExercises[0];
  onClick: () => void;
  index: number;
}> = ({ exercise, onClick, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Add hover animation
  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          scale: 1.02,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          borderColor: 'rgba(99, 102, 241, 0.5)',
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderColor: 'rgba(229, 231, 235, 1)',
          duration: 0.3
        });
      });
      
      // Initial animation with staggered delay
      gsap.from(card, {
        opacity: 0,
        y: 30,
        delay: 0.1 * index,
        duration: 0.6
      });
    }
    
    return () => {
      if (card) {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      }
    };
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:border-primary/30 transition-all cursor-pointer bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{exercise.title}</h3>
        {exercise.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
      </div>
      
      <p className="text-gray-600 text-sm mb-3 dark:text-gray-300">{exercise.description}</p>
      
      <div className="flex justify-between text-xs">
        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
          {exercise.difficulty}
        </span>
        <span className="text-gray-500">{exercise.duration}</span>
      </div>
    </div>
  );
};

const Practice: React.FC = () => {
  const { userStats } = useUser();
  const navigate = useNavigate();
  const pageRef = usePageEntryAnimation<HTMLDivElement>();
  const progressRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Animate progress bar and title when component mounts
  useEffect(() => {
    if (progressRef.current) {
      const progressValue = progressRef.current.querySelector('.progress-value');
      if (progressValue) {
        gsap.from(progressValue, {
          width: '0%',
          duration: 1.5,
          ease: 'power2.inOut',
          delay: 0.3
        });
      }
    }

    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: 'power2.out'
      });
    }
  }, []);

  const handlePracticeClick = (exerciseId: string) => {
    navigate(`/practice/${exerciseId}`);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50 pattern-bg flex flex-col bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-6 mb-16">
          <div ref={titleRef} className="flex items-center gap-2 mb-6">
            <BookOpen className="w-7 h-7 text-primary" />
            <h1 className="text-2xl font-bold">Daily Practice</h1>
          </div>

          <div ref={progressRef} className="bg-white p-4 rounded-lg shadow-sm mb-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-2">Today's Goal</h2>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress: {userStats.dailyProgress}/{userStats.dailyGoal} XP</span>
              <span>{Math.round((userStats.dailyProgress / userStats.dailyGoal) * 100)}% Complete</span>
            </div>
            <Progress value={(userStats.dailyProgress / userStats.dailyGoal) * 100} className="h-2">
              <div className="progress-value" style={{ width: `${(userStats.dailyProgress / userStats.dailyGoal) * 100}%` }}></div>
            </Progress>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Practice Exercises</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {practiceExercises.map((exercise, index) => (
                <PracticeCard
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  onClick={() => handlePracticeClick(exercise.id)}
                />
              ))}
            </div>
          </div>

          <div className="mb-10 islamic-pattern rounded-lg p-6 text-center">
            <h3 className="font-bold text-xl mb-2">Practice Makes Perfect</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Regular practice helps you memorize and recognize letters faster!
            </p>
          </div>
        </div>
      </main>
      <Footer currentPage="Practice" />
    </div>
  );
};

export default Practice;


import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, CheckCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';
import { practiceExercises } from '../data/practiceData';

const PracticeCard: React.FC<{
  exercise: typeof practiceExercises[0];
  onClick: () => void;
}> = ({ exercise, onClick }) => {
  return (
    <div 
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

  const handlePracticeClick = (exerciseId: string) => {
    navigate(`/practice/${exerciseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pattern-bg flex flex-col bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-6 mb-16">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-7 h-7 text-primary" />
            <h1 className="text-2xl font-bold">Daily Practice</h1>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm mb-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-2">Today's Goal</h2>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress: {userStats.dailyProgress}/{userStats.dailyGoal} XP</span>
              <span>{Math.round((userStats.dailyProgress / userStats.dailyGoal) * 100)}% Complete</span>
            </div>
            <Progress value={(userStats.dailyProgress / userStats.dailyGoal) * 100} className="h-2" />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Practice Exercises</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {practiceExercises.map((exercise) => (
                <PracticeCard
                  key={exercise.id}
                  exercise={exercise}
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

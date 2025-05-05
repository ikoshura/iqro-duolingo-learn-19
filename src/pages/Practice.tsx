
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, CheckCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Progress } from "@/components/ui/progress";

const practiceExercises = [
  {
    id: 'practice-1',
    title: 'Letter Recognition',
    description: 'Practice identifying Arabic letters quickly',
    duration: '5 min',
    difficulty: 'Beginner',
    category: 'letters',
    completed: true
  },
  {
    id: 'practice-2',
    title: 'Vowel Marks',
    description: 'Practice with Fatha, Kasra, and Damma vowel marks',
    duration: '7 min',
    difficulty: 'Beginner',
    category: 'vowels',
    completed: false
  },
  {
    id: 'practice-3',
    title: 'Letter Combinations',
    description: 'Practice reading letters with different vowel marks',
    duration: '8 min',
    difficulty: 'Intermediate',
    category: 'combinations',
    completed: false
  },
  {
    id: 'practice-4',
    title: 'Word Formation',
    description: 'Practice reading simple words with multiple letters',
    duration: '10 min',
    difficulty: 'Intermediate',
    category: 'words',
    completed: false
  }
];

const PracticeCard: React.FC<{
  exercise: typeof practiceExercises[0];
  onClick: () => void;
}> = ({ exercise, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:border-primary/30 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{exercise.title}</h3>
        {exercise.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
      </div>
      
      <p className="text-gray-600 text-sm mb-3">{exercise.description}</p>
      
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

  return (
    <div className="min-h-screen bg-gray-50 pattern-bg flex flex-col">
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-6 mb-16">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-7 h-7 text-primary" />
            <h1 className="text-2xl font-bold">Daily Practice</h1>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
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
                  onClick={() => console.log(`Starting practice: ${exercise.id}`)}
                />
              ))}
            </div>
          </div>

          <div className="mb-10 islamic-pattern rounded-lg p-6 text-center">
            <h3 className="font-bold text-xl mb-2">Practice Makes Perfect</h3>
            <p className="text-gray-600">
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

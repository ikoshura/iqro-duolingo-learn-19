
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Trophy, Award, Star, Clock, Check, Heart, BookOpen, Zap } from 'lucide-react';

const achievements = [
  {
    id: 'achievement-1',
    title: 'First Lesson',
    description: 'Complete your first lesson',
    icon: BookOpen,
    progress: 100,
    unlocked: true,
    date: '2 days ago'
  },
  {
    id: 'achievement-2',
    title: '3-Day Streak',
    description: 'Maintain a 3-day learning streak',
    icon: Heart,
    progress: 100,
    unlocked: true,
    date: '1 day ago'
  },
  {
    id: 'achievement-3',
    title: 'Perfect Practice',
    description: 'Complete a practice session with 100% accuracy',
    icon: Check,
    progress: 100,
    unlocked: true,
    date: 'Today'
  },
  {
    id: 'achievement-4',
    title: '7-Day Streak',
    description: 'Maintain a 7-day learning streak',
    icon: Zap,
    progress: 43,
    unlocked: false,
    date: null
  },
  {
    id: 'achievement-5',
    title: 'Letter Master',
    description: 'Master all the basic Arabic letters',
    icon: Star,
    progress: 60,
    unlocked: false,
    date: null
  },
  {
    id: 'achievement-6',
    title: 'Rapid Reader',
    description: 'Complete 5 lessons in a single day',
    icon: Clock,
    progress: 40,
    unlocked: false,
    date: null
  },
  {
    id: 'achievement-7',
    title: 'Vowel Expert',
    description: 'Master all vowel marks and their sounds',
    icon: Award,
    progress: 25,
    unlocked: false,
    date: null
  }
];

const AchievementCard: React.FC<{
  achievement: typeof achievements[0];
}> = ({ achievement }) => {
  const IconComponent = achievement.icon;
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <div className="flex items-center gap-4">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
          achievement.unlocked ? 'bg-primary/20' : 'bg-gray-100'
        }`}>
          <IconComponent className={`h-6 w-6 ${
            achievement.unlocked ? 'text-primary' : 'text-gray-400'
          }`} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-semibold">{achievement.title}</h3>
            {achievement.date && (
              <span className="text-xs text-gray-500">{achievement.date}</span>
            )}
          </div>
          <p className="text-gray-600 text-sm">{achievement.description}</p>
          
          <div className="mt-2">
            {!achievement.unlocked && (
              <>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500 ease-out" 
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{achievement.progress}% complete</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Achievements: React.FC = () => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen bg-gray-50 pattern-bg flex flex-col">
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-6 mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-7 h-7 text-primary" />
            <h1 className="text-2xl font-bold">Achievements</h1>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-2">Your Badges</h2>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">You've unlocked {unlockedCount} of {achievements.length} achievements</p>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                {Math.round((unlockedCount / achievements.length) * 100)}%
              </span>
            </div>
          </div>

          <div className="mb-6 space-y-4">
            <h2 className="text-xl font-semibold">All Achievements</h2>
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      </main>
      <Footer currentPage="Achievements" />
    </div>
  );
};

export default Achievements;


import React from 'react';
import { useUser } from '../context/UserContext';
import { User, Award, Bookmark, Calendar } from 'lucide-react';
import ProgressBar from './ProgressBar';

const ProfileSection: React.FC = () => {
  const { userStats } = useUser();
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">My Profile</h2>
          <p className="text-sm text-gray-500">Level {userStats.level}</p>
        </div>
      </div>
      
      {/* Level progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <span>Level {userStats.level}</span>
          <span>Level {userStats.level + 1}</span>
        </div>
        <ProgressBar 
          progress={userStats.xp % 100} 
          total={100} 
        />
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <Bookmark className="h-5 w-5 text-primary mb-1" />
          <span className="text-lg font-bold">{userStats.completedLessons.length}</span>
          <span className="text-xs text-gray-500">Lessons</span>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <Award className="h-5 w-5 text-amber-500 mb-1" />
          <span className="text-lg font-bold">{userStats.xp}</span>
          <span className="text-xs text-gray-500">XP Total</span>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <Calendar className="h-5 w-5 text-red-500 mb-1" />
          <span className="text-lg font-bold">{userStats.streak}</span>
          <span className="text-xs text-gray-500">Day Streak</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;

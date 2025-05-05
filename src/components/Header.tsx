
import React from 'react';
import { useUser } from '../context/UserContext';
import { Book, Flame } from 'lucide-react';

const Header: React.FC = () => {
  const { userStats } = useUser();

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Book className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold text-primary">Iqro Learn</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Streak counter */}
          <div className="flex items-center">
            <div className="relative">
              <Flame className="h-6 w-6 text-orange-500" />
              {userStats.streak > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {userStats.streak}
                </span>
              )}
            </div>
          </div>
          
          {/* XP counter */}
          <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full">
            <span className="text-sm font-medium text-primary">{userStats.xp} XP</span>
          </div>
        </div>
      </div>
      
      {/* Daily progress bar */}
      <div className="h-1 w-full bg-gray-100">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${(userStats.dailyProgress / userStats.dailyGoal) * 100}%` }}
        />
      </div>
    </header>
  );
};

export default Header;

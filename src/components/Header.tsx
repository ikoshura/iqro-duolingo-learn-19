
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ThemeToggle } from './ThemeToggle';

const Header: React.FC = () => {
  const { userStats } = useUser();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/home" className="flex items-center space-x-2">
          <div className="text-xl font-bold text-primary">Iqro</div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium">✨ {userStats.xp} XP</div>
            <div className="text-sm font-medium">🔥 {userStats.streak} day streak</div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;

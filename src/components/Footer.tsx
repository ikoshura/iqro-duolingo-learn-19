
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Dumbbell, Trophy, User } from 'lucide-react';

interface FooterProps {
  currentPage: string;
}

const Footer: React.FC<FooterProps> = ({ currentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', icon: Home, path: '/home' },
    { name: 'Lessons', icon: BookOpen, path: '/lessons' },
    { name: 'Practice', icon: Dumbbell, path: '/practice' },
    { name: 'Achievements', icon: Trophy, path: '/achievements' },
    { name: 'Profile', icon: User, path: '/profile' },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <footer className="fixed bottom-0 left-0 w-full footer-nav shadow-lg z-10">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive(item.path) 
                ? 'text-primary' 
                : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground'
            }`}
          >
            <item.icon size={20} className={isActive(item.path) ? 'animate-pulse' : ''} />
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;

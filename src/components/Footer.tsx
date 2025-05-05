
import React from 'react';
import { Home, BookOpen, Trophy, User, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  icon: React.FC<{ className?: string }>;
  label: string;
  path: string;
}

interface FooterProps {
  currentPage?: string;
}

const Footer: React.FC<FooterProps> = ({ currentPage = 'Home' }) => {
  const navigate = useNavigate();
  
  const navItems: NavItem[] = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Layers, label: 'Lessons', path: '/lessons' },
    { icon: BookOpen, label: 'Practice', path: '/practice' },
    { icon: Trophy, label: 'Achievements', path: '/achievements' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          {navItems.map((item) => (
            <button 
              key={item.label} 
              className={`flex flex-col items-center py-3 px-2 ${
                item.label === currentPage ? 'text-primary' : 'text-gray-500'
              }`}
              onClick={() => handleNavigate(item.path)}
            >
              <item.icon className={`h-6 w-6 ${item.label === currentPage ? 'text-primary' : ''}`} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

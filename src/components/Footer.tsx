
import React from 'react';
import { Home, BookOpen, Trophy, User, Layers } from 'lucide-react';

interface NavItem {
  icon: React.FC<{ className?: string }>;
  label: string;
  isActive: boolean;
}

const Footer: React.FC = () => {
  const navItems: NavItem[] = [
    { icon: Home, label: 'Home', isActive: true },
    { icon: Layers, label: 'Lessons', isActive: false },
    { icon: BookOpen, label: 'Practice', isActive: false },
    { icon: Trophy, label: 'Achievements', isActive: false },
    { icon: User, label: 'Profile', isActive: false },
  ];
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          {navItems.map((item) => (
            <button 
              key={item.label} 
              className={`flex flex-col items-center py-3 px-2 ${
                item.isActive ? 'text-primary' : 'text-gray-500'
              }`}
            >
              <item.icon className={`h-6 w-6 ${item.isActive ? 'text-primary' : ''}`} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

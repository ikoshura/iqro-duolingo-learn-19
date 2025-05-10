
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ThemeToggle } from './ThemeToggle';
import { Book } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';
import { gsap } from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const { userStats } = useUser();
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Animate header elements
    const headerElements = document.querySelectorAll('.header-animate');
    
    gsap.fromTo(
      headerElements,
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: 'power2.out' 
      }
    );
  }, []);
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/home" className="flex items-center space-x-2 header-animate">
          <Book className="h-7 w-7 text-primary" />
          <div className="text-xl font-bold text-primary">Iqro.id</div>
        </Link>
        
        {isMobile && (
          <div className="flex items-center space-x-4 header-animate">
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium">✨ {userStats.xp} XP</div>
              <div className="text-sm font-medium">🔥 {userStats.streak} day streak</div>
            </div>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        )}
        
        {/* On desktop, these controls are in sidebar */}
        {!isMobile && (
          <div className="flex items-center space-x-2 header-animate">
            {/* Empty div to maintain layout */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

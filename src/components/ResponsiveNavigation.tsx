
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Dumbbell, Trophy, User, Book } from 'lucide-react';
import { gsap } from 'gsap';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent,
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar
} from "@/components/ui/sidebar";
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeToggle } from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import Footer from './Footer';

interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Home', icon: Home, path: '/home' },
  { name: 'Lessons', icon: BookOpen, path: '/lessons' },
  { name: 'Practice', icon: Dumbbell, path: '/practice' },
  { name: 'Achievements', icon: Trophy, path: '/achievements' },
  { name: 'Profile', icon: User, path: '/profile' },
];

const ResponsiveNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { userStats } = useUser();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  // Ensure client-side rendering only for component with window reference
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Animate menu items when component mounts
  useEffect(() => {
    if (mounted && !isMobile) {
      gsap.from('.sidebar-menu-item', {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.2
      });
    }
  }, [mounted, isMobile]);
  
  if (!mounted) return null;
  
  if (isMobile) {
    return <Footer currentPage={location.pathname} />;
  }
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 p-4">
            <Book className="h-7 w-7 text-primary" />
            <div className="text-xl font-bold text-primary">Iqro.id</div>
          </div>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item, index) => (
                    <SidebarMenuItem key={item.name} className="sidebar-menu-item">
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive(item.path)}
                        onClick={() => navigate(item.path)}
                      >
                        <div className="flex items-center cursor-pointer">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.name}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <div className="mt-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-medium">✨ {userStats.xp} XP</div>
                  <div className="text-sm font-medium">🔥 {userStats.streak} day streak</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
};

export default ResponsiveNavigation;

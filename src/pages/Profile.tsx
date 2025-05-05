
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';
import { User, Award, BookOpen, Flame, Settings, LogOut, Calendar, Clock } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import { Button } from '@/components/ui/button';

const Profile: React.FC = () => {
  const { userStats } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 pattern-bg flex flex-col bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <Header />
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-6 mb-16">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-7 h-7 text-primary" />
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>

          {/* Profile header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">User</h2>
                <p className="text-gray-500">Joined 30 days ago</p>
              </div>
            </div>

            {/* Level progress */}
            <div className="mb-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-sm mb-1">
                <span>Level {userStats.level}</span>
                <span>{userStats.xp % 100}/100 XP to Level {userStats.level + 1}</span>
              </div>
              <ProgressBar 
                progress={userStats.xp % 100} 
                total={100}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <BookOpen className="h-5 w-5 text-primary mb-1" />
                <span className="text-lg font-bold">{userStats.completedLessons.length}</span>
                <span className="text-xs text-gray-500">Lessons</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <Award className="h-5 w-5 text-amber-500 mb-1" />
                <span className="text-lg font-bold">{userStats.xp}</span>
                <span className="text-xs text-gray-500">XP Total</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <Flame className="h-5 w-5 text-red-500 mb-1" />
                <span className="text-lg font-bold">{userStats.streak}</span>
                <span className="text-xs text-gray-500">Day Streak</span>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Completed Lesson 1</p>
                  <p className="text-sm text-gray-500">Today, 10:30 AM</p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Practice Session: Letter Recognition</p>
                  <p className="text-sm text-gray-500">Today, 9:15 AM</p>
                </div>
              </div>

              <div className="flex gap-3 items-start bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Streak Day 3 Achieved</p>
                  <p className="text-sm text-gray-500">Yesterday, 8:45 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Account</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button
  variant="outline"
  className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
  onClick={() => {
    const origin = window.location.origin;
    window.location.href = origin; // Navigates to the base URL like https://site.com
  }}
>
  <LogOut className="h-4 w-4" />
  Sign Out
</Button>

            </div>
          </div>
        </div>
      </main>
      <Footer currentPage="Profile" />
    </div>
  );
};

// Missing import for Check component
import { Check } from 'lucide-react';

export default Profile;

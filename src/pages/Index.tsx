import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { userStats } = useUser();

  useEffect(() => {
    // If user has no xp (assumed first-time or not logged in), redirect to landing page
    // Otherwise, redirect to home
    if (userStats.xp === 0 && userStats.completedLessons.length === 0) {
      navigate('/landing');
    } else {
      navigate('/home');
    }
  }, [navigate, userStats]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <p>Redirecting...</p>
    </div>
  );
};

export default Index;

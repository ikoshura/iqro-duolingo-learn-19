
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, [navigate]);

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p>Redirecting to home...</p>
      </div>
    </UserProvider>
  );
};

export default Index;

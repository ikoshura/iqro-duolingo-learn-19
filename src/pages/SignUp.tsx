
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { User } from 'lucide-react';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserStats } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - in a real app, this would call an API
    setTimeout(() => {
      if (email && password && name) {
        // Initialize user stats
        updateUserStats({
          xp: 0,
          streak: 0,
          level: 1,
          completedLessons: [],
          currentLesson: 'lesson-1',
          dailyGoal: 50,
          dailyProgress: 0,
        });
        
        toast({
          title: "Account created!",
          description: "Welcome to Iqro App.",
        });
        
        navigate('/home');
      } else {
        toast({
          variant: "destructive",
          title: "Sign up failed",
          description: "Please fill in all fields.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pattern-bg bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-gray-500 mt-1">Join Iqro App to start learning</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <p className="text-xs text-gray-400">
              Password must be at least 8 characters long
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

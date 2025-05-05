
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { LogIn } from 'lucide-react';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserStats } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - in a real app, this would call an API
    setTimeout(() => {
      // Demo users
      if (email === 'user@example.com' && password === 'password') {
        // Update user stats (in a real app, this would come from the backend)
        updateUserStats({
          xp: 30,
          streak: 2,
          level: 2,
          completedLessons: ['lesson-1'],
          currentLesson: 'lesson-2',
          dailyGoal: 50,
          dailyProgress: 30,
        });
        
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        
        navigate('/home');
      } else if (email && password) {
        // For demo purposes, any other email/password combo also logs in
        // but with default stats
        toast({
          title: "Welcome!",
          description: "You've successfully signed in.",
        });
        navigate('/home');
      } else {
        toast({
          variant: "destructive",
          title: "Sign in failed",
          description: "Please enter both email and password.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pattern-bg bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-gray-500 mt-1">Welcome back to Iqro App</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <p>Demo account: user@example.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

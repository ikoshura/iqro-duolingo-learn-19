
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { LogIn } from 'lucide-react';
import { gsap } from 'gsap';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserStats } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Main container fade in
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6
      });
    }

    // Icon wiggle animation
    if (iconRef.current) {
      gsap.from(iconRef.current, {
        scale: 0.5,
        rotation: -10,
        opacity: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
        delay: 0.2
      });
      
      // Add a repeating subtle hover animation
      gsap.to(iconRef.current, {
        y: -5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1
      });
    }
    
    // Form elements staggered appearance
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('div, button');
      gsap.from(formElements, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3
      });
    }
    
    // Setup button hover animations
    const buttons = document.querySelectorAll('.auth-btn');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
          scale: 1.03,
          duration: 0.2
        });
      });
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.2
        });
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Create loading animation
    const submitBtn = formRef.current?.querySelector('button[type="submit"]');
    if (submitBtn) {
      gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.2,
        repeat: -1,
        yoyo: true
      });
    }

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
        
        // Success animation before navigation
        if (formRef.current) {
          gsap.to(formRef.current, {
            scale: 1.02,
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => navigate('/home')
          });
        } else {
          navigate('/home');
        }
      } else if (email && password) {
        // For demo purposes, any other email/password combo also logs in
        // but with default stats
        toast({
          title: "Welcome!",
          description: "You've successfully signed in.",
        });
        
        // Success animation before navigation
        if (formRef.current) {
          gsap.to(formRef.current, {
            scale: 1.02,
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => navigate('/home')
          });
        } else {
          navigate('/home');
        }
      } else {
        // Error animation on form
        if (formRef.current) {
          gsap.to(formRef.current, {
            x: [-10, 10, -10, 5, 0],
            duration: 0.5,
          });
        }
        
        toast({
          variant: "destructive",
          title: "Sign in failed",
          description: "Please enter both email and password.",
        });
      }
      setIsLoading(false);
      
      // Stop loading animation
      if (submitBtn) {
        gsap.killTweensOf(submitBtn);
        gsap.to(submitBtn, {
          scale: 1,
          duration: 0.2
        });
      }
    }, 1000);
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    
    const guestBtn = document.querySelector('.guest-btn');
    if (guestBtn) {
      gsap.to(guestBtn, {
        scale: 0.95,
        duration: 0.2,
        repeat: 2,
        yoyo: true
      });
    }
    
    setTimeout(() => {
      // Create guest user stats
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
        title: "Welcome, Guest!",
        description: "You're using Iqro as a guest.",
      });
      
      // Success animation before navigation
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          scale: 1.03,
          opacity: 0,
          y: -20,
          duration: 0.5,
          onComplete: () => navigate('/home')
        });
      } else {
        navigate('/home');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 flex items-center justify-center pattern-bg bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="text-center mb-6">
          <div ref={iconRef} className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-gray-500 mt-1">Welcome back to Iqro App</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
              className="auth-input"
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
              className="auth-input"
            />
          </div>

          <Button type="submit" className="w-full auth-btn" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6">
          <Button
            onClick={handleGuestLogin}
            variant="outline"
            className="w-full auth-btn guest-btn"
            disabled={isLoading}
          >
            Login as Guest
          </Button>
        </div>

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


import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { User } from 'lucide-react';
import { gsap } from 'gsap';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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

    // Icon animation
    if (iconRef.current) {
      const tl = gsap.timeline();
      
      tl.from(iconRef.current, {
        scale: 0.5,
        opacity: 0,
        rotation: -5,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
      
      // Add a repeating subtle pulse animation
      tl.to(iconRef.current, {
        scale: 1.1,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }, "+=0.5");
    }
    
    // Form elements staggered appearance
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('div, button');
      gsap.from(formElements, {
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.4,
        delay: 0.3,
        ease: "power2.out"
      });
    }

    // Add shine effect to inputs on focus
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.4)',
          duration: 0.3
        });
      });
      
      input.addEventListener('blur', () => {
        gsap.to(input, {
          boxShadow: 'none',
          duration: 0.3
        });
      });
    });
    
    // Button hover animations
    const button = document.querySelector('.signup-btn');
    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.03,
          duration: 0.2,
          backgroundColor: '#4f46e5'
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          backgroundColor: '#6366f1'
        });
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Create loading animation
    const submitBtn = formRef.current?.querySelector('button[type="submit"]');
    if (submitBtn) {
      gsap.to(submitBtn, {
        scale: 0.97,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

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
        
        // Success animation before navigation
        if (containerRef.current) {
          const tl = gsap.timeline({
            onComplete: () => navigate('/home')
          });
          
          tl.to(containerRef.current, {
            scale: 1.03,
            duration: 0.3,
            ease: "power1.in"
          });
          
          tl.to(containerRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.4
          });
        } else {
          navigate('/home');
        }
      } else {
        // Error shake animation - Fix for the TypeScript error
        if (formRef.current) {
          // Use a timeline for complex animation instead of array
          const tl = gsap.timeline();
          tl.to(formRef.current, { x: -10, duration: 0.1 })
            .to(formRef.current, { x: 10, duration: 0.1 })
            .to(formRef.current, { x: -8, duration: 0.1 })
            .to(formRef.current, { x: 8, duration: 0.1 })
            .to(formRef.current, { x: -5, duration: 0.1 })
            .to(formRef.current, { x: 5, duration: 0.1 })
            .to(formRef.current, { x: 0, duration: 0.1 });
        }
        
        toast({
          variant: "destructive",
          title: "Sign up failed",
          description: "Please fill in all fields.",
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

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 flex items-center justify-center pattern-bg bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="text-center mb-6">
          <div ref={iconRef} className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <User className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-gray-500 mt-1">Join Iqro App to start learning</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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

          <Button type="submit" className="w-full signup-btn" disabled={isLoading}>
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

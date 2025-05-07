
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary/5 dark:bg-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                Learn Arabic with <span className="text-primary">Iqro</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                Master Arabic reading and writing with interactive lessons, personalized practice, and track your progress
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="font-medium">
                  <Link to="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/signin">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 w-full max-w-md">
                <img 
                  src="/placeholder.svg" 
                  alt="Iqro App Demo" 
                  className="w-full rounded-md border border-gray-200 dark:border-gray-700 shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Iqro?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our app offers a unique approach to learning Arabic that's both effective and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Lessons</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn through engaging, interactive lessons that make mastering Arabic fun and effective
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your learning journey with detailed statistics and achievements
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Daily Exercises</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practice with personalized daily exercises that adapt to your learning pace
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of students who are successfully learning Arabic with Iqro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                role: "Student",
                content: "Iqro has made learning Arabic so much easier and more enjoyable. The interactive lessons are perfect for my learning style."
              },
              {
                name: "Ahmed K.",
                role: "Professional",
                content: "I've tried many language apps, but Iqro stands out with its focused approach to Arabic script. Highly recommended!"
              },
              {
                name: "Layla T.",
                role: "Beginner",
                content: "As someone with no prior experience in Arabic, this app has been a game-changer for me. The daily practice feature keeps me motivated."
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Arabic Learning Journey?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Join Iqro today and take the first step toward mastering Arabic reading and writing
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/signup">
                Get Started Free
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/signin">
                Try Guest Access
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 dark:bg-gray-800 mt-auto">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p>© {new Date().getFullYear()} Iqro Learning App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

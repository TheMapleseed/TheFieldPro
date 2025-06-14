
import { useState, useEffect } from 'react';
import { Clock, Mail, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set launch date (30 days from now)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      console.log('Email submitted:', email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">The Field</h1>
          <p className="text-xl text-slate-300">
            Something amazing is coming your way
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <div className="flex justify-center items-center space-x-8 mb-6">
            <div className="text-center">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                <div className="text-3xl font-bold text-white">{timeLeft.days}</div>
                <div className="text-sm text-slate-400">Days</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                <div className="text-3xl font-bold text-white">{timeLeft.hours}</div>
                <div className="text-sm text-slate-400">Hours</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                <div className="text-3xl font-bold text-white">{timeLeft.minutes}</div>
                <div className="text-sm text-slate-400">Minutes</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                <div className="text-3xl font-bold text-white">{timeLeft.seconds}</div>
                <div className="text-sm text-slate-400">Seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Signup */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Be the first to know when we launch
          </h2>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Notify Me
                </Button>
              </div>
            </form>
          ) : (
            <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-green-400">
                ✓ Thanks! We'll notify you when we launch.
              </p>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-12">
          <p className="text-lg text-slate-300 leading-relaxed">
            We're working on something special that will change the way you work with code. 
            Stay tuned for updates and be among the first to experience the future.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          <a 
            href="#" 
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Follow us on Twitter"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a 
            href="#" 
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Check out our GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-700/50">
          <p className="text-sm text-slate-500">
            © 2025 The Field. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

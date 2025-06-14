import { useState, useEffect } from 'react';
import { Twitter } from 'lucide-react';

const Index = () => {
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

        {/* Description */}
        <div className="mb-12">
          <p className="text-2xl text-slate-300 leading-relaxed font-medium">
            MonoRepo for the remote team startup world.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center">
          <a 
            href="https://x.com/TheMapleseedInc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Follow us on Twitter"
          >
            <Twitter className="w-6 h-6" />
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

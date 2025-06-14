
import { Twitter } from 'lucide-react';

const Index = () => {
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

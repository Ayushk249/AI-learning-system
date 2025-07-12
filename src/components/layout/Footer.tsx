import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side - Branding */}
          <div className="flex items-center gap-2 text-neutral-600">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-error-500 fill-current" />
            <span>for better learning</span>
          </div>

          {/* Center - Copyright */}
          <div className="text-neutral-500 text-sm">
            © 2025 Dynamic Learning System. Made for education.
          </div>

        </div>

        {/* Bottom text */}
        <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
          <p className="text-neutral-500 text-sm">
            Interactive learning powered by AI • Phase 1: Foundation Demo
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
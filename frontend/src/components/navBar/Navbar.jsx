import React, { useState } from 'react';
import Logo from './Logo';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <div className="flex items-center justify-between px-6 py-3 rounded-full bg-white/40 backdrop-blur-md border border-gray-200/50 shadow-sm">
        
        {/* Logo Section */}
        <div className="flex-shrink-0 cursor-pointer flex items-center">
          <Logo />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-800 hover:text-black text-base transition-colors lowercase">
            Jobs
          </a>
          <a href="/about" className="text-gray-800 hover:text-black text-base transition-colors lowercase">
            About
          </a>
        </div>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 text-gray-800 hover:text-black hover:bg-white/50 rounded-full transition-colors"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button className="text-gray-800 hover:text-black transition-colors lowercase font-medium px-2">
            login
          </button>
          <button className="bg-gray-900/10 hover:bg-gray-900/20 text-gray-900 px-5 py-1.5 rounded-full transition-all border border-gray-900/20 lowercase backdrop-blur-sm font-medium">
            register
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
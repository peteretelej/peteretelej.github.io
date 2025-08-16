import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Get current theme from DOM (set by BaseHead script)
    const currentlyDark = document.documentElement.classList.contains('dark');
    setIsDark(currentlyDark);
  }, []);

  const toggleTheme = async () => {
    setIsTransitioning(true);
    const newDark = !isDark;
    const root = document.documentElement;
    const theme = newDark ? 'dark' : 'light';
    
    // Update DOM immediately
    if (newDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Update data attribute and localStorage
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update state
    setIsDark(newDark);
    
    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-neutral-200 dark:bg-neutral-700 animate-pulse border border-neutral-200/50 dark:border-neutral-600/50" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className="group relative p-2 rounded-lg text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-700/80 backdrop-blur-sm transition-all duration-200 hover:scale-105 disabled:opacity-75 border border-transparent hover:border-neutral-200/50 dark:hover:border-neutral-600/50"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <svg 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-75'
          }`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
        <svg 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            !isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-75'
          }`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
      
      {isTransitioning && (
        <div className="absolute inset-0 rounded-lg bg-current opacity-10 animate-pulse" />
      )}
    </button>
  );
}
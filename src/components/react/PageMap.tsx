import { useState, useEffect } from 'react';

interface PageMapProps {
  className?: string;
}

export default function PageMap({ className = '' }: PageMapProps) {
  const [headings, setHeadings] = useState<Array<{
    id: string;
    text: string;
    level: number;
  }>>([]);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Get all headings from the page
    const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingData = Array.from(headingElements).map((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      let id = heading.id;
      
      // Generate ID if it doesn't exist
      if (!id) {
        id = `heading-${index}`;
        heading.id = id;
      }
      
      return {
        id,
        text: heading.textContent || '',
        level
      };
    });
    
    setHeadings(headingData);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id));
      let currentHeading = null;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentHeading = headings[i].id;
            break;
          }
        }
      }

      setActiveHeading(currentHeading);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-20 ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs">
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Page Map</h3>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className={`w-4 h-4 transform transition-transform ${
                isCollapsed ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        
        {!isCollapsed && (
          <div className="max-h-96 overflow-y-auto p-2">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left p-2 text-xs rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  activeHeading === heading.id
                    ? 'bg-brand-100 dark:bg-brand-900 text-brand-800 dark:text-brand-200 border-l-2 border-brand-600'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
                style={{ marginLeft: `${(heading.level - 1) * 8}px` }}
              >
                {heading.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
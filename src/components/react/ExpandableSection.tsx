import { useState, useRef, useEffect } from 'react';

interface ExpandableSectionProps {
  title: string;
  description?: string;
  buttonText?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export default function ExpandableSection({
  title,
  description,
  buttonText = "Read how to do this",
  children,
  defaultExpanded = false
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [buttonPosition, setButtonPosition] = useState({ isFixed: false, top: 0, right: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const expandedContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpanded || !expandedContentRef.current || !sectionRef.current) return;

    const updateButtonPosition = () => {
      const expandedContent = expandedContentRef.current;
      if (!expandedContent) return;

      const expandedRect = expandedContent.getBoundingClientRect();
      
      const stickyThreshold = 60;
      const isContentAboveViewport = expandedRect.top < stickyThreshold;
      const isContentBelowViewport = expandedRect.bottom < stickyThreshold + 60;
      
      if (isContentAboveViewport && !isContentBelowViewport) {
        const rightOffset = window.innerWidth - expandedRect.right + 24;
        setButtonPosition({
          isFixed: true,
          top: stickyThreshold,
          right: rightOffset
        });
      } else {
        setButtonPosition({
          isFixed: false,
          top: 0,
          right: 0
        });
      }
    };

    const handleScroll = () => {
      updateButtonPosition();
    };

    updateButtonPosition();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateButtonPosition);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateButtonPosition);
    };
  }, [isExpanded]);

  return (
    <div ref={sectionRef} className="my-6">
      <div className="bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 px-5 py-4 text-sm relative transition-all duration-300 ease-in-out overflow-hidden">
        {/* Description and button - only when collapsed */}
        {!isExpanded && (
          <div>
            {description && (
              <p 
                className="text-gray-700 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none mb-3"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            <button
              onClick={() => {
                setIsExpanded(true);
                setTimeout(() => {
                  sectionRef.current?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest'
                  });
                }, 100);
              }}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs px-3 py-2 rounded border-0 transition-colors duration-200 font-medium"
            >
              {buttonText}
            </button>
          </div>
        )}
        
        {/* Expanded content - grows within the same card */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600 animate-in slide-in-from-top-2 duration-300 relative">
            <div 
              ref={expandedContentRef}
              className="bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 relative overflow-hidden"
              style={{ boxShadow: 'inset 0px 5px 15px rgba(0, 0, 0, 0.1)' }}
            >
              {/* Smart floating minimize button - sticks to viewport when scrolled */}
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setTimeout(() => {
                    sectionRef.current?.scrollIntoView({ 
                      behavior: 'smooth', 
                      block: 'start',
                      inline: 'nearest'
                    });
                  }, 100);
                }}
                className={`${
                  buttonPosition.isFixed ? 'fixed z-50' : 'absolute'
                } top-4 right-6 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white text-xs px-3 py-2 rounded-full shadow-lg border-0 transition-colors duration-150 font-medium flex items-center gap-1`}
                style={buttonPosition.isFixed ? {
                  top: `${buttonPosition.top}px`,
                  right: `${buttonPosition.right}px`
                } : {}}
              >
                <span>×</span>
                <span className="hidden sm:inline">Minimize</span>
              </button>
              
              <div className="prose dark:prose-invert max-w-none prose-sm clear-both">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-0 mb-3">
                  {title}
                </h4>
                {description && (
                  <p 
                    className="text-gray-700 dark:text-gray-300 mb-4 text-sm border-b border-gray-200 dark:border-gray-700 pb-3"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
                {children}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
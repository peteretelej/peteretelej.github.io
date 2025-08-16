import { useState, useEffect, useMemo } from 'react';

interface Post {
  id: string;
  data: {
    title: string;
    description?: string;
    publishDate: Date;
    tags?: string[];
    thumbnail?: string;
  };
  collection: string;
}

interface SearchProps {
  posts: Post[];
  placeholder?: string;
  className?: string;
}

export default function Search({ posts, placeholder = "Search posts...", className = "" }: SearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return posts
      .filter(post => {
        const titleMatch = post.data.title.toLowerCase().includes(searchTerm);
        const descMatch = post.data.description?.toLowerCase().includes(searchTerm);
        const tagMatch = post.data.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
        return titleMatch || descMatch || tagMatch;
      })
      .slice(0, 8);
  }, [posts, query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredPosts.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredPosts[selectedIndex]) {
          const post = filteredPosts[selectedIndex];
          window.location.href = `/${post.collection}/${post.id}`;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setQuery('');
        setSelectedIndex(-1);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim().length > 0) {
      setIsLoading(true);
      setIsOpen(true);
      // Simulate search delay for better UX
      setTimeout(() => setIsLoading(false), 300);
    } else {
      setIsOpen(false);
      setIsLoading(false);
    }
    setSelectedIndex(-1);
  };

  const handlePostClick = (post: Post) => {
    window.location.href = `/${post.collection}/${post.id}`;
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
      setSelectedIndex(-1);
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-4 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              setSelectedIndex(-1);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && filteredPosts.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {filteredPosts.map((post, index) => (
            <button
              key={`${post.collection}-${post.id}`}
              onClick={() => handlePostClick(post)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors ${
                index === selectedIndex ? 'bg-brand-50 dark:bg-brand-900/20' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {post.data.thumbnail && (
                  <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded">
                    <img
                      src={post.data.thumbnail}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {post.data.title}
                  </div>
                  {post.data.description && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                      {post.data.description}
                    </div>
                  )}
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <span className="capitalize bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {post.collection}
                    </span>
                    {post.data.tags && post.data.tags.length > 0 && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{post.data.tags.slice(0, 2).join(', ')}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Searching...</span>
          </div>
        </div>
      )}

      {isOpen && query && !isLoading && filteredPosts.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4 text-center text-gray-500 dark:text-gray-400">
          No posts found matching "{query}"
        </div>
      )}
    </div>
  );
}
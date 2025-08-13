import { useState, useEffect } from 'react';

interface TagPillsProps {
  tags: { id: string; label: string }[];
}

export default function TagPills({ tags }: TagPillsProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = tags.map(tag => document.getElementById(tag.id));
      let currentSection = null;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = tags[i].id;
            break;
          }
        }
      }

      setActiveTag(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tags]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Adjust for header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8 sticky top-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md z-10">
      {tags.map(tag => (
        <button
          key={tag.id}
          onClick={() => scrollToSection(tag.id)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            activeTag === tag.id
              ? 'bg-brand-600 text-white ring-2 ring-brand-400'
              : 'bg-brand-600 text-white hover:bg-brand-700'
          }`}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}
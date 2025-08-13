import { useState } from 'react';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export default function ExpandableSection({
  title,
  children,
  defaultExpanded = false
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="my-4">
      <div className="notification bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          You can now setup <strong>public key authentication</strong> (recommended). This will enable you to securely login to the server without having to enter your password.
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <span className="mr-2">{isExpanded ? '📖' : '📚'}</span>
          {isExpanded ? 'Minimize this section' : 'Read how to do this'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="box bg-gray-50 dark:bg-gray-700 shadow-inset-lg p-4 rounded-lg mt-2 transition-all duration-300 border border-gray-200 dark:border-gray-600">
          <div className="prose dark:prose-invert max-w-none prose-sm">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

declare global {
    interface Window {
        marked: any;
    }
}

interface StrategyDisplayProps {
  strategyMarkdown: string;
  onReset: () => void;
}

const StrategyDisplay: React.FC<StrategyDisplayProps> = ({ strategyMarkdown, onReset }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (contentRef.current && window.marked) {
        const parsedHtml = window.marked.parse(strategyMarkdown);
        contentRef.current.innerHTML = parsedHtml;
    }
  }, [strategyMarkdown]);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(strategyMarkdown).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  return (
    <div className="w-full animate-fade-in">
        <div className="flex justify-between items-center mb-4">
             <h1 className="text-3xl font-bold text-white">
                Your Quarterly Strategy Draft
            </h1>
            <div className="flex gap-2">
                 <button 
                    onClick={handleCopy}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
                 >
                    {isCopied ? <CheckIcon /> : <ClipboardIcon />}
                    {isCopied ? 'Copied!' : 'Copy Markdown'}
                </button>
                <button
                    onClick={onReset}
                    className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    Create New Strategy
                </button>
            </div>
        </div>
      
      <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-xl prose prose-invert prose-headings:text-indigo-400 prose-a:text-indigo-300 hover:prose-a:text-indigo-200 max-w-none">
        <div ref={contentRef}></div>
      </div>
    </div>
  );
};

export default StrategyDisplay;

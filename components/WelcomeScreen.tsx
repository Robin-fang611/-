
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
        策略大师 <span className="text-indigo-400">StrategyMaster</span>
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        Your AI-powered B2B Content Marketing Strategist. Let's build a quarterly plan to drive leads and conversions.
      </p>
      <button
        onClick={onStart}
        className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 inline-flex items-center gap-2 text-lg"
      >
        <SparklesIcon />
        Generate Strategy
      </button>
    </div>
  );
};

export default WelcomeScreen;

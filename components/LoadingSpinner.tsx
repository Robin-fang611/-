
import React, { useState, useEffect } from 'react';

const LoadingSpinner: React.FC = () => {
    const messages = [
        "Analyzing your business context...",
        "Consulting 15 years of B2B marketing expertise...",
        "Identifying competitor content gaps...",
        "Designing your content funnel...",
        "Crafting an actionable quarterly plan...",
        "Finalizing the strategy draft..."
    ];

    const [currentMessage, setCurrentMessage] = useState(messages[0]);

    useEffect(() => {
        let messageIndex = 0;
        const interval = setInterval(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            setCurrentMessage(messages[messageIndex]);
        }, 2500);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in">
            <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h2 className="text-2xl font-semibold text-white mt-6">Generating Your Strategy</h2>
            <p className="text-gray-300 mt-2 transition-opacity duration-500">{currentMessage}</p>
        </div>
    );
};

export default LoadingSpinner;

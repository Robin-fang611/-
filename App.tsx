
import React, { useState, useCallback } from 'react';
import { ViewState, FormData } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import InputForm from './components/InputForm';
import StrategyDisplay from './components/StrategyDisplay';
import { generateStrategy } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.Welcome);
  const [formData, setFormData] = useState<FormData>({
    product: '',
    kpi: '',
    persona: '',
    competitors: '',
  });
  const [strategy, setStrategy] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setView(ViewState.Form);
  };
  
  const handleReset = () => {
    setFormData({ product: '', kpi: '', persona: '', competitors: '' });
    setStrategy('');
    setError(null);
    setView(ViewState.Form);
  }

  const handleSubmit = useCallback(async (data: FormData) => {
    setView(ViewState.Loading);
    setError(null);
    try {
      const result = await generateStrategy(data);
      setStrategy(result);
      setView(ViewState.Result);
    } catch (err) {
      setError('An error occurred while generating the strategy. Please check your API key and try again.');
      console.error(err);
      setView(ViewState.Form);
    }
  }, []);

  const renderContent = () => {
    switch (view) {
      case ViewState.Welcome:
        return <WelcomeScreen onStart={handleStart} />;
      case ViewState.Form:
        return <InputForm initialData={formData} onSubmit={handleSubmit} error={error} />;
      case ViewState.Loading:
        return <LoadingSpinner />;
      case ViewState.Result:
        return <StrategyDisplay strategyMarkdown={strategy} onReset={handleReset} />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-4xl mx-auto">
        {renderContent()}
      </div>
       <footer className="text-center text-gray-500 mt-8 text-sm">
         <p>Powered by Google Gemini. Designed for B2B Marketing Professionals.</p>
       </footer>
    </div>
  );
};

export default App;

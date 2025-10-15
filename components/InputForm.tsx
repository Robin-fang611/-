
import React, { useState, useMemo } from 'react';
import type { FormData } from '../types';
import SparklesIcon from './icons/SparklesIcon';

interface InputFormProps {
  initialData: FormData;
  onSubmit: (data: FormData) => void;
  error: string | null;
}

const InputForm: React.FC<InputFormProps> = ({ initialData, onSubmit, error }) => {
  const [data, setData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = useMemo(() => {
    return Object.values(data).every(value => value.trim() !== '');
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(data);
    }
  };

  const formFields = [
    { name: 'product', label: 'Product/Service Attributes', placeholder: 'Describe the core value and pain points your product/service solves.' },
    { name: 'kpi', label: 'Quarterly Marketing Core Goal (KPI)', placeholder: 'e.g., Acquire 1000 MQLs, increase website sign-up rate by 20%.' },
    { name: 'persona', label: 'Target Customer (Buyer Persona)', placeholder: 'Describe their profile, job title, and common challenges.' },
    { name: 'competitors', label: 'Main Competitors', placeholder: 'List at least 1-2 main competitors for differentiation analysis.' },
  ];

  return (
    <div className="w-full animate-fade-in">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
           Provide Your Business Context
        </h1>
        <p className="text-gray-400 text-center mb-8">Fill in all fields to generate your custom marketing strategy.</p>
        
        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-xl">
            {formFields.map(field => (
                <div key={field.name}>
                    <label htmlFor={field.name} className="block text-md font-medium text-gray-300 mb-2">
                        {field.label}
                    </label>
                    <textarea
                        id={field.name}
                        name={field.name}
                        value={data[field.name as keyof FormData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full bg-gray-900/70 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 placeholder-gray-500"
                    />
                </div>
            ))}
            <div className="text-right">
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center gap-2 text-lg"
                >
                    <SparklesIcon />
                    Generate Strategy
                </button>
            </div>
        </form>
    </div>
  );
};

export default InputForm;

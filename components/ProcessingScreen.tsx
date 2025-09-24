
import React, { useState, useEffect } from 'react';

const steps = [
  "Enhancing document clarity...",
  "Extracting raw text via OCR...",
  "Recognizing handwritten notes...",
  "AI analyzing clinical information...",
  "Structuring data into FHIR format...",
  "Finalizing results..."
];

export const ProcessingScreen: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % steps.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
        <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75 delay-1000"></div>
            <div className="relative w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center">
                 <svg className="w-12 h-12 text-blue-300 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </div>
      <h2 className="text-3xl font-bold mb-4 tracking-wide">Zenexa AI is digitizing your medical record…</h2>
      <p className="text-white/70 text-lg transition-opacity duration-500">{steps[currentStep]}</p>
    </div>
  );
};

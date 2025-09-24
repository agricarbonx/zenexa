
import React, { useState, useCallback } from 'react';
import { UploadScreen } from './components/UploadScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultScreen } from './components/ResultScreen';
import { extractMedicalData } from './services/geminiService';
import { StructuredMedicalData } from './types';
import { ZenexaLogo } from './components/icons/ZenexaLogo';

enum AppState {
  UPLOAD,
  PROCESSING,
  RESULTS,
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.UPLOAD);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [structuredData, setStructuredData] = useState<StructuredMedicalData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    setAppState(AppState.PROCESSING);
    setOriginalFile(file);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64String = (reader.result as string).split(',')[1];
        if (!base64String) {
          throw new Error('Failed to convert file to base64.');
        }

        const data = await extractMedicalData(base64String, file.type);
        setStructuredData(data);
        setAppState(AppState.RESULTS);
      };
      reader.onerror = () => {
        throw new Error('Error reading the file.');
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error('Processing error:', errorMessage);
      setError(`Failed to process document. Reason: ${errorMessage}`);
      setAppState(AppState.UPLOAD);
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState(AppState.UPLOAD);
    setOriginalFile(null);
    setStructuredData(null);
    setError(null);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.PROCESSING:
        return <ProcessingScreen />;
      case AppState.RESULTS:
        if (originalFile && structuredData) {
          return (
            <ResultScreen
              originalFile={originalFile}
              structuredData={structuredData}
              onReset={handleReset}
            />
          );
        }
        // Fallback to upload if data is missing
        handleReset();
        return <UploadScreen onFileUpload={handleFileUpload} error={error} />;
      case AppState.UPLOAD:
      default:
        return <UploadScreen onFileUpload={handleFileUpload} error={error} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#dc2626] text-white font-sans flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <header className="absolute top-0 left-0 p-6 flex items-center gap-4">
        <ZenexaLogo className="h-10 w-auto" />
      </header>
      <main className="w-full max-w-7xl flex-grow flex items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;

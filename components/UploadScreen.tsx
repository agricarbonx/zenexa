
import React, { useRef, useCallback } from 'react';
import { FileIcon } from './icons/FileIcon';
import { CameraIcon } from './icons/CameraIcon';

interface UploadScreenProps {
  onFileUpload: (file: File) => void;
  error: string | null;
}

const ACCEPTED_FORMATS = "image/jpeg,image/png,application/pdf";

export const UploadScreen: React.FC<UploadScreenProps> = ({ onFileUpload, error }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const triggerFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="w-full max-w-2xl text-center flex flex-col items-center">
      <div 
        className="w-full p-10 bg-white/5 border-2 border-dashed border-white/30 rounded-3xl backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-red-400 hover:shadow-[0_0_30px_5px_rgba(220,38,38,0.3)]"
        onClick={triggerFileSelect}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
            <FileIcon className="w-16 h-16 text-white/50" />
            <h2 className="text-2xl font-bold tracking-tight">Upload Medical Records</h2>
            <p className="text-white/60">Drag & drop files here, or click to browse.</p>
            <p className="text-xs text-white/40">Supported formats: JPG, PNG, PDF</p>
            <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_FORMATS}
            onChange={handleFileChange}
            className="hidden"
            />
        </div>
      </div>
       <div className="my-4 text-white/50 text-sm">OR</div>
       <button 
        onClick={() => { /* TODO: Implement camera functionality */ alert('Camera functionality not yet implemented.'); }}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-red-600 rounded-full font-semibold transition-transform hover:scale-105"
        >
        <CameraIcon className="w-5 h-5" />
        Scan with Camera
      </button>

      {error && (
        <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
          <p className="font-bold">An Error Occurred</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

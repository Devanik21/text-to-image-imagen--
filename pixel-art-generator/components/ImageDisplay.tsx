
import React from 'react';
import { Loader } from './Loader';

interface ImageDisplayProps {
  imageSrc: string | null;
  isLoading: boolean;
  error: string | null;
  prompt: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageSrc, isLoading, error, prompt }) => {
  return (
    <div className="w-full aspect-square bg-[#0f0f1b] border-2 border-dashed border-cyan-400/30 rounded-lg flex items-center justify-center p-2 relative overflow-hidden">
      {isLoading && <Loader />}
      
      {error && !isLoading && (
        <div className="text-center text-red-400 text-lg p-4">
          <p className="font-bold text-2xl mb-2">[ ERROR ]</p>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && !imageSrc && (
        <div className="text-center text-gray-500 text-xl p-4">
          <p className="text-5xl mb-4">🖼️</p>
          <p>Your generated pixel art will appear here.</p>
        </div>
      )}

      {imageSrc && !isLoading && !error && (
        <img
          src={imageSrc}
          alt={`Pixel art of: ${prompt}`}
          className="w-full h-full object-contain pixelated rounded-md transition-opacity duration-500 opacity-100"
        />
      )}
    </div>
  );
};

export default ImageDisplay;

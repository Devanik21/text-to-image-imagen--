
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-[#0f0f1b]/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
       <div className="text-center text-cyan-300">
        <div className="flex justify-center items-center space-x-1 text-4xl">
            <div className="w-4 h-10 bg-fuchsia-500 animate-pulse [animation-delay:-0.3s]"></div>
            <div className="w-4 h-10 bg-fuchsia-500 animate-pulse [animation-delay:-0.15s]"></div>
            <div className="w-4 h-10 bg-fuchsia-500 animate-pulse"></div>
        </div>
        <p className="mt-4 text-2xl tracking-widest">LOADING...</p>
      </div>
    </div>
  );
};

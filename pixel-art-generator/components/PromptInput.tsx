
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="prompt-input" className="text-xl text-cyan-300">
        Enter your vision:
      </label>
      <textarea
        id="prompt-input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., A futuristic city skyline at sunset, 16-bit"
        className="w-full bg-[#0f0f1b] border-2 border-cyan-400/50 rounded-lg p-3 text-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all duration-300 h-24 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt}
        className="w-full text-2xl bg-fuchsia-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-fuchsia-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-100 disabled:transform-none flex items-center justify-center gap-3"
      >
        {isLoading ? 'Generating...' : 'Generate Pixel Art'}
      </button>
    </div>
  );
};

export default PromptInput;

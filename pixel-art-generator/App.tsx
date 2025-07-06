
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import ImageDisplay from './components/ImageDisplay';
import Footer from './components/Footer';
import { generatePixelArt } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A knight in glowing armor holding a pixelated sword');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image.');
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generatePixelArt(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Generation failed: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="bg-[#0f0f1b] min-h-screen text-gray-100 flex flex-col items-center p-4 selection:bg-fuchsia-500 selection:text-white">
      <Header />
      <main className="w-full max-w-3xl flex flex-col items-center justify-center flex-grow p-4">
        <div className="w-full bg-[#1a1a2e]/60 border border-fuchsia-500/30 rounded-xl shadow-2xl shadow-fuchsia-900/20 backdrop-blur-sm p-6 md:p-8 space-y-6">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
          <ImageDisplay
            imageSrc={generatedImage}
            isLoading={isLoading}
            error={error}
            prompt={prompt}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;

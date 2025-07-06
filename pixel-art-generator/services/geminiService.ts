
import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_IMAGEN_API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generatePixelArt = async (prompt: string): Promise<string> => {
  // Enhance the prompt for better pixel art results
  const enhancedPrompt = `A high-resolution, detailed, vibrant, 16-bit pixel art of: ${prompt}. Clean lines, retro video game style, fantasy elements, masterpiece quality.`;

  try {
    console.log("Generating image with prompt:", enhancedPrompt);
    const response = await ai.models.generateImages({
      model: 'gemini-2.0-flash-preview-image-generation',
      prompt: enhancedPrompt,
      config: { numberOfImages: 1, outputMimeType: 'image/png' },
    });

    if (!response.generatedImages || response.generatedImages.length === 0 || !response.generatedImages[0].image.imageBytes) {
      throw new Error("API returned no image data.");
    }

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
    
    console.log("Image generated successfully.");
    return imageUrl;

  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`[Gemini API Error] ${error.message}`);
    }
    throw new Error("An unexpected error occurred while generating the image.");
  }
};

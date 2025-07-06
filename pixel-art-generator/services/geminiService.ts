// src/services/geminiService.ts

const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

export const generatePixelArt = async (prompt: string): Promise<string> => {
  if (!HF_API_KEY) {
    throw new Error("VITE_HUGGINGFACE_API_KEY not set.");
  }

  const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`HF API error: ${response.status} – ${err}`);
  }

  const blob = await response.blob();
  const base64 = await blobToBase64(blob);
  return `data:image/png;base64,${base64}`;
};

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = (reader.result as string

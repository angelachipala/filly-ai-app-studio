import { GoogleGenerativeAI } from "@google/generative-ai";

// Aceder à chave API guardada no Netlify
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Gera resposta de texto usando Gemini 1.5 Flash
 */
export const generateText = async (prompt: string): Promise<string> => {
  try {
    if (!apiKey) throw new Error("API Key em falta");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro Gemini Text:", error);
    return "Olá! Estou a ter um pequeno problema técnico, mas podes tentar novamente?";
  }
};

/**
 * Gera imagens usando o motor Pollinations (Grátis e Estável)
 */
export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    // Criar um URL limpo para a imagem
    const seed = Math.floor(Math.random() * 999999);
    const encodedPrompt = encodeURIComponent(prompt);
    
    // Este URL gera a imagem diretamente
    const imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true`;
    
    return imageUrl;
  } catch (error) {
    console.error("Erro Image Gen:", error);
    return null;
  }
};

/**
 * Função de suporte para análise (Vision)
 */
export const analyzeImage = async (prompt: string): Promise<string> => {
  return "Funcionalidade de análise em manutenção.";
};

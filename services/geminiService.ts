import { GoogleGenerativeAI } from "@google/generative-ai";

// Procura a chave API nas variáveis de ambiente do Netlify
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Função para gerar texto (Gemini 1.5 Flash)
 */
export const generateText = async (prompt: string): Promise<string> => {
  try {
    if (!apiKey) {
      return "Erro: A chave API não foi configurada no Netlify.";
    }
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro no texto:", error);
    return "Lamento, não consegui processar o teu texto agora.";
  }
};

/**
 * Função para gerar imagens (Motor Pollinations - Gratuito e Rápido)
 * Este motor gera imagens instantaneamente através de um URL.
 */
export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    // Criamos um número aleatório (seed) para a imagem ser sempre única
    const seed = Math.floor(Math.random() * 1000000);
    // Codificamos o texto para o formato de URL
    const cleanPrompt = encodeURIComponent(prompt);
    
    // Retornamos o link direto da imagem
    return `https://pollinations.ai/p/${cleanPrompt}?width=1024&height=1024&seed=${seed}&nologo=true`;
  } catch (error) {
    console.error("Erro na imagem:", error);
    return null;
  }
};

/**
 * Função placeholder para análise de imagem
 */
export const analyzeImage = async (prompt: string): Promise<string> => {
  return "Funcionalidade de análise em desenvolvimento.";
};

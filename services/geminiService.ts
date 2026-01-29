import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuração da Chave vinda do Netlify
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Função para gerar texto
 */
export const generateText = async (prompt: any) => {
  try {
    if (!apiKey) return "Erro: Chave API não encontrada no Netlify.";
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    return "Lamento, tive um problema a processar o texto. Tenta de novo!";
  }
};

/**
 * Função para gerar imagens (Usa o motor Pollinations que é grátis e rápido)
 */
export const generateImage = async (prompt: any) => {
  try {
    const seed = Math.floor(Math.random() * 1000000);
    const encodedPrompt = encodeURIComponent(prompt);
    // Este URL gera a imagem automaticamente
    return `https://pollinations.ai/p/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true`;
  } catch (error) {
    return null;
  }
};

/**
 * Função para análise de imagens
 */
export const analyzeImage = async (p1: any, p2: any) => {
  return "Funcionalidade de análise em manutenção.";
};

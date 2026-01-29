import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * CONFIGURAÇÃO DO SERVIÇO DE IA
 * Este código deve permanecer em inglês para o sistema (Netlify) funcionar.
 */

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const generateText = async (prompt: string): Promise<string> => {
  try {
    if (!apiKey) return "Erro: Chave API não configurada no Netlify.";
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Erro no Gemini:", error);
    return "Lamento, ocorreu um erro ao processar o seu pedido.";
  }
};

export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    const seed = Math.floor(Math.random() * 1000000);
    const encoded = encodeURIComponent(prompt);
    // Usamos o motor Pollinations para gerar imagens de forma gratuita e rápida
    return `https://pollinations.ai/p/${encoded}?width=1024&height=1024&seed=${seed}&nologo=true`;
  } catch (e) {
    return null;
  }
};

export const analyzeImage = async (image: any, prompt: string) => {
  return "Funcionalidade de análise em manutenção.";
};

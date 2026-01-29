import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuração básica
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// Função para Texto
export const generateText = async (prompt: any) => {
  try {
    if (!apiKey) return "Erro: API Key não configurada.";
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (e) {
    return "Ocorreu um erro ao gerar texto. Tente novamente.";
  }
};

// Função para Imagens (Motor Pollinations)
export const generateImage = async (prompt: any) => {
  try {
    const seed = Math.floor(Math.random() * 1000000);
    const encoded = encodeURIComponent(prompt);
    // Retorna o link direto que gera a imagem
    return `https://pollinations.ai/p/${encoded}?width=1024&height=1024&seed=${seed}&nologo=true`;
  } catch (e) {
    return null;
  }
};

// Função para Análise
export const analyzeImage = async (p1: any, p2: any) => {
  return "Funcionalidade em manutenção.";
};

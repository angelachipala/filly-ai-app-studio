import { GoogleGenerativeAI } from "@google/generative-ai";

// Procura a chave no Netlify. Se não encontrar, fica vazio para não dar erro de build.
const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const generateText = async (prompt: string) => {
  try {
    if (!apiKey) return "Configuração pendente: Adicione a VITE_GEMINI_API_KEY no Netlify.";
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    console.error(e);
    return "Lamento, o serviço está temporariamente indisponível.";
  }
};

export const generateImage = async (prompt: string) => {
  try {
    const seed = Math.floor(Math.random() * 1000000);
    const encoded = encodeURIComponent(prompt);
    // Link direto para gerar imagem via Pollinations (Grátis)
    return `https://pollinations.ai/p/${encoded}?width=1024&height=1024&seed=${seed}&nologo=true`;
  } catch (e) {
    return null;
  }
};

export const analyzeImage = async (p: any) => {
  return "Funcionalidade em manutenção.";
};

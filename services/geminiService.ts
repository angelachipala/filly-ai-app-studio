import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuração da chave de acesso do Netlify
const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * SERVIÇO DE IA TURBO
 * Otimizado para geração imediata de imagens e conversas fluídas.
 */

// Função para o Chat Inteligente
export const generateText = async (prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (erro) {
    return "Lamento, o cérebro da IA está a descansar. Tente novamente em segundos.";
  }
};

// Função para Melhorar o Pedido de Imagem (Veloz)
export const rewritePrompt = async (prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Create a short, detailed image prompt for: " + prompt);
    return result.response.text();
  } catch (erro) {
    return prompt;
  }
};

// Geração de Imagem Instantânea (Resolve a lentidão)
export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    // Geramos o link da imagem sem esperas pesadas
    const aleatorio = Math.floor(Math.random() * 999999);
    const promptLimpo = encodeURIComponent(prompt.trim());
    
    // Usamos o servidor de alta velocidade para imagens artísticas
    return `https://pollinations.ai/p/${promptLimpo}?width=1024&height=1024&seed=${aleatorio}&nologo=true&model=flux`;
  } catch (erro) {
    console.error("Erro na imagem:", erro);
    return null;
  }
};

// Funções obrigatórias para o site não dar erro de "peças em falta"
export const getDirectorAdvice = async (p: string) => ({ advice: "Use sua criatividade!", category: "Dica" });
export const generateSocialPost = async (p: string) => "Criando post...";
export const analyzeUploadedFile = async (f: any) => ({ analysis: "OK", tags: [] });
export const analyzeImage = async (i: any, p: string) => "Vision Desativado";

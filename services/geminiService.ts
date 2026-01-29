import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * CONFIGURAÇÃO DO SERVIÇO DE IA
 * Este ficheiro contém todas as funções necessárias para o site funcionar.
 */

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Função para gerar texto (Chat)
 */
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

/**
 * Função para melhorar o prompt da imagem (Esta é a que estava em falta!)
 */
export const rewritePrompt = async (prompt: string): Promise<string> => {
  try {
    if (!apiKey) return prompt;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const systemPrompt = "Melhore este prompt para geração de imagem, tornando-o mais detalhado e artístico. Responda apenas com o novo prompt em inglês: ";
    const result = await model.generateContent(systemPrompt + prompt);
    return result.response.text();
  } catch (error) {
    return prompt; // Em caso de erro, devolve o original
  }
};

/**
 * Função para gerar o link da imagem (Motor Pollinations)
 */
export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    const seed = Math.floor(Math.random() * 1000000);
    const encoded = encodeURIComponent(prompt);
    return `https://pollinations.ai/p/${encoded}?width=1024&height=1024&seed=${seed}&nologo=true`;
  } catch (e) {
    return null;
  }
};

export const analyzeImage = async (image: any, prompt: string) => {
  return "Funcionalidade em manutenção.";
};

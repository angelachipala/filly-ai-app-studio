import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * CONFIGURAÇÃO DO SERVIÇO DE IA - VERSÃO COMPLETA
 * Este ficheiro contém todas as funções necessárias para os componentes:
 * ImageStudio, DirectorAI e Chat.
 */

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * 1. Função para o Chat Geral
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
 * 2. Função para o Estúdio de Imagem (Melhorar Prompt)
 */
export const rewritePrompt = async (prompt: string): Promise<string> => {
  try {
    if (!apiKey) return prompt;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const systemPrompt = "Rewrite the following image prompt to be more descriptive, artistic, and detailed. Return ONLY the new prompt in English: ";
    const result = await model.generateContent(systemPrompt + prompt);
    return result.response.text();
  } catch (error) {
    return prompt;
  }
};

/**
 * 3. Função para o Diretor AI (getDirectorAdvice)
 */
export const getDirectorAdvice = async (prompt: string): Promise<any> => {
  try {
    if (!apiKey) return { advice: "Configure a API Key.", category: "Aviso" };
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const systemPrompt = "Assume the role of a creative director. Analyze the user's idea and give strategic advice. Return the response in a structured text format.";
    const result = await model.generateContent(systemPrompt + prompt);
    return {
      advice: result.response.text(),
      category: "Direção Criativa"
    };
  } catch (error) {
    return { advice: "Não foi possível obter o conselho do diretor agora.", category: "Erro" };
  }
};

/**
 * 4. Função para Gerar Link de Imagem (Motor Pollinations)
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

/**
 * 5. Placeholder para Análise de Imagem
 */
export const analyzeImage = async (image: any, prompt: string) => {
  return "Funcionalidade de análise em manutenção.";
};

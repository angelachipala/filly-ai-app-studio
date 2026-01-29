import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// 1. Função de Chat
export const generateText = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) { return "Erro ao ligar ao Gemini."; }
};

// 2. Função de Estúdio de Imagem
export const rewritePrompt = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Melhore este prompt de imagem: " + prompt);
    return result.response.text();
  } catch (e) { return prompt; }
};

// 3. Função de Conselhos do Diretor
export const getDirectorAdvice = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Dê conselhos criativos para: " + prompt);
    return { advice: result.response.text(), category: "Direção" };
  } catch (e) { return { advice: "Sem conselhos agora.", category: "Info" }; }
};

// 4. Função de Redes Sociais
export const generateSocialPost = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Crie um post sobre: " + prompt);
    return result.response.text();
  } catch (e) { return "Erro no post."; }
};

// 5. Função de Análise de Arquivos
export const analyzeUploadedFile = async (file: any) => {
  return { analysis: "Processado.", tags: ["IA"] };
};

// 6. Função de Gerador de Imagem (Pollinations)
export const generateImage = async (prompt: string) => {
  const seed = Math.floor(Math.random() * 1000000);
  return `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}&nologo=true`;
};

// 7. Função de Visão
export const analyzeImage = async (img: any, p: string) => "Manutenção";

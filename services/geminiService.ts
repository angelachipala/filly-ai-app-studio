import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * SERVIÇO DE IA UNIFICADO
 * Contém todas as funções exportadas para os componentes do sistema.
 */

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// 1. Geração de Texto Geral (Chat)
export const generateText = async (prompt: string): Promise<string> => {
  try {
    if (!apiKey) return "API Key missing in Netlify.";
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return "Erro ao processar texto.";
  }
};

// 2. Melhoria de Prompt para Imagem (Image Studio)
export const rewritePrompt = async (prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Rewrite this image prompt to be more artistic and detailed: " + prompt);
    return result.response.text();
  } catch (error) {
    return prompt;
  }
};

// 3. Conselhos do Diretor (Director AI)
export const getDirectorAdvice = async (prompt: string): Promise<any> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Give creative director advice for: " + prompt);
    return { advice: result.response.text(), category: "Direção" };
  } catch (error) {
    return { advice: "Sem conselhos agora.", category: "Info" };
  }
};

// 4. Posts para Redes Sociais (Social Branding)
export const generateSocialPost = async (prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Create a social media post about: " + prompt);
    return result.response.text();
  } catch (error) {
    return "Erro ao criar post.";
  }
};

// 5. Geração de Link de Imagem (Pollinations API)
export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    const seed = Math.floor(Math.random() * 1000000);
    return `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}&nologo=true`;
  } catch (e) {
    return null;
  }
};

// 6. Análise de Imagem (Vision)
export const analyzeImage = async (image: any, prompt: string) => {
  return "Análise em manutenção.";
};

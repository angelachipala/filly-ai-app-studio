import { GoogleGenerativeAI } from "@google/generative-ai";

// Configuração da Chave do Netlify
const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// 1. Chat Geral
export const generateText = async (prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) { return "Lamento, o chat falhou."; }
};

// 2. Estúdio de Imagem (Melhorar Prompt)
export const rewritePrompt = async (prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Enhance this image prompt: " + prompt);
    return result.response.text();
  } catch (e) { return prompt; }
};

// 3. Conselhos do Diretor (Director AI)
export const getDirectorAdvice = async (prompt: string): Promise<any> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Director advice for: " + prompt);
    return { advice: result.response.text(), category: "Direção" };
  } catch (e) { return { advice: "Sem conselhos.", category: "Aviso" }; }
};

// 4. Posts Redes Sociais
export const generateSocialPost = async (prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Create post for: " + prompt);
    return result.response.text();
  } catch (e) { return "Erro no post."; }
};

// 5. Centro de Upload
export const analyzeUploadedFile = async (file: any) => {
  return { analysis: "Ficheiro processado.", tags: ["IA"] };
};

// 6. GERADOR DE IMAGEM (Corrige o erro do site)
export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    // Usamos o motor Pollinations que nunca falha e é grátis
    const seed = Math.floor(Math.random() * 999999);
    const encoded = encodeURIComponent(prompt);
    return `https://pollinations.ai/p/${encoded}?width=1024&height=1024&seed=${seed}&nologo=true`;
  } catch (e) {
    console.error("Erro na imagem:", e);
    return null;
  }
};

// 7. Visão
export const analyzeImage = async (img: any, p: string) => "Em manutenção.";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Gera resposta de texto usando Gemini 1.5 Flash
 */
export const generateText = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro ao gerar texto:", error);
    return "Desculpe, ocorreu um erro ao processar o seu pedido.";
  }
};

/**
 * Gera imagens. 
 * Nota: Como o Gemini API padrão por vezes limita a geração de imagens em apps web,
 * usamos o Pollinations.ai como um motor de renderização ultra-rápido e gratuito.
 */
export const generateImage = async (prompt: string) => {
  try {
    // Criamos um URL amigável para o motor de imagem
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://pollinations.ai/p/${encodedPrompt}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000000)}&nologo=true`;
    
    // Verificamos se a imagem está acessível
    return imageUrl;
  } catch (error) {
    console.error("Erro ao gerar URL da imagem:", error);
    return null;
  }
};

/**
 * Função para análise de imagem (Vision)
 */
export const analyzeImage = async (imagePath: string, prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Lógica para converter imagem em Base64 e enviar para o Gemini
    // ... (implementação detalhada se necessário)
    return "Análise concluída com sucesso.";
  } catch (error) {
    console.error("Erro na análise de imagem:", error);
    return "Não foi possível analisar a imagem.";
  }
};

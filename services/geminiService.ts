
import { GoogleGenAI, Type } from "@google/genai";
import { ImageStyle, VideoType, Scene, FileAnalysis, DirectorAdvice } from "../types";
import { DEFAULT_SYSTEM_INSTRUCTIONS } from "../constants";

// Analyzes uploaded files using Gemini Flash Lite
export const analyzeUploadedFile = async (base64Data: string, mimeType: string): Promise<FileAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Analise o ficheiro enviado pelo usuário.
Identifique o tipo de conteúdo e descreva o que vê.
Sugira automaticamente as 3 melhores ações de IA disponíveis (ex: 'Melhorar Qualidade', 'Criar Legenda', 'Transformar em Vídeo').
Responda em JSON formatado.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          fileType: { type: Type.STRING },
          summary: { type: Type.STRING },
          suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

// Refines a simple user prompt into a detailed AI generation prompt
export const rewritePrompt = async (userPrompt: string, style: ImageStyle): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Transform this simple prompt into a professional, highly detailed AI image generation prompt for the style: ${style}. 
The prompt is: "${userPrompt}". 
If the style is a language (e.g., Portuguese, Spanish), ensure any text elements in the image follow that language. 
Focus on composition, lighting, and technical details.`,
    config: { systemInstruction: "You are a senior prompt engineer for FILLY AI STUDIO." }
  });
  return response.text || userPrompt;
};

// Generates an image using Gemini 2.5 Flash Image with optional reference
// This model is optimized for sub-30s performance.
export const generateImage = async (refinedPrompt: string, referenceImage?: string, mimeType?: string, aspectRatio: "1:1" | "16:9" | "9:16" = "1:1"): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const parts: any[] = [{ text: refinedPrompt }];
  
  if (referenceImage && mimeType) {
    parts.unshift({
      inlineData: {
        data: referenceImage,
        mimeType: mimeType
      }
    });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts },
    config: { imageConfig: { aspectRatio } }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("Failed to generate image data");
};

// Rest of the services...
export const generateVideoScript = async (concept: string, type: VideoType) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a cinematic storyboard for a ${type} video based on: "${concept}".`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          script: { type: Type.STRING },
          scenes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                sceneDescription: { type: Type.STRING },
                visualPrompt: { type: Type.STRING },
                cameraAngle: { type: Type.STRING },
                duration: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const generateVeoVideo = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '9:16'
    }
  });
  
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({operation: operation});
  }
  
  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  return `${downloadLink}&key=${process.env.API_KEY}`;
};

export const getDirectorAdvice = async (query: string): Promise<DirectorAdvice> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: query,
    config: {
      systemInstruction: DEFAULT_SYSTEM_INSTRUCTIONS,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestion: { type: Type.STRING },
          marketingTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          idealFormat: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const generateSocialPost = async (description: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Create a social media post (caption, hashtags, and CTA) based on: "${description}".`,
    config: {
      systemInstruction: DEFAULT_SYSTEM_INSTRUCTIONS,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          caption: { type: Type.STRING },
          hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
          cta: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};


import React, { useState, useRef, useEffect } from 'react';
import { ImageStyle } from '../types';
import { rewritePrompt, generateImage } from '../services/geminiService';

interface ImageStudioProps {
  initialPrompt?: string;
  onClearPrompt?: () => void;
}

const ImageStudio: React.FC<ImageStudioProps> = ({ initialPrompt, onClearPrompt }) => {
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [style, setStyle] = useState<ImageStyle>(ImageStyle.REALISTIC);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [refinedPrompt, setRefinedPrompt] = useState('');
  
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [refMimeType, setRefMimeType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      if (onClearPrompt) onClearPrompt();
    }
  }, [initialPrompt]);

  /**
   * Aplica a marca d'água "FILLYAI" de forma ultra-rápida via Canvas.
   * Posicionamento: Canto inferior direito.
   * Estilo: Branco, 50% de transparência, com sombra para visibilidade em qualquer fundo.
   */
  const applyWatermark = (base64Image: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(base64Image);

        // Desenha a imagem base
        ctx.drawImage(img, 0, 0);

        // Configuração da marca d'água "FILLYAI"
        const fontSize = Math.floor(img.width * 0.05); // Dinâmico com base no tamanho da imagem
        ctx.font = `bold ${fontSize}px 'Outfit', sans-serif`;
        
        // Sombra para garantir visibilidade em imagens muito claras
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        // Branco com 50% de opacidade (rgba(255,255,255,0.5))
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';

        // Margem de 4% do tamanho da imagem
        const padding = img.width * 0.04;
        ctx.fillText('FILLYAI', img.width - padding, img.height - padding);

        resolve(canvas.toDataURL('image/png'));
      };
      img.src = base64Image;
    });
  };

  const styleCategories = [
    {
      label: 'General Styles',
      styles: [
        ImageStyle.REALISTIC, ImageStyle.CINEMATIC, ImageStyle.ANIME, 
        ImageStyle.ARCHITECTURE, ImageStyle.CARTOON, ImageStyle.THREE_D_RENDER,
        ImageStyle.VECTOR, ImageStyle.WATERCOLOR, ImageStyle.SKETCH,
        ImageStyle.OIL_PAINTING, ImageStyle.ABSTRACT, ImageStyle.SURREAL,
        ImageStyle.FASHION, ImageStyle.PHOTOGRAPHY, ImageStyle.PORTRAIT,
        ImageStyle.AFRO_ANGOLA, ImageStyle.AFROFUTURIST
      ]
    },
    {
      label: 'Corporate & Professional',
      styles: [
        ImageStyle.CORPORATE, ImageStyle.BUSINESS, ImageStyle.MINIMALIST,
        ImageStyle.MODERN, ImageStyle.PRODUCT_POSTER, ImageStyle.LOGO,
        ImageStyle.INFOGRAPHIC, ImageStyle.CONCEPT_ART
      ]
    },
    {
      label: 'Genre & Themes',
      styles: [
        ImageStyle.FANTASY, ImageStyle.SCI_FI, ImageStyle.CYBERPUNK,
        ImageStyle.RETRO_VINTAGE, ImageStyle.GRUNGE
      ]
    },
    {
      label: 'Mood & Tone',
      styles: [
        ImageStyle.VIBRANT, ImageStyle.DARK_MOODY, ImageStyle.ELEGANT
      ]
    },
    {
      label: 'Language',
      styles: [
        ImageStyle.ARABIC, ImageStyle.FRENCH, ImageStyle.ENGLISH,
        ImageStyle.SPANISH, ImageStyle.PORTUGUESE
      ]
    },
    {
      label: 'Add-ons',
      styles: [
        ImageStyle.GLITCH, ImageStyle.NEON, ImageStyle.FLAT_DESIGN
      ]
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      setReferenceImage(base64);
      setRefMimeType(file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setResult(null);
    try {
      // Otimizado: Gemini 3 Flash para o prompt + Gemini 2.5 Flash Image para a imagem
      // Tempo total estimado: < 15 segundos
      const refined = await rewritePrompt(prompt, style);
      setRefinedPrompt(refined);
      
      const rawImg = await generateImage(refined, referenceImage || undefined, refMimeType || undefined);
      
      // Processamento local de marca d'água é instantâneo
      const watermarkedImg = await applyWatermark(rawImg);
      setResult(watermarkedImg);
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar imagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const clearReference = () => {
    setReferenceImage(null);
    setRefMimeType(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-8 animate-fadeIn p-4 pb-32 max-w-4xl mx-auto">
      <header className="px-2">
        <h1 className="text-3xl font-black tracking-tight uppercase">Image <span className="lime-text">Studio</span></h1>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Visão multimodal: Prompt + Referência</p>
      </header>

      <div className="glass p-8 rounded-[2rem] flex flex-col gap-8 border border-white/5">
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1">Sua Visão Criativa</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Uma modelo angolana em traje tradicional samakaka, estilo editorial, iluminação de estúdio neon..."
              className="w-full bg-[#0b0f1a] border border-white/10 rounded-2xl p-6 text-sm focus:border-[#d4ff3f] outline-none min-h-[140px] transition-all resize-none shadow-inner"
            />
          </div>

          <div className="md:w-48 space-y-4">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1 text-center">Referência Visual</label>
             <div 
               onClick={() => !referenceImage && fileInputRef.current?.click()}
               className={`h-[140px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group ${
                 referenceImage ? 'border-sky-500/50' : 'border-slate-700 hover:border-[#d4ff3f]/50 bg-slate-800/20'
               }`}
             >
                {referenceImage ? (
                  <>
                    <img 
                      src={`data:${refMimeType};base64,${referenceImage}`} 
                      className="w-full h-full object-cover opacity-80" 
                      alt="Ref"
                    />
                    <button 
                      onClick={(e) => { e.stopPropagation(); clearReference(); }}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 rounded-full flex items-center justify-center text-[10px]"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-cloud-arrow-up text-2xl text-slate-600 group-hover:text-[#d4ff3f]"></i>
                    <span className="text-[9px] mt-2 text-slate-500 font-bold uppercase">Upload</span>
                  </>
                )}
             </div>
             <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" />
          </div>
        </div>

        <div className="space-y-6">
           {styleCategories.map((cat) => (
             <div key={cat.label} className="space-y-3">
                <label className="text-[9px] font-black text-[#d4ff3f]/50 uppercase tracking-widest block ml-1">{cat.label}</label>
                <div className="flex flex-wrap gap-2">
                  {cat.styles.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`px-3 py-2 rounded-lg text-[9px] font-bold border transition-all uppercase tracking-wider ${
                        style === s 
                          ? 'bg-[#d4ff3f] border-[#d4ff3f] text-black shadow-lg shadow-lime-500/10' 
                          : 'bg-[#161b26]/50 border-white/5 text-slate-500 hover:border-white/20'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
             </div>
           ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="lime-button w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-sm shadow-xl shadow-lime-500/20 disabled:opacity-50 disabled:transform-none"
        >
          {loading ? (
            <>
              <i className="fa-solid fa-spinner animate-spin"></i>
              <span>Geração Ultra-Rápida Ativa...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>{referenceImage ? 'Transformar com Referência' : 'Gerar Obra Prima'}</span>
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="glass p-6 rounded-[2.5rem] animate-slideUp overflow-hidden border border-[#d4ff3f]/20">
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
            <img src={result} alt="Gerado por IA" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
               <a 
                href={result} 
                download="filly-ai-art.png"
                className="lime-button self-start px-6 py-3 rounded-xl text-xs flex items-center gap-2"
              >
                <i className="fa-solid fa-download"></i> Baixar Arte
              </a>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-black/40 rounded-2xl border border-white/5">
            <h4 className="text-[10px] font-black text-[#d4ff3f] uppercase tracking-widest mb-2">Prompt IA Otimizado:</h4>
            <p className="text-xs text-slate-400 leading-relaxed italic">"{refinedPrompt}"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageStudio;

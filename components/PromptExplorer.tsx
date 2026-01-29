
import React, { useState } from 'react';
import { PromptLibraryItem } from '../types';

interface PromptExplorerProps {
  onSelectPrompt: (prompt: string) => void;
  onBack: () => void;
}

const PromptExplorer: React.FC<PromptExplorerProps> = ({ onSelectPrompt, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All', 'Modelos Filly', 'Surrealismo', 'Tecnologia', 'Natureza', 'Branding'
  ];

  const promptLibrary: PromptLibraryItem[] = [
    // MODELO VR - FILLY NEWS
    { 
      id: 'filly_vr_news', 
      category: 'Modelos Filly', 
      title: 'Filly News VR Interface', 
      prompt: 'Cinematic photography of a young black man wearing high-tech VR goggles, interacting with multiple floating translucent holographic screens in a purple-lit room. One large central hologram prominently features the neon-glow text "Filly_News". Digital HUD elements, analytical charts, futuristic atmosphere, 8k resolution, volumetric lighting.', 
      previewUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=400' 
    },
    
    // MODELOS FIGURAS DE ÁGUA
    { 
      id: 'filly_water_dance', 
      category: 'Modelos Filly', 
      title: 'Water Spirits Dancing', 
      prompt: 'Surreal and magical scene in a lush forest with a stream. Two human-shaped figures completely made of transparent, splashing water are dancing on a wooden log over the river. Realistic water splashes, sunlight breaking through forest canopy, mossy surroundings, 3D Octane render style, highly detailed.', 
      previewUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=400' 
    },
    { 
      id: 'filly_water_macro', 
      category: 'Modelos Filly', 
      title: 'Macro Water Being', 
      prompt: 'Macro photography of a tiny miniature humanoid figure made of pure liquid water, walking on a carpet of green forest moss. A single large water droplet floats in the air above it. Soft golden hour lighting, cinematic bokeh background, ultra-realistic textures, 8k.', 
      previewUrl: 'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?auto=format&fit=crop&q=80&w=400' 
    },

    // MODELOS TULIPAS MÁGICAS
    { 
      id: 'filly_tulip_yellow', 
      category: 'Modelos Filly', 
      title: 'Golden Light Cloud', 
      prompt: 'A single vibrant yellow tulip flower growing in dark soil within a mysterious forest. A small, perfect white fluffy cloud floats exactly above the tulip, raining glowing golden sparkles and particles of light onto the flower. Magical realism, dreamlike atmosphere, high contrast, 8k.', 
      previewUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=400' 
    },
    { 
      id: 'filly_tulip_white', 
      category: 'Modelos Filly', 
      title: 'Starry White Rain', 
      prompt: 'A beautiful white tulip glowing with internal light in a dark forest. A magical cloud hovers above it, raining bright white light droplets like falling stars. Ethereal glow, soft volumetric fog, ultra-detailed petals, cinematic composition.', 
      previewUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=400' 
    },
    { 
      id: 'filly_tulip_purple', 
      category: 'Modelos Filly', 
      title: 'Purple Cosmic Bloom', 
      prompt: 'A glowing purple fantasy tulip in a dark enchanted garden. A small rain cloud above pours down purple cosmic dust and shimmering light. Neon bioluminescence, surreal lighting, deep shadows, professional artistic photography style.', 
      previewUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400' 
    },

    // OUTROS PROMPTS ADICIONAIS
    { id: 'extra_1', category: 'Branding', title: 'Minimalist Tech Logo', prompt: '3D luxury logo "FN" in brushed titanium, floating over a smooth liquid mercury surface, minimalist white studio background, high-end product lighting.', previewUrl: 'https://images.unsplash.com/photo-1559703248-dcaaec9fab78?auto=format&fit=crop&q=80&w=400' },
    { id: 'extra_2', category: 'Realistic', title: 'Angolan Street Style', prompt: 'Street style portrait of a stylish Angolan man in Lubango, wearing modern ethnic fusion clothing, urban background with colorful graffiti, film photography style, 35mm lens.', previewUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400' }
  ];

  const filteredPrompts = promptLibrary.filter(p => 
    (activeCategory === 'All' || p.category === activeCategory) &&
    (p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.prompt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-8 animate-fadeIn p-4 pb-32 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">
            Prompt <span className="lime-text">Explorer</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1 italic">
            "Explora os modelos visuais da Filly News e cria o teu próprio estilo."
          </p>
        </div>
        <button onClick={onBack} className="text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors">
          <i className="fa-solid fa-arrow-left mr-2"></i> Voltar ao Painel
        </button>
      </header>

      {/* Search & Filter */}
      <div className="flex flex-col gap-6">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input 
            type="text" 
            placeholder="Pesquisar por estilo ou modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm outline-none focus:border-[#d4ff3f]/50 transition-all shadow-inner"
          />
        </div>

        <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${
                activeCategory === cat 
                  ? 'bg-[#d4ff3f] border-[#d4ff3f] text-black shadow-lg shadow-lime-500/20' 
                  : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPrompts.map((item) => (
          <div 
            key={item.id} 
            className="premium-card rounded-[2.5rem] overflow-hidden group flex flex-col border border-white/5 bg-[#161b26]/50"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={item.previewUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <div className="bg-[#d4ff3f] text-black px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest">
                  {item.category}
                </div>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1 gap-4 -mt-12 relative z-10">
              <div className="space-y-1">
                <h3 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-[#d4ff3f] transition-colors">{item.title}</h3>
                <p className="text-[9px] text-slate-400 line-clamp-4 italic leading-relaxed">
                  "{item.prompt}"
                </p>
              </div>
              
              <button 
                onClick={() => onSelectPrompt(item.prompt)}
                className="mt-auto lime-button w-full py-4 rounded-xl text-[9px] font-black flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95 transition-all"
              >
                <i className="fa-solid fa-wand-magic-sparkles"></i> USAR ESTE MODELO
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptExplorer;

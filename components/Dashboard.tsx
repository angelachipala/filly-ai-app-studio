
import React from 'react';
import { AppView, SectorData } from '../types';

interface DashboardProps {
  setView: (view: AppView) => void;
  onNavigateSector: (sector: SectorData) => void;
  userPlan?: 'Free' | 'Premium';
  onShowUpgrade: () => void;
  onProfileClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView, onNavigateSector, userPlan = 'Free', onShowUpgrade, onProfileClick }) => {
  
  const sectors: Record<string, SectorData> = {
    pro_art: {
      id: 'pro_art',
      title: 'Filly Pro Art',
      subtitle: 'Estilos de Imagem Premium',
      isPremium: true,
      ctaLabel: 'Criar imagem agora',
      targetView: AppView.IMAGE_STUDIO,
      options: [
        { name: 'Realista', icon: 'fa-camera', preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' },
        { name: 'Cinemático', icon: 'fa-clapperboard', preview: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400' },
        { name: 'Produto', icon: 'fa-box-open', preview: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400' },
        { name: 'Afrofuturista', icon: 'fa-bolt', preview: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=400' },
        { name: 'Minimalista', icon: 'fa-minus', preview: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=400' }
      ]
    },
    motion_control: {
      id: 'motion_control',
      title: 'Motion Control',
      subtitle: 'Estilos de Vídeo Avançados',
      isPremium: false,
      ctaLabel: 'Criar vídeo agora',
      targetView: AppView.VIDEO_STUDIO,
      options: [
        { name: 'Ação Rápida', icon: 'fa-person-running', preview: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400' },
        { name: 'Animação Suave', icon: 'fa-wand-magic-sparkles', preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400' },
        { name: 'Efeito Cinematic', icon: 'fa-film', preview: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=400' },
        { name: 'Loop Viral', icon: 'fa-rotate', preview: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=400' }
      ]
    },
    ai_influencer: {
      id: 'ai_influencer',
      title: 'AI Influencer',
      subtitle: 'Personagens Virais',
      isPremium: true,
      ctaLabel: 'Gerar personagem',
      targetView: AppView.IMAGE_STUDIO,
      options: [
        { name: 'Avatar Realista', icon: 'fa-user-tie', preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
        { name: 'Avatar Cartoon', icon: 'fa-face-smile-wink', preview: 'https://images.unsplash.com/photo-1533512930330-4ac257c86793?auto=format&fit=crop&q=80&w=400' },
        { name: 'Influencer Afro', icon: 'fa-heart', preview: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400' },
        { name: 'Personagem Futurista', icon: 'fa-robot', preview: 'https://images.unsplash.com/photo-1546776230-bb86256870ce?auto=format&fit=crop&q=80&w=400' }
      ]
    },
    skin_enhancer: {
      id: 'skin_enhancer',
      title: 'Skin Enhancer',
      subtitle: 'Edição de Rosto e Beauty',
      isPremium: false,
      ctaLabel: 'Melhorar imagem',
      targetView: AppView.UPLOAD_CENTER,
      options: [
        { name: 'Melhoria de Pele', icon: 'fa-sparkles', preview: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=400' },
        { name: 'Remoção de Manchas', icon: 'fa-eraser', preview: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400' },
        { name: 'Iluminação Facial', icon: 'fa-sun', preview: 'https://images.unsplash.com/photo-1526045612212-70caf35c11bc?auto=format&fit=crop&q=80&w=400' },
        { name: 'Beauty Natural', icon: 'fa-leaf', preview: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400' }
      ]
    }
  };

  return (
    <div className="flex flex-col gap-10 animate-fadeIn p-4 pb-32 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div 
        onClick={onShowUpgrade}
        className="bg-[#d4ff3f] text-black text-[10px] md:text-xs font-bold py-3 px-6 rounded-full flex justify-between items-center mx-auto w-full max-w-4xl shadow-lg glow-lime cursor-pointer hover:scale-[1.01] transition-all"
      >
        <span className="flex items-center gap-2">
          <i className="fa-solid fa-bolt"></i> 
          OFERTA ESPECIAL: Plano Premium com 85% de desconto para criadores em Angola!
        </span>
        <button className="bg-black text-[#d4ff3f] px-3 py-1 rounded-full text-[9px] uppercase font-black">Aproveitar</button>
      </div>

      {/* Main Header */}
      <header className="flex justify-between items-center py-3 px-6 glass rounded-2xl border border-white/5">
        <div className="flex items-center gap-6">
          <div className="font-black text-2xl tracking-tighter cursor-pointer" onClick={() => setView(AppView.DASHBOARD)}>
            FILLY<span className="lime-text">AI</span>
          </div>
          <nav className="hidden md:flex gap-6 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <button onClick={() => setView(AppView.DASHBOARD)} className="text-white">Explore</button>
            <button onClick={() => setView(AppView.IMAGE_STUDIO)}>Image</button>
            <button onClick={() => setView(AppView.VIDEO_STUDIO)}>Video</button>
            <button onClick={() => setView(AppView.UPLOAD_CENTER)}>Upload</button>
            <button onClick={() => setView(AppView.SOCIAL)}>Social</button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setView(AppView.UPLOAD_CENTER)} className="glass px-4 py-2 rounded-xl text-[10px] font-bold uppercase">Asset Library</button>
          <div 
            onClick={onProfileClick}
            className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-bold cursor-pointer hover:border-[#d4ff3f]/50 hover:bg-[#d4ff3f]/10 transition-all"
          >
            {userPlan === 'Premium' ? 'PRO' : 'FN'}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden glass rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10 border border-white/5">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight uppercase">
            Criatividade<br />
            <span className="lime-text">Sem Limites.</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-md">
            O ecossistema definitivo para criadores angolanos. Gere ativos visuais de alta performance em segundos.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setView(AppView.IMAGE_STUDIO)}
              className="lime-button px-8 py-4 rounded-2xl flex items-center gap-3 text-sm shadow-xl shadow-lime-500/10"
            >
              CRIAR AGORA <i className="fa-solid fa-sparkles"></i>
            </button>
            <button 
              onClick={() => setView(AppView.PROMPT_EXPLORER)}
              className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-sm border border-white/10 hover:border-[#d4ff3f]/30 transition-all uppercase font-black"
            >
              EXPLORE PROMPTS <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div onClick={() => onNavigateSector(sectors.pro_art)} className="premium-card aspect-[3/4] rounded-3xl overflow-hidden relative group cursor-pointer shadow-2xl">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Create Image</span>
            </div>
          </div>
          <div onClick={() => onNavigateSector(sectors.motion_control)} className="premium-card aspect-[3/4] rounded-3xl overflow-hidden relative group cursor-pointer shadow-2xl">
            <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Create Video</span>
            </div>
          </div>
        </div>
      </section>

      {/* Prompt Library Feature Banner */}
      <section 
        onClick={() => setView(AppView.PROMPT_EXPLORER)}
        className="glass rounded-[2rem] p-8 border border-[#d4ff3f]/20 bg-gradient-to-r from-[#d4ff3f]/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer group hover:scale-[1.01] transition-all"
      >
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl text-[#d4ff3f] group-hover:rotate-12 transition-transform">
            <i className="fa-solid fa-book-open"></i>
          </div>
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight">Biblioteca de Prompts</h3>
            <p className="text-xs text-slate-500 max-w-md">Descubra milhares de prompts pré-configurados para resultados profissionais inspirados no ecossistema Filly News.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-widest text-[#d4ff3f]">
          Abrir Biblioteca <i className="fa-solid fa-arrow-right"></i>
        </div>
      </section>

      {/* TOP CHOICE Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-end px-2">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight">SETOR FUNCIONAL</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Selecione uma categoria para configurar</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.values(sectors).map((item) => (
            <div 
              key={item.id} 
              onClick={() => onNavigateSector(item)}
              className="premium-card rounded-[2rem] overflow-hidden group cursor-pointer flex flex-col active:scale-95 transition-transform"
            >
              <div className="relative aspect-square">
                <img src={item.options[0].preview} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                {item.isPremium && (
                  <div className="absolute top-3 left-3 bg-[#d4ff3f] text-black px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">
                    PREMIUM
                  </div>
                )}
              </div>
              <div className="p-4 bg-slate-900/40">
                <h4 className="text-xs font-bold group-hover:text-[#d4ff3f] transition-colors">{item.title}</h4>
                <p className="text-[9px] text-slate-500 mt-1">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Gallery */}
      <section className="space-y-6">
        <div className="px-2">
          <h3 className="text-xl font-bold uppercase tracking-tight lime-text">COMUNIDADE FILLY</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Inspirado por criadores no Lubango</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=600'
          ].map((url, i) => (
            <div key={i} className="premium-card rounded-[2rem] overflow-hidden aspect-video relative group border border-white/5">
              <img src={url} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-10 opacity-30 mt-10">
        <div className="font-black text-2xl tracking-tighter mb-2 uppercase">FILLY<span className="lime-text">AI</span></div>
        <p className="text-[9px] uppercase tracking-[0.3em]">Angola's Creative AI Engine • Powered by Filly News</p>
      </footer>
    </div>
  );
};

export default Dashboard;

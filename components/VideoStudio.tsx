
import React from 'react';

const VideoStudio: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center animate-fadeIn">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-slate-800/50 rounded-[2rem] flex items-center justify-center text-slate-600 border border-white/5 relative z-10">
          <i className="fa-solid fa-video-slash text-4xl"></i>
        </div>
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-sky-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30 z-20">
          <i className="fa-solid fa-clock text-[10px] text-amber-500"></i>
        </div>
      </div>

      <div className="glass max-w-sm p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <h2 className="text-2xl font-black mb-3 uppercase tracking-tight">Indisponível no <span className="lime-text">Momento</span></h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          Estamos a atualizar os nossos servidores e a integrar a nova versão do motor <span className="font-bold text-white">Veo 3.1</span> para garantir a melhor qualidade cinematográfica em Angola.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-left p-4 bg-white/5 rounded-2xl border border-white/5">
            <i className="fa-solid fa-wrench text-sky-400 text-xs"></i>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Manutenção Programada</span>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="lime-button w-full py-4 rounded-xl text-xs font-black shadow-lg shadow-[#d4ff3f]/10"
          >
            VERIFICAR ATUALIZAÇÃO
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-[9px] text-slate-600 font-black uppercase tracking-[0.3em]">FILLY STUDIO • Liderando a Inovação em Angola</p>
    </div>
  );
};

export default VideoStudio;

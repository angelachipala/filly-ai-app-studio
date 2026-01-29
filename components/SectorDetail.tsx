
import React from 'react';
import { AppView, SectorData } from '../types';

interface SectorDetailProps {
  sector: SectorData;
  onBack: () => void;
  onCta: (view: AppView) => void;
}

const SectorDetail: React.FC<SectorDetailProps> = ({ sector, onBack, onCta }) => {
  return (
    <div className="flex flex-col gap-8 animate-fadeIn p-4 pb-32 max-w-4xl mx-auto">
      <header className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-all"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">
            {sector.title.split(' ')[0]} <span className="lime-text">{sector.title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">{sector.subtitle}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sector.options.map((option, i) => (
          <div key={i} className="premium-card rounded-[2rem] overflow-hidden group cursor-pointer border border-white/5 hover:border-[#d4ff3f]/30 transition-all">
            <div className="relative aspect-video">
              <img src={option.preview} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt={option.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#d4ff3f]/20 flex items-center justify-center text-[#d4ff3f] border border-[#d4ff3f]/20">
                  <i className={`fa-solid ${option.icon} text-xs`}></i>
                </div>
                <span className="text-xs font-black uppercase tracking-widest">{option.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-8 rounded-[2rem] border border-white/5 flex flex-col items-center text-center gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold uppercase tracking-tight">Pronto para começar?</h3>
          <p className="text-xs text-slate-500 max-w-sm">A IA aplicará automaticamente os parâmetros de {sector.title.toLowerCase()} para garantir o melhor resultado.</p>
        </div>
        
        <button
          onClick={() => onCta(sector.targetView)}
          className="lime-button px-12 py-5 rounded-2xl flex items-center gap-3 text-sm shadow-xl shadow-lime-500/10 w-full md:w-auto"
        >
          <i className="fa-solid fa-bolt"></i>
          <span>{sector.ctaLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default SectorDetail;

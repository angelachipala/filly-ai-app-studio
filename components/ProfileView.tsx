
import React, { useState } from 'react';
import { UserProfile, ImageStyle } from '../types';
import { SOCIAL_LINKS } from '../constants';

interface ProfileViewProps {
  onShowUpgrade: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onShowUpgrade }) => {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'Filly News User',
    email: 'contacto@fillynews.ao',
    plan: 'Free',
    credits: { total: 100, used: 64 },
    preferences: {
      defaultStyle: ImageStyle.AFRO_ANGOLA,
      aiLanguage: 'Português (AO)',
      captionTone: 'Professional',
      preferredPlatform: 'Instagram'
    }
  });

  const creditPercentage = (profile.credits.used / profile.credits.total) * 100;

  return (
    <div className="flex flex-col gap-6 animate-fadeIn p-4 pb-24 max-w-2xl mx-auto">
      <header className="flex flex-col items-center py-6 gap-3">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-sky-500 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
              <i className="fa-solid fa-user text-4xl text-slate-700"></i>
            </div>
          </div>
          <button className="absolute bottom-0 right-0 bg-sky-500 w-8 h-8 rounded-full border-2 border-slate-950 flex items-center justify-center text-xs">
            <i className="fa-solid fa-camera"></i>
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${profile.plan === 'Premium' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'bg-slate-800 text-slate-400'}`}>
            Plano {profile.plan}
          </span>
        </div>
      </header>

      <section className="glass p-5 rounded-3xl border border-slate-700/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <i className="fa-solid fa-chart-pie text-sky-400"></i> Consumo de IA
          </h3>
          <span className="text-xs text-slate-400">{profile.credits.used} / {profile.credits.total} créditos</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-sky-500 to-sky-300 rounded-full transition-all duration-1000"
            style={{ width: `${creditPercentage}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-500 italic">Os créditos são renovados mensalmente no dia 01.</p>
        {profile.plan === 'Free' && (
          <button 
            onClick={onShowUpgrade}
            className="w-full mt-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2 rounded-xl text-xs transition-all"
          >
            Upgrade para Premium
          </button>
        )}
      </section>

      <section className="glass p-5 rounded-3xl flex flex-col gap-4">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <i className="fa-solid fa-sliders text-purple-400"></i> Configurações Criativas
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-500">Estilo Padrão</label>
            <select className="bg-slate-800/50 border border-slate-700 rounded-lg p-2 text-xs outline-none">
              {Object.values(ImageStyle).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-500">Tom das Legendas</label>
            <select className="bg-slate-800/50 border border-slate-700 rounded-lg p-2 text-xs outline-none">
              <option value="Professional">Profissional</option>
              <option value="Informal">Informal</option>
              <option value="Sales">Focado em Vendas</option>
            </select>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <button className="glass p-4 rounded-2xl flex flex-col items-center gap-2 border border-slate-700/50 hover:bg-slate-800/50 transition-all">
          <i className="fa-solid fa-shield-halved text-emerald-500"></i>
          <span className="text-xs font-bold">Segurança</span>
        </button>
        <a href={SOCIAL_LINKS.whatsapp} target="_blank" className="glass p-4 rounded-2xl flex flex-col items-center gap-2 border border-slate-700/50 hover:bg-emerald-900/20 transition-all">
          <i className="fa-brands fa-whatsapp text-emerald-500"></i>
          <span className="text-xs font-bold">Suporte Direto</span>
        </a>
      </div>

      <button className="mt-4 text-xs font-bold text-red-500/70 hover:text-red-500 flex items-center justify-center gap-2 py-4">
        <i className="fa-solid fa-right-from-bracket"></i> Terminar Sessão
      </button>
    </div>
  );
};

export default ProfileView;

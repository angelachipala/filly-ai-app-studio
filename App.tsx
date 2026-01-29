
import React, { useState } from 'react';
import { AppView, SectorData } from './types';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ImageStudio from './components/ImageStudio';
import VideoStudio from './components/VideoStudio';
import DirectorAI from './components/DirectorAI';
import SocialBranding from './components/SocialBranding';
import ProfileView from './components/ProfileView';
import UploadCenter from './components/UploadCenter';
import SectorDetail from './components/SectorDetail';
import PromptExplorer from './components/PromptExplorer';
import { SOCIAL_LINKS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [activeSector, setActiveSector] = useState<SectorData | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [userPlan, setUserPlan] = useState<'Free' | 'Premium'>('Free');
  
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handleShowUpgrade = () => setShowUpgradeModal(true);
  const handleShowSocial = () => setShowSocialModal(true);

  const handleSectorNavigation = (sector: SectorData) => {
    if (sector.isPremium && userPlan === 'Free') {
      handleShowUpgrade();
    } else {
      setActiveSector(sector);
      setCurrentView(AppView.SECTOR_DETAIL);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setCurrentView(AppView.IMAGE_STUDIO);
  };

  const renderView = () => {
    if (currentView === AppView.SECTOR_DETAIL && activeSector) {
      return (
        <SectorDetail 
          sector={activeSector} 
          onBack={() => setCurrentView(AppView.DASHBOARD)} 
          onCta={(view) => {
            setCurrentView(view);
            setActiveSector(null);
          }}
        />
      );
    }

    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard 
          setView={setCurrentView} 
          onNavigateSector={handleSectorNavigation}
          userPlan={userPlan} 
          onShowUpgrade={handleShowUpgrade} 
          onProfileClick={handleShowSocial}
        />;
      case AppView.IMAGE_STUDIO:
        return <ImageStudio initialPrompt={selectedPrompt || undefined} onClearPrompt={() => setSelectedPrompt(null)} />;
      case AppView.VIDEO_STUDIO:
        return <VideoStudio />;
      case AppView.UPLOAD_CENTER:
        return <UploadCenter />;
      case AppView.DIRECTOR:
        return <DirectorAI />;
      case AppView.SOCIAL:
        return <SocialBranding />;
      case AppView.PROFILE:
        return <ProfileView onShowUpgrade={handleShowUpgrade} />;
      case AppView.PROMPT_EXPLORER:
        return <PromptExplorer onBack={() => setCurrentView(AppView.DASHBOARD)} onSelectPrompt={handlePromptSelect} />;
      default:
        return <Dashboard 
          setView={setCurrentView} 
          onNavigateSector={handleSectorNavigation}
          userPlan={userPlan} 
          onShowUpgrade={handleShowUpgrade} 
          onProfileClick={handleShowSocial}
        />;
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-[#0b0f1a] overflow-x-hidden selection:bg-[#d4ff3f]/30">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#d4ff3f]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-600/5 rounded-full blur-[120px]"></div>
      </div>

      <main className="relative pt-6">
        {renderView()}
      </main>

      <Navigation currentView={currentView} setView={(v) => {
        setCurrentView(v);
        setActiveSector(null);
        if (v !== AppView.IMAGE_STUDIO) setSelectedPrompt(null);
      }} />

      {/* Floating WhatsApp Support Button */}
      <a 
        href={SOCIAL_LINKS.whatsapp} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-28 right-6 w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl z-50 hover:scale-110 active:scale-95 transition-all group"
      >
        <i className="fa-brands fa-whatsapp text-2xl"></i>
        <span className="absolute right-16 bg-emerald-500 text-white text-[10px] font-black py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest shadow-xl">
          Suporte WhatsApp
        </span>
      </a>

      {/* Social Modal "FN" */}
      {showSocialModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn">
          <div className="glass max-w-sm w-full p-10 rounded-[3rem] border border-[#d4ff3f]/30 shadow-2xl relative overflow-hidden text-center">
             <button 
              onClick={() => setShowSocialModal(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            <div className="w-20 h-20 bg-[#d4ff3f] text-black rounded-[1.5rem] flex items-center justify-center mb-6 mx-auto shadow-xl shadow-lime-500/20 rotate-3">
              <span className="text-3xl font-black">FN</span>
            </div>

            <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">CONECTE-SE AO <span className="lime-text">STUDIO</span></h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">Nossas Redes e Contactos Oficiais</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <a href={SOCIAL_LINKS.facebook} target="_blank" className="flex flex-col items-center gap-2 p-4 bg-blue-600/10 border border-blue-600/20 rounded-2xl hover:bg-blue-600/20 transition-all">
                <i className="fa-brands fa-facebook text-2xl text-blue-500"></i>
                <span className="text-[8px] font-black uppercase tracking-widest">Facebook</span>
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" className="flex flex-col items-center gap-2 p-4 bg-slate-800/20 border border-white/5 rounded-2xl hover:bg-white/5 transition-all">
                <i className="fa-brands fa-tiktok text-2xl text-white"></i>
                <span className="text-[8px] font-black uppercase tracking-widest">TikTok</span>
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" className="flex flex-col items-center gap-2 p-4 bg-pink-600/10 border border-pink-600/20 rounded-2xl hover:bg-pink-600/20 transition-all">
                <i className="fa-brands fa-instagram text-2xl text-pink-500"></i>
                <span className="text-[8px] font-black uppercase tracking-widest">Instagram</span>
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" className="flex flex-col items-center gap-2 p-4 bg-red-600/10 border border-red-600/20 rounded-2xl hover:bg-red-600/20 transition-all">
                <i className="fa-brands fa-youtube text-2xl text-red-500"></i>
                <span className="text-[8px] font-black uppercase tracking-widest">YouTube</span>
              </a>
            </div>

            <div 
              onClick={() => {
                navigator.clipboard.writeText(SOCIAL_LINKS.phone);
                alert("Número copiado!");
              }}
              className="w-full p-4 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-between cursor-pointer hover:border-[#d4ff3f]/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-[#d4ff3f] text-xs"></i>
                <span className="text-xs font-bold text-slate-300 tracking-tight">{SOCIAL_LINKS.phone}</span>
              </div>
              <i className="fa-solid fa-copy text-slate-600 text-[10px]"></i>
            </div>
            
            <p className="mt-8 text-[8px] text-slate-600 font-black uppercase tracking-[0.3em]">FILLY NEWS • Lubango, Angola</p>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-fadeIn">
          <div className="glass max-w-md w-full p-8 rounded-[2.5rem] border border-[#d4ff3f]/20 shadow-2xl relative overflow-hidden">
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#d4ff3f] text-black rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-[#d4ff3f]/20">
                <i className="fa-solid fa-crown text-2xl"></i>
              </div>
              <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">UPGRADE PARA <span className="lime-text">PREMIUM</span></h2>
              <p className="text-slate-400 text-sm mb-8 italic">"Eleve o nível do seu conteúdo com ferramentas que apenas profissionais utilizam."</p>
              
              <div className="w-full space-y-4 mb-8">
                {['Imagens 4K', 'Fila prioritária Veo', 'Personagens Virais', 'Suporte VIP'].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-left">
                    <i className="fa-solid fa-check text-[#d4ff3f] text-xs"></i>
                    <span className="text-xs font-bold text-slate-200">{f}</span>
                  </div>
                ))}
              </div>

              <div className="w-full p-6 bg-[#d4ff3f]/5 border border-[#d4ff3f]/10 rounded-2xl mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-black">9.500 Kz</span>
                  <span className="text-xs text-slate-500 font-bold">/mês</span>
                </div>
              </div>

              <button 
                onClick={() => { window.open(SOCIAL_LINKS.whatsapp, '_blank'); setShowUpgradeModal(false); }}
                className="lime-button w-full py-5 rounded-2xl text-sm font-black shadow-xl shadow-[#d4ff3f]/20"
              >
                ASSINAR AGORA (WHATSAPP)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

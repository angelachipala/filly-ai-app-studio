
import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { generateSocialPost } from '../services/geminiService';

const SocialBranding: React.FC = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState<any>(null);

  const handleGeneratePost = async () => {
    if (!description) return;
    setLoading(true);
    try {
      const res = await generateSocialPost(description);
      setPostData(res);
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar legenda.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copiado!");
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn p-4 pb-24 max-w-2xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold gradient-text">Social & Branding</h1>
        <p className="text-slate-400">Maximize seu alcance e conecte-se à Filly News.</p>
      </header>

      <section className="glass p-5 rounded-2xl">
        <h3 className="font-bold text-sky-400 mb-4">Gerador de Legendas & CTAs</h3>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Sobre o que é seu post?"
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-sky-500 outline-none min-h-[80px] mb-4"
        />
        <button
          onClick={handleGeneratePost}
          disabled={loading || !description}
          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 rounded-lg border border-slate-600 transition-all"
        >
          {loading ? 'Escrevendo...' : 'Gerar Post Completo'}
        </button>

        {postData && (
          <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-slate-800 animate-slideUp">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Legenda Sugerida</span>
              <button onClick={() => copyToClipboard(postData.caption)} className="text-sky-400 text-xs hover:underline">Copiar</button>
            </div>
            <p className="text-sm text-slate-200 mb-4 whitespace-pre-wrap">{postData.caption}</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {postData.hashtags.map((h: string) => (
                <span key={h} className="text-[10px] bg-slate-800 px-2 py-1 rounded-md text-sky-400">{h}</span>
              ))}
            </div>

            <div className="p-3 bg-sky-900/20 border border-sky-800/30 rounded-lg">
              <span className="block text-[10px] text-sky-500 font-bold mb-1">CALL TO ACTION (CTA)</span>
              <p className="text-xs text-sky-200 font-medium">{postData.cta}</p>
            </div>
          </div>
        )}
      </section>

      <section className="glass p-5 rounded-2xl">
        <h3 className="font-bold text-slate-200 mb-4">Redes Oficiais Filly Studio</h3>
        <div className="grid grid-cols-2 gap-3">
          <a href={SOCIAL_LINKS.facebook} target="_blank" className="flex items-center gap-3 p-3 bg-blue-900/20 border border-blue-900/30 rounded-xl hover:bg-blue-900/40 transition-all">
            <i className="fa-brands fa-facebook text-blue-500"></i>
            <span className="text-sm font-medium">Facebook</span>
          </a>
          <a href={SOCIAL_LINKS.tiktok} target="_blank" className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-700 transition-all">
            <i className="fa-brands fa-tiktok text-white"></i>
            <span className="text-sm font-medium">TikTok</span>
          </a>
          <a href={SOCIAL_LINKS.instagram} target="_blank" className="flex items-center gap-3 p-3 bg-pink-900/20 border border-pink-900/30 rounded-xl hover:bg-pink-900/40 transition-all">
            <i className="fa-brands fa-instagram text-pink-500"></i>
            <span className="text-sm font-medium">Instagram</span>
          </a>
          <a href={SOCIAL_LINKS.youtube} target="_blank" className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-900/30 rounded-xl hover:bg-red-900/40 transition-all">
            <i className="fa-brands fa-youtube text-red-500"></i>
            <span className="text-sm font-medium">YouTube</span>
          </a>
        </div>
      </section>

      <div className="glass p-5 rounded-2xl flex items-center justify-between border-l-4 border-emerald-500">
        <div>
          <h4 className="font-bold text-slate-200 text-sm">Suporte & Negócios</h4>
          <p className="text-xs text-slate-400">{SOCIAL_LINKS.phone}</p>
        </div>
        <a href={SOCIAL_LINKS.whatsapp} className="bg-emerald-600 p-3 rounded-full text-white shadow-lg">
          <i className="fa-brands fa-whatsapp text-xl"></i>
        </a>
      </div>
    </div>
  );
};

export default SocialBranding;


import React, { useState } from 'react';
import { getDirectorAdvice } from '../services/geminiService';
import { DirectorAdvice } from '../types';

const DirectorAI: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<DirectorAdvice | null>(null);

  const handleConsult = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const result = await getDirectorAdvice(query);
      setAdvice(result);
    } catch (error) {
      console.error(error);
      alert("Erro ao consultar o diretor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn p-4 pb-24 max-w-2xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold gradient-text">Diretor IA</h1>
        <p className="text-slate-400">Seu consultor criativo e especialista em marketing.</p>
      </header>

      <div className="glass p-5 rounded-2xl flex flex-col gap-4 border-l-4 border-amber-500">
        <p className="text-sm text-slate-300 leading-relaxed italic">
          "Olá, eu sou o seu Diretor Criativo na Filly. Como posso ajudar seu negócio a brilhar hoje?"
        </p>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: Como posso vender mais roupas africanas online? O que sugeres para o vídeo do meu novo restaurante?"
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none min-h-[120px]"
        />
        <button
          onClick={handleConsult}
          disabled={loading || !query}
          className="bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-slate-900 font-bold py-3 rounded-xl transition-all"
        >
          {loading ? 'Analisando...' : 'Consultar Diretor'}
        </button>
      </div>

      {advice && (
        <div className="space-y-4 animate-slideUp">
          <div className="glass p-5 rounded-2xl">
            <h3 className="font-bold text-amber-500 mb-3 flex items-center gap-2">
              <i className="fa-solid fa-lightbulb"></i>
              Sugestão Criativa
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">
              {advice.suggestion}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass p-4 rounded-xl border border-sky-900/30">
              <h4 className="text-sky-400 font-bold text-xs uppercase mb-2">Dicas de Marketing</h4>
              <ul className="space-y-2">
                {advice.marketingTips.map((tip, i) => (
                  <li key={i} className="text-xs text-slate-400 flex gap-2">
                    <span className="text-sky-500">•</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass p-4 rounded-xl border border-purple-900/30">
              <h4 className="text-purple-400 font-bold text-xs uppercase mb-2">Formato Recomendado</h4>
              <p className="text-xs text-slate-200">{advice.idealFormat}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectorAI;

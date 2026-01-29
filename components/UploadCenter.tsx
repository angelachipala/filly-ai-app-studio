
import React, { useState, useRef } from 'react';
import { analyzeUploadedFile } from '../services/geminiService';
import { FileAnalysis } from '../types';

const UploadCenter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<FileAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Validação básica
    const maxSize = 10 * 1024 * 1024; // 10MB para demo
    if (selected.size > maxSize) {
      alert("Ficheiro demasiado grande. Limite: 10MB");
      return;
    }

    setFile(selected);
    setUploading(true);
    setProgress(20);

    try {
      // Simulação de upload + Processamento real Gemini
      const reader = new FileReader();
      reader.readAsDataURL(selected);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        setProgress(50);
        
        const res = await analyzeUploadedFile(base64, selected.type);
        setAnalysis(res);
        setProgress(100);
        setUploading(false);
      };
    } catch (error) {
      console.error(error);
      alert("Erro ao processar ficheiro.");
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn p-4 pb-24 max-w-2xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold gradient-text">Upload Center</h1>
        <p className="text-slate-400">Envie conteúdo e deixe a IA transformar.</p>
      </header>

      {/* Dropzone */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`glass border-2 border-dashed rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${file ? 'border-sky-500/50 bg-sky-500/5' : 'border-slate-700 hover:border-slate-500'}`}
      >
        <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*,video/*,.pdf,.docx" />
        
        {!file ? (
          <>
            <div className="w-16 h-16 rounded-3xl bg-slate-800 flex items-center justify-center mb-4 text-slate-500 group-hover:text-sky-400 transition-colors">
              <i className="fa-solid fa-cloud-arrow-up text-3xl"></i>
            </div>
            <h3 className="font-bold text-slate-200">Selecionar ou Arrastar</h3>
            <p className="text-xs text-slate-500 mt-2">Suporta JPG, PNG, MP4, PDF (Max 10MB)</p>
          </>
        ) : (
          <div className="flex flex-col items-center animate-fadeIn">
            <i className={`fa-solid ${file.type.includes('image') ? 'fa-image' : 'fa-file-lines'} text-4xl text-sky-500 mb-3`}></i>
            <span className="text-sm font-bold text-slate-200 truncate max-w-[200px]">{file.name}</span>
            <span className="text-[10px] text-slate-500 uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
        )}
      </div>

      {uploading && (
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div className="h-full bg-sky-500 animate-pulse transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Resultado da Análise */}
      {analysis && !uploading && (
        <div className="space-y-4 animate-slideUp">
          <div className="glass p-6 rounded-3xl border-l-4 border-emerald-500">
            <h3 className="text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-3">Análise Inteligente</h3>
            <p className="text-sm text-slate-200 leading-relaxed mb-4">{analysis.summary}</p>
            
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Ações Sugeridas:</span>
              <div className="flex flex-wrap gap-2">
                {analysis.suggestions.map((s, i) => (
                  <button key={i} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-sky-400 hover:bg-sky-500 hover:text-white transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCenter;

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Image as ImageIcon, 
  Share2, 
  User, 
  Send, 
  Sparkles, 
  Download, 
  Copy,
  LayoutGrid,
  Zap,
  Menu,
  X
} from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- CONFIGURAÇÃO ---
const apiKey = ""; // A chave é fornecida pelo ambiente
const genAI = new GoogleGenerativeAI(apiKey);

// --- COMPONENTES AUXILIARES ---
const AdSlot = ({ height = "100px" }) => (
  <div 
    className="w-full my-4 bg-zinc-900/50 border border-dashed border-zinc-700 rounded-xl flex items-center justify-center text-zinc-500 text-xs uppercase tracking-widest"
    style={{ height }}
  >
    Espaço Publicitário
  </div>
);

// --- APLICAÇÃO PRINCIPAL ---
export default function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: 'Olá! Sou o VibeAI. Como posso ajudar na tua criatividade hoje?' }
  ]);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [socialPost, setSocialPost] = useState('');

  // Função para chamar o Gemini
  const callGemini = async (prompt, systemInstruction = "") => {
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash-preview-09-2025",
        systemInstruction: systemInstruction 
      });
      const result = await model.generateContent(prompt);
      return result.candidates?.[0]?.content?.parts?.[0]?.text || "Erro ao processar.";
    } catch (error) {
      console.error(error);
      return "Ocorreu um erro na ligação com a IA. Tente novamente.";
    }
  };

  // Lógica de Chat
  const handleChat = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await callGemini(userMsg, "És um assistente criativo amigável e moderno. Responde em Português de Portugal de forma concisa.");
    
    setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  // Lógica de Imagem
  const handleGenerateImage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setGeneratedImage(null);
    
    // Melhorar o prompt antes de enviar para o motor de imagem
    const enhancedPrompt = await callGemini(
      `Transforme este pedido simples numa descrição artística detalhada para IA (em inglês): ${input}`,
      "Responde apenas com o prompt otimizado em inglês."
    );

    const seed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(enhancedPrompt)}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;
    
    setGeneratedImage(imageUrl);
    setLoading(false);
  };

  // Lógica de Redes Sociais
  const handleSocialGen = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const response = await callGemini(
      `Cria um post cativante para Instagram/TikTok sobre: ${input}. Inclui emojis e hashtags.`,
      "És um gestor de redes sociais profissional."
    );
    setSocialPost(response);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto border-x border-zinc-800 bg-zinc-950 shadow-2xl relative">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 glass p-4 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center">
            <Zap className="text-black w-5 h-5 fill-current" />
          </div>
          <h1 className="font-extrabold text-xl tracking-tight">VibeAI</h1>
        </div>
        <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 pb-32 overflow-y-auto">
        <AdSlot />

        {/* TAB: CHAT */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${
                  msg.role === 'user' 
                  ? 'bg-lime-500 text-black font-medium' 
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-zinc-500 text-sm animate-pulse">VibeAI está a pensar...</div>}
          </div>
        )}

        {/* TAB: IMAGE */}
        {activeTab === 'image' && (
          <div className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 text-center">
              <Sparkles className="w-12 h-12 text-lime-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Estúdio de Arte</h2>
              <p className="text-zinc-400 text-sm">Descreve o que imaginas e eu crio a obra-prima.</p>
            </div>

            {generatedImage && (
              <div className="relative group rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
                <img src={generatedImage} alt="AI Generated" className="w-full h-auto" />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button 
                    onClick={() => window.open(generatedImage)}
                    className="p-3 bg-black/50 backdrop-blur-md hover:bg-lime-500 hover:text-black transition-all rounded-full"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            {loading && (
              <div className="w-full aspect-square bg-zinc-900 rounded-3xl flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-zinc-500 font-medium">A misturar cores...</p>
              </div>
            )}
          </div>
        )}

        {/* TAB: SOCIAL */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Share2 className="text-lime-500" /> Viral Gen
              </h2>
              {socialPost ? (
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 relative group">
                  <p className="text-zinc-300 whitespace-pre-wrap">{socialPost}</p>
                  <button 
                    onClick={() => {
                      document.execCommand('copy');
                      navigator.clipboard.writeText(socialPost);
                    }}
                    className="absolute top-2 right-2 p-2 bg-zinc-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <p className="text-zinc-500 text-center py-10">Introduz um tema para gerar o teu post viral.</p>
              )}
            </div>
            <AdSlot height="250px" />
          </div>
        )}
      </main>

      {/* BOTTOM INPUT BAR */}
      <div className="fixed bottom-20 left-0 right-0 max-w-2xl mx-auto px-4 pointer-events-none">
        <div className="glass p-2 rounded-2xl flex items-center gap-2 pointer-events-auto shadow-2xl border border-white/10">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (activeTab === 'chat' ? handleChat() : activeTab === 'image' ? handleGenerateImage() : handleSocialGen())}
            placeholder={activeTab === 'chat' ? "Pergunta qualquer coisa..." : "O que vamos criar?"}
            className="flex-1 bg-transparent px-4 py-2 outline-none text-sm"
          />
          <button 
            disabled={loading || !input.trim()}
            onClick={() => {
              if(activeTab === 'chat') handleChat();
              else if(activeTab === 'image') handleGenerateImage();
              else handleSocialGen();
            }}
            className="w-10 h-10 bg-lime-500 text-black rounded-xl flex items-center justify-center disabled:opacity-50 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-lime-500/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto glass border-t border-zinc-800 flex items-center justify-around py-4">
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'chat' ? 'text-lime-500' : 'text-zinc-500'}`}
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Chat</span>
        </button>
        <button 
          onClick={() => setActiveTab('image')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'image' ? 'text-lime-500' : 'text-zinc-500'}`}
        >
          <ImageIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Arte</span>
        </button>
        <button 
          onClick={() => setActiveTab('social')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'social' ? 'text-lime-500' : 'text-zinc-500'}`}
        >
          <Share2 className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Viral</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500 opacity-50">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase">Perfil</span>
        </button>
      </nav>

    </div>
  );
    }

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, HelpCircle, Loader2, MessageSquareText, ShieldCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Olá! Sou o Engenheiro Radiante IA, especialista em energia solar fotovoltaica, bombeamento rural, subestações e projetos elétricos. Como posso ajudar com seu projeto hoje?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    'Como funciona o bombeamento solar para poço artesiano?',
    'Qual o impacto da Lei 14.300 (Marco Legal) na economia solar?',
    'Quando minha empresa precisa de uma subestação de energia?',
    'Qual a durabilidade e garantia dos painéis fotovoltaicos?',
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      const replyText = data.reply || 'Erro ao comunicar com o consultor.';

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Error fetching consultant:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Desculpe, ocorreu um erro temporário na conexão. Caso precise de resposta imediata, clique em "Falar pelo WhatsApp" no menu superior.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="consultor-ia" className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Assistente Técnico Inteligente para Santarém &amp; Oeste do Pará</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Consultor Técnico de <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">Engenharia Solar IA</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
            Tire suas dúvidas em tempo real sobre dimensionamento solar, regulamentação ANEEL (Lei 14.300), homologação na Equatorial Pará e bombeamento para chácaras.
          </p>
        </div>

        {/* Chat Window Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[580px]">
          
          {/* Chat Header */}
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Engenheiro Radiante IA
                  <span className="px-2 py-0.5 text-[10px] font-semibold text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
                    Online
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Especialista em Energia Solar & Alta Tensão</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Baseado nas Normas ABNT & ANEEL</span>
            </div>
          </div>

          {/* Sample Questions Pills */}
          <div className="bg-slate-950/60 px-4 py-2.5 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 flex-shrink-0">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Sugestões:
            </span>
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="px-3 py-1 text-[11px] font-medium text-slate-300 bg-slate-900 hover:bg-amber-500/20 hover:text-amber-300 border border-slate-800 hover:border-amber-500/30 rounded-full whitespace-nowrap transition-all flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-amber-400 border border-slate-700'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none shadow-md'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div
                    className={`text-[10px] text-slate-500 px-1 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-center">
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 rounded-tl-none flex items-center gap-2 text-xs text-amber-300">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Analisando consulta técnica...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida sobre energia solar, bombeamento ou subestação..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-amber-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faqData';
import { ChevronDown, HelpCircle, Search, MessageSquareText } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  const categories = [
    { id: 'todas', label: 'Todas' },
    { id: 'economia', label: 'Economia & Payback' },
    { id: 'bombeamento', label: 'Bombeamento Rural' },
    { id: 'subestacao', label: 'Subestações' },
    { id: 'financiamento', label: 'Financiamento' },
    { id: 'geral', label: 'Garantia & Homologação' },
  ];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'todas' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 bg-slate-950 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Perguntas Frequentes Sobre <span className="text-amber-400">Energia Solar</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Respostas claras sobre durabilidade, financiamento, bombeamento solar e homologação junto à concessionária.
          </p>
        </div>

        {/* Search Input & Category Badges */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar dúvida por palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Nenhuma pergunta encontrada para sua busca. Experimente buscar termos como "bateria", "financiamento" ou "garantia".
            </div>
          )}
        </div>

        {/* Contact Help Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
          <h4 className="text-sm font-bold text-white">Ficou com alguma dúvida específica?</h4>
          <p className="text-xs text-slate-400">Nossa equipe de engenheiros está disponível para atendimento direto via WhatsApp.</p>
          <a
            href="https://wa.me/5593991211156?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20energia%20solar."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-xl hover:bg-emerald-900/60 transition-all"
          >
            <MessageSquareText className="w-4 h-4" />
            <span>Falar com Engenheiro no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};

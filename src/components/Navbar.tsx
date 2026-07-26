import React, { useState, useEffect } from 'react';
import { Sun, Zap, Phone, Menu, X, Calculator, ShieldCheck, MessageSquareText } from 'lucide-react';

interface NavbarProps {
  onOpenQuoteModal: (initialService?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Calculadora', href: '#calculadora' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Bombeamento Solar', href: '#bombeamento' },
    { name: 'Engenharia & Subestações', href: '#subestacoes' },
    { name: 'Projetos', href: '#portfolio' },
    { name: 'Engenheiro IA', href: '#consultor-ia' },
    { name: 'Dúvidas', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 relative overflow-hidden ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-amber-500/30 py-3.5'
          : 'bg-slate-950/85 backdrop-blur-md py-5 border-b border-white/10'
      }`}
    >
      {/* Header Background Image & Glow Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/solar-radiante-logo.svg')] bg-no-repeat bg-right-center bg-contain mix-blend-screen scale-125 translate-x-1/4 -translate-y-10" />
      <div className="absolute top-0 left-1/3 w-96 h-24 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo with uploaded branding image */}
          <a
            href="#inicio"
            onClick={(e) => handleLinkClick(e, '#inicio')}
            className="flex items-center gap-3.5 group"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-lg shadow-amber-500/20 group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300 overflow-hidden p-1">
              <img 
                src="/solar-radiante-logo.svg" 
                alt="Solar Radiante Logo" 
                className="w-full h-full object-contain filter drop-shadow" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5 leading-none">
                SOLAR <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">RADIANTE</span>
              </span>
              <span className="text-[11px] uppercase font-bold text-amber-300/90 tracking-widest mt-1">
                Santarém &amp; Engenharia Solar
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-slate-800/60 p-2 rounded-full border border-slate-700/60 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-2 text-xs font-semibold text-slate-200 hover:text-amber-300 hover:bg-amber-500/10 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/5593991211156?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20de%20energia%20solar."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/80 rounded-xl transition-all shadow-md shadow-emerald-950/50"
            >
              <MessageSquareText className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              className="flex items-center gap-2.5 px-5 py-2.5 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 rounded-xl shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>Solicitar Orçamento</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-amber-400 hover:bg-slate-700 focus:outline-none"
            aria-label="Menu Mobile"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md shadow-amber-500/20"
            >
              <Calculator className="w-4 h-4" />
              <span>Solicitar Orçamento Grátis</span>
            </button>

            <a
              href="https://wa.me/5593991211156?text=Olá!%20Gostaria%20de%20falar%20com%20um%20especialista%20da%20Solar%20Radiante."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-xl"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>Falar pelo WhatsApp (Atendimento Rápido)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

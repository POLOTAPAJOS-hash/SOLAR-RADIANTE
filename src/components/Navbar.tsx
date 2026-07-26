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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-amber-500/20 py-3'
          : 'bg-slate-950/80 backdrop-blur-sm py-4 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleLinkClick(e, '#inicio')}
            className="flex items-center gap-3 group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sun className="w-6 h-6 text-slate-950 animate-spin-slow" />
              <Zap className="w-3.5 h-3.5 text-slate-950 absolute -bottom-0.5 -right-0.5 bg-amber-300 rounded-full p-0.5 shadow-sm" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                SOLAR <span className="text-amber-400">RADIANTE</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-amber-200/80 tracking-widest -mt-1">
                Energia & Engenharia
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-800/40 p-1.5 rounded-full border border-slate-700/50">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-700/50 rounded-full transition-all"
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
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/60 rounded-lg transition-all"
            >
              <MessageSquareText className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md shadow-amber-500/20 active:scale-95 transition-all"
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

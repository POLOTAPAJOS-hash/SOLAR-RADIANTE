import React from 'react';
import { Sun, Zap, ShieldCheck, ArrowRight, Award, TrendingDown, Droplets, CheckCircle2, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: (initialService?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative pt-32 lg:pt-44 pb-28 overflow-hidden bg-slate-950 text-white">
      {/* Background glow & uploaded image banner backdrop */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] lg:w-[900px] h-[700px] lg:h-[900px] pointer-events-none opacity-20 bg-[url('/solar-radiante-logo.svg')] bg-no-repeat bg-contain bg-center mix-blend-screen scale-110 filter blur-[1px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-amber-500/25 via-orange-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_80%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold backdrop-blur-md shadow-lg shadow-amber-500/10">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Santarém &amp; Oeste do Pará</span>
              <span className="hidden sm:inline text-amber-400/60">• Engenharia Solar CREA Pará</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.05]">
              Transforme a Luz do Sol em <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Economia Real e Autonomia
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
              Projetos de engenharia solar e média/alta tensão sob medida para residências, comércio, indústrias e propriedades rurais em <strong className="text-amber-300">Santarém, Belterra e todo o Oeste do Pará</strong>. Reduza sua conta da Equatorial em até 95% com equipamentos Tier-1.
            </p>

            {/* Feature Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 text-base text-slate-200 font-semibold bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>Garantia de 25 anos nos Painéis N-Type</span>
              </div>
              <div className="flex items-center gap-3 text-base text-slate-200 font-semibold bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>Projetos de Subestações Média/Alta Tensão</span>
              </div>
              <div className="flex items-center gap-3 text-base text-slate-200 font-semibold bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>Bombeamento Solar sem Baterias p/ Poços</span>
              </div>
              <div className="flex items-center gap-3 text-base text-slate-200 font-semibold bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>Homologação Chave na Mão (Turnkey)</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => scrollToSection('#calculadora')}
                className="flex items-center justify-center gap-3 px-8 py-5 text-base font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 rounded-2xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 active:scale-98 transition-all group"
              >
                <span>Simular Economia na Calculadora</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => onOpenQuoteModal()}
                className="flex items-center justify-center gap-2.5 px-8 py-5 text-base font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-amber-500/50 rounded-2xl backdrop-blur-md transition-all shadow-lg"
              >
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Solicitar Estudo Grátis</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Engenheiros com Registro CREA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-amber-400" />
                <span>Payback Médio em 3,5 Anos</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Card / Quick Calculator Card Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900 to-slate-900/90 border border-amber-500/20 shadow-2xl shadow-amber-500/10 backdrop-blur-xl">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Sun className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Solar Radiante Express</h3>
                    <p className="text-xs text-slate-400">Estimativa rápida de economia</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-full">
                  Até -95% na conta
                </span>
              </div>

              {/* Quick Graphic Feature Cards */}
              <div className="space-y-4">
                
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Conta Mensal Média</span>
                    <div className="text-xl font-bold text-amber-300">R$ 1.500,00</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-medium">Nova Conta Estimada</span>
                    <div className="text-xl font-bold text-emerald-400">~ R$ 110,00</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 to-orange-950/30 border border-amber-500/30 space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-300">Economia estimada em 25 anos</span>
                    <span className="text-amber-400 font-bold">+ R$ 415.000,00</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full w-[88%]" />
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    ⚡ Retorno completo do investimento estimado entre 3 a 4 anos.
                  </p>
                </div>

                {/* Specialties Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    onClick={() => scrollToSection('#bombeamento')}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/40 text-left transition-all group"
                  >
                    <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                      <Droplets className="w-4 h-4 text-blue-400" />
                      <span>Bombeamento Rural</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Poços artesianos e irrigação solar</span>
                  </button>

                  <button
                    onClick={() => scrollToSection('#subestacoes')}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/40 text-left transition-all group"
                  >
                    <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Alta & Média Tensão</span>
                    </div>
                    <span className="text-[11px] text-slate-400">Subestações industriais e laudos</span>
                  </button>
                </div>

                <button
                  onClick={() => onOpenQuoteModal()}
                  className="w-full py-3.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md shadow-amber-500/20 transition-colors"
                >
                  Solicitar Análise da Sua Conta de Luz
                </button>

              </div>

            </div>
          </div>

        </div>

        {/* Bottom Banner Stats */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-amber-400">+500</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Usinas & Projetos Entregues</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">95%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Redução Máxima na Conta</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-amber-400">12 MWp</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Potência Solar Instalada</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <div className="text-3xl sm:text-4xl font-black text-orange-400">R$ 18Mi+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Economizados pelos Clientes</div>
          </div>
        </div>

      </div>

      {/* Down Arrow indicator */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => scrollToSection('#calculadora')}
          className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all animate-bounce"
          aria-label="Rolar para calculadora"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

    </section>
  );
};

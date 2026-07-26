import React from 'react';
import { Sun, Zap, Phone, Mail, MapPin, Clock, ShieldCheck, ArrowUp, MessageSquareText } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-20 pb-14">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 border border-amber-500/30 p-1 shadow-lg shadow-amber-500/20 overflow-hidden">
                <img src="/solar-radiante-logo.svg" alt="Solar Radiante Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">
                  SOLAR <span className="text-amber-400">RADIANTE</span>
                </span>
                <span className="text-[11px] uppercase font-bold text-amber-300/90 tracking-widest mt-1">
                  Santarém &amp; Engenharia Solar
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Soluções completas em energia solar fotovoltaica, bombeamento para chácaras e sítios no Oeste do Pará, subestações de média e alta tensão, e projetos elétricos registrados no CREA Pará.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Engenharia Registrada CREA / ABNT</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Nossos Serviços</h4>
            <ul className="space-y-2">
              <li><a href="#servicos" className="hover:text-amber-400 transition-colors">Energia Solar Residencial & Comercial</a></li>
              <li><a href="#bombeamento" className="hover:text-amber-400 transition-colors">Bombeamento Solar Direct p/ Chácaras</a></li>
              <li><a href="#subestacoes" className="hover:text-amber-400 transition-colors">Subestações Média/Alta Tensão (13.8kV)</a></li>
              <li><a href="#servicos" className="hover:text-amber-400 transition-colors">Quadros Elétricos & NR-10</a></li>
              <li><a href="#servicos" className="hover:text-amber-400 transition-colors">Limpeza Técnica com Drone & Termografia</a></li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Atendimento & Matriz</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-slate-300">(93) 99121-1156</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-slate-300">contato@solarradiante.com.br</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">Av. Fernando Guilhon, 2500 - Santarém / PA (Oeste do Pará)</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-slate-300">Atendimento: Santarém, Belterra, Itaituba e Região</span>
              </li>
            </ul>
          </div>

          {/* Quick Action (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Atendimento Direto</h4>
            <a
              href="https://wa.me/5593991211156?text=Olá!%20Gostaria%20de%20falar%20com%20um%20especialista."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>Chamar WhatsApp</span>
            </a>
            <button
              onClick={scrollToTop}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-slate-400 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-all"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Voltar ao Topo</span>
            </button>
          </div>

        </div>

        {/* Bottom Legal & Rights */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Solar Radiante Engenharia Elétrica & Energia Solar Ltda. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Sistemas Homologados ANEEL</span>
            <span>•</span>
            <span>Módulos Tier-1 TOPCon</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

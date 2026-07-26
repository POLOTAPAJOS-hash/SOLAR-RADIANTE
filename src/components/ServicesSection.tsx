import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { Sun, Droplets, Zap, Activity, Wrench, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onOpenQuoteModalWithService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuoteModalWithService }) => {
  const [activeTab, setActiveTab] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Serviços' },
    { id: 'solar', label: 'Energia Solar Fotovoltaica' },
    { id: 'bombeamento', label: 'Bombeamento Solar' },
    { id: 'subestacao', label: 'Subestações Média/Alta Tensão' },
    { id: 'eletrica', label: 'Projetos Elétricos' },
    { id: 'manutencao', label: 'Manutenção & Limpeza' },
  ];

  const filteredServices = activeTab === 'todos'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeTab);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-6 h-6 text-amber-400" />;
      case 'Droplets': return <Droplets className="w-6 h-6 text-blue-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Activity': return <Activity className="w-6 h-6 text-emerald-400" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-orange-400" />;
      default: return <Sun className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="servicos" className="py-20 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Portfólio Completo de Engenharia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Soluções Integradas em <span className="text-amber-400">Energia & Infraestrutura</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Da geração fotovoltaica ao dimensionamento de subestações industriais e laudos técnicos registrados no CREA.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all ${
                activeTab === cat.id
                  ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group"
            >
              <div className="space-y-4">
                
                {/* Header inside Card */}
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-full">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-300/80 mt-1">
                    {service.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Feature Checkpoints */}
                <ul className="space-y-2 pt-2 border-t border-slate-900">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Bottom Card Action */}
              <div className="pt-6 mt-6 border-t border-slate-900">
                <button
                  onClick={() => onOpenQuoteModalWithService(service.title)}
                  className="w-full py-3 text-xs font-bold text-slate-200 bg-slate-900 hover:bg-amber-400 hover:text-slate-950 border border-slate-800 hover:border-amber-400 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Solicitar Orçamento deste Serviço</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

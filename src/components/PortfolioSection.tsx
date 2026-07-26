import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { MapPin, Zap, DollarSign, Calendar, Layers, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { PortfolioProject } from '../types';

interface PortfolioSectionProps {
  onOpenQuoteModalWithService: (serviceName: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenQuoteModalWithService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeProjectModal, setActiveProjectModal] = useState<PortfolioProject | null>(null);

  const categories = ['Todos', 'Agronegócio', 'Subestação', 'Residencial', 'Comercial', 'Industrial'];

  const filteredProjects = selectedCategory === 'Todos'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-slate-900 relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Casos de Sucesso &amp; Obras Entregues em Santarém &amp; PA</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Nossa Experiência em <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">Projetos Executados</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
            Conheça algumas das usinas solares, sistemas de bombeamento e subestações instaladas em Santarém, Belterra e Oeste do Pará com padrão de excelência Solar Radiante.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProjectModal(project)}
              className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Project Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950 bg-amber-400 rounded-full shadow-md">
                    {project.category}
                  </span>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-200 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Potência</div>
                      <div className="font-bold text-amber-300 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>{project.power}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Economia</div>
                      <div className="font-bold text-emerald-400 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{project.savings}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Details Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-900/80 mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Concluído em {project.completionYear}
                </span>
                <span className="text-amber-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ver Detalhes <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <button
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 text-xs font-bold uppercase text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-full">
                {activeProjectModal.category}
              </span>
              <h3 className="text-2xl font-bold text-white pt-1">{activeProjectModal.title}</h3>
              <p className="text-xs text-amber-300 font-medium flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {activeProjectModal.location}
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeProjectModal.description}
            </p>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400">Potência Instalada</div>
                <div className="text-sm sm:text-base font-bold text-amber-300">{activeProjectModal.power}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400">Economia Obtida</div>
                <div className="text-sm sm:text-base font-bold text-emerald-400">{activeProjectModal.savings}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400">Nº de Painéis</div>
                <div className="text-sm sm:text-base font-bold text-white">
                  {activeProjectModal.panelsCount > 0 ? `${activeProjectModal.panelsCount} Unidades` : 'Subestação'}
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  const title = activeProjectModal.title;
                  setActiveProjectModal(null);
                  onOpenQuoteModalWithService(`Projeto Semelhante: ${title}`);
                }}
                className="flex-1 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl"
              >
                Quero Um Projeto Igual Para Mim
              </button>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="px-5 py-3 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700"
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

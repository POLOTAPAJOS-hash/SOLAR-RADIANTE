import React, { useState } from 'react';
import {
  Package,
  Zap,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  ArrowRight,
  FileCheck2,
  Truck,
  Droplets,
  Cpu,
  Battery,
  Award,
  Layers,
  Search,
  ChevronRight
} from 'lucide-react';
import {
  FOTUS_BRANDS,
  FOTUS_MODULES,
  FOTUS_INVERTERS,
  FOTUS_BATTERIES,
  FOTUS_STRUCTURES,
  PRESET_FOTUS_KITS,
  FotusModule,
  FotusInverter,
  FotusStructure,
  PresetKit
} from '../data/fotusData';

interface FotusKitBuilderProps {
  onOpenQuoteModalWithKit: (kitSummary: string, notes?: string) => void;
}

export const FotusKitBuilder: React.FC<FotusKitBuilderProps> = ({
  onOpenQuoteModalWithKit
}) => {
  // Main Navigation Tab
  const [mainTab, setMainTab] = useState<'kwp-kits' | 'marcas-produtos' | 'custom'>('kwp-kits');

  // kWp Kits Sub-Filter
  const [selectedKwpCategory, setSelectedKwpCategory] = useState<string>('Todos');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('kit-5-80-kwp');

  // Products Catalog Sub-Category
  const [productCategoryFilter, setProductCategoryFilter] = useState<'Todos' | 'Módulos' | 'Inversores' | 'Baterias'>('Todos');

  // Custom Builder State
  const [selectedModule, setSelectedModule] = useState<FotusModule>(FOTUS_MODULES[0]);
  const [selectedInverter, setSelectedInverter] = useState<FotusInverter>(FOTUS_INVERTERS[0]);
  const [selectedStructure, setSelectedStructure] = useState<FotusStructure>(FOTUS_STRUCTURES[0]);
  const [modulesCount, setModulesCount] = useState<number>(10);

  // Derived calculations for Custom Kit
  const customTotalkWp = Number(((modulesCount * selectedModule.powerWatts) / 1000).toFixed(2));
  const estimatedMonthlyKwh = Math.round(customTotalkWp * 128); // Irradiance factor for Santarém
  const estimatedRoofAreaSqM = Math.ceil(modulesCount * 2.5);
  const estimatedMonthlySavings = Math.round(estimatedMonthlyKwh * 0.96);

  // Filtered Preset Kits
  const filteredKits = PRESET_FOTUS_KITS.filter((kit) => {
    if (selectedKwpCategory === 'Todos') return true;
    return kit.categoryTag === selectedKwpCategory;
  });

  const currentPreset = PRESET_FOTUS_KITS.find((k) => k.id === selectedPresetId) || PRESET_FOTUS_KITS[2];

  const handleRequestQuoteForPreset = (kit: PresetKit) => {
    const summaryText = `Solicitação de Cotação - ${kit.name} (${kit.kwp} kWp):\n` +
      `• Potência Instalada: ${kit.kwp} kWp\n` +
      `• Módulos: ${kit.modulesCount}x ${kit.moduleBrand}\n` +
      `• Inversor: ${kit.inverterPower} (${kit.inverterBrand})\n` +
      `• Geração Estimada para Santarém: ~${kit.monthlyKwh} kWh/mês\n` +
      `• Inclui: String Box CC/CA, Estrutura de Fixação, Projeto CREA-PA e Vistoria Equatorial Pará.`;

    onOpenQuoteModalWithKit(
      `Cotação Kit Fotus ${kit.kwp} kWp`,
      summaryText
    );
  };

  const handleRequestQuoteForCustom = () => {
    const summaryText = `Kit Solar Sob Medida Fotus (${customTotalkWp} kWp):\n` +
      `• Potência Total: ${customTotalkWp} kWp (${modulesCount} Módulos ${selectedModule.model})\n` +
      `• Inversor: ${selectedInverter.model} (${selectedInverter.brand})\n` +
      `• Estrutura: ${selectedStructure.type}\n` +
      `• Geração Estimada Santarém: ~${estimatedMonthlyKwh} kWh/mês (Economia ~R$ ${estimatedMonthlySavings}/mês)\n` +
      `• Inclui: Proteções IP65, Projeto Elétrico no CREA-PA e Vistoria na Equatorial.`;

    onOpenQuoteModalWithKit(
      `Kit Customizado Fotus (${customTotalkWp} kWp)`,
      summaryText
    );
  };

  return (
    <section id="monte-seu-kit" className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden text-white border-t border-slate-800">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-blue-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-bold shadow-lg">
            <Package className="w-4 h-4 text-amber-400" />
            <span>Portal Distribuidora Fotus &amp; Engenharia Solar</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Kits Solares Prontos por Potência &amp; <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              Catálogo de Produtos Distribuidora Fotus
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Consulte nossos kits solares pré-dimensionados em kWp ou explore o portfólio completo de marcas oficiais distribuídas pela Fotus no Brasil com projeto, instalação e homologação em Santarém.
          </p>
        </div>

        {/* 3 Main Navigation Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex-wrap justify-center gap-1">
            <button
              onClick={() => setMainTab('kwp-kits')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                mainTab === 'kwp-kits'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Kits Prontos por kWp</span>
            </button>

            <button
              onClick={() => setMainTab('marcas-produtos')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                mainTab === 'marcas-produtos'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Marcas &amp; Produtos Fotus</span>
            </button>

            <button
              onClick={() => setMainTab('custom')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                mainTab === 'custom'
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/30 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Configurador Sob Medida</span>
            </button>
          </div>
        </div>

        {/* ==================== TAB 1: KITS PRONTOS POR POTÊNCIA (kWp) ==================== */}
        {mainTab === 'kwp-kits' && (
          <div className="space-y-10">
            {/* Filter by kWp Range */}
            <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase mr-2">Filtrar Potência (kWp):</span>
              {['Todos', '2 - 5 kWp', '5 - 12 kWp', '12 - 50 kWp', 'Rural / Bombeamento'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedKwpCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                    selectedKwpCategory === cat
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid of Kits by kWp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredKits.map((kit) => {
                const isSelected = selectedPresetId === kit.id;
                return (
                  <div
                    key={kit.id}
                    onClick={() => setSelectedPresetId(kit.id)}
                    className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 relative flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-slate-900 border-amber-400 shadow-2xl shadow-amber-500/20 scale-[1.02]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      {/* Top Header Badge & kWp */}
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 border border-amber-500/30 text-amber-300">
                          {kit.badge}
                        </span>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/30">
                          {kit.categoryTag}
                        </span>
                      </div>

                      <p className="text-3xl font-black text-amber-400 mb-1 flex items-baseline gap-1">
                        {kit.kwp} <span className="text-base font-bold text-slate-300">kWp</span>
                      </p>
                      
                      <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                        {kit.name}
                      </h3>

                      <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                        {kit.description}
                      </p>

                      {/* Specifications List */}
                      <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Módulos Fotus:</span>
                          <span className="font-bold text-white">{kit.modulesCount}x 580W N-Type</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Inversor:</span>
                          <span className="font-bold text-white">{kit.inverterPower}</span>
                        </div>
                        {kit.monthlyKwh > 0 ? (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Geração Est. Santarém:</span>
                            <span className="font-bold text-emerald-400">~{kit.monthlyKwh} kWh/mês</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Aplicação:</span>
                            <span className="font-bold text-amber-300">Poço Artesiano Rural</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Área Estimada:</span>
                          <span className="font-bold text-slate-200">~{kit.estimatedRoofArea} m²</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestQuoteForPreset(kit);
                      }}
                      className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25 hover:brightness-110'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      <span>Solicitar Cotação {kit.kwp} kWp</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Selected Kit Detailed Overview */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/30">
                      Detalhamento do Kit {currentPreset.kwp} kWp
                    </span>
                    <span className="text-xs text-slate-400">Garantia Linear de 25 a 30 anos</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {currentPreset.name} — Pronto para Instalação &amp; Homologação
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <Sun className="w-5 h-5 text-amber-400 mb-2" />
                      <p className="text-xs text-slate-400">Painéis Fotovoltaicos</p>
                      <p className="text-sm font-bold text-white">{currentPreset.modulesCount} Módulos N-Type TOPCon 580W ({currentPreset.moduleBrand})</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <Zap className="w-5 h-5 text-amber-400 mb-2" />
                      <p className="text-xs text-slate-400">Inversor / Microinversor</p>
                      <p className="text-sm font-bold text-white">{currentPreset.inverterPower} ({currentPreset.inverterBrand})</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                      <p className="text-xs text-slate-400">Projeto &amp; Vistoria</p>
                      <p className="text-sm font-bold text-white">CREA-PA + Troca Medidor Equatorial PA</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
                  <p className="text-xs text-slate-400 uppercase font-semibold">Geração Estimada para Santarém</p>
                  <p className="text-4xl font-black text-emerald-400">
                    {currentPreset.monthlyKwh > 0 ? `~${currentPreset.monthlyKwh} kWh` : 'Poço Artesiano'}<span className="text-sm font-normal text-slate-400">{currentPreset.monthlyKwh > 0 ? '/mês' : ''}</span>
                  </p>
                  <p className="text-xs text-slate-400">Payback médio estimado em ~{currentPreset.paybackMonths} meses em Santarém</p>

                  <button
                    onClick={() => handleRequestQuoteForPreset(currentPreset)}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Receber Orçamento Oficial {currentPreset.kwp} kWp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: MARCAS & CATÁLOGO DE PRODUTOS FOTUS ==================== */}
        {mainTab === 'marcas-produtos' && (
          <div className="space-y-12">
            
            {/* Brands Showcase Grid matching Fotus portal image */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                <h3 className="text-2xl font-black text-white">
                  Marcas Oficiais Distribuídas pela Fotus
                </h3>
                <p className="text-xs text-slate-400">
                  Importação direta e garantia oficial dos principais fabricantes de energia solar do mundo.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                {FOTUS_BRANDS.map((brand) => (
                  <div
                    key={brand.name}
                    className="bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-4 text-center transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {brand.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-2 inline-block">
                          {brand.badge}
                        </span>
                      )}
                      <h4 className="font-extrabold text-white text-sm group-hover:text-blue-400 transition-colors">
                        {brand.name}
                      </h4>
                      <p className="text-[11px] text-amber-400 font-bold mt-1">
                        {brand.category}
                      </p>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 line-clamp-2">
                      {brand.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Filter Tabs */}
            <div className="flex justify-center gap-2">
              {(['Todos', 'Módulos', 'Inversores', 'Baterias'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProductCategoryFilter(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    productCategoryFilter === cat
                      ? 'bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Category 1: Módulos Fotovoltaicos Fotus */}
            {(productCategoryFilter === 'Todos' || productCategoryFilter === 'Módulos') && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Sun className="w-5 h-5 text-amber-400" />
                  <span>Módulos Fotovoltaicos (Trina Solar, LONGi, Jinko, Astronergy, Sunova, Ronma, Pulling)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {FOTUS_MODULES.map((mod) => (
                    <div key={mod.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                      <div>
                        {mod.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2 inline-block">
                            {mod.badge}
                          </span>
                        )}
                        <h4 className="font-extrabold text-white text-base">{mod.model}</h4>
                        <p className="text-xs text-blue-400 font-semibold mb-2">{mod.brand}</p>
                        <p className="text-xs text-slate-300 mb-3">{mod.description}</p>
                        
                        <div className="space-y-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                          <p><strong className="text-slate-200">Tecnologia:</strong> {mod.technology}</p>
                          <p><strong className="text-slate-200">Eficiência Célula:</strong> <span className="text-emerald-400 font-bold">{mod.efficiency}</span></p>
                          <p><strong className="text-slate-200">Garantia:</strong> {mod.warrantyYears} anos de geração</p>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenQuoteModalWithKit(`Consulta Módulo ${mod.model}`, `Tenho interesse no módulo ${mod.model} da ${mod.brand}.`)}
                        className="w-full py-2.5 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 text-xs font-bold rounded-xl transition-all"
                      >
                        Consultar Módulo
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category 2: Inversores & Microinversores */}
            {(productCategoryFilter === 'Todos' || productCategoryFilter === 'Inversores') && (
              <div className="space-y-4 pt-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Inversores &amp; Microinversores (Solplanet, GoodWe, Solis, Auxsol, Deye, TSUNESS)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {FOTUS_INVERTERS.map((inv) => (
                    <div key={inv.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                      <div>
                        {inv.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-2 inline-block">
                            {inv.badge}
                          </span>
                        )}
                        <h4 className="font-extrabold text-white text-base">{inv.model}</h4>
                        <p className="text-xs text-blue-400 font-semibold mb-2">{inv.brand}</p>
                        <p className="text-xs text-slate-300 mb-3">{inv.description}</p>
                        
                        <div className="space-y-1.5 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                          <p><strong className="text-slate-200">Tipo:</strong> {inv.type}</p>
                          <p><strong className="text-slate-200">Eficiência Máx:</strong> <span className="text-emerald-400 font-bold">{inv.maxEfficiency}</span></p>
                          <p><strong className="text-slate-200">App Monitoramento:</strong> {inv.monitoringApp}</p>
                          <p><strong className="text-slate-200">Garantia:</strong> {inv.warrantyYears} anos</p>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenQuoteModalWithKit(`Consulta Inversor ${inv.model}`, `Tenho interesse no inversor ${inv.model} da ${inv.brand}.`)}
                        className="w-full py-2.5 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 text-xs font-bold rounded-xl transition-all"
                      >
                        Consultar Inversor
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category 3: Baterias de Lítio Unipower */}
            {(productCategoryFilter === 'Todos' || productCategoryFilter === 'Baterias') && (
              <div className="space-y-4 pt-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Battery className="w-5 h-5 text-emerald-400" />
                  <span>Baterias de Lítio LiFePO4 &amp; Armazenamento (Unipower)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {FOTUS_BATTERIES.map((bat) => (
                    <div key={bat.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2 inline-block">
                          Segurança LiFePO4
                        </span>
                        <h4 className="font-extrabold text-white text-lg">{bat.model}</h4>
                        <p className="text-xs text-blue-400 font-semibold mb-2">{bat.brand}</p>
                        <p className="text-xs text-slate-300 mb-4">{bat.description}</p>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <p><strong className="text-slate-400">Capacidade:</strong> {bat.capacityKwh} kWh</p>
                          <p><strong className="text-slate-400">Tensão:</strong> {bat.voltage}</p>
                          <p><strong className="text-slate-400">Vida Útil:</strong> {bat.cyclesCount} ciclos</p>
                          <p><strong className="text-slate-400">Garantia:</strong> {bat.warrantyYears} anos</p>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenQuoteModalWithKit(`Consulta Bateria ${bat.model}`, `Tenho interesse na bateria de lítio ${bat.model}.`)}
                        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-black rounded-xl hover:brightness-110 transition-all uppercase tracking-wider"
                      >
                        Solicitar Cotação Bateria Unipower
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================== TAB 3: CONFIGURADOR SOB MEDIDA ==================== */}
        {mainTab === 'custom' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Step 1: Módulos */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-black text-sm flex items-center justify-center border border-blue-500/30">
                    1
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Escolha o Módulo Fotovoltaico Fotus</h3>
                    <p className="text-xs text-slate-400">Painéis N-Type com 25 a 30 anos de garantia</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FOTUS_MODULES.map((mod) => {
                    const isSelected = selectedModule.id === mod.id;
                    return (
                      <div
                        key={mod.id}
                        onClick={() => setSelectedModule(mod)}
                        className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                          isSelected
                            ? 'bg-slate-800 border-amber-400 shadow-lg shadow-amber-500/10'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {mod.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2 inline-block">
                            {mod.badge}
                          </span>
                        )}
                        <h4 className="font-extrabold text-white text-sm mb-1">{mod.model}</h4>
                        <p className="text-xs text-blue-400 mb-2">{mod.brand}</p>
                        <p className="text-xs text-slate-300">{mod.description}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Number of Modules Slider */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-200">Quantidade de Painéis:</span>
                    <span className="text-2xl font-black text-amber-400 bg-amber-500/10 px-4 py-1 rounded-xl border border-amber-500/20">
                      {modulesCount} <span className="text-xs text-slate-300 font-normal">módulos</span>
                    </span>
                  </div>

                  <input
                    type="range"
                    min="2"
                    max="80"
                    step="1"
                    value={modulesCount}
                    onChange={(e) => setModulesCount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />

                  <div className="flex justify-between text-xs text-slate-400">
                    <span>2 painéis (1.16 kWp)</span>
                    <span>20 painéis (11.6 kWp)</span>
                    <span>80 painéis (46.4 kWp)</span>
                  </div>
                </div>
              </div>

              {/* Step 2: Inversores */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-black text-sm flex items-center justify-center border border-blue-500/30">
                    2
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Escolha o Inversor / Microinversor</h3>
                    <p className="text-xs text-slate-400">Solplanet, GoodWe, Solis, Auxsol, Deye, TSUNESS</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FOTUS_INVERTERS.map((inv) => {
                    const isSelected = selectedInverter.id === inv.id;
                    return (
                      <div
                        key={inv.id}
                        onClick={() => setSelectedInverter(inv)}
                        className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                          isSelected
                            ? 'bg-slate-800 border-amber-400 shadow-lg shadow-amber-500/10'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {inv.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-2 inline-block">
                            {inv.badge}
                          </span>
                        )}
                        <h4 className="font-extrabold text-white text-sm mb-1">{inv.model}</h4>
                        <p className="text-xs text-blue-400 mb-2">{inv.brand}</p>
                        <p className="text-xs text-slate-300">{inv.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Estrutura */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-black text-sm flex items-center justify-center border border-blue-500/30">
                    3
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Estrutura de Fixação do Telhado</h3>
                    <p className="text-xs text-slate-400">Alumínio anodizado e parafusos inox com vedação EPDM</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FOTUS_STRUCTURES.map((struct) => {
                    const isSelected = selectedStructure.id === struct.id;
                    return (
                      <button
                        key={struct.id}
                        type="button"
                        onClick={() => setSelectedStructure(struct)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400 text-white font-bold'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <p className="text-xs font-bold text-white mb-1">{struct.type}</p>
                        <p className="text-[11px] text-slate-400">{struct.roofType}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Summary */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-amber-400" />
                    <h3 className="font-black text-white text-lg">Resumo Customizado</h3>
                  </div>
                  <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Ativo
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <p className="text-xs text-slate-400">Potência Total do Sistema</p>
                    <p className="text-3xl font-black text-amber-400">{customTotalkWp} <span className="text-sm font-semibold text-slate-300">kWp</span></p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400">Geração Est./mês</p>
                      <p className="text-base font-bold text-emerald-400">~{estimatedMonthlyKwh} kWh</p>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400">Área de Telhado</p>
                      <p className="text-base font-bold text-white">~{estimatedRoofAreaSqM} m²</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <p className="font-bold text-white mb-2">Resumo dos Componentes:</p>
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{modulesCount}x {selectedModule.model}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Inversor {selectedInverter.model}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Estrutura {selectedStructure.type}</span>
                  </p>
                </div>

                <button
                  onClick={handleRequestQuoteForCustom}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <span>Solicitar Cotação ({customTotalkWp} kWp)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Guarantees Banner */}
        <div className="mt-16 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white text-sm">Garantia Distribuidora Fotus</h4>
                <p className="text-xs text-slate-400">Até 30 anos de garantia linear de geração fotovoltaica.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Truck className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white text-sm">Entrega em Santarém</h4>
                <p className="text-xs text-slate-400">Logística fluvial e rodoviária segura com seguro total.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileCheck2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white text-sm">Engenharia Registrada</h4>
                <p className="text-xs text-slate-400">ART assinada por engenheiro e homologada na Equatorial Pará.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Droplets className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white text-sm">Projetos Agrícolas</h4>
                <p className="text-xs text-slate-400">Kits de bombeamento solar direto para poços artesianos rurais.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

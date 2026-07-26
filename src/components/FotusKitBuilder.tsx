import React, { useState } from 'react';
import {
  Package,
  Layers,
  Zap,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Sparkles,
  ArrowRight,
  Info,
  ChevronRight,
  Sliders,
  DollarSign,
  Maximize2,
  RefreshCw,
  FileCheck2,
  Truck,
  Droplets
} from 'lucide-react';
import {
  FOTUS_MODULES,
  FOTUS_INVERTERS,
  FOTUS_STRUCTURES,
  FOTUS_PROTECTIONS,
  FOTUS_SERVICES,
  PRESET_FOTUS_KITS,
  FotusModule,
  FotusInverter,
  FotusStructure,
  FotusServiceOption
} from '../data/fotusData';

interface FotusKitBuilderProps {
  onOpenQuoteModalWithKit: (kitSummary: string, notes?: string) => void;
}

export const FotusKitBuilder: React.FC<FotusKitBuilderProps> = ({
  onOpenQuoteModalWithKit
}) => {
  // Builder state
  const [activeTab, setActiveTab] = useState<'preset' | 'custom'>('preset');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('kit-res-m');

  // Custom configuration state
  const [selectedModule, setSelectedModule] = useState<FotusModule>(FOTUS_MODULES[0]);
  const [selectedInverter, setSelectedInverter] = useState<FotusInverter>(FOTUS_INVERTERS[0]);
  const [selectedStructure, setSelectedStructure] = useState<FotusStructure>(FOTUS_STRUCTURES[0]);
  const [modulesCount, setModulesCount] = useState<number>(10);
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(true);
  const [includeFreight, setIncludeFreight] = useState<boolean>(true);

  // Derived calculations for Custom Kit
  const customTotalkWp = Number(((modulesCount * selectedModule.powerWatts) / 1000).toFixed(2));
  // Irradiance in Santarém ~4.8 kWh/m²/day * 30 days * 0.81 performance ratio = ~116 kWh per kWp per month
  const estimatedMonthlyKwh = Math.round(customTotalkWp * 128);
  const estimatedRoofAreaSqM = Math.ceil(modulesCount * 2.5);
  const estimatedMonthlySavings = Math.round(estimatedMonthlyKwh * 0.96); // ~R$ 0.96/kWh Equatorial Pará

  const handleApplyPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = PRESET_FOTUS_KITS.find((k) => k.id === presetId);
    if (preset) {
      setModulesCount(preset.modulesCount);
      if (presetId === 'kit-pumping-rural') {
        setSelectedInverter(FOTUS_INVERTERS.find((i) => i.id === 'inv-pump-vfd') || FOTUS_INVERTERS[0]);
        setSelectedStructure(FOTUS_STRUCTURES.find((s) => s.id === 'struct-ground') || FOTUS_STRUCTURES[0]);
      } else if (presetId === 'kit-com-g') {
        setSelectedModule(FOTUS_MODULES.find((m) => m.id === 'mod-670-ultra') || FOTUS_MODULES[0]);
        setSelectedInverter(FOTUS_INVERTERS.find((i) => i.id === 'inv-deye-ongrid') || FOTUS_INVERTERS[0]);
      }
    }
  };

  const currentPreset = PRESET_FOTUS_KITS.find((k) => k.id === selectedPresetId) || PRESET_FOTUS_KITS[1];

  const handleRequestQuoteForKit = () => {
    if (activeTab === 'preset') {
      const summaryText = `Kit Solar Fotus Pré-Configurado: ${currentPreset.name} (${currentPreset.kPkWp} kWp - ${currentPreset.modulesCount} Painéis de ${currentPreset.modulePower}W). Inversor ${currentPreset.inverterPower}. Geração estimada: ~${currentPreset.monthlyKwh} kWh/mês.`;
      onOpenQuoteModalWithKit(
        `Monte Seu Kit Fotus - ${currentPreset.name}`,
        summaryText
      );
    } else {
      const summaryText = `Kit Solar Personalizado Fotus:\n` +
        `• Potência Total: ${customTotalkWp} kWp (${modulesCount} Módulos ${selectedModule.model})\n` +
        `• Inversor: ${selectedInverter.model} (${selectedInverter.brand})\n` +
        `• Estrutura: ${selectedStructure.type}\n` +
        `• Proteções: String Box CC/CA Fotus 1000V + Cabos 6mm² + Conectores MC4\n` +
        `• Serviços: Projeto CREA, Homologação Equatorial PA${includeInstallation ? ', Instalação Especializada' : ''}${includeFreight ? ', Frete Seguro' : ''}\n` +
        `• Geração Estimada para Santarém: ~${estimatedMonthlyKwh} kWh/mês (Economia ~R$ ${estimatedMonthlySavings}/mês)`;

      onOpenQuoteModalWithKit(
        `Kit Fotus Personalizado (${customTotalkWp} kWp)`,
        summaryText
      );
    }
  };

  return (
    <section id="monte-seu-kit" className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden text-white border-t border-slate-800">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/10 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/10">
            <Package className="w-4 h-4 text-amber-400" />
            <span>Monte Seu Kit Fotus — Parceria de Distribuição Oficial</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Monte Seu Kit Solar Com Equipamentos <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              Distribuidora Fotus &amp; Engenharia Solar
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Personalize seu sistema fotovoltaico com a maior variedade de módulos N-Type, inversores string/híbridos Deye, microinversores e estruturas de fixação de alto padrão com entrega e homologação garantida em Santarém.
          </p>
        </div>

        {/* Tab Toggle: Kits Prontos vs Configurador Personalizado */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <button
              onClick={() => setActiveTab('preset')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'preset'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Kits Prontos Fotus</span>
            </button>

            <button
              onClick={() => setActiveTab('custom')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'custom'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Configurador Sob Medida</span>
            </button>
          </div>
        </div>

        {/* TAB 1: KITS PRONTOS FOTUS */}
        {activeTab === 'preset' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRESET_FOTUS_KITS.map((kit) => {
                const isSelected = selectedPresetId === kit.id;
                return (
                  <div
                    key={kit.id}
                    onClick={() => handleApplyPreset(kit.id)}
                    className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 relative flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-slate-900 border-amber-400 shadow-2xl shadow-amber-500/20 scale-[1.02]'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                    }`}
                  >
                    {/* Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/15 border border-amber-500/30 text-amber-300">
                        {kit.badge}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-6 h-6 text-amber-400" />
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-white mb-2 leading-snug">
                        {kit.name}
                      </h3>
                      <p className="text-3xl font-black text-amber-400 mb-6">
                        {kit.kPkWp} <span className="text-sm font-semibold text-slate-300">kWp</span>
                      </p>

                      <div className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-4 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Módulos N-Type:</span>
                          <span className="font-bold text-white">{kit.modulesCount}x {kit.modulePower}W</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Inversor Fotus:</span>
                          <span className="font-bold text-white">{kit.inverterPower}</span>
                        </div>
                        {kit.monthlyKwh > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Geração Est. Santarém:</span>
                            <span className="font-bold text-emerald-400">~{kit.monthlyKwh} kWh/mês</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Área Estimada:</span>
                          <span className="font-bold text-white">~{kit.estimatedRoofArea} m²</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyPreset(kit.id);
                        handleRequestQuoteForKit();
                      }}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25 hover:brightness-110'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      <span>Solicitar Cotação Fotus</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Selected Kit Detailed Card Breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                      Garantia &amp; Qualidade Fotus
                    </span>
                    <span className="text-xs text-slate-400">Código de Referência: FOT-KIT-{selectedPresetId.toUpperCase()}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {currentPreset.name} — Estrutura Completa de Funcionamento
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                      <Sun className="w-5 h-5 text-amber-400 mb-2" />
                      <p className="text-xs text-slate-400">Painéis Fotovoltaicos</p>
                      <p className="text-sm font-bold text-white">{currentPreset.modulesCount}x Módulos {currentPreset.modulePower}W N-Type TOPCon</p>
                    </div>

                    <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                      <Zap className="w-5 h-5 text-amber-400 mb-2" />
                      <p className="text-xs text-slate-400">Inversor Fotus</p>
                      <p className="text-sm font-bold text-white">{currentPreset.inverterPower} On-Grid Deye / Growatt</p>
                    </div>

                    <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                      <p className="text-xs text-slate-400">Proteção &amp; Homologação</p>
                      <p className="text-sm font-bold text-white">String Box IP65 + CREA PA + Equatorial</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
                  <p className="text-xs text-slate-400 uppercase font-semibold">Economia Média Estimada</p>
                  <p className="text-4xl font-black text-emerald-400">
                    R$ {Math.round(currentPreset.targetBill * 0.92).toLocaleString('pt-BR')}<span className="text-sm font-normal text-slate-400">/mês</span>
                  </p>
                  <p className="text-xs text-slate-400">Payback estimado em ~{currentPreset.paybackMonths} meses em Santarém</p>

                  <button
                    onClick={handleRequestQuoteForKit}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Receber Proposta Comercial Fotus</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONFIGURADOR SOB MEDIDA */}
        {activeTab === 'custom' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Options Controls (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Step 1: Quantidade de Módulos & Potência */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-black text-sm flex items-center justify-center border border-blue-500/30">
                    1
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Escolha o Módulo Fotovoltaico Fotus</h3>
                    <p className="text-xs text-slate-400">Painéis de alta eficiência N-Type com 25 a 30 anos de garantia</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <p className="text-xs text-slate-400 mb-2">{mod.brand}</p>
                        <p className="text-xs font-semibold text-emerald-400 mb-2">Eficiência: {mod.efficiency}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-2">{mod.description}</p>
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

              {/* Step 2: Escolha do Inversor Fotus */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-black text-sm flex items-center justify-center border border-blue-500/30">
                    2
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Escolha o Inversor / Microinversor Fotus</h3>
                    <p className="text-xs text-slate-400">Equipamentos homologados pela Inmetro com suporte Wi-Fi e App</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <p className="text-xs text-slate-400 mb-2">{inv.brand} • Garantia {inv.warrantyYears} anos</p>
                        <p className="text-xs text-slate-300 mb-3">{inv.description}</p>
                        <p className="text-[11px] font-semibold text-amber-300">
                          App: {inv.monitoringApp}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Estrutura de Fixação do Telhado/Solo */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-black text-sm flex items-center justify-center border border-blue-500/30">
                    3
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Estrutura de Fixação Conforme Seu Telhado/Solo</h3>
                    <p className="text-xs text-slate-400">Trilhos de alumínio anodizado e parafusos inox com vedação EPDM</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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

            {/* Right Summary Sticky Sidebar (4 Cols) */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              
              <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-amber-400" />
                    <h3 className="font-black text-white text-lg">Resumo do Kit Fotus</h3>
                  </div>
                  <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Ativo
                  </span>
                </div>

                {/* Key Numbers */}
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

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-[11px] text-slate-400">Economia Média em Santarém</p>
                    <p className="text-xl font-extrabold text-emerald-400">
                      R$ {estimatedMonthlySavings.toLocaleString('pt-BR')}<span className="text-xs font-normal text-slate-400">/mês</span>
                    </p>
                  </div>
                </div>

                {/* Items Included List */}
                <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <p className="font-bold text-white mb-2">Componentes Selecionados:</p>
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
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>String Box CC/CA IP65 + Cabos Solares 6mm²</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Projeto CREA Pará &amp; Homologação Equatorial</span>
                  </p>
                </div>

                <button
                  onClick={handleRequestQuoteForKit}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <span>Solicitar Cotação do Kit Customizado</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Fotus Distribution Guarantees Banner */}
        <div className="mt-16 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white text-sm">Garantia Nacional Fotus</h4>
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

import React, { useState } from 'react';
import {
  Package,
  Zap,
  Sun,
  ShieldCheck,
  ArrowRight,
  FileCheck2,
  Truck,
  Droplets,
  Calculator,
  ArrowRightLeft,
  Info,
  Sliders,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import {
  PRESET_FOTUS_KITS,
  PresetKit,
  transformKwpToKw,
  transformKwToKwp
} from '../data/fotusData';
import { FotusKitDrawer } from './FotusKitDrawer';

interface FotusKitBuilderProps {
  onOpenQuoteModalWithKit: (kitSummary: string, notes?: string) => void;
}

export const FotusKitBuilder: React.FC<FotusKitBuilderProps> = ({
  onOpenQuoteModalWithKit
}) => {
  // Drawer state for left sliding panel
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // kWp Kits Sub-Filter
  const [selectedKwpCategory, setSelectedKwpCategory] = useState<string>('Todos');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('kit-5-80-kwp');

  // Unit display mode state
  const [unitMode, setUnitMode] = useState<'both' | 'kwp' | 'kw'>('both');

  // Interactive kWp <-> kW Converter Calculator State
  const [inputKwp, setInputKwp] = useState<number>(5.8);
  const [inputKw, setInputKw] = useState<number>(transformKwpToKw(5.8, 1.2));
  const [oversizingRatio, setOversizingRatio] = useState<number>(1.20); // 1.20x standard oversizing (Fator CC/CA)
  const [direction, setDirection] = useState<'kwpToKw' | 'kwToKwp'>('kwpToKw');

  // Handler for kWp input change
  const handleKwpChange = (val: number) => {
    setInputKwp(val);
    setInputKw(transformKwpToKw(val, oversizingRatio));
  };

  // Handler for kW input change
  const handleKwChange = (val: number) => {
    setInputKw(val);
    setInputKwp(transformKwToKwp(val, oversizingRatio));
  };

  const handleOversizingChange = (ratio: number) => {
    setOversizingRatio(ratio);
    if (direction === 'kwpToKw') {
      setInputKw(transformKwpToKw(inputKwp, ratio));
    } else {
      setInputKwp(transformKwToKwp(inputKw, ratio));
    }
  };

  // Filtered Preset Kits
  const filteredKits = PRESET_FOTUS_KITS.filter((kit) => {
    if (selectedKwpCategory === 'Todos') return true;
    return kit.categoryTag === selectedKwpCategory;
  });

  const currentPreset = PRESET_FOTUS_KITS.find((k) => k.id === selectedPresetId) || PRESET_FOTUS_KITS[2];

  const handleRequestQuoteForPreset = (kit: PresetKit) => {
    const kwValue = transformKwpToKw(kit.kwp, oversizingRatio);
    const summaryText = `Solicitação de Cotação - ${kit.name} (${kit.kwp} kWp / ~${kwValue} kW Inversor):\n` +
      `• Potência Instalada (CC): ${kit.kwp} kWp\n` +
      `• Potência Nominal do Inversor (CA): ~${kwValue} kW\n` +
      `• Módulos: ${kit.modulesCount}x ${kit.moduleBrand}\n` +
      `• Inversor: ${kit.inverterPower} (${kit.inverterBrand})\n` +
      `• Geração Estimada para Santarém: ~${kit.monthlyKwh} kWh/mês\n` +
      `• Inclui: String Box CC/CA, Estrutura de Fixação, Projeto CREA-PA e Vistoria Equatorial Pará.`;

    onOpenQuoteModalWithKit(
      `Cotação Kit Fotus ${kit.kwp} kWp (~${kwValue} kW)`,
      summaryText
    );
  };

  return (
    <section id="monte-seu-kit" className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden text-white border-t border-slate-800">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-b from-blue-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-bold shadow-lg">
            <Package className="w-4 h-4 text-amber-400" />
            <span>Kits Solares Fotus em Santarém/PA</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Kits Solares Prontos <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              Organizados por Potência (kWp / kW)
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Selecione a potência pré-dimensionada em kWp (painéis CC) ou kW (inversor CA) ideal para o consumo de sua residência, comércio ou propriedade rural com homologação completa na Equatorial Pará.
          </p>
        </div>

        {/* Interactive Drawer Launcher Banner */}
        <div className="max-w-4xl mx-auto mb-10 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-blue-500/20 border-2 border-amber-400/80 p-5 sm:p-6 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="flex items-center gap-4 relative z-10 text-center sm:text-left">
            <div className="p-3.5 rounded-2xl bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 flex-shrink-0">
              <Sliders className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Configurador Passo a Passo</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Monte Seu Kit Customizado no Painel Deslizante
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Escolha marcas de painéis, inversores Deye/Solplanet, estruturas e proteções no painel lateral à esquerda.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 flex-shrink-0 relative z-10"
          >
            <span>Abrir Painel Deslizante</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Conversor de Potência kWp <-> kW Widget */}
        <div className="max-w-4xl mx-auto mb-12 bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Calculadora &amp; Conversor de Potência (kWp ↔ kW)</h3>
                <p className="text-xs text-slate-400">Converte Potência Pico dos Painéis (kWp CC) para Potência Ativa Nominal do Inversor (kW CA)</p>
              </div>
            </div>

            {/* Oversizing Ratio Selector */}
            <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-medium">Overloading (CC/CA):</span>
              <select
                value={oversizingRatio}
                onChange={(e) => handleOversizingChange(Number(e.target.value))}
                className="bg-slate-900 text-amber-400 font-bold outline-none cursor-pointer rounded px-2 py-1 border border-slate-700"
              >
                <option value={1.15}>1.15x (15% Overloading)</option>
                <option value={1.20}>1.20x (20% Padrão Fotus)</option>
                <option value={1.25}>1.25x (25% Máx Inversor)</option>
                <option value={1.30}>1.30x (30% Alta Eficiência)</option>
              </select>
            </div>
          </div>

          {/* Interactive Calculator Form */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            
            {/* Input kWp */}
            <div className="md:col-span-5 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-amber-400 uppercase tracking-wider">Potência Gerador (CC)</span>
                <span className="text-slate-400 font-mono">kWp (Pico)</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  value={inputKwp}
                  onChange={(e) => {
                    setDirection('kwpToKw');
                    handleKwpChange(Number(e.target.value));
                  }}
                  className="w-full bg-transparent text-2xl sm:text-3xl font-black text-amber-300 outline-none"
                  placeholder="Ex: 5.8"
                />
                <span className="text-sm font-bold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">kWp</span>
              </div>
              <p className="text-[11px] text-slate-400">Potência máxima dos módulos fotovoltaicos instalados</p>
            </div>

            {/* Transform Icon Button */}
            <div className="md:col-span-1 flex justify-center py-2 md:py-0">
              <button
                type="button"
                onClick={() => {
                  const newDir = direction === 'kwpToKw' ? 'kwToKwp' : 'kwpToKw';
                  setDirection(newDir);
                }}
                className="p-3 rounded-2xl bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-all hover:scale-110 shadow-lg"
                title="Inverter direção de conversão"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Output kW */}
            <div className="md:col-span-5 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-400 uppercase tracking-wider">Potência Inversor (CA)</span>
                <span className="text-slate-400 font-mono">kW (Nominal)</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  value={inputKw}
                  onChange={(e) => {
                    setDirection('kwToKwp');
                    handleKwChange(Number(e.target.value));
                  }}
                  className="w-full bg-transparent text-2xl sm:text-3xl font-black text-emerald-300 outline-none"
                  placeholder="Ex: 4.83"
                />
                <span className="text-sm font-bold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">kW</span>
              </div>
              <p className="text-[11px] text-slate-400">Potência ativa em corrente alternada para injeção na rede</p>
            </div>

          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Fórmula aplicada: <strong>kW CA = kWp CC ÷ {oversizingRatio}x</strong> (Considera rendimento térmico do clima tropical de Santarém/PA e fator de inversão).</span>
          </div>
        </div>

        {/* Filter by kWp Range & Unit Toggle Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase mr-1">Filtrar Potência:</span>
            {['Todos', '2 - 5 kWp', '5 - 12 kWp', '12 - 50 kWp', 'Rural / Bombeamento'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedKwpCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                  selectedKwpCategory === cat
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Unit Mode Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 px-2 font-semibold text-[11px]">Exibir:</span>
            <button
              onClick={() => setUnitMode('both')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                unitMode === 'both'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              kWp + kW
            </button>
            <button
              onClick={() => setUnitMode('kwp')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                unitMode === 'kwp'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Apenas kWp
            </button>
            <button
              onClick={() => setUnitMode('kw')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                unitMode === 'kw'
                  ? 'bg-emerald-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Apenas kW
            </button>
          </div>

        </div>

        {/* Grid of Kits by kWp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredKits.map((kit) => {
            const isSelected = selectedPresetId === kit.id;
            const kwCalculated = transformKwpToKw(kit.kwp, oversizingRatio);

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

                  {/* Power Metric Display according to Unit Mode */}
                  <div className="mb-2">
                    {unitMode === 'both' && (
                      <div className="space-y-0.5">
                        <p className="text-3xl font-black text-amber-400 flex items-baseline gap-1">
                          {kit.kwp} <span className="text-base font-bold text-slate-300">kWp</span>
                        </p>
                        <p className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md inline-block border border-emerald-500/20">
                          = ~{kwCalculated} kW (Inversor CA)
                        </p>
                      </div>
                    )}

                    {unitMode === 'kwp' && (
                      <p className="text-3xl font-black text-amber-400 flex items-baseline gap-1">
                        {kit.kwp} <span className="text-base font-bold text-slate-300">kWp</span>
                      </p>
                    )}

                    {unitMode === 'kw' && (
                      <div>
                        <p className="text-3xl font-black text-emerald-400 flex items-baseline gap-1">
                          ~{kwCalculated} <span className="text-base font-bold text-slate-300">kW</span>
                        </p>
                        <p className="text-[11px] text-amber-300 font-semibold mt-0.5">
                          Gerador {kit.kwp} kWp CC
                        </p>
                      </div>
                    )}
                  </div>
                  
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
                      <span className="text-slate-400">Inversor Nominal:</span>
                      <span className="font-bold text-emerald-300">{kit.inverterPower} (~{kwCalculated} kW)</span>
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
                  <span>Solicitar Cotação {kit.kwp} kWp (~{kwCalculated} kW)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Kit Detailed Overview */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/30">
                  Kit {currentPreset.kwp} kWp CC
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold border border-emerald-500/30">
                  ~{transformKwpToKw(currentPreset.kwp, oversizingRatio)} kW CA Inversor
                </span>
                <span className="text-xs text-slate-400">Garantia Linear de 25 a 30 anos</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {currentPreset.name} — Pronto para Instalação &amp; Homologação
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <Sun className="w-5 h-5 text-amber-400 mb-2" />
                  <p className="text-xs text-slate-400">Painéis Fotovoltaicos (CC)</p>
                  <p className="text-sm font-bold text-white">{currentPreset.modulesCount} Módulos N-Type 580W ({currentPreset.kwp} kWp)</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <Zap className="w-5 h-5 text-emerald-400 mb-2" />
                  <p className="text-xs text-slate-400">Inversor Nominal (CA)</p>
                  <p className="text-sm font-bold text-white">{currentPreset.inverterPower} (~{transformKwpToKw(currentPreset.kwp, oversizingRatio)} kW)</p>
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
                <span>Receber Orçamento ({currentPreset.kwp} kWp / ~{transformKwpToKw(currentPreset.kwp, oversizingRatio)} kW)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Guarantees Banner */}
        <div className="mt-12 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
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

      {/* Floating Tab on Left Edge of Screen to open Left Drawer */}
      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black py-3.5 px-2.5 sm:px-3 rounded-r-2xl shadow-2xl flex items-center gap-2 cursor-pointer border-t border-r border-b border-amber-300 hover:pr-4 hover:scale-105 transition-all group"
        title="Abrir Painel Deslizante Monte Seu Kit Fotus"
      >
        <Sliders className="w-5 h-5 text-slate-950 group-hover:rotate-180 transition-transform duration-500" />
        <span className="text-xs font-black uppercase tracking-wider hidden sm:inline [writing-mode:vertical-lr] rotate-180 py-1">
          Monte Seu Kit Fotus
        </span>
      </button>

      {/* Fotus Kit Drawer Panel (Sliding from Left) */}
      <FotusKitDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenQuoteModalWithKit={onOpenQuoteModalWithKit}
      />
    </section>
  );
};

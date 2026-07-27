import React, { useState } from 'react';
import {
  X,
  Package,
  Zap,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Sparkles,
  ArrowRight,
  Battery,
  Layers,
  Wrench,
  Calculator,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import {
  FOTUS_MODULES,
  FOTUS_INVERTERS,
  FOTUS_STRUCTURES,
  FOTUS_BRANDS,
  transformKwpToKw
} from '../data/fotusData';

interface FotusKitDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModalWithKit: (kitSummary: string, notes?: string) => void;
}

export const FotusKitDrawer: React.FC<FotusKitDrawerProps> = ({
  isOpen,
  onClose,
  onOpenQuoteModalWithKit
}) => {
  // State for interactive kit builder
  const [selectedModuleId, setSelectedModuleId] = useState<string>('mod-580-jinko');
  const [moduleCount, setModuleCount] = useState<number>(10);
  const [selectedInverterId, setSelectedInverterId] = useState<string>('inv-deye-string');
  const [inverterKw, setInverterKw] = useState<number>(5.0);
  const [selectedStructureId, setSelectedStructureId] = useState<string>('struct-ceramic');
  const [includeBattery, setIncludeBattery] = useState<boolean>(false);
  const [includeStringBox, setIncludeStringBox] = useState<boolean>(true);
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('Todas');

  // Selected object helpers
  const currentModule = FOTUS_MODULES.find((m) => m.id === selectedModuleId) || FOTUS_MODULES[0];
  const currentInverter = FOTUS_INVERTERS.find((i) => i.id === selectedInverterId) || FOTUS_INVERTERS[0];
  const currentStructure = FOTUS_STRUCTURES.find((s) => s.id === selectedStructureId) || FOTUS_STRUCTURES[0];

  // Calculated metrics
  const totalKwp = Number(((moduleCount * currentModule.powerWatts) / 1000).toFixed(2));
  // Santarém average solar yield: ~135 kWh per month per kWp
  const estimatedMonthlyKwh = Math.round(totalKwp * 135);
  // Estimated monthly bill savings in Santarém (~R$ 0,95 / kWh)
  const estimatedMonthlySavings = Math.round(estimatedMonthlyKwh * 0.95);
  // Estimated roof area required (~2.6 m² per 580W panel)
  const estimatedRoofArea = Math.ceil(moduleCount * 2.6);

  // CC/CA ratio
  const ccCaRatio = inverterKw > 0 ? Number((totalKwp / inverterKw).toFixed(2)) : 1.2;

  // Estimated price calculation
  const baseModulePrice = totalKwp * 1650; // R$ / kWp approx module cost
  const baseInverterPrice = inverterKw * 1400; // R$ / kW CA approx inverter cost
  const structurePrice = moduleCount * 120; // R$ per module structure
  const protectionPrice = includeStringBox ? 1100 : 0;
  const batteryPrice = includeBattery ? 12500 : 0;
  const estimatedTotalValue = Math.round(baseModulePrice + baseInverterPrice + structurePrice + protectionPrice + batteryPrice + 1800);
  const estimatedFinancedParcel = Math.round((estimatedTotalValue * 1.35) / 60);

  const handleSendWhatsApp = () => {
    const text = `*SOLICITAÇÃO DE KIT PERSONALIZADO FOTUS - SOLAR RADIANTE SANTARÉM*\n\n` +
      `*Módulos:* ${moduleCount}x ${currentModule.model} (${currentModule.brand})\n` +
      `*Potência Total CC:* ${totalKwp} kWp\n` +
      `*Inversor:* ${currentInverter.model} (${inverterKw} kW CA)\n` +
      `*Sobredimensionamento CC/CA:* ${ccCaRatio}x\n` +
      `*Estrutura:* ${currentStructure.type}\n` +
      `*Proteção Stringbox CC/CA:* ${includeStringBox ? 'Sim (Incluso)' : 'Não'}\n` +
      `*Bateria de Lítio:* ${includeBattery ? 'Sim (Unipower 5.12 kWh)' : 'Não'}\n\n` +
      `*Geração Estimada para Santarém:* ~${estimatedMonthlyKwh} kWh/mês\n` +
      `*Economia Estimada:* ~R$ ${estimatedMonthlySavings},00/mês\n` +
      `*Área de Telhado:* ~${estimatedRoofArea} m²\n\n` +
      `Gostaria de receber uma proposta formal com vistoria técnica e homologação na Equatorial Pará!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/5593991211156?text=${encoded}`, '_blank');
  };

  const handleRequestQuoteModal = () => {
    const kitSummary = `Kit Personalizado Fotus (${totalKwp} kWp / ${inverterKw} kW CA)`;
    const notes = `Configuração de Kit Fotus Personalizado:\n` +
      `• Módulos: ${moduleCount}x ${currentModule.model} (${totalKwp} kWp)\n` +
      `• Inversor: ${currentInverter.model} (${inverterKw} kW CA)\n` +
      `• Estrutura: ${currentStructure.type}\n` +
      `• Proteção: ${includeStringBox ? 'Stringbox CC/CA Fotus' : 'Sem Stringbox'}\n` +
      `• Bateria: ${includeBattery ? 'Bateria Lítio LiFePO4 5.12 kWh' : 'Sem Bateria'}\n` +
      `• Geração Estimada para Santarém: ~${estimatedMonthlyKwh} kWh/mês\n` +
      `• Economia Mensal Estimada: R$ ${estimatedMonthlySavings},00/mês`;

    onOpenQuoteModalWithKit(kitSummary, notes);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sliding Drawer Panel from the LEFT */}
      <aside
        aria-label="Painel Monte Seu Kit Fotus"
        className={`fixed top-0 left-0 bottom-0 z-50 w-full sm:w-[540px] md:w-[600px] bg-slate-950 border-r border-amber-500/40 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Parceiro Fotus
                </span>
                <span className="text-xs text-slate-400 font-semibold">Santarém / PA</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Monte Seu Kit Solar
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700"
            title="Fechar Painel Deslizante"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-8 custom-scrollbar">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-br from-amber-500/10 via-blue-500/10 to-slate-900 p-4 rounded-2xl border border-amber-500/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-amber-300">Configurador Inteligente Fotus</p>
              <p className="text-slate-300 leading-relaxed">
                Monte seu sistema fotovoltaico sob medida com módulos N-Type, inversores de alta eficiência e estruturas homologadas.
              </p>
            </div>
          </div>

          {/* STEP 1: MODULES */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-white text-sm sm:text-base">Módulos Fotovoltaicos (Painéis)</h3>
              </div>
              <span className="text-xs text-amber-400 font-extrabold">{totalKwp} kWp Total</span>
            </div>

            {/* Select Module Model */}
            <div className="grid grid-cols-1 gap-2.5">
              {FOTUS_MODULES.map((mod) => {
                const isSelected = selectedModuleId === mod.id;
                return (
                  <div
                    key={mod.id}
                    onClick={() => setSelectedModuleId(mod.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-slate-900 border-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{mod.model}</span>
                        {mod.badge && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            {mod.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {mod.brand} • Eficiência {mod.efficiency} • Garantia {mod.warrantyYears} Anos
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                        {mod.powerWatts}W
                      </span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-700'}`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quantity Slider */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Quantidade de Painéis:</span>
                <span className="text-base font-black text-amber-400">{moduleCount} Módulos ({totalKwp} kWp)</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setModuleCount(Math.max(2, moduleCount - 1))}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-black text-lg flex items-center justify-center border border-slate-700 active:scale-95 transition-all"
                >
                  -
                </button>

                <input
                  type="range"
                  min="2"
                  max="120"
                  step="1"
                  value={moduleCount}
                  onChange={(e) => setModuleCount(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
                />

                <button
                  type="button"
                  onClick={() => setModuleCount(Math.min(120, moduleCount + 1))}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-black text-lg flex items-center justify-center border border-slate-700 active:scale-95 transition-all"
                >
                  +
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                Dica: Para gerar ~{estimatedMonthlyKwh} kWh/mês em Santarém, recomendamos {moduleCount} painéis de {currentModule.powerWatts}W.
              </p>
            </div>
          </div>

          {/* STEP 2: INVERTER */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-white text-sm sm:text-base">Inversor / Microinversor (CA)</h3>
              </div>
              <span className="text-xs text-emerald-400 font-extrabold">{inverterKw} kW CA</span>
            </div>

            {/* Inverter Types */}
            <div className="grid grid-cols-1 gap-2.5">
              {FOTUS_INVERTERS.map((inv) => {
                const isSelected = selectedInverterId === inv.id;
                return (
                  <div
                    key={inv.id}
                    onClick={() => {
                      setSelectedInverterId(inv.id);
                      if (inv.type === 'Microinversor') {
                        setInverterKw(2.25);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-400 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{inv.model}</span>
                        {inv.badge && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {inv.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {inv.brand} • Garantia {inv.warrantyYears} Anos • App {inv.monitoringApp}
                      </p>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-emerald-400 bg-emerald-400 text-slate-950' : 'border-slate-700'}`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inverter Power Selector */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Potência Nominal do Inversor:</span>
                <span className="text-sm font-bold text-emerald-400">{inverterKw} kW CA</span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {[3.0, 4.0, 5.0, 6.0, 8.0, 10.0, 12.0, 15.0, 20.0, 30.0, 50.0, 75.0].map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => setInverterKw(kw)}
                    className={`py-2 rounded-xl text-xs font-extrabold transition-all border ${
                      inverterKw === kw
                        ? 'bg-emerald-400 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {kw}kW
                  </button>
                ))}
              </div>

              {/* CC/CA Overloading Check */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                <span className="text-slate-400">Relação Painel/Inversor (CC/CA):</span>
                <span className={`font-mono font-bold ${ccCaRatio >= 1.1 && ccCaRatio <= 1.35 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {ccCaRatio}x ({Math.round(ccCaRatio * 100)}%)
                </span>
              </div>
            </div>
          </div>

          {/* STEP 3: STRUCTURE */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-400 text-slate-950 font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-white text-sm sm:text-base">Estrutura de Fixação Fotus</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FOTUS_STRUCTURES.map((struct) => {
                const isSelected = selectedStructureId === struct.id;
                return (
                  <div
                    key={struct.id}
                    onClick={() => setSelectedStructureId(struct.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                      isSelected
                        ? 'bg-slate-900 border-blue-400 shadow-md shadow-blue-500/10'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{struct.type}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-blue-400 bg-blue-400 text-slate-950' : 'border-slate-700'}`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {struct.material}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 4: ACCESSORIES & BATTERY */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-400 text-slate-950 font-black text-xs flex items-center justify-center">
                  4
                </span>
                <h3 className="font-bold text-white text-sm sm:text-base">Proteções e Baterias</h3>
              </div>
            </div>

            <div className="space-y-2.5">
              {/* Stringbox Toggle */}
              <label className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-all">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    String Box CC 1000V + Proteção CA
                  </span>
                  <p className="text-[11px] text-slate-400">DPS Classe II + Disjuntores Curva C + Caixa IP65 Vencedora</p>
                </div>
                <input
                  type="checkbox"
                  checked={includeStringBox}
                  onChange={(e) => setIncludeStringBox(e.target.checked)}
                  className="w-5 h-5 accent-emerald-400 rounded cursor-pointer"
                />
              </label>

              {/* Battery Toggle */}
              <label className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-all">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Battery className="w-4 h-4 text-amber-400" />
                    Bateria de Lítio LiFePO4 Unipower 5.12 kWh
                  </span>
                  <p className="text-[11px] text-slate-400">Nobreak Solar para Autonomia de Luz durante Apagões</p>
                </div>
                <input
                  type="checkbox"
                  checked={includeBattery}
                  onChange={(e) => setIncludeBattery(e.target.checked)}
                  className="w-5 h-5 accent-amber-400 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* LIVE SUMMARY BOX */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-3xl border border-amber-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                Resumo do Kit Fotus
              </span>
              <span className="text-xs text-slate-400 font-mono">Santarém - PA</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-[11px]">Potência dos Módulos</p>
                <p className="text-lg font-black text-amber-400">{totalKwp} kWp</p>
                <p className="text-[10px] text-slate-500">{moduleCount}x {currentModule.powerWatts}W</p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-[11px]">Inversor Nominal</p>
                <p className="text-lg font-black text-emerald-400">{inverterKw} kW CA</p>
                <p className="text-[10px] text-slate-500">{currentInverter.brand}</p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-[11px]">Geração Estimada</p>
                <p className="text-lg font-black text-emerald-400">~{estimatedMonthlyKwh} kWh/mês</p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-[11px]">Área de Telhado</p>
                <p className="text-lg font-black text-slate-200">~{estimatedRoofArea} m²</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">Economia Estimada em Conta:</span>
              <span className="font-black text-emerald-400 text-sm">~R$ {estimatedMonthlySavings},00/mês</span>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Kit no WhatsApp Solar Radiante</span>
              </button>

              <button
                type="button"
                onClick={handleRequestQuoteModal}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Solicitar Proposta Formal &amp; Vistoria</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </aside>
    </>
  );
};

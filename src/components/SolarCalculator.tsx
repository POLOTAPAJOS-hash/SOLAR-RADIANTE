import React, { useState, useMemo } from 'react';
import { Calculator, Sun, DollarSign, Calendar, Zap, PieChart, ShieldCheck, TreePine, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { calculateSolarSystem } from '../utils/solarCalculatorUtils';

interface SolarCalculatorProps {
  onOpenQuoteModalWithData: (billAmount: number, calculationSummary: string) => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({ onOpenQuoteModalWithData }) => {
  const [billAmount, setBillAmount] = useState<number>(1200);
  const [connectionType, setConnectionType] = useState<'monofasico' | 'bifasico' | 'trifasico'>('bifasico');
  const [selectedState, setSelectedState] = useState<string>('SP');
  const [propertyType, setPropertyType] = useState<string>('Residencial');

  // Recalculate results dynamically
  const results = useMemo(() => {
    return calculateSolarSystem(billAmount, selectedState, connectionType);
  }, [billAmount, selectedState, connectionType]);

  const handleRequestQuote = () => {
    const summaryText = `Simulação Solar Radiante:\n- Conta Atual: R$ ${billAmount.toLocaleString('pt-BR')}\n- Tipo: ${propertyType} (${connectionType})\n- Estado: ${selectedState}\n- Potência Estimada: ${results.systemPowerKwp} kWp (${results.estimatedPanels} painéis)\n- Economia Mensal Estimada: R$ ${results.monthlySavings.toLocaleString('pt-BR')}\n- Payback Estimado: ${results.paybackYears} anos`;
    
    onOpenQuoteModalWithData(billAmount, summaryText);
  };

  const brazilianStates = [
    { code: 'SP', name: 'São Paulo' },
    { code: 'MG', name: 'Minas Gerais' },
    { code: 'RJ', name: 'Rio de Janeiro' },
    { code: 'PR', name: 'Paraná' },
    { code: 'SC', name: 'Santa Catarina' },
    { code: 'RS', name: 'Rio Grande do Sul' },
    { code: 'GO', name: 'Goiás' },
    { code: 'DF', name: 'Distrito Federal' },
    { code: 'MS', name: 'Mato Grosso do Sul' },
    { code: 'MT', name: 'Mato Grosso' },
    { code: 'BA', name: 'Bahia' },
    { code: 'PE', name: 'Pernambuco' },
    { code: 'CE', name: 'Ceará' },
    { code: 'ES', name: 'Espírito Santo' },
  ];

  return (
    <section id="calculadora" className="py-20 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Calculator className="w-4 h-4" />
            <span>Simulador de Economia em Tempo Real</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Descubra Quanto Você Vai Economizar Com <span className="text-amber-400">Energia Solar</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Ajuste o valor da sua conta de luz atual e veja instantaneamente o tamanho do sistema fotovoltaico recomendado, prazo de retorno (Payback) e o ganho em 25 anos.
          </p>
        </div>

        {/* Main Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (5 cols on lg) */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sun className="w-5 h-5 text-amber-400" />
              <span>Dados da Sua Conta Atual</span>
            </h3>

            {/* Slider & Input for Bill Amount */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300">Valor Médio da Conta Mensal (R$)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400">R$</span>
                  <input
                    type="number"
                    min={200}
                    max={100000}
                    step={50}
                    value={billAmount}
                    onChange={(e) => setBillAmount(Math.max(100, Number(e.target.value)))}
                    className="w-36 pl-8 pr-3 py-1.5 text-right font-extrabold text-amber-300 bg-slate-900 border border-amber-500/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  />
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={200}
                max={25000}
                step={50}
                value={billAmount}
                onChange={(e) => setBillAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              {/* Quick Select Preset Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[300, 750, 1500, 3000, 6000, 12000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setBillAmount(preset)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all ${
                      billAmount === preset
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    R$ {preset.toLocaleString('pt-BR')}
                  </button>
                ))}
              </div>
            </div>

            {/* Connection Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Tipo de Padrão de Conexão</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'monofasico', label: 'Monofásico' },
                  { id: 'bifasico', label: 'Bifásico' },
                  { id: 'trifasico', label: 'Trifásico' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setConnectionType(type.id as any)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      connectionType === type.id
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* State UF Select */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Estado (UF)</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  {brazilianStates.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.name} ({st.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Tipo de Imóvel</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="Residencial">Residencial</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Agronegócio">Agronegócio / Rural</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleRequestQuote}
                className="w-full flex items-center justify-center gap-2 py-4 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-2xl shadow-lg shadow-amber-500/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Receber Proposta com Estes Dados</span>
              </button>
            </div>

          </div>

          {/* Results Summary Display (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Key Result Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Monthly Savings */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 to-slate-900 border border-emerald-500/30 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" /> Economia Mensal Estimada
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  R$ {results.monthlySavings.toLocaleString('pt-BR')}
                  <span className="text-xs font-medium text-emerald-400 ml-1">/mês</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Você economiza R$ {results.annualSavings.toLocaleString('pt-BR')} por ano diretamente no seu bolso.
                </p>
              </div>

              {/* 25-Year Savings */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 to-slate-900 border border-amber-500/30 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Economia em 25 Anos
                </div>
                <div className="text-3xl sm:text-4xl font-black text-amber-300">
                  R$ {results.twentyFiveYearSavings.toLocaleString('pt-BR')}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Considerando reajuste anual histórico das tarifas de energia elétrica.
                </p>
              </div>

            </div>

            {/* Technical Dimensioning Grid */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
              
              <h4 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-3 flex items-center justify-between">
                <span>Dimensionamento Técnico do Sistema</span>
                <span className="text-xs font-semibold text-amber-400">N-Type 570W TOPCon</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-400 font-medium">Potência Total</div>
                  <div className="text-lg font-black text-white">{results.systemPowerKwp} kWp</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <Layers className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-400 font-medium">Nº de Painéis</div>
                  <div className="text-lg font-black text-white">{results.estimatedPanels} Placas</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <PieChart className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-400 font-medium">Área Necessária</div>
                  <div className="text-lg font-black text-white">~ {results.requiredAreaM2} m²</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <Calendar className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-400 font-medium">Payback Estimado</div>
                  <div className="text-lg font-black text-emerald-400">{results.paybackYears} Anos</div>
                </div>

              </div>

              {/* Investment Comparison Bar */}
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Investimento Chave na Mão (Turnkey) Estimado:</span>
                  <span className="text-amber-300 font-bold text-sm">~ R$ {results.estimatedInvestment.toLocaleString('pt-BR')}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Inclui engenharia, equipamentos Tier-1, instalação, frete, seguro e 100% do processo de homologação na concessionária. Possibilidade de financiamento solar com parcelas que se pagam com a própria economia.
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300">
                <TreePine className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white">Sustentabilidade:</span> Seu sistema evitará a emissão de{' '}
                  <strong className="text-emerald-300">{results.co2SavedTonsYear} toneladas de CO₂</strong> por ano, o equivalente ao plantio de{' '}
                  <strong className="text-emerald-300">{results.treesPlantedEquivalent} árvores</strong> anualmente.
                </div>
              </div>

            </div>

            {/* Bottom Action CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/30">
              <div>
                <h4 className="text-sm font-bold text-white">Gostou da simulação?</h4>
                <p className="text-xs text-slate-300">Solicite uma visita técnica ou projeto executivo gratuito sem compromisso.</p>
              </div>
              <button
                onClick={handleRequestQuote}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Solicitar Proposta Completa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

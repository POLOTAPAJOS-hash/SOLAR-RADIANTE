import React, { useState, useMemo } from 'react';
import { Droplets, Sun, Gauge, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { calculateSolarPumping } from '../utils/solarCalculatorUtils';

interface PumpingSimulatorProps {
  onOpenQuoteModalWithService: (serviceName: string, notes: string) => void;
}

export const PumpingSimulator: React.FC<PumpingSimulatorProps> = ({ onOpenQuoteModalWithService }) => {
  const [dailyLiters, setDailyLiters] = useState<number>(15000);
  const [wellDepthMeters, setWellDepthMeters] = useState<number>(60);
  const [distanceMeters, setDistanceMeters] = useState<number>(100);

  const pumpingResult = useMemo(() => {
    return calculateSolarPumping(dailyLiters, wellDepthMeters, distanceMeters);
  }, [dailyLiters, wellDepthMeters, distanceMeters]);

  const handleRequestPumpingQuote = () => {
    const notes = `Simulação de Bombeamento Solar:\n- Volume Diário: ${dailyLiters.toLocaleString('pt-BR')} Litros/dia\n- Profundidade do Poço: ${wellDepthMeters} metros\n- Distância até Reservatório: ${distanceMeters} metros\n- Potência Recomendada: ${pumpingResult.recommendedPowerHp} HP\n- Painéis Estimados: ${pumpingResult.estimatedPanels} placas\n- Vazão Média: ~${pumpingResult.flowRateLitersPerHour.toLocaleString('pt-BR')} L/hora`;
    onOpenQuoteModalWithService('Bombeamento Solar para Chácaras & Sítios', notes);
  };

  return (
    <section id="bombeamento" className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-bold">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span>Solução Especializada para Zonas Rurais em Santarém &amp; Região</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Bombeamento Solar Direct para <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">Chácaras, Sítios &amp; Fazendas</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
            Água em abundância do nascer ao pôr do sol em poços artesianos, rios e reservatórios no Oeste do Pará. 100% de autonomia sem depender da rede elétrica ou geradores a diesel.
          </p>
        </div>

        {/* Grid Simulator & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls (6 cols) */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <h3 className="text-lg font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-blue-400" />
                <span>Simulador de Bomba Solar</span>
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                Zero Gastos Mensais
              </span>
            </h3>

            {/* Volume in Liters */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-300">Necessidade de Água Diária (Litros/dia)</label>
                <span className="font-bold text-blue-400 text-sm">{dailyLiters.toLocaleString('pt-BR')} L/dia</span>
              </div>
              <input
                type="range"
                min={2000}
                max={100000}
                step={1000}
                value={dailyLiters}
                onChange={(e) => setDailyLiters(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>2.000 L (Uso residencial)</span>
                <span>20.000 L (Gado/Piscina)</span>
                <span>100.000 L (Irrigação)</span>
              </div>
            </div>

            {/* Well Depth */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-300">Profundidade do Poço / Elevação (Metros)</label>
                <span className="font-bold text-amber-400 text-sm">{wellDepthMeters} metros</span>
              </div>
              <input
                type="range"
                min={10}
                max={200}
                step={5}
                value={wellDepthMeters}
                onChange={(e) => setWellDepthMeters(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Distance to reservoir */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-300">Distância Horizontal até a Caixa/Reservatório (Metros)</label>
                <span className="font-bold text-slate-200 text-sm">{distanceMeters} metros</span>
              </div>
              <input
                type="range"
                min={10}
                max={500}
                step={10}
                value={distanceMeters}
                onChange={(e) => setDistanceMeters(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
            </div>

            {/* Fast presets for Chácara / Sitio / Fazenda */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-semibold">Exemplos Práticos:</span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => { setDailyLiters(5000); setWellDepthMeters(30); setDistanceMeters(30); }}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-slate-300 text-left"
                >
                  <div className="font-bold text-white">Chácara Pequena</div>
                  <div className="text-[10px] text-slate-400">5.000 L/dia • 30m</div>
                </button>
                <button
                  onClick={() => { setDailyLiters(25000); setWellDepthMeters(80); setDistanceMeters(100); }}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-slate-300 text-left"
                >
                  <div className="font-bold text-white">Sítio com Gado</div>
                  <div className="text-[10px] text-slate-400">25.000 L/dia • 80m</div>
                </button>
                <button
                  onClick={() => { setDailyLiters(60000); setWellDepthMeters(120); setDistanceMeters(200); }}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 text-slate-300 text-left"
                >
                  <div className="font-bold text-white">Fazenda / Irrigação</div>
                  <div className="text-[10px] text-slate-400">60.000 L/dia • 120m</div>
                </button>
              </div>
            </div>

          </div>

          {/* Result Card Display (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-blue-500/30 space-y-6 shadow-2xl relative">
              <div className="absolute top-4 right-4 p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Sun className="w-6 h-6 animate-pulse" />
              </div>

              <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Dimensionamento Recomendado
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs text-slate-400">Potência da Bomba Solar</span>
                  <div className="text-2xl font-black text-white mt-1">
                    {pumpingResult.recommendedPowerHp} HP
                  </div>
                  <span className="text-[11px] text-blue-400 font-semibold">Motor Solar DC/AC Especial</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs text-slate-400">Painéis Finais Estimados</span>
                  <div className="text-2xl font-black text-amber-400 mt-1">
                    {pumpingResult.estimatedPanels} Placas
                  </div>
                  <span className="text-[11px] text-slate-400">Painéis de 570W TOPCon</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Vazão Média Estimada (Horas de Sol):</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    ~ {pumpingResult.flowRateLitersPerHour.toLocaleString('pt-BR')} Litros/Hora
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-400 to-emerald-400 h-full w-[75%]" />
                </div>
                <p className="text-[11px] text-slate-400">
                  ☀️ A bomba inicia automaticamente no raio do amanhecer e desliga no pôr do sol sem intervenção humana.
                </p>
              </div>

              {/* Advantages List */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sem custo com extensões de rede elétrica de alta tensão</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Elimina compras constantes de combustível diesel para geradores</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Boia de nível automática para desligamento ao encher o reservatório</span>
                </div>
              </div>

              <button
                onClick={handleRequestPumpingQuote}
                className="w-full py-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-blue-400 via-amber-400 to-amber-500 hover:opacity-95 rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Solicitar Cotação de Kit de Bombeamento Solar</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

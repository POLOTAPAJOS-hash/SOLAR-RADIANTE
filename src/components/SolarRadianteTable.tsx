import React, { useState, useEffect } from 'react';
import {
  Sun,
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  RefreshCw,
  Search,
  CheckCircle2,
  Lock,
  Unlock,
  Building2,
  Mail,
  MapPin,
  Phone,
  Instagram,
  FileSpreadsheet,
  Download,
  Calculator,
  ArrowRight,
  TrendingUp,
  Percent,
  Sparkles,
  Zap
} from 'lucide-react';
import {
  SolarRadianteKit,
  DEFAULT_SOLAR_RADIANTE_KITS,
  getStoredSolarRadianteKits,
  saveSolarRadianteKits,
  transformKwpToKw
} from '../data/fotusData';

interface SolarRadianteTableProps {
  onOpenQuoteModalWithKit: (kitSummary: string, notes?: string) => void;
}

export const SolarRadianteTable: React.FC<SolarRadianteTableProps> = ({
  onOpenQuoteModalWithKit
}) => {
  // State for Kits List
  const [kits, setKits] = useState<SolarRadianteKit[]>([]);
  const [activeTab, setActiveTab] = useState<'catalog' | 'admin'>('catalog');
  
  // Admin authentication state (simple toggle or pin for smooth user experience)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(true);
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPowerFilter, setSelectedPowerFilter] = useState<string>('Todos');

  // Form State for Creating / Editing Kit
  const [editingKitId, setEditingKitId] = useState<string | null>(null);
  const [formKwhMes, setFormKwhMes] = useState<number>(600);
  const [formQtdModulos, setFormQtdModulos] = useState<number>(7);
  const [formPotenciaModulo, setFormPotenciaModulo] = useState<number>(700);
  const [formInversor, setFormInversor] = useState<string>('3 KW');
  const [formValorAVista, setFormValorAVista] = useState<number>(12500);
  const [formBadge, setFormBadge] = useState<string>('');

  // Auto-calculated fields state (overridable)
  const [formKwp, setFormKwp] = useState<number>(4.90);
  const [formGeracao, setFormGeracao] = useState<number>(625);
  const [formFinanciado, setFormFinanciado] = useState<number>(465.00);
  const [formCartao, setFormCartao] = useState<number>(1188.00);

  // Price adjustment factor state for batch update
  const [batchPercent, setBatchPercent] = useState<number>(0);
  const [showBatchModal, setShowBatchModal] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Load kits from localStorage on mount
  useEffect(() => {
    const loaded = getStoredSolarRadianteKits();
    setKits(loaded);
  }, []);

  // Show status notification toast
  const showToast = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // Auto-calculate kWp, Geração, Financiado & Cartão whenever modules/power/price change in form
  useEffect(() => {
    const calculatedKwp = Number(((formQtdModulos * formPotenciaModulo) / 1000).toFixed(2));
    setFormKwp(calculatedKwp);

    // Estimated generation for Santarém/PA (~127.5 kWh/kWp/month)
    const calculatedGeracao = Math.round(calculatedKwp * 127.5);
    setFormGeracao(calculatedGeracao);

    // Financiado parcel estimate (36x ~3.8% or 48x)
    const calculatedFinanciado = Number(((formValorAVista * 1.35) / 36).toFixed(2));
    setFormFinanciado(calculatedFinanciado);

    // Cartão parcel estimate (12x with tax rate ~14%)
    const calculatedCartao = Number(((formValorAVista * 1.14) / 12).toFixed(2));
    setFormCartao(calculatedCartao);
  }, [formQtdModulos, formPotenciaModulo, formValorAVista]);

  // Handle Save / Add Kit
  const handleSaveKit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formQtdModulos <= 0 || formValorAVista <= 0) {
      alert('Por favor preencha valores válidos para quantidade de módulos e valor à vista.');
      return;
    }

    let updatedList: SolarRadianteKit[];

    if (editingKitId) {
      // Edit existing kit
      updatedList = kits.map((k) => {
        if (k.id === editingKitId) {
          return {
            ...k,
            kwhMes: formKwhMes,
            geracaoEstimada: formGeracao,
            kwp: formKwp,
            qtdModulos: formQtdModulos,
            potenciaModuloWatts: formPotenciaModulo,
            inversor: formInversor,
            valorAVista: formValorAVista,
            valorFinanciado: formFinanciado,
            valorCartao: formCartao,
            badge: formBadge.trim() ? formBadge : undefined
          };
        }
        return k;
      });
      showToast(`Kit ${formKwp} kWp atualizado com sucesso!`);
    } else {
      // Create new kit
      const newKit: SolarRadianteKit = {
        id: `sr-custom-${Date.now()}`,
        kwhMes: formKwhMes,
        geracaoEstimada: formGeracao,
        kwp: formKwp,
        qtdModulos: formQtdModulos,
        potenciaModuloWatts: formPotenciaModulo,
        inversor: formInversor,
        valorAVista: formValorAVista,
        valorFinanciado: formFinanciado,
        valorCartao: formCartao,
        badge: formBadge.trim() ? formBadge : undefined
      };
      updatedList = [newKit, ...kits];
      showToast(`Novo Kit ${formKwp} kWp criado e adicionado à tabela!`);
    }

    // Sort by kWp ascending
    updatedList.sort((a, b) => a.kwp - b.kwp);

    setKits(updatedList);
    saveSolarRadianteKits(updatedList);

    // Reset Form
    resetForm();
  };

  const resetForm = () => {
    setEditingKitId(null);
    setFormKwhMes(600);
    setFormQtdModulos(7);
    setFormPotenciaModulo(700);
    setFormInversor('3 KW');
    setFormValorAVista(12500);
    setFormBadge('');
  };

  // Start Editing
  const handleStartEdit = (kit: SolarRadianteKit) => {
    setEditingKitId(kit.id);
    setFormKwhMes(kit.kwhMes);
    setFormQtdModulos(kit.qtdModulos);
    setFormPotenciaModulo(kit.potenciaModuloWatts || 700);
    setFormInversor(kit.inversor);
    setFormValorAVista(kit.valorAVista);
    setFormKwp(kit.kwp);
    setFormGeracao(kit.geracaoEstimada);
    setFormFinanciado(kit.valorFinanciado);
    setFormCartao(kit.valorCartao);
    setFormBadge(kit.badge || '');

    // Scroll to form smoothly
    window.scrollTo({ top: document.getElementById('admin-kit-form')?.offsetTop || 0, behavior: 'smooth' });
  };

  // Delete Kit
  const handleDeleteKit = (id: string, kwp: number) => {
    if (window.confirm(`Tem certeza que deseja excluir o Kit de ${kwp} kWp da tabela?`)) {
      const updated = kits.filter((k) => k.id !== id);
      setKits(updated);
      saveSolarRadianteKits(updated);
      showToast(`Kit ${kwp} kWp excluído com sucesso.`);
    }
  };

  // Reset to default 31 kits from official table
  const handleResetToDefault = () => {
    if (window.confirm('Deseja restaurar a Tabela Oficial Solar Radiante com os 31 Kits originais? Todas as alterações personalizadas serão redefinidas.')) {
      setKits(DEFAULT_SOLAR_RADIANTE_KITS);
      saveSolarRadianteKits(DEFAULT_SOLAR_RADIANTE_KITS);
      showToast('Tabela de Kits oficial restaurada com sucesso!');
    }
  };

  // Batch Price Adjustment (e.g., +5% or -10%)
  const handleApplyBatchAdjustment = () => {
    if (batchPercent === 0) return;
    const factor = 1 + batchPercent / 100;

    const updated = kits.map((k) => {
      const newVista = Math.round(k.valorAVista * factor);
      const newFinanciado = Number((k.valorFinanciado * factor).toFixed(2));
      const newCartao = Number((k.valorCartao * factor).toFixed(2));
      return {
        ...k,
        valorAVista: newVista,
        valorFinanciado: newFinanciado,
        valorCartao: newCartao
      };
    });

    setKits(updated);
    saveSolarRadianteKits(updated);
    setShowBatchModal(false);
    showToast(`Reajuste de ${batchPercent > 0 ? '+' : ''}${batchPercent}% aplicado em todos os kits!`);
    setBatchPercent(0);
  };

  // Export Table as CSV
  const handleExportCSV = () => {
    const headers = 'KWH Mes,Geracao Estimada (kWh),kWp,Qtd Modulos,Inversor,Valor A Vista (R$),Financiado (R$),Cartao (R$)\n';
    const rows = kits.map(k => 
      `${k.kwhMes},${k.geracaoEstimada},${k.kwp},${k.qtdModulos}x ${k.potenciaModuloWatts}W,"${k.inversor}",${k.valorAVista},${k.valorFinanciado},${k.valorCartao}`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Tabela_Kits_Solar_Radiante_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Tabela exportada em CSV com sucesso!');
  };

  // Format currency helpers
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(val);
  };

  // Filter kits
  const filteredKits = kits.filter((k) => {
    const matchSearch =
      k.kwhMes.toString().includes(searchTerm) ||
      k.kwp.toString().includes(searchTerm) ||
      k.inversor.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedPowerFilter === 'Todos') return matchSearch;
    if (selectedPowerFilter === 'Residencial (Até 10 kWp)') return matchSearch && k.kwp <= 10;
    if (selectedPowerFilter === 'Comercial (10 a 35 kWp)') return matchSearch && k.kwp > 10 && k.kwp <= 35;
    if (selectedPowerFilter === 'Usina / Indústria (> 35 kWp)') return matchSearch && k.kwp > 35;
    return matchSearch;
  });

  // Request quote for specific kit from table
  const handleRequestQuote = (kit: SolarRadianteKit) => {
    const kwCalculated = transformKwpToKw(kit.kwp, 1.20);
    const summary = `Cotação Kit Ongrid Solar Radiante - ${kit.kwp} kWp (~${kwCalculated} kW):\n` +
      `• Consumo Alvo: ~${kit.kwhMes} kWh/mês (Geração Est.: ${kit.geracaoEstimada} kWh/mês)\n` +
      `• Potência Instalada: ${kit.kwp} kWp (${kit.qtdModulos} Módulos de ${kit.potenciaModuloWatts}W)\n` +
      `• Inversor: ${kit.inversor}\n` +
      `• Valor À Vista: ${formatBRL(kit.valorAVista)}\n` +
      `• Parcela Financiado: ${formatBRL(kit.valorFinanciado)} /mês\n` +
      `• Parcela Cartão (12x): ${formatBRL(kit.valorCartao)} /mês`;

    onOpenQuoteModalWithKit(`Kit Solar Ongrid ${kit.kwp} kWp`, summary);
  };

  return (
    <section id="tabela-kits-solares" className="py-20 bg-slate-950 text-slate-100 border-t border-slate-800 relative">
      
      {/* Toast Notification */}
      {statusMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-400 text-slate-950 px-6 py-3.5 rounded-2xl font-black shadow-2xl flex items-center gap-2 border border-amber-300 animate-bounce">
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span>{statusMessage}</span>
        </div>
      )}

      <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header Navigation for Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/90 p-4 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-400/20 text-amber-400 rounded-2xl border border-amber-400/30">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Tabela Oficial de Kits Sistemas Fotovoltaicos Ongrid
              </h2>
              <p className="text-xs text-slate-400">
                Solar Radiante Empreendimentos LTDA • CNPJ: 11.714.619/0001-84
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'catalog'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Tabela de Kits (Cliente)</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Aba do Administrador (Criar &amp; Gerenciar)</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: ADMIN MANAGEMENT MODE ("Aba para Criar e Gerenciar Kits")          */}
        {/* ========================================================================= */}
        {activeTab === 'admin' && (
          <div className="space-y-10 animate-fade-in">
            
            {/* Create / Edit Form Card */}
            <div id="admin-kit-form" className="bg-slate-900 border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-6 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-bl-2xl uppercase tracking-wider">
                {editingKitId ? 'Modo de Edição de Kit' : 'Novo Kit - Criar pelo Administrador'}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-400/20 text-amber-400 rounded-2xl border border-amber-400/30">
                  {editingKitId ? <Edit3 className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">
                    {editingKitId ? 'Editar Kit Existente' : 'Cadastrar Novo Kit Fotovoltaico'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Insira os dados técnicos e o sistema calculará automaticamente o kWp, geração estimada, financiamento e cartão.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveKit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Consumo Alvo kWh Mês */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    KWH Mês (Consumo Ref.)
                  </label>
                  <input
                    type="number"
                    required
                    min="50"
                    step="10"
                    value={formKwhMes}
                    onChange={(e) => setFormKwhMes(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-base font-bold outline-none focus:border-amber-400 transition-colors"
                    placeholder="Ex: 600"
                  />
                  <span className="text-[11px] text-slate-400">Necessidade mensal do cliente em kWh</span>
                </div>

                {/* Qtd Módulos */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Qtd Módulos
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formQtdModulos}
                    onChange={(e) => setFormQtdModulos(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-base font-bold outline-none focus:border-amber-400 transition-colors"
                    placeholder="Ex: 7"
                  />
                  <span className="text-[11px] text-slate-400">Número de placas fotovoltaicas</span>
                </div>

                {/* Potência Módulo (W) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Potência Módulo (Watts)
                  </label>
                  <select
                    value={formPotenciaModulo}
                    onChange={(e) => setFormPotenciaModulo(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-base font-bold outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  >
                    <option value={700}>700W N-Type (Padrão Tabela)</option>
                    <option value={580}>580W TOPCon Fotus</option>
                    <option value={585}>585W Bifacial TOPCon</option>
                    <option value={670}>670W Ultra Power</option>
                    <option value={550}>550W Mono PERC</option>
                  </select>
                  <span className="text-[11px] text-slate-400">Potência individual por módulo</span>
                </div>

                {/* Inversor Especificação */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Inversor (Especificação)
                  </label>
                  <input
                    type="text"
                    required
                    value={formInversor}
                    onChange={(e) => setFormInversor(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-base font-bold outline-none focus:border-amber-400 transition-colors"
                    placeholder="Ex: 3 KW, 2X7.5KW, 37.5KW TRI"
                  />
                  <span className="text-[11px] text-slate-400">Modelo e quantidade dos inversores</span>
                </div>

                {/* Valor Kit À Vista (R$) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Valor Kit À Vista (R$)
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    step="50"
                    value={formValorAVista}
                    onChange={(e) => setFormValorAVista(Number(e.target.value))}
                    className="w-full bg-slate-950 border-2 border-amber-500/50 rounded-xl px-4 py-3 text-amber-300 text-lg font-black outline-none focus:border-amber-400 transition-colors"
                    placeholder="Ex: 12500"
                  />
                  <span className="text-[11px] text-slate-400">Preço promocional ou tabela à vista</span>
                </div>

                {/* kWp Calculado */}
                <div className="space-y-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-400">Potência Total (kWp)</span>
                    <span className="text-amber-400 font-mono">Auto-calculado</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={formKwp}
                    onChange={(e) => setFormKwp(Number(e.target.value))}
                    className="w-full bg-transparent text-xl font-black text-amber-400 outline-none"
                  />
                  <span className="text-[10px] text-slate-500 block">Qtd ({formQtdModulos}) × {formPotenciaModulo}W = {formKwp} kWp</span>
                </div>

                {/* Geração Estimada Calculada */}
                <div className="space-y-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-400">Geração Estimada (kWh)</span>
                    <span className="text-emerald-400 font-mono">Auto-calculado</span>
                  </div>
                  <input
                    type="number"
                    value={formGeracao}
                    onChange={(e) => setFormGeracao(Number(e.target.value))}
                    className="w-full bg-transparent text-xl font-black text-emerald-400 outline-none"
                  />
                  <span className="text-[10px] text-slate-500 block">Média Santarém ~127.5 kWh/kWp</span>
                </div>

                {/* Financiado R$ */}
                <div className="space-y-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-400">Financiado R$ (Parcela)</span>
                    <span className="text-blue-400 font-mono">Auto-calculado</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={formFinanciado}
                    onChange={(e) => setFormFinanciado(Number(e.target.value))}
                    className="w-full bg-transparent text-xl font-black text-blue-400 outline-none"
                  />
                  <span className="text-[10px] text-slate-500 block">Estimativa banco parceiro</span>
                </div>

                {/* Cartão R$ */}
                <div className="space-y-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-400">Cartão R$ (12x)</span>
                    <span className="text-purple-400 font-mono">Auto-calculado</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={formCartao}
                    onChange={(e) => setFormCartao(Number(e.target.value))}
                    className="w-full bg-transparent text-xl font-black text-purple-400 outline-none"
                  />
                  <span className="text-[10px] text-slate-500 block">Parcelamento no cartão de crédito</span>
                </div>

                {/* Badge Destaque Opcional */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Selo Destaque (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm font-semibold outline-none focus:border-amber-400 transition-colors"
                    placeholder="Ex: Oferta Especial, Comercial, Lançamento"
                  />
                  <span className="text-[11px] text-slate-400">Exibido na tabela do cliente</span>
                </div>

                {/* Submit Actions */}
                <div className="sm:col-span-2 lg:col-span-2 flex items-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    {editingKitId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    <span>{editingKitId ? 'Salvar Alterações do Kit' : 'Cadastrar Kit na Tabela'}</span>
                  </button>

                  {editingKitId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase transition-all"
                    >
                      Cancelar
                    </button>
                  )}
                </div>

              </form>
            </div>

            {/* Admin Controls Bar */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-3xl border border-slate-800">
              <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
                <span className="text-xs font-bold text-slate-400 uppercase mr-2">Ferramentas Admin:</span>

                <button
                  onClick={() => setShowBatchModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-extrabold border border-amber-500/30 transition-all flex items-center gap-2"
                >
                  <Percent className="w-4 h-4 text-amber-400" />
                  <span>Reajuste em Lote (%)</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs font-extrabold border border-emerald-500/30 transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Exportar Tabela (CSV)</span>
                </button>

                <button
                  onClick={handleResetToDefault}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-extrabold border border-slate-700 transition-all flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-slate-400" />
                  <span>Restaurar Tabela Oficial (31 Kits)</span>
                </button>
              </div>

              {/* Total Count Badge */}
              <div className="text-xs font-bold text-slate-400 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                Total de Kits Cadastrados: <span className="text-amber-400 text-sm font-black">{kits.length}</span>
              </div>
            </div>

            {/* Batch Price Adjustment Modal */}
            {showBatchModal && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <div className="p-2.5 bg-amber-400/20 text-amber-400 rounded-xl">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-white">Reajuste de Preços em Lote</h4>
                      <p className="text-xs text-slate-400">Aplique um aumento ou desconto percentual em todos os {kits.length} kits simultaneamente.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase">Percentual de Ajuste (%)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.5"
                        value={batchPercent}
                        onChange={(e) => setBatchPercent(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-2xl font-black text-amber-400 outline-none"
                        placeholder="Ex: 5 ou -10"
                      />
                      <span className="text-lg font-bold text-slate-400">%</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Exemplo: Digite <strong>5</strong> para aumentar 5% ou <strong>-10</strong> para dar 10% de desconto.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={handleApplyBatchAdjustment}
                      className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase rounded-xl transition-all"
                    >
                      Aplicar Reajuste em Todos
                    </button>
                    <button
                      onClick={() => setShowBatchModal(false)}
                      className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Admin Interactive Kits Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por kWh, kWp ou inversor..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>

                <span className="text-xs text-slate-400">
                  Exibindo <strong className="text-white">{filteredKits.length}</strong> de {kits.length} kits
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-amber-400 text-slate-950 text-[11px] uppercase tracking-wider font-black">
                      <th className="py-3.5 px-4">KWH Mês</th>
                      <th className="py-3.5 px-4">Geração Estimada</th>
                      <th className="py-3.5 px-4">kWp</th>
                      <th className="py-3.5 px-4">Qtd Módulos</th>
                      <th className="py-3.5 px-4">Inversor</th>
                      <th className="py-3.5 px-4 text-right">Valor Kit A vista R$</th>
                      <th className="py-3.5 px-4 text-right">Financiado R$</th>
                      <th className="py-3.5 px-4 text-right">Cartão R$</th>
                      <th className="py-3.5 px-4 text-center">Ações Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-xs font-semibold">
                    {filteredKits.map((kit, index) => (
                      <tr
                        key={kit.id}
                        className={`hover:bg-slate-800/60 transition-colors ${
                          index % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/40'
                        }`}
                      >
                        <td className="py-3.5 px-4 text-amber-300 font-bold">
                          {kit.kwhMes.toLocaleString('pt-BR')} kWh
                        </td>
                        <td className="py-3.5 px-4 text-emerald-400 font-bold">
                          {kit.geracaoEstimada.toLocaleString('pt-BR')} kWh
                        </td>
                        <td className="py-3.5 px-4 font-black text-amber-400 text-sm">
                          {kit.kwp.toFixed(2)} kWp
                        </td>
                        <td className="py-3.5 px-4 text-slate-200">
                          {kit.qtdModulos}x ({kit.potenciaModuloWatts || 700}W)
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 font-medium">
                          {kit.inversor}
                        </td>
                        <td className="py-3.5 px-4 text-right font-black text-amber-300 text-sm">
                          {formatBRL(kit.valorAVista)}
                        </td>
                        <td className="py-3.5 px-4 text-right text-blue-300 font-bold">
                          {formatBRL(kit.valorFinanciado)}
                        </td>
                        <td className="py-3.5 px-4 text-right text-purple-300 font-bold">
                          {formatBRL(kit.valorCartao)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleStartEdit(kit)}
                              className="p-2 rounded-lg bg-blue-500/15 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 transition-all"
                              title="Editar este kit"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteKit(kit.id, kit.kwp)}
                              className="p-2 rounded-lg bg-red-500/15 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-all"
                              title="Excluir este kit"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CLIENT OFFICIAL TABLE VIEW ("Kits Sistemas Fotovoltaicos Ongrid") */}
        {/* ========================================================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-3xl border border-slate-800">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase mr-1">Filtrar por Categoria:</span>
                {[
                  'Todos',
                  'Residencial (Até 10 kWp)',
                  'Comercial (10 a 35 kWp)',
                  'Usina / Indústria (> 35 kWp)'
                ].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedPowerFilter(filter)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedPowerFilter === filter
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar consumo kWh ou inversor..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

            </div>

            {/* Official Table Header Canvas (Recreating exact styling from image) */}
            <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Image Header replica with Company details */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 text-center border-b border-amber-400/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-500/5 blur-2xl pointer-events-none" />
                
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 mb-1">
                    <Sun className="w-8 h-8" />
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-wider uppercase">
                    Solar Radiante Empreendimentos LTDA
                  </h1>
                  
                  <p className="text-xs font-bold text-slate-300">
                    CNPJ: 11.714.619/0001-84
                  </p>

                  <div className="pt-2">
                    <span className="inline-block px-6 py-2 rounded-full bg-amber-400 text-slate-950 font-black text-sm sm:text-base uppercase tracking-widest shadow-lg">
                      Kits Sistemas Fotovoltaicos Ongrid
                    </span>
                  </div>
                </div>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-amber-400 text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 border-amber-500">
                      <th className="py-4 px-3 border-r border-amber-500/30">KWH Mês</th>
                      <th className="py-4 px-3 border-r border-amber-500/30">Geração Estimada</th>
                      <th className="py-4 px-3 border-r border-amber-500/30">kWp</th>
                      <th className="py-4 px-3 border-r border-amber-500/30">Qtd módulos 700W</th>
                      <th className="py-4 px-3 border-r border-amber-500/30">Inversor</th>
                      <th className="py-4 px-3 border-r border-amber-500/30 bg-amber-300 text-slate-950">Valor Kit A vista R$</th>
                      <th className="py-4 px-3 border-r border-amber-500/30">Financiado R$</th>
                      <th className="py-4 px-3 border-r border-amber-500/30">Cartão R$</th>
                      <th className="py-4 px-3">Solicitar Cotação</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-bold">
                    {filteredKits.map((kit, index) => (
                      <tr
                        key={kit.id}
                        className={`transition-colors hover:bg-amber-400/10 ${
                          index % 2 === 0 ? 'bg-amber-400/5' : 'bg-slate-950/60'
                        }`}
                      >
                        {/* KWH Mês */}
                        <td className="py-3.5 px-3 font-extrabold text-amber-300 border-r border-slate-800/60">
                          {kit.kwhMes.toLocaleString('pt-BR')}
                        </td>

                        {/* Geração Estimada */}
                        <td className="py-3.5 px-3 font-bold text-emerald-400 border-r border-slate-800/60">
                          {kit.geracaoEstimada.toLocaleString('pt-BR')}
                        </td>

                        {/* kWp */}
                        <td className="py-3.5 px-3 font-black text-amber-400 text-base border-r border-slate-800/60">
                          {kit.kwp.toFixed(2)}
                        </td>

                        {/* Qtd Módulos */}
                        <td className="py-3.5 px-3 text-slate-100 font-bold border-r border-slate-800/60">
                          {kit.qtdModulos}
                        </td>

                        {/* Inversor */}
                        <td className="py-3.5 px-3 text-slate-200 border-r border-slate-800/60">
                          {kit.inversor}
                        </td>

                        {/* Valor À Vista */}
                        <td className="py-3.5 px-3 font-black text-amber-300 text-sm bg-amber-400/10 border-r border-slate-800/60">
                          {formatBRL(kit.valorAVista)}
                        </td>

                        {/* Financiado */}
                        <td className="py-3.5 px-3 text-blue-300 font-bold border-r border-slate-800/60">
                          {formatBRL(kit.valorFinanciado)}
                        </td>

                        {/* Cartão */}
                        <td className="py-3.5 px-3 text-purple-300 font-bold border-r border-slate-800/60">
                          {formatBRL(kit.valorCartao)}
                        </td>

                        {/* Action Button */}
                        <td className="py-3.5 px-3">
                          <button
                            onClick={() => handleRequestQuote(kit)}
                            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[11px] uppercase tracking-wider hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-1"
                          >
                            <span>Cotar</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer replicating image footer */}
              <div className="bg-slate-950 p-6 border-t border-slate-800 text-xs text-slate-300 text-center space-y-2">
                <p className="font-bold text-amber-400">
                  Endereço: Alameda vinte e dois, Nº 70, Aeroporto Velho, Santarém-Pá
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-amber-400" />
                    solarradiante@gmail.com
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    Contato: (93) 99121-1156
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    Instagram: @solarradiante
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};

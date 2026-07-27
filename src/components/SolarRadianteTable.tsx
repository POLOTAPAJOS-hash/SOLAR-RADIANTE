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
  Zap,
  Save,
  X,
  Copy,
  Sliders
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

export interface CompanyDetails {
  name: string;
  cnpj: string;
  address: string;
  email: string;
  phone: string;
  instagram: string;
  titleBadge: string;
}

const DEFAULT_COMPANY_DETAILS: CompanyDetails = {
  name: 'Solar Radiante Empreendimentos LTDA',
  cnpj: '11.714.619/0001-84',
  address: 'Alameda vinte e dois, Nº 70, Aeroporto Velho, Santarém-Pá',
  email: 'solarradiante@gmail.com',
  phone: '(93) 99121-1156',
  instagram: '@solarradiante',
  titleBadge: 'Kits Sistemas Fotovoltaicos Ongrid'
};

export const SolarRadianteTable: React.FC<SolarRadianteTableProps> = ({
  onOpenQuoteModalWithKit
}) => {
  // State for Kits List
  const [kits, setKits] = useState<SolarRadianteKit[]>([]);
  const [activeTab, setActiveTab] = useState<'catalog' | 'admin'>('catalog');
  
  // Admin Mode State (Enabled by default for instant editing capability)
  const [isAdminMode, setIsAdminMode] = useState<boolean>(true);

  // Company Details State
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>(() => {
    try {
      const saved = localStorage.getItem('solar_radiante_company_details');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading company details:', e);
    }
    return DEFAULT_COMPANY_DETAILS;
  });
  const [isEditingCompanyHeader, setIsEditingCompanyHeader] = useState<boolean>(false);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPowerFilter, setSelectedPowerFilter] = useState<string>('Todos');

  // Inline Row Editing State
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [inlineKitData, setInlineKitData] = useState<SolarRadianteKit | null>(null);

  // Form State for Creating / Editing Kit in Admin Panel
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

  // Save company details when updated
  const saveCompanyDetails = (details: CompanyDetails) => {
    setCompanyDetails(details);
    try {
      localStorage.setItem('solar_radiante_company_details', JSON.stringify(details));
    } catch (e) {
      console.error('Error saving company details:', e);
    }
  };

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

  // Handle Save / Add Kit in Admin Panel
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

  // Start Inline Row Editing in Main Table
  const handleStartInlineEdit = (kit: SolarRadianteKit) => {
    setInlineEditingId(kit.id);
    setInlineKitData({ ...kit });
  };

  // Save Inline Row Changes
  const handleSaveInlineEdit = () => {
    if (!inlineKitData || !inlineEditingId) return;

    // Recalculate kWp and Generation if modules/power changed
    const kwp = Number(((inlineKitData.qtdModulos * (inlineKitData.potenciaModuloWatts || 700)) / 1000).toFixed(2));
    const geracao = Math.round(kwp * 127.5);

    const updatedKit: SolarRadianteKit = {
      ...inlineKitData,
      kwp,
      geracaoEstimada: inlineKitData.geracaoEstimada || geracao
    };

    const updatedList = kits.map(k => k.id === inlineEditingId ? updatedKit : k);
    setKits(updatedList);
    saveSolarRadianteKits(updatedList);

    setInlineEditingId(null);
    setInlineKitData(null);
    showToast(`Kit ${kwp} kWp salvo diretamente na tabela!`);
  };

  // Cancel Inline Row Editing
  const handleCancelInlineEdit = () => {
    setInlineEditingId(null);
    setInlineKitData(null);
  };

  // Quick Duplicate Row
  const handleDuplicateRow = (kit: SolarRadianteKit) => {
    const duplicated: SolarRadianteKit = {
      ...kit,
      id: `sr-dup-${Date.now()}`,
      kwp: kit.kwp + 0.1,
      badge: 'Cópia Editável'
    };
    const updated = [...kits, duplicated].sort((a, b) => a.kwp - b.kwp);
    setKits(updated);
    saveSolarRadianteKits(updated);
    showToast(`Kit de ${kit.kwp} kWp duplicado com sucesso!`);
  };

  // Start Editing via Admin Form
  const handleStartEdit = (kit: SolarRadianteKit) => {
    setActiveTab('admin');
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
    setTimeout(() => {
      window.scrollTo({ top: document.getElementById('admin-kit-form')?.offsetTop || 0, behavior: 'smooth' });
    }, 100);
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

  // Add Quick Blank Row
  const handleAddQuickRow = () => {
    const lastKit = kits[kits.length - 1];
    const newKwh = (lastKit?.kwhMes || 1000) + 100;
    const newModules = (lastKit?.qtdModulos || 12) + 1;
    const newKwp = Number(((newModules * 700) / 1000).toFixed(2));
    const newVista = (lastKit?.valorAVista || 16000) + 1000;

    const newKit: SolarRadianteKit = {
      id: `sr-quick-${Date.now()}`,
      kwhMes: newKwh,
      geracaoEstimada: Math.round(newKwp * 127.5),
      kwp: newKwp,
      qtdModulos: newModules,
      potenciaModuloWatts: 700,
      inversor: 'Novo Inversor',
      valorAVista: newVista,
      valorFinanciado: Number(((newVista * 1.35) / 36).toFixed(2)),
      valorCartao: Number(((newVista * 1.14) / 12).toFixed(2)),
      badge: 'Novo Kit'
    };

    const updated = [...kits, newKit].sort((a, b) => a.kwp - b.kwp);
    setKits(updated);
    saveSolarRadianteKits(updated);
    handleStartInlineEdit(newKit);
    showToast('Novo kit adicionado! Preencha as células diretamente.');
  };

  // Reset to default 31 kits from official table
  const handleResetToDefault = () => {
    if (window.confirm('Deseja restaurar a Tabela Oficial Solar Radiante com os 31 Kits originais? Todas as alterações personalizadas serão redefinidas.')) {
      setKits(DEFAULT_SOLAR_RADIANTE_KITS);
      saveSolarRadianteKits(DEFAULT_SOLAR_RADIANTE_KITS);
      showToast('Tabela de Kits oficial restaurada com sucesso!');
    }
  };

  // Reset Company Details to Default
  const handleResetCompanyDetails = () => {
    saveCompanyDetails(DEFAULT_COMPANY_DETAILS);
    setIsEditingCompanyHeader(false);
    showToast('Cabeçalho da empresa restaurado ao padrão original!');
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

  // Export Table as CSV with all topics and UTF-8 BOM encoding for Excel
  const handleExportCSV = () => {
    // UTF-8 Byte Order Mark for proper accents in Excel/Sheets
    const BOM = '\uFEFF';
    
    // Column Headers for Kits Sistemas Fotovoltaicos Ongrid
    const headers = [
      'ID do Kit',
      'Consumo Alvo (kWh/mês)',
      'Geração Estimada (kWh/mês)',
      'Potência do Kit (kWp)',
      'Potência Requerida (kW)',
      'Quantidade de Módulos',
      'Potência por Módulo (Watts)',
      'Potência Total dos Módulos (Watts)',
      'Especificação do Inversor',
      'Valor À Vista (R$)',
      'Parcela Financiado (R$/mês)',
      'Parcela Cartão de Crédito 12x (R$/mês)'
    ].join(';') + '\n';

    const rows = kits.map(k => {
      const kwCalculated = transformKwpToKw(k.kwp, 1.20);
      const totalWatts = k.qtdModulos * (k.potenciaModuloWatts || 700);
      
      return [
        `"${k.id}"`,
        k.kwhMes,
        k.geracaoEstimada,
        `"${k.kwp.toFixed(2)}"`,
        `"${kwCalculated}"`,
        k.qtdModulos,
        k.potenciaModuloWatts || 700,
        totalWatts,
        `"${k.inversor.replace(/"/g, '""')}"`,
        k.valorAVista.toFixed(2).replace('.', ','),
        k.valorFinanciado.toFixed(2).replace('.', ','),
        k.valorCartao.toFixed(2).replace('.', ',')
      ].join(';');
    }).join('\n');

    const csvContent = BOM + headers + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Tabela_Kits_Solar_Radiante_Ongrid_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Tabela CSV com todos os ${kits.length} kits e tópicos exportada com sucesso!`);
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
      `• Potência Instalada: ${kit.kwp} kWp (${kit.qtdModulos} Módulos de ${kit.potenciaModuloWatts || 700}W)\n` +
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

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header Navigation for Tabs & Admin Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-slate-900/90 p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-amber-400/20 text-amber-400 rounded-2xl border border-amber-400/30">
              <Sun className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Tabela Oficial de Kits Fotovoltaicos Ongrid
                </h2>
                {isAdminMode && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-black uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin Ativo
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {companyDetails.name} • CNPJ: {companyDetails.cnpj}
              </p>
            </div>
          </div>

          {/* Controls: Admin Privileges & View Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Toggle Admin Mode Button */}
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                showToast(!isAdminMode ? 'Privilégios de Administrador Ativados!' : 'Modo Administrador Desativado.');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all border flex items-center gap-2 shadow-md ${
                isAdminMode
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 border-emerald-400 shadow-emerald-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-amber-500/40'
              }`}
            >
              {isAdminMode ? <Unlock className="w-4 h-4 text-slate-950" /> : <Lock className="w-4 h-4 text-amber-400" />}
              <span>{isAdminMode ? 'Privilégios Admin (ON)' : 'Ativar Modo Admin'}</span>
            </button>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeTab === 'catalog'
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Visão Tabela</span>
              </button>

              <button
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeTab === 'admin'
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-amber-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Painel Criar/Form</span>
              </button>
            </div>

          </div>
        </div>

        {/* Admin Privilege Banner */}
        {isAdminMode && (
          <div className="mb-6 bg-gradient-to-r from-amber-500/20 via-slate-900 to-emerald-500/20 border-2 border-amber-400/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl font-black">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-amber-300">
                  ⚡ MODO DE EDIÇÃO ADMINISTRATIVA ATIVO
                </p>
                <p className="text-xs text-slate-300">
                  Você pode editar qualquer célula diretamente na tabela, alterar os dados do cabeçalho, criar novos kits, reajustar valores em lote e exportar dados.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleAddQuickRow}
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Linha Rápida</span>
              </button>

              <button
                onClick={() => setShowBatchModal(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Percent className="w-4 h-4 text-amber-400" />
                <span>Reajuste em Lote</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>CSV</span>
              </button>

              <button
                onClick={handleResetToDefault}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                title="Restaurar tabela original com 31 kits"
              >
                <RefreshCw className="w-4 h-4 text-slate-400" />
                <span>Reset Tabela</span>
              </button>
            </div>
          </div>
        )}

        {/* Batch Price Adjustment Modal */}
        {showBatchModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
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

        {/* ========================================================================= */}
        {/* TAB 1: CLIENT OFFICIAL TABLE VIEW WITH INLINE ADMIN EDITING               */}
        {/* ========================================================================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-3xl border border-slate-800">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase mr-1">Filtrar Categoria:</span>
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

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Pesquisar consumo kWh, kWp ou inversor..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase flex items-center gap-1.5 shadow-lg shadow-emerald-500/10 transition-all flex-shrink-0"
                  title="Baixar Tabela CSV Completa com Todos os Tópicos"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar CSV</span>
                </button>
              </div>

            </div>

            {/* Official Table Canvas */}
            <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              
              {/* Header Card with Editable Company Info when Admin Mode is ON */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 text-center border-b border-amber-400/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-500/5 blur-2xl pointer-events-none" />
                
                {isAdminMode && (
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    <button
                      onClick={() => setIsEditingCompanyHeader(!isEditingCompanyHeader)}
                      className="px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{isEditingCompanyHeader ? 'Fechar Edição' : 'Editar Cabeçalho'}</span>
                    </button>
                  </div>
                )}

                {/* Editable Company Header Form */}
                {isEditingCompanyHeader && isAdminMode ? (
                  <div className="relative z-10 max-w-3xl mx-auto bg-slate-950/90 p-5 rounded-2xl border border-amber-400/40 text-left space-y-4 my-2">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-black text-amber-400 uppercase">Editar Dados do Cabeçalho da Tabela</span>
                      <button onClick={handleResetCompanyDetails} className="text-[11px] text-slate-400 hover:text-amber-300 underline">Restaurar Padrão</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">Nome da Empresa</label>
                        <input
                          type="text"
                          value={companyDetails.name}
                          onChange={(e) => saveCompanyDetails({ ...companyDetails, name: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">CNPJ</label>
                        <input
                          type="text"
                          value={companyDetails.cnpj}
                          onChange={(e) => saveCompanyDetails({ ...companyDetails, cnpj: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">Título Badge da Tabela</label>
                        <input
                          type="text"
                          value={companyDetails.titleBadge}
                          onChange={(e) => saveCompanyDetails({ ...companyDetails, titleBadge: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">Endereço</label>
                        <input
                          type="text"
                          value={companyDetails.address}
                          onChange={(e) => saveCompanyDetails({ ...companyDetails, address: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">E-mail</label>
                        <input
                          type="text"
                          value={companyDetails.email}
                          onChange={(e) => saveCompanyDetails({ ...companyDetails, email: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">Telefone / Contato</label>
                        <input
                          type="text"
                          value={companyDetails.phone}
                          onChange={(e) => saveCompanyDetails({ ...companyDetails, phone: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-bold"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsEditingCompanyHeader(false);
                        showToast('Dados da empresa salvos!');
                      }}
                      className="w-full py-2 bg-amber-400 text-slate-950 font-black text-xs uppercase rounded-xl"
                    >
                      Salvar Cabeçalho
                    </button>
                  </div>
                ) : (
                  <div className="relative z-10 space-y-2">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 mb-1">
                      <Sun className="w-8 h-8" />
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-wider uppercase">
                      {companyDetails.name}
                    </h1>
                    
                    <p className="text-xs font-bold text-slate-300">
                      CNPJ: {companyDetails.cnpj}
                    </p>

                    <div className="pt-2">
                      <span className="inline-block px-6 py-2 rounded-full bg-amber-400 text-slate-950 font-black text-sm sm:text-base uppercase tracking-widest shadow-lg">
                        {companyDetails.titleBadge}
                      </span>
                    </div>
                  </div>
                )}
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
                      <th className="py-4 px-3">
                        {isAdminMode ? 'Ações de Administrador' : 'Solicitar Cotação'}
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-bold">
                    {filteredKits.map((kit, index) => {
                      const isEditingThisRow = inlineEditingId === kit.id;

                      return (
                        <tr
                          key={kit.id}
                          className={`transition-colors ${
                            isEditingThisRow
                              ? 'bg-amber-500/20 border-2 border-amber-400'
                              : index % 2 === 0
                              ? 'bg-amber-400/5 hover:bg-amber-400/10'
                              : 'bg-slate-950/60 hover:bg-amber-400/10'
                          }`}
                        >
                          {/* KWH Mês */}
                          <td className="py-3 px-2 font-extrabold text-amber-300 border-r border-slate-800/60">
                            {isEditingThisRow && inlineKitData ? (
                              <input
                                type="number"
                                value={inlineKitData.kwhMes}
                                onChange={(e) => setInlineKitData({ ...inlineKitData, kwhMes: Number(e.target.value) })}
                                className="w-20 bg-slate-900 border border-amber-400 text-amber-300 px-2 py-1 rounded text-center font-bold"
                              />
                            ) : (
                              kit.kwhMes.toLocaleString('pt-BR')
                            )}
                          </td>

                          {/* Geração Estimada */}
                          <td className="py-3 px-2 font-bold text-emerald-400 border-r border-slate-800/60">
                            {isEditingThisRow && inlineKitData ? (
                              <input
                                type="number"
                                value={inlineKitData.geracaoEstimada}
                                onChange={(e) => setInlineKitData({ ...inlineKitData, geracaoEstimada: Number(e.target.value) })}
                                className="w-20 bg-slate-900 border border-amber-400 text-emerald-400 px-2 py-1 rounded text-center font-bold"
                              />
                            ) : (
                              kit.geracaoEstimada.toLocaleString('pt-BR')
                            )}
                          </td>

                          {/* kWp */}
                          <td className="py-3 px-2 font-black text-amber-400 text-base border-r border-slate-800/60">
                            {isEditingThisRow && inlineKitData ? (
                              <input
                                type="number"
                                step="0.01"
                                value={inlineKitData.kwp}
                                onChange={(e) => setInlineKitData({ ...inlineKitData, kwp: Number(e.target.value) })}
                                className="w-20 bg-slate-900 border border-amber-400 text-amber-400 px-2 py-1 rounded text-center font-bold"
                              />
                            ) : (
                              kit.kwp.toFixed(2)
                            )}
                          </td>

                          {/* Qtd Módulos */}
                          <td className="py-3 px-2 text-slate-100 font-bold border-r border-slate-800/60">
                            {isEditingThisRow && inlineKitData ? (
                              <input
                                type="number"
                                value={inlineKitData.qtdModulos}
                                onChange={(e) => setInlineKitData({ ...inlineKitData, qtdModulos: Number(e.target.value) })}
                                className="w-16 bg-slate-900 border border-amber-400 text-white px-2 py-1 rounded text-center font-bold"
                              />
                            ) : (
                              kit.qtdModulos
                            )}
                          </td>

                          {/* Inversor */}
                          <td className="py-3 px-2 text-slate-200 border-r border-slate-800/60">
                            {isEditingThisRow && inlineKitData ? (
                              <input
                                type="text"
                                value={inlineKitData.inversor}
                                onChange={(e) => setInlineKitData({ ...inlineKitData, inversor: e.target.value })}
                                className="w-28 bg-slate-900 border border-amber-400 text-white px-2 py-1 rounded text-center font-bold text-xs"
                              />
                            ) : (
                              kit.inversor
                            )}
                          </td>

                          {/* Valor À Vista */}
                          <td className="py-3 px-2 font-black text-amber-300 text-sm bg-amber-400/10 border-r border-slate-800/60">
                            {isEditingThisRow && inlineKitData ? (
                              <input
                                type="number"
                                step="50"
                                value={inlineKitData.valorAVista}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setInlineKitData({
                                    ...inlineKitData,
                                    valorAVista: val,
                                    valorFinanciado: Number(((val * 1.35) / 36).toFixed(2)),
                                    valorCartao: Number(((val * 1.14) / 12).toFixed(2))
                                  });
                                }}
                                className="w-28 bg-slate-900 border border-amber-400 text-amber-300 px-2 py-1 rounded text-center font-bold text-xs"
                              />
                            ) : (
                              formatBRL(kit.valorAVista)
                            )}
                          </td>

                          {/* Financiado */}
                          <td className="py-3 px-2 text-blue-300 font-bold border-r border-slate-800/60">
                            {isEditingThisRow && inlineKitData ? (
                              <input
                                type="number"
                                step="0.01"
                                value={inlineKitData.valorFinanciado}
                                onChange={(e) => setInlineKitData({ ...inlineKitData, valorFinanciado: Number(e.target.value) })}
                                className="w-24 bg-slate-900 border border-amber-400 text-blue-300 px-2 py-1 rounded text-center font-bold text-xs"
                              />
                            ) : (
                              formatBRL(kit.valorFinanciado)
                            )}
                          </td>

                          {/* Cartão */}
                          <td className="py-3 px-2 text-purple-300 font-bold border-r border-slate-800/60">
                            {isEditingThisRow && inlineKitData ? (
                              <input
                                type="number"
                                step="0.01"
                                value={inlineKitData.valorCartao}
                                onChange={(e) => setInlineKitData({ ...inlineKitData, valorCartao: Number(e.target.value) })}
                                className="w-24 bg-slate-900 border border-amber-400 text-purple-300 px-2 py-1 rounded text-center font-bold text-xs"
                              />
                            ) : (
                              formatBRL(kit.valorCartao)
                            )}
                          </td>

                          {/* Action Button / Admin Tools */}
                          <td className="py-3 px-2">
                            {isEditingThisRow ? (
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={handleSaveInlineEdit}
                                  className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow transition-all"
                                  title="Salvar alterações"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={handleCancelInlineEdit}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                                  title="Cancelar"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : isAdminMode ? (
                              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                                <button
                                  onClick={() => handleStartInlineEdit(kit)}
                                  className="p-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/40 text-amber-300 border border-amber-400/30 transition-all"
                                  title="Editar linha diretamente"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDuplicateRow(kit)}
                                  className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 border border-blue-500/30 transition-all"
                                  title="Duplicar linha"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteKit(kit.id, kit.kwp)}
                                  className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30 transition-all"
                                  title="Excluir linha"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleRequestQuote(kit)}
                                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] uppercase font-bold"
                                  title="Testar Cotação"
                                >
                                  Cotar
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleRequestQuote(kit)}
                                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[11px] uppercase tracking-wider hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-1"
                              >
                                <span>Cotar</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer replicating image footer */}
              <div className="bg-slate-950 p-6 border-t border-slate-800 text-xs text-slate-300 text-center space-y-2">
                <p className="font-bold text-amber-400">
                  Endereço: {companyDetails.address}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-amber-400" />
                    {companyDetails.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    Contato: {companyDetails.phone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    Instagram: {companyDetails.instagram}
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ADMIN FORM PANEL ("Criar & Gerenciar Kits Detalhadamente")        */}
        {/* ========================================================================= */}
        {activeTab === 'admin' && (
          <div className="space-y-10 animate-fade-in">
            
            {/* Create / Edit Form Card */}
            <div id="admin-kit-form" className="bg-slate-900 border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-6 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-bl-2xl uppercase tracking-wider">
                {editingKitId ? 'Modo de Edição de Kit' : 'Novo Kit - Formulário Completo'}
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
                              title="Editar este kit no formulário"
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

      </div>
    </section>
  );
};

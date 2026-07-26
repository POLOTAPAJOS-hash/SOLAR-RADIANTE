import React, { useState } from 'react';
import { X, Calculator, Upload, CheckCircle2, MessageSquareText, FileText, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { QuoteFormData } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBillAmount?: number;
  initialService?: string;
  initialNotes?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialBillAmount,
  initialService,
  initialNotes,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    city: 'Santarém',
    state: 'PA',
    propertyType: 'Residencial',
    monthlyBill: initialBillAmount ? String(initialBillAmount) : '1200',
    interestedServices: initialService ? [initialService] : ['Energia Solar Fotovoltaica'],
    notes: initialNotes || '',
    billFile: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, billFile: e.target.files[0] });
    }
  };

  const handleServiceToggle = (serviceName: string) => {
    setFormData((prev) => {
      const exists = prev.interestedServices.includes(serviceName);
      if (exists) {
        return { ...prev, interestedServices: prev.interestedServices.filter((s) => s !== serviceName) };
      } else {
        return { ...prev, interestedServices: [...prev.interestedServices, serviceName] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedTicket = 'SOLAR-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(generatedTicket);
    setSubmitted(true);
  };

  const handleOpenWhatsApp = () => {
    const text = `*SOLICITAÇÃO DE ORÇAMENTO - SOLAR RADIANTE*\n` +
      `*Protocolo:* ${ticketId || 'SOLAR-ONLINE'}\n` +
      `*Nome:* ${formData.fullName}\n` +
      `*Telefone:* ${formData.phone}\n` +
      `*Cidade/UF:* ${formData.city}/${formData.state}\n` +
      `*Tipo:* ${formData.propertyType}\n` +
      `*Conta Média:* R$ ${formData.monthlyBill}\n` +
      `*Serviços:* ${formData.interestedServices.join(', ')}\n` +
      (formData.billFile ? `*Anexo:* Fatura ${formData.billFile.name} selecionada\n` : '') +
      (formData.notes ? `*Observações:* ${formData.notes}` : '');

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/5593991211156?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Header */}
            <div className="space-y-1 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Estudo Técnico Gratuito</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Solicitar Proposta de Engenharia Solar</h3>
              <p className="text-xs text-slate-400">
                Preencha os dados abaixo ou anexe sua conta de luz para receber um estudo de viabilidade sem compromisso.
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: João Silva"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">WhatsApp / Telefone *</label>
                <input
                  type="tel"
                  required
                  placeholder="(93) 99121-1156"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Cidade * (Santarém e Oeste do Pará)</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Santarém"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Santarém', 'Alter do Chão', 'Mojuí dos Campos', 'Itaituba', 'Oriximiná'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFormData({ ...formData, city: c })}
                      className={`px-2 py-0.5 text-[10px] font-medium rounded-md border transition-all ${
                        formData.city === c
                          ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Valor Médio da Conta (R$)</label>
                <input
                  type="number"
                  placeholder="Ex: 1200"
                  value={formData.monthlyBill}
                  onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

            </div>

            {/* Property Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Tipo de Propriedade</label>
              <div className="grid grid-cols-4 gap-2">
                {['Residencial', 'Comercial', 'Agronegócio', 'Industrial'].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setFormData({ ...formData, propertyType: type })}
                    className={`py-2 text-[11px] font-semibold rounded-xl border transition-all ${
                      formData.propertyType === type
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Interested Services Chips */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Serviços de Interesse</label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Energia Solar Fotovoltaica',
                  'Bombeamento Rural p/ Poços',
                  'Subestação de Média/Alta Tensão',
                  'Projeto Elétrico & Laudo CREA',
                  'Limpeza & Manutenção de Usina',
                ].map((s) => {
                  const isSelected = formData.interestedServices.includes(s);
                  return (
                    <button
                      type="button"
                      key={s}
                      onClick={() => handleServiceToggle(s)}
                      className={`px-3 py-1.5 text-[11px] font-medium rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '} {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bill File Upload Simulation */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Anexar Fatura de Energia (Opcional)</span>
                <span className="text-[10px] text-amber-400">PDF, JPG, PNG</span>
              </label>
              <label className="flex flex-col items-center justify-center p-4 bg-slate-950 border-2 border-dashed border-slate-800 hover:border-amber-500/50 rounded-2xl cursor-pointer transition-colors">
                <Upload className="w-5 h-5 text-amber-400 mb-1" />
                <span className="text-xs text-slate-300 font-medium">
                  {formData.billFile ? formData.billFile.name : 'Clique para selecionar foto ou PDF da fatura'}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  Agiliza em até 3x a elaboração do projeto técnico
                </span>
                <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            {/* Notes */}
            {formData.notes && (
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 space-y-1">
                <span className="font-bold text-amber-400">Resumo Técnico da Simulação:</span>
                <p className="text-[11px] whitespace-pre-line text-slate-400">{formData.notes}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:opacity-95 rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Gerar Protocolo e Finalizar Pedido</span>
            </button>

          </form>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Protocolo Gerado: {ticketId}
              </span>
              <h3 className="text-2xl font-bold text-white">Solicitação Recebida com Sucesso!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Nossa equipe de engenharia já recebeu suas informações. Para atendimento prioritário instantâneo, envie os dados direto no nosso WhatsApp abaixo:
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleOpenWhatsApp}
                className="px-6 py-3.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <MessageSquareText className="w-4 h-4" />
                <span>Enviar Dados no WhatsApp da Engenharia</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl"
              >
                Concluir e Fechar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

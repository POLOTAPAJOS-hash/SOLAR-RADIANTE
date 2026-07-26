import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SolarRadianteTable } from './components/SolarRadianteTable';
import { FotusKitBuilder } from './components/FotusKitBuilder';
import { SolarCalculator } from './components/SolarCalculator';
import { PumpingSimulator } from './components/PumpingSimulator';
import { ServicesSection } from './components/ServicesSection';
import { AiConsultant } from './components/AiConsultant';
import { PortfolioSection } from './components/PortfolioSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [initialBillAmount, setInitialBillAmount] = useState<number | undefined>(undefined);
  const [initialService, setInitialService] = useState<string | undefined>(undefined);
  const [initialNotes, setInitialNotes] = useState<string | undefined>(undefined);

  const handleOpenQuoteModal = (
    service?: string,
    billAmount?: number,
    notes?: string
  ) => {
    setInitialService(service);
    setInitialBillAmount(billAmount);
    setInitialNotes(notes);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setInitialBillAmount(undefined);
    setInitialService(undefined);
    setInitialNotes(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Hero Banner Section */}
      <Hero onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Tabela Oficial Solar Radiante + Aba do Administrador */}
      <SolarRadianteTable
        onOpenQuoteModalWithKit={(kitName, summary) =>
          handleOpenQuoteModal(kitName, undefined, summary)
        }
      />

      {/* Interactive Monte Seu Kit Fotus Builder */}
      <FotusKitBuilder
        onOpenQuoteModalWithKit={(serviceName, notes) =>
          handleOpenQuoteModal(serviceName, undefined, notes)
        }
      />

      {/* Solar Savings Calculator */}
      <SolarCalculator
        onOpenQuoteModalWithData={(bill, notes) =>
          handleOpenQuoteModal('Energia Solar Fotovoltaica', bill, notes)
        }
      />

      {/* Solar Pumping Simulator for Chácaras & Sítios */}
      <PumpingSimulator
        onOpenQuoteModalWithService={(serviceTitle, notes) =>
          handleOpenQuoteModal(serviceTitle, undefined, notes)
        }
      />

      {/* Engineering Services Catalog */}
      <ServicesSection
        onOpenQuoteModalWithService={(serviceTitle) =>
          handleOpenQuoteModal(serviceTitle)
        }
      />

      {/* AI Solar Engineer Consultant */}
      <AiConsultant />

      {/* Portfolio / Success Stories */}
      <PortfolioSection
        onOpenQuoteModalWithService={(serviceTitle) =>
          handleOpenQuoteModal(serviceTitle)
        }
      />

      {/* FAQ Accordion */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        initialBillAmount={initialBillAmount}
        initialService={initialService}
        initialNotes={initialNotes}
      />

    </div>
  );
}

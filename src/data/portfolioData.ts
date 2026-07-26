import { PortfolioProject } from '../types';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: 'Usina Solar Agrícola Fazenda Boa Vista',
    category: 'Agronegócio',
    location: 'Ribeirão Preto / SP',
    power: '75.4 kWp',
    savings: 'R$ 8.900 /mês',
    panelsCount: 134,
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    description: 'Instalação de usina solar em solo para alimentação de pivôs de irrigação, secadores de grãos e bombeamento solar direto de poço artesiano.',
    completionYear: '2025'
  },
  {
    id: 'proj-2',
    title: 'Subestação 500kVA & Usina Comercial Metalúrgica',
    category: 'Subestação',
    location: 'Campinas / SP',
    power: '120.8 kWp + 500kVA',
    savings: 'R$ 15.400 /mês',
    panelsCount: 215,
    image: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80',
    description: 'Projeto integrado contemplando nova subestação abrigada de 13.8kV para média tensão e usina solar telhado com microinversores.',
    completionYear: '2025'
  },
  {
    id: 'proj-3',
    title: 'Bombeamento Solar de Alta Profundidade Chácara Recanto',
    category: 'Agronegócio',
    location: 'Bauru / SP',
    power: '12.5 kWp',
    savings: '100% Autonomia Elétrica',
    panelsCount: 22,
    image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
    description: 'Sistema de bombeamento solar direto para poço de 120m de profundidade com vazão diária de 35.000 litros sem uso de baterias.',
    completionYear: '2024'
  },
  {
    id: 'proj-4',
    title: 'Residência Alto Padrão Alphaville',
    category: 'Residencial',
    location: 'Sorocaba / SP',
    power: '14.2 kWp',
    savings: 'R$ 1.650 /mês',
    panelsCount: 25,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    description: 'Projeto residencial integrado ao telhado com aquecimento solar para piscina e geração de energia para ar-condicionado central.',
    completionYear: '2025'
  },
  {
    id: 'proj-5',
    title: 'Supermercado e Centro de Distribuição',
    category: 'Comercial',
    location: 'Piracicaba / SP',
    power: '98.6 kWp',
    savings: 'R$ 11.200 /mês',
    panelsCount: 176,
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80',
    description: 'Instalação de painéis solares em estrutura metálica com reforma total do quadro geral de baixa tensão (QGBT).',
    completionYear: '2024'
  },
  {
    id: 'proj-6',
    title: 'Subestação Aérea e Adequação Industrial',
    category: 'Industrial',
    location: 'Americana / SP',
    power: '300 kVA',
    savings: 'Eliminação de Multa por Reativo',
    panelsCount: 0,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Montagem de subestação em estrutura de poste e instalação de banco de capacitores automático para correção do fator de potência.',
    completionYear: '2025'
  }
];

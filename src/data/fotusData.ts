export interface FotusModule {
  id: string;
  brand: string;
  model: string;
  powerWatts: number;
  technology: 'N-Type TOPCon' | 'Bifacial TOPCon' | 'HJT High Efficiency';
  efficiency: string;
  warrantyYears: number;
  degradationRate: string;
  description: string;
  recommendedFor: string;
  badge?: string;
}

export interface FotusInverter {
  id: string;
  brand: string;
  model: string;
  type: 'String On-Grid' | 'Híbrido (Nobreak/Baterias)' | 'Microinversor' | 'Drive Bombeamento Solar';
  powerKw: number;
  mpptCount: number;
  maxEfficiency: string;
  warrantyYears: number;
  monitoringApp: string;
  description: string;
  recommendedFor: string;
  badge?: string;
}

export interface FotusStructure {
  id: string;
  type: string;
  roofType: string;
  material: string;
  sealingType: string;
  windResistance: string;
  description: string;
}

export interface FotusProtection {
  id: string;
  name: string;
  specs: string;
  includedInStandardKit: boolean;
}

export interface FotusServiceOption {
  id: string;
  title: string;
  description: string;
  badge: string;
  isMandatory?: boolean;
}

export const FOTUS_MODULES: FotusModule[] = [
  {
    id: 'mod-580-topcon',
    brand: 'Canadian Solar / Jinko',
    model: 'N-Type TOPCon 580W',
    powerWatts: 580,
    technology: 'N-Type TOPCon',
    efficiency: '22.5%',
    warrantyYears: 25,
    degradationRate: '0.40%/ano (87.4% em 30 anos)',
    description: 'Módulo de altíssima eficiência com células N-Type de última geração. Excelente desempenho no calor de Santarém com baixo coeficiente de temperatura.',
    recommendedFor: 'Residências, comércios e pequenas indústrias',
    badge: 'Mais Vendido Fotus'
  },
  {
    id: 'mod-585-bifacial',
    brand: 'JA Solar / Astronergy',
    model: 'Bifacial TOPCon Glass-Glass 585W',
    powerWatts: 585,
    technology: 'Bifacial TOPCon',
    efficiency: '22.7%',
    warrantyYears: 30,
    degradationRate: '0.35%/ano (88.8% em 30 anos)',
    description: 'Captura luz direta e refletida pelo solo/telhado (albedo), gerando até +15% de energia adicional. Vidro duplo ultra resistente.',
    recommendedFor: 'Estruturas de Solo, Telhados Claros e Agronegócio',
    badge: 'Geração Extra +15%'
  },
  {
    id: 'mod-670-ultra',
    brand: 'Trina Solar / Risen',
    model: 'Ultra Power N-Type 670W',
    powerWatts: 670,
    technology: 'N-Type TOPCon',
    efficiency: '23.1%',
    warrantyYears: 25,
    degradationRate: '0.40%/ano (87.4% em 25 anos)',
    description: 'Módulo de ultra potência e área ampliada. Otimiza a quantidade de estrutura de fixação e reduz o tempo de instalação em grandes obras.',
    recommendedFor: 'Usinas de Grande Porte, Indústrias e Galpões',
    badge: 'Ultra Potência Comercial'
  }
];

export const FOTUS_INVERTERS: FotusInverter[] = [
  {
    id: 'inv-deye-ongrid',
    brand: 'Deye / Growatt / Solis',
    model: 'Inversor String On-Grid Inteligente (3kW a 75kW)',
    type: 'String On-Grid',
    powerKw: 5,
    mpptCount: 2,
    maxEfficiency: '98.6%',
    warrantyYears: 10,
    monitoringApp: 'Solarman / Deye Cloud (Wi-Fi Incluso)',
    description: 'Inversor de alta performance com duplo rastreador MPPT, proteção contra arco elétrico (AFCI) e monitoramento remoto em tempo real pelo celular.',
    recommendedFor: 'Sistemas conectadores à rede da Equatorial Pará',
    badge: 'Líder em Vendas Fotus'
  },
  {
    id: 'inv-deye-hybrid',
    brand: 'Deye / Kehua',
    model: 'Inversor Híbrido com Nobreak Solar (5kW a 12kW)',
    type: 'Híbrido (Nobreak/Baterias)',
    powerKw: 6,
    mpptCount: 2,
    maxEfficiency: '97.6%',
    warrantyYears: 10,
    monitoringApp: 'Deye Cloud & Nobreak Smart',
    description: 'Permite alimentar a casa mesmo durante quedas de energia da concessionária. Compatível com baterias de lítio de baixa e alta tensão.',
    recommendedFor: 'Locais com constantes quedas na rede ou comércios críticos',
    badge: 'Zero Apagão / Nobreak'
  },
  {
    id: 'inv-micro-tsun',
    brand: 'TSUN / Deye Micro / Hoymiles',
    model: 'Microinversor Inteligente Quad (2000W / 2250W)',
    type: 'Microinversor',
    powerKw: 2.25,
    mpptCount: 4,
    maxEfficiency: '96.8%',
    warrantyYears: 12,
    monitoringApp: 'TSUN Talent / Hoymiles Cloud',
    description: 'MPPT individual para até 4 painéis. Máxima segurança operando em baixa tensão CC (60V), imune a sombreamentos parciais no telhado.',
    recommendedFor: 'Telhados com múltiplas águas ou sombras de árvores',
    badge: 'Máxima Segurança CC'
  },
  {
    id: 'inv-pump-vfd',
    brand: 'Drive Solar Pump VFD / Fotus',
    model: 'Inversor de Frequência para Bomba Solar (2.2kW a 15kW)',
    type: 'Drive Bombeamento Solar',
    powerKw: 3,
    mpptCount: 1,
    maxEfficiency: '98.0%',
    warrantyYears: 5,
    monitoringApp: 'Painel Digital VFD Auto-Start',
    description: 'Converte a energia solar diretamente para acionar bombas trifásicas ou monofásicas de poço artesiano sem necessitar de baterias.',
    recommendedFor: 'Chácaras, Sítios, Irrigação Rural e Pecuária',
    badge: 'Sem Baterias / Direto p/ Poço'
  }
];

export const FOTUS_STRUCTURES: FotusStructure[] = [
  {
    id: 'struct-ceramic',
    type: 'Telhado Cerâmico / Colonial',
    roofType: 'Telha de Barro, Francesa ou Romana',
    material: 'Hastes / Ganchos em Aço Inox 304 + Trilhos Alumínio 6063-T6',
    sealingType: 'Vedação sob a telha com borracha de neoprene e parafuso inox',
    windResistance: 'Resistência até 180 km/h (Inmetro)',
    description: 'Fixação segura por baixo das telhas cerâmicas sem necessidade de perfurar a estrutura interna de madeira.'
  },
  {
    id: 'struct-metal-mini',
    type: 'Telhado Metálico (Minitrilho)',
    roofType: 'Telha Trapezoidal ou Ondulada Zinco/Galvalume',
    material: 'Minitrilho de Alumínio Anodizado com EPDM integrado',
    sealingType: 'Parafuso Brocante Inox com Arruela de Vedação Neoprene EPDM',
    windResistance: 'Resistência até 180 km/h (Inmetro)',
    description: 'Instalação rápida e estanqueidade 100% garantida com vedação contra infiltração de chuva de vento.'
  },
  {
    id: 'struct-fibro',
    type: 'Telhado Fibrocimento / Madeira / Aço',
    roofType: 'Telha Ondulada de Fibrocimento ou Brasilit',
    material: 'Parafuso Estojo Duplo Inox 304 (200mm / 250mm)',
    sealingType: 'Borracha EPDM alta pressão resistente a raios UV',
    windResistance: 'Resistência até 180 km/h (Inmetro)',
    description: 'Fixado diretamente nos caibros ou terças de madeira/aço garantindo alta rigidez mecânica.'
  },
  {
    id: 'struct-concrete',
    type: 'Laje de Concreto (Ângulo Fixo)',
    roofType: 'Laje Plana de Concreto Armado',
    material: 'Triângulos de Alumínio Estrutural com inclinação de 12° a 15°',
    sealingType: 'Blocos de Ancoragem de Concreto sem perfurar a impermeabilização',
    windResistance: 'Resistência até 180 km/h (Inmetro)',
    description: 'Direcionamento perfeito para o Norte com lastro de concreto que preserva a manta de impermeabilização da laje.'
  },
  {
    id: 'struct-ground',
    type: 'Estrutura de Solo / Agronegócio',
    roofType: 'Terreno / Solo Rural',
    material: 'Aço Galvanizado a Fogo / Alumínio com estacas cravadas ou sapatas',
    sealingType: 'Sapatas de Concreto Armado ou Parafuso de Solo',
    windResistance: 'Resistência até 180 km/h (Inmetro)',
    description: 'Ideal para usinas de solo e sistemas de bombeamento agrícola com fácil acesso para manutenção.'
  }
];

export const FOTUS_PROTECTIONS: FotusProtection[] = [
  {
    id: 'prot-stringbox-cc',
    name: 'String Box CC 1000V Fotus',
    specs: 'DPS Classe II 1000V + Disjuntor CC 25A 2P + Chave Seccionadora + Caixa IP65',
    includedInStandardKit: true
  },
  {
    id: 'prot-stringbox-ca',
    name: 'String Box CA Proteção de Rede',
    specs: 'Disjuntor Termomagnético CA + DPS CA Classe II 275V/385V + Bornes de Proteção',
    includedInStandardKit: true
  },
  {
    id: 'prot-cables-mc4',
    name: 'Cabos Solares Fotus 6mm² + MC4 Originais',
    specs: 'Cabos 1000V/1500V Dupla Isolação UV Vermelho e Preto + Par de Conectores MC4 IP68',
    includedInStandardKit: true
  }
];

export const FOTUS_SERVICES: FotusServiceOption[] = [
  {
    id: 'srv-crea-art',
    title: 'Projeto Elétrico Executivo & ART no CREA Pará',
    description: 'Elaboração do memorial descritivo, diagramas unifilares e anotação de responsabilidade técnica por engenheiro habilitado.',
    badge: 'Incluso e Obrigatório',
    isMandatory: true
  },
  {
    id: 'srv-equatorial',
    title: 'Homologação Chave na Mão na Equatorial Pará',
    description: 'Protocolo, acompanhamento de vistoria técnica e solicitação de troca de medidor bidirecional sem burocracia.',
    badge: 'Incluso',
    isMandatory: true
  },
  {
    id: 'srv-installation',
    title: 'Instalação e Comissionamento Técnico NR10/NR35',
    description: 'Montagem mecânica dos trilhos/módulos e cabeamento elétrico executado por equipe própria uniformizada e certificada em Santarém.',
    badge: 'Recomendado'
  },
  {
    id: 'srv-freight',
    title: 'Frete Seguro Fotus para Santarém & Região',
    description: 'Transporte rodoviário e fluvial com seguro total contra avarias durante o deslocamento até o imóvel.',
    badge: 'Seguro Total'
  }
];

export const PRESET_FOTUS_KITS = [
  {
    id: 'kit-res-p',
    name: 'Kit Residencial Pequeno (Até R$ 350/mês)',
    targetBill: 350,
    monthlyKwh: 380,
    kPkWp: 2.9,
    modulesCount: 5,
    modulePower: 580,
    inverterPower: '3.0 kW',
    estimatedRoofArea: 13,
    paybackMonths: 22,
    badge: 'Econômico'
  },
  {
    id: 'kit-res-m',
    name: 'Kit Residencial Médio (Até R$ 750/mês)',
    targetBill: 750,
    monthlyKwh: 820,
    kPkWp: 6.38,
    modulesCount: 11,
    modulePower: 580,
    inverterPower: '5.0 kW / 6.0 kW',
    estimatedRoofArea: 28,
    paybackMonths: 24,
    badge: 'Mais Escolhido'
  },
  {
    id: 'kit-com-g',
    name: 'Kit Comercial / Residencial Alto (Até R$ 1.500/mês)',
    targetBill: 1500,
    monthlyKwh: 1650,
    kPkWp: 12.76,
    modulesCount: 22,
    modulePower: 580,
    inverterPower: '10.0 kW / 12.0 kW',
    estimatedRoofArea: 56,
    paybackMonths: 26,
    badge: 'Alta Performance'
  },
  {
    id: 'kit-pumping-rural',
    name: 'Kit Bombeamento Solar Poço Artesiano Rural',
    targetBill: 0,
    monthlyKwh: 0,
    kPkWp: 3.48,
    modulesCount: 6,
    modulePower: 580,
    inverterPower: 'Drive Solar Pump 3.0 HP',
    estimatedRoofArea: 16,
    paybackMonths: 18,
    badge: 'Rural / Poço Artesiano'
  }
];

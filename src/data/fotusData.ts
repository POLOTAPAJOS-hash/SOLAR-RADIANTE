export interface FotusBrand {
  name: string;
  category: 'Módulos' | 'Inversores' | 'Microinversores' | 'Baterias';
  description: string;
  badge?: string;
}

export interface FotusModule {
  id: string;
  brand: string;
  model: string;
  powerWatts: number;
  technology: 'N-Type TOPCon' | 'Bifacial TOPCon' | 'HJT High Efficiency' | 'Mono PERC';
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

export interface FotusBattery {
  id: string;
  brand: string;
  model: string;
  capacityKwh: number;
  voltage: string;
  chemistry: string;
  cyclesCount: number;
  warrantyYears: number;
  description: string;
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

export interface PresetKit {
  id: string;
  kwp: number;
  name: string;
  categoryTag: '2 - 5 kWp' | '5 - 12 kWp' | '12 - 50 kWp' | 'Rural / Bombeamento';
  targetBill: number;
  monthlyKwh: number;
  modulesCount: number;
  modulePower: number;
  moduleBrand: string;
  inverterPower: string;
  inverterBrand: string;
  estimatedRoofArea: number;
  paybackMonths: number;
  badge: string;
  description: string;
}

// Complete list of partner brands from Fotus portal

export const FOTUS_BRANDS: FotusBrand[] = [
  // Módulos
  { name: 'Trina Solar', category: 'Módulos', description: 'Líder global em módulos de altíssima eficiência N-Type e 210mm Vertex', badge: 'Tier 1 Global' },
  { name: 'LONGi Solar', category: 'Módulos', description: 'Maior fabricante de módulos monocristalinos e tecnologia HPBC / Hi-MO', badge: 'Tier 1 Global' },
  { name: 'Jinko Solar', category: 'Módulos', description: 'Pioneira em células Tiger Neo N-Type TOPCon com récordes de eficiência', badge: 'Mais Vendido' },
  { name: 'Astronergy', category: 'Módulos', description: 'Módulos N-type CHINT ASTRO N com garantia linear estendida de 30 anos', badge: 'Tier 1 Global' },
  { name: 'Sunova', category: 'Módulos', description: 'Módulos com excelente custo-benefício e alta performance em climas quentes', badge: 'Custo-Benefício' },
  { name: 'Ronma Solar', category: 'Módulos', description: 'Painéis fotovoltaicos robustos para aplicações residenciais e comerciais', badge: 'Alta Durabilidade' },
  { name: 'Pulling Energy', category: 'Módulos', description: 'Módulos de alta potência otimizados para usinas e minigeração', badge: 'Alta Potência' },
  
  // Inversores & Microinversores
  { name: 'Deye', category: 'Inversores', description: 'Inversores String On-Grid e Híbridos Nobreak mais procurados do Brasil', badge: 'Mais Vendido' },
  { name: 'Solplanet', category: 'Inversores', description: 'Engenharia e tecnologia alemã AISWEI com garantia estendida e app intuitivo', badge: 'Tecnologia Alemã' },
  { name: 'GoodWe', category: 'Inversores', description: 'Inversores inteligentes e soluções de armazenamento de energia híbrida', badge: 'Inovação Híbrida' },
  { name: 'Solis', category: 'Inversores', description: 'Uma das maiores fabricantes mundiais de inversores string ultra confiáveis', badge: 'Alta Confiabilidade' },
  { name: 'Auxsol', category: 'Inversores', description: 'Inversores fotovoltaicos de última geração com alta eficiência de conversão', badge: 'Nova Geração' },
  { name: 'TSUNESS', category: 'Microinversores', description: 'Microinversores Quad com MPPT independente e isolamento em baixa tensão CC', badge: 'Líder em Micro' },

  // Baterias
  { name: 'Unipower', category: 'Baterias', description: 'Baterias de Lítio LiFePO4 para sistemas off-grid, híbridos e nobreak solar', badge: 'Segurança LiFePO4' },
];

export const FOTUS_MODULES: FotusModule[] = [
  {
    id: 'mod-580-jinko',
    brand: 'Jinko Solar / Trina Solar',
    model: 'N-Type TOPCon Tiger Neo 580W',
    powerWatts: 580,
    technology: 'N-Type TOPCon',
    efficiency: '22.5%',
    warrantyYears: 25,
    degradationRate: '0.40%/ano (87.4% em 30 anos)',
    description: 'Módulo de altíssima eficiência N-Type com coeficiente de temperatura otimizado para o clima de Santarém/PA.',
    recommendedFor: 'Residências, comércios e agronegócio',
    badge: 'Mais Vendido Fotus'
  },
  {
    id: 'mod-585-astronergy',
    brand: 'Astronergy / LONGi Solar',
    model: 'Bifacial TOPCon Glass-Glass 585W',
    powerWatts: 585,
    technology: 'Bifacial TOPCon',
    efficiency: '22.7%',
    warrantyYears: 30,
    degradationRate: '0.35%/ano (88.8% em 30 anos)',
    description: 'Gera energia pelas duas faces com ganho bifacial de até +15% em estruturas de solo ou telhados reflexivos.',
    recommendedFor: 'Usinas de Solo, Galpões e Lajes',
    badge: 'Geração Extra +15%'
  },
  {
    id: 'mod-670-trina',
    brand: 'Trina Solar / Sunova',
    model: 'Vertex N-Type Ultra Power 670W',
    powerWatts: 670,
    technology: 'N-Type TOPCon',
    efficiency: '23.1%',
    warrantyYears: 25,
    degradationRate: '0.40%/ano (87.4% em 25 anos)',
    description: 'Módulo de formato largo e ultra potência que reduz a área necessária de estrutura de fixação e tempo de obra.',
    recommendedFor: 'Grandes Comércios, Indústrias e Usinas de Minigeração',
    badge: 'Ultra Potência Comercial'
  },
  {
    id: 'mod-550-ronma',
    brand: 'Ronma Solar / Pulling Energy',
    model: 'Mono PERC Half-Cell 550W',
    powerWatts: 550,
    technology: 'Mono PERC',
    efficiency: '21.3%',
    warrantyYears: 25,
    degradationRate: '0.55%/ano',
    description: 'Opção de alta durabilidade com excelente custo por Watt para orçamentos otimizados.',
    recommendedFor: 'Projetos de médio porte e rurais',
    badge: 'Melhor Custo/Watt'
  }
];

export const FOTUS_INVERTERS: FotusInverter[] = [
  {
    id: 'inv-deye-string',
    brand: 'Deye / Solplanet / Solis',
    model: 'Inversor On-Grid String Monofásico/Trifásico (3kW a 75kW)',
    type: 'String On-Grid',
    powerKw: 5,
    mpptCount: 2,
    maxEfficiency: '98.6%',
    warrantyYears: 10,
    monitoringApp: 'Solarman / Deye Cloud (Wi-Fi Incluso)',
    description: 'Inversor consagrado no mercado brasileiro com seccionadora CC integrada, proteção AFCI e monitoramento remoto gratuito.',
    recommendedFor: 'Sistemas conectados à rede da Equatorial Pará',
    badge: 'Líder de Vendas'
  },
  {
    id: 'inv-goodwe-deye-hybrid',
    brand: 'GoodWe / Deye / Auxsol',
    model: 'Inversor Híbrido com Nobreak Smart (5kW a 12kW)',
    type: 'Híbrido (Nobreak/Baterias)',
    powerKw: 6,
    mpptCount: 2,
    maxEfficiency: '97.6%',
    warrantyYears: 10,
    monitoringApp: 'SEMS Portal / Deye Cloud',
    description: 'Combina geração solar com armazenamento em baterias Unipower, garantindo energia ininterrupta mesmo na falta da rede elétrica.',
    recommendedFor: 'Residências e comércios que não podem ficar sem luz',
    badge: 'Zero Apagão / Nobreak'
  },
  {
    id: 'inv-tsun-deye-micro',
    brand: 'TSUNESS / Deye Micro',
    model: 'Microinversor Inteligente Quad (2000W / 2250W)',
    type: 'Microinversor',
    powerKw: 2.25,
    mpptCount: 4,
    maxEfficiency: '96.8%',
    warrantyYears: 12,
    monitoringApp: 'TSUN Talent / Deye Cloud',
    description: '4 MPPTs independentes operando em extra-baixa tensão CC (60V). Imune a sombreamentos e mais seguro para telhados residenciais.',
    recommendedFor: 'Telhados com sombras parciais ou múltiplas quedas d\'água',
    badge: 'Máxima Segurança'
  },
  {
    id: 'inv-pump-vfd',
    brand: 'Inversor Frequência VFD / Fotus',
    model: 'Drive Solar Pump para Poço Artesiano (2.2kW a 15kW)',
    type: 'Drive Bombeamento Solar',
    powerKw: 3,
    mpptCount: 1,
    maxEfficiency: '98.0%',
    warrantyYears: 5,
    monitoringApp: 'Painel VFD Digital Auto-Start',
    description: 'Alimenta bombas d\'água de poço de até 120m diretamente pelos painéis solares, sem necessidade de banco de baterias.',
    recommendedFor: 'Sítios, Fazendas, Irrigação Rural e Pecuária',
    badge: 'Uso Rural / Sem Baterias'
  }
];

export const FOTUS_BATTERIES: FotusBattery[] = [
  {
    id: 'bat-unipower-5kwh',
    brand: 'Unipower',
    model: 'Bateria de Lítio LiFePO4 5.12 kWh 48V',
    capacityKwh: 5.12,
    voltage: '48V / 100Ah',
    chemistry: 'Lítio Ferro Fosfato (LiFePO4)',
    cyclesCount: 6000,
    warrantyYears: 10,
    description: 'Módulo de bateria de lítio empilhável com BMS inteligente integrado e alta profundidade de descarga (DOD 90%).'
  },
  {
    id: 'bat-unipower-10kwh',
    brand: 'Unipower / Deye',
    model: 'Banco de Baterias de Lítio 10.24 kWh',
    capacityKwh: 10.24,
    voltage: '48V / 200Ah',
    chemistry: 'Lítio Ferro Fosfato (LiFePO4)',
    cyclesCount: 6000,
    warrantyYears: 10,
    description: 'Ideal para autonomia residencial completa durante a noite ou em quedas prolongadas de energia.'
  }
];

export const FOTUS_STRUCTURES: FotusStructure[] = [
  {
    id: 'struct-ceramic',
    type: 'Telhado Cerâmico / Colonial',
    roofType: 'Telha de Barro, Francesa ou Romana',
    material: 'Ganchos Inox 304 + Trilhos de Alumínio Anodizado',
    sealingType: 'Vedação EPDM resistente a UV e intempéries',
    windResistance: 'Até 180 km/h (Certificado Inmetro)',
    description: 'Ancoragem sob as telhas sem risco de infiltrações de água.'
  },
  {
    id: 'struct-metal-mini',
    type: 'Telhado Metálico (Minitrilho)',
    roofType: 'Telha Trapezoidal ou Ondulada Zinco/Galvalume',
    material: 'Minitrilho em Alumínio Anodizado com borracha EPDM',
    sealingType: 'Parafuso Auto-Brocante Inox com arruela de vedação',
    windResistance: 'Até 180 km/h (Certificado Inmetro)',
    description: 'Fixação direta e ágil sobre as cristas do telhado metálico.'
  },
  {
    id: 'struct-fibro',
    type: 'Telhado Fibrocimento / Brasilit',
    roofType: 'Telha Ondulada de Fibrocimento',
    material: 'Parafuso Estojo Duplo Inox 304 (200mm / 250mm)',
    sealingType: 'Arruela de vedação em EPDM de alta pressão',
    windResistance: 'Até 180 km/h (Certificado Inmetro)',
    description: 'Fixação firme na estrutura de madeira ou metal abaixo do telhado.'
  },
  {
    id: 'struct-concrete',
    type: 'Laje de Concreto (Ângulo Fixo)',
    roofType: 'Laje Plana de Concreto Armado',
    material: 'Estrutura Triângulo de Alumínio (12° / 15°)',
    sealingType: 'Blocos de concreto de lastro sem perfuração',
    windResistance: 'Até 180 km/h (Certificado Inmetro)',
    description: 'Preserva a impermeabilização da laje com inclinação ideal.'
  },
  {
    id: 'struct-ground',
    type: 'Estrutura de Solo / Agronegócio',
    roofType: 'Terreno Plano / Solo Rural',
    material: 'Aço Galvanizado a Fogo / Alumínio Estrutural',
    sealingType: 'Sapatas de Concreto / Estacas cravadas',
    windResistance: 'Até 180 km/h (Certificado Inmetro)',
    description: 'Ideal para grandes usinas de solo e bombeamento de poço rural.'
  }
];

export const FOTUS_PROTECTIONS: FotusProtection[] = [
  {
    id: 'prot-stringbox-cc',
    name: 'String Box CC 1000V Fotus',
    specs: 'DPS Classe II 1000V + Disjuntor CC 25A + Seccionadora + Caixa IP65',
    includedInStandardKit: true
  },
  {
    id: 'prot-stringbox-ca',
    name: 'String Box CA Proteção de Rede',
    specs: 'Disjuntor Termomagnético CA + DPS CA Classe II 275V/385V',
    includedInStandardKit: true
  },
  {
    id: 'prot-cables-mc4',
    name: 'Cabos Solares Fotus 6mm² + Conectores MC4',
    specs: 'Cabos 1000V/1500V Dupla Isolação UV Vermelho/Preto + MC4 IP68',
    includedInStandardKit: true
  }
];

// PRESET KITS ORGANIZED EXPLICITLY BY kWp SCALE
export const PRESET_FOTUS_KITS: PresetKit[] = [
  {
    id: 'kit-2-32-kwp',
    kwp: 2.32,
    name: 'Kit Solar Fotus 2.32 kWp',
    categoryTag: '2 - 5 kWp',
    targetBill: 280,
    monthlyKwh: 300,
    modulesCount: 4,
    modulePower: 580,
    moduleBrand: 'Jinko / Trina N-Type 580W',
    inverterPower: 'Inversor 2.0 kW / 3.0 kW',
    inverterBrand: 'Solplanet / Solis / Deye',
    estimatedRoofArea: 10,
    paybackMonths: 20,
    badge: 'Economia Inicial',
    description: 'Ideal para residências de pequeno porte com consumo mensal de até 300 kWh.'
  },
  {
    id: 'kit-3-48-kwp',
    kwp: 3.48,
    name: 'Kit Solar Fotus 3.48 kWp',
    categoryTag: '2 - 5 kWp',
    targetBill: 420,
    monthlyKwh: 450,
    modulesCount: 6,
    modulePower: 580,
    moduleBrand: 'Jinko / LONGi N-Type 580W',
    inverterPower: 'Inversor 3.0 kW',
    inverterBrand: 'Deye / Solplanet',
    estimatedRoofArea: 15,
    paybackMonths: 22,
    badge: 'Mais Vendido Residencial',
    description: 'Excelente para famílias com ar-condicionado e eletrodomésticos padrão.'
  },
  {
    id: 'kit-5-80-kwp',
    kwp: 5.80,
    name: 'Kit Solar Fotus 5.80 kWp',
    categoryTag: '5 - 12 kWp',
    targetBill: 720,
    monthlyKwh: 750,
    modulesCount: 10,
    modulePower: 580,
    moduleBrand: 'Trina / Astronergy N-Type 580W',
    inverterPower: 'Inversor 5.0 kW / 6.0 kW',
    inverterBrand: 'Deye / GoodWe / Solis',
    estimatedRoofArea: 25,
    paybackMonths: 24,
    badge: 'Campeão de Vendas',
    description: 'Atende residências médias e pequenos comércios com redução drástica da conta.'
  },
  {
    id: 'kit-8-70-kwp',
    kwp: 8.70,
    name: 'Kit Solar Fotus 8.70 kWp',
    categoryTag: '5 - 12 kWp',
    targetBill: 1100,
    monthlyKwh: 1120,
    modulesCount: 15,
    modulePower: 580,
    moduleBrand: 'Jinko / Trina N-Type 580W',
    inverterPower: 'Inversor 8.0 kW',
    inverterBrand: 'Deye / GoodWe',
    estimatedRoofArea: 38,
    paybackMonths: 24,
    badge: 'Residencial Alto Padrão',
    description: 'Para casas com piscina, área de lazer e múltiplos ares-condicionados.'
  },
  {
    id: 'kit-11-60-kwp',
    kwp: 11.60,
    name: 'Kit Solar Fotus 11.60 kWp',
    categoryTag: '5 - 12 kWp',
    targetBill: 1450,
    monthlyKwh: 1500,
    modulesCount: 20,
    modulePower: 580,
    moduleBrand: 'LONGi / Trina N-Type 580W',
    inverterPower: 'Inversor 10.0 kW / 12.0 kW',
    inverterBrand: 'Deye / Solis / GoodWe',
    estimatedRoofArea: 50,
    paybackMonths: 25,
    badge: 'Comercial & Residencial',
    description: 'Projetado para escritórios, padarias, academias e grandes residências.'
  },
  {
    id: 'kit-15-08-kwp',
    kwp: 15.08,
    name: 'Kit Solar Fotus 15.08 kWp',
    categoryTag: '12 - 50 kWp',
    targetBill: 1900,
    monthlyKwh: 1950,
    modulesCount: 26,
    modulePower: 580,
    moduleBrand: 'Trina / Astronergy 580W',
    inverterPower: 'Inversor 15.0 kW Trifásico',
    inverterBrand: 'Deye / Solplanet / Solis',
    estimatedRoofArea: 65,
    paybackMonths: 26,
    badge: 'Comercial Forte',
    description: 'Alta geração para supermercados, oficinas e galpões comerciais.'
  },
  {
    id: 'kit-23-20-kwp',
    kwp: 23.20,
    name: 'Kit Solar Fotus 23.20 kWp',
    categoryTag: '12 - 50 kWp',
    targetBill: 2900,
    monthlyKwh: 3000,
    modulesCount: 40,
    modulePower: 580,
    moduleBrand: 'Trina Vertex / Jinko 580W',
    inverterPower: 'Inversor 20.0 kW / 25.0 kW',
    inverterBrand: 'Deye / Solis / GoodWe',
    estimatedRoofArea: 100,
    paybackMonths: 27,
    badge: 'Alta Performance Comercial',
    description: 'Empresas de médio porte, frigoríficos e postos de combustível.'
  },
  {
    id: 'kit-50-00-kwp',
    kwp: 50.00,
    name: 'Usina Solar Fotus 50.00 kWp',
    categoryTag: '12 - 50 kWp',
    targetBill: 6200,
    monthlyKwh: 6400,
    modulesCount: 86,
    modulePower: 580,
    moduleBrand: 'Trina Ultra Power 670W / 580W',
    inverterPower: 'Inversor 50.0 kW Trifásico',
    inverterBrand: 'Deye / Solis / Solplanet',
    estimatedRoofArea: 215,
    paybackMonths: 28,
    badge: 'Minigeração / Indústria',
    description: 'Solução completa para indústrias, hotéis e grandes empreendimentos.'
  },
  {
    id: 'kit-pumping-3-48-kwp',
    kwp: 3.48,
    name: 'Kit Bombeamento Solar Poço 3.48 kWp',
    categoryTag: 'Rural / Bombeamento',
    targetBill: 0,
    monthlyKwh: 0,
    modulesCount: 6,
    modulePower: 580,
    moduleBrand: 'Jinko / Trina N-Type 580W',
    inverterPower: 'Drive Solar Pump VFD 3.0 HP',
    inverterBrand: 'Drive Solar Fotus',
    estimatedRoofArea: 16,
    paybackMonths: 18,
    badge: 'Agronegócio / Poço Artesiano',
    description: 'Acionamento direto de bombas de poço artesiano até 120m sem uso de baterias.'
  }
];

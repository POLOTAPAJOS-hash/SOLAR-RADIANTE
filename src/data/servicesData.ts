import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'solar-fotovoltaica',
    title: 'Energia Solar Fotovoltaica (On-Grid & Off-Grid)',
    category: 'solar',
    tagline: 'Reduza sua conta de energia elétrica em até 95%',
    description: 'Projetos completos de energia solar chave na mão (Turnkey) para residências, empresas, indústrias e propriedades rurais. Homologação total junto à concessionária de energia.',
    features: [
      'Projetos homologados em todas as concessionárias (CPFL, CEMIG, Enel, Neoenergia, etc)',
      'Painéis solares fotovoltaicos de altíssima eficiência N-Type / TOPCon (Garantia de 25 anos)',
      'Inversores e Microinversores de marcas líderes com monitoramento via App',
      'Estruturas em alumínio com alta resistência à corrosão',
      'Sistemas On-Grid (conectados à rede) e Off-Grid com Banco de Baterias Litio'
    ],
    iconName: 'Sun',
    badge: 'Mais Solicitado'
  },
  {
    id: 'bombeamento-solar',
    title: 'Bombeamento Solar para Chácaras & Sítios',
    category: 'bombeamento',
    tagline: 'Água abundante em poços e reservatórios sem gasto com eletricidade ou diesel',
    description: 'Soluções de bombeamento direto sem necessidade de baterias nem rede elétrica. Ideal para poços artesianos, irrigação, gado e reservatórios em zonas rurais.',
    features: [
      'Bombas solares helio-submersas acionadas diretamente pelos painéis fotovoltaicos',
      'Inversores de frequência solar com tecnologia MPPT avançada',
      'Funcionamento automático do nascer ao pôr do sol com sensor de nível de caixa d\'água',
      'Economia total com geradores a diesel e extensões de rede elétrica de alto custo',
      'Instalação modular dimensionada exatamente para a profundidade e vazão desejadas'
    ],
    iconName: 'Droplets',
    badge: 'Especialidade Agrícola'
  },
  {
    id: 'subestacoes',
    title: 'Subestações de Energia (Média e Alta Tensão)',
    category: 'subestacao',
    tagline: 'Infraestrutura robusta de alta potência para indústrias e grandes consumos',
    description: 'Engenharia especializada na concepção, montagem, comissionamento e manutenção de subestações abrigadas, blindadas e em poste (13.8kV a 138kV).',
    features: [
      'Projetos de engenharia elétrica de acordo com a ABNT NBR 14039 e regulatórias',
      'Montagem de transformadores a seco e a óleo, disjuntores de média tensão e cubículos',
      'Testes de isolamento, relés de proteção, óleo isolante e parametrização',
      'Manutenção preventiva e corretiva emergencial 24h para indústrias',
      'Laudos técnicos e ART de engenharia emitida por profissional habilitado (CREA)'
    ],
    iconName: 'Zap',
    badge: 'Engenharia Pesada'
  },
  {
    id: 'alta-baixa-tensao',
    title: 'Projetos Elétricos de Alta & Baixa Tensão',
    category: 'eletrica',
    tagline: 'Segurança, eficiência energética e conformidade com as normas ABNT & NR-10',
    description: 'Projetos e execuções de infraestrutura elétrica predial, comercial e industrial. Modernização de quadros de distribuição, cabeamento estruturado e correção de fator de potência.',
    features: [
      'Entradas de energia individuais e agrupadas para loteamentos e condomínios',
      'Montagem de Quadros de Distribuição (QGD, QGBT) e Painéis de Comando',
      'Adequação técnica NR-10 e SPDA (Para-raios) com medição de aterramento',
      'Análise de qualidade de energia e correção do Fator de Potência (Bancos de Capacitores)',
      'Aumento de carga e troca de padrão de entrada junto à concessionária'
    ],
    iconName: 'Activity'
  },
  {
    id: 'manutencao-monitoramento',
    title: 'Limpeza, Manutenção & Monitoramento de Usinas',
    category: 'manutencao',
    tagline: 'Garanta o rendimento máximo e a vida útil estendida dos seus painéis',
    description: 'Serviço especializado de higienização técnica de módulos fotovoltaicos, termografia com drone para identificação de hotspots e re-aperto das conexões elétricas.',
    features: [
      'Higienização com água desmineralizada e escovas rotativas de cerdas macias',
      'Inspeção termográfica infravermelha para localização de falhas e células queimadas',
      'Verificação de torque de fixação, aperto dos bornes e teste de isolamento elétrico',
      'Monitoramento remoto em tempo real da produção diária e mensal',
      'Relatórios detalhados com comparativo de geração Antes x Depois da manutenção'
    ],
    iconName: 'Wrench'
  }
];

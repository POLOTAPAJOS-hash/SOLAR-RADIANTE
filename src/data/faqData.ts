import { FAQItem } from '../types';

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Quanto posso economizar de fato na minha conta de luz com energia solar?',
    answer: 'Você pode economizar até 95% do valor total da sua fatura mensal. O custo restante corresponde apenas à taxa mínima de disponibilidade cobrada pela concessionária de energia (taxa de conexão monofásica, bifásica ou trifásica) e à taxa de iluminação pública da sua cidade.',
    category: 'economia'
  },
  {
    question: 'Como funciona o bombeamento solar para chácaras e poços artesiano sem rede elétrica?',
    answer: 'O sistema utiliza um inversor de frequência solar inteligente ligado diretamente aos módulos fotovoltaicos. A bomba funciona automaticamente com a força da luz do sol do amanhecer ao anoitecer, sem necessidade de baterias ou combustível diesel, armazenando a água diretamente na caixa d\'água ou reservatório.',
    category: 'bombeamento'
  },
  {
    question: 'Qual a garantia dos painéis fotovoltaicos e inversores instalados pela Solar Radiante?',
    answer: 'Trabalhamos exclusivamente com equipamentos Tier-1 de alta tecnologia. Os painéis solares possuem garantia de desempenho linear de 25 anos (mantendo no mínimo 80-85% da eficiência) e garantia de fabricação de 12 a 15 anos. Os inversores possuem garantia de fábrica de 10 a 20 anos.',
    category: 'geral'
  },
  {
    question: 'O que é uma subestação de energia e quando minha empresa precisa de uma?',
    answer: 'A subestação é necessária quando a demanda consumida ultrapassa os limites do atendimento em baixa tensão da concessionária (geralmente acima de 75kW de demanda contratada). Ela rebaixa a média tensão da rede (ex: 13.8kV) para os níveis de consumo interno (220V/380V), garantindo tarifas mais baratas e estabilidade para máquinas pesadas.',
    category: 'subestacao'
  },
  {
    question: 'É possível financiar 100% do projeto de energia solar?',
    answer: 'Sim! Possuímos parcerias diretas com os principais bancos e instituições financeiras (BV Financeira, Santander, Solfácil, Sicredi, Sicoob, Banco do Brasil, Bradesco). Em muitos casos, a parcela do financiamento fica menor ou igual ao valor da economia mensal na conta de luz, fazendo o sistema se pagar sozinho desde o primeiro mês.',
    category: 'financiamento'
  },
  {
    question: 'O sistema de energia solar continua gerando energia em dias chuvosos ou nublados?',
    answer: 'Sim. Os painéis fotovoltaicos utilizam a radiação solar (luz), e não o calor direto do sol. Mesmo em dias nublados ou com chuva fraca, o sistema continua gerando energia, embora em ritmo reduzido (cerca de 15% a 30% da capacidade máxima). A energia excedente produzida em dias ensolarados fica armazenada como créditos na concessionária por até 60 meses.',
    category: 'economia'
  },
  {
    question: 'Como funciona a homologação do projeto na concessionária de energia?',
    answer: 'A equipe de engenheiros da Solar Radiante cuida de 100% do processo burocrático e técnico: elaboração dos diagramas unifilares, emissão da ART junto ao CREA, solicitação de acesso, acompanhamento da vistoria e troca do relógio medidor para o modelo bidirecional.',
    category: 'geral'
  }
];

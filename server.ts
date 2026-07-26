import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API Route for AI Solar Engineer Consultant
app.post('/api/ai-consultant', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Mensagem inválida ou ausente.' });
      return;
    }

    const systemInstruction = `Você é o "Engenheiro Radiante IA", um especialista sênior em Engenharia Elétrica, Energia Solar Fotovoltaica (On-Grid/Off-Grid), Bombeamento Solar para Chácaras e Poços Artesianos, Subestações de Média/Alta Tensão e Regulamentação da ANEEL (Lei 14.300) e homologação na Equatorial Pará, da empresa "Solar Radiante", atuante em Santarém e em todo o Oeste do Pará.
Sua função é fornecer respostas claras, altamente técnicas porém acessíveis, educadas e profissionais em português do Brasil.
Sempre que pertinente:
- Mencione a alta irradiação solar de Santarém e do Oeste do Pará.
- Mencione a homologação ágil junto à concessionária Equatorial Pará.
- Explique a taxa de retorno (Payback em 3,2 a 4 anos), durabilidade dos módulos TOPCon N-Type de 25 anos.
- Incentive o usuário a solicitar um orçamento formal e personalizado sem compromisso na página ou pelo WhatsApp (93) 99121-1156.
- Seja conciso e direto, formatando com tópicos organizados quando necessário.`;

    try {
      const ai = getGeminiClient();
      const model = 'gemini-3.6-flash';

      const contents = [
        { role: 'user', parts: [{ text: systemInstruction }] },
        ...(history || []).map((h: { sender: string; text: string }) => ({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        })),
        { role: 'user', parts: [{ text: message }] },
      ];

      const response = await ai.models.generateContent({
        model,
        contents,
      });

      const replyText = response.text || 'Desculpe, não consegui processar a resposta no momento.';
      res.json({ reply: replyText });
    } catch (apiError: any) {
      console.warn('Gemini API call warning/fallback:', apiError?.message);
      
      // Smart offline fallback response generator if key is missing or invalid
      let fallbackReply = `Olá! Sou o especialista técnico da Solar Radiante. `;
      const lowerMsg = message.toLowerCase();

      if (lowerMsg.includes('bomba') || lowerMsg.includes('bombeamento') || lowerMsg.includes('poço') || lowerMsg.includes('chácara')) {
        fallbackReply += `Para bombeamento solar em poços artesianos e chácaras, utilizamos inversores de frequência MPPT ligados aos módulos N-Type. A bomba funciona automaticamente com a luz do sol, sem gasto com baterias ou combustível diesel. O dimensionamento depende da profundidade do poço (metros) e da vazão diária desejada (litros/dia). Use nosso simulador de bombeamento na página para testar!`;
      } else if (lowerMsg.includes('lei 14300') || lowerMsg.includes('crédito') || lowerMsg.includes('taxa') || lowerMsg.includes('taxação')) {
        fallbackReply += `Com a Lei 14.300/2022 (Marco Legal da Geração Distribuída), o sistema continua sendo extremamente vantajoso. A transição da Fio B atinge a neutralidade de amortização e o Payback médio se mantém em 3,2 a 4 anos. Além disso, equipamentos modernos de alta eficiência garantem ganho contínuo por mais de 25 anos!`;
      } else if (lowerMsg.includes('subestação') || lowerMsg.includes('média tensão') || lowerMsg.includes('alta tensão')) {
        fallbackReply += `Nossa equipe de engenharia com registro no CREA elabora projetos completos de subestações abrigadas ou em poste (13.8kV a 138kV), incluindo montagem de transformadores, relés de proteção, laudos de isolamento e manutenção preventiva 24h para indústrias.`;
      } else {
        fallbackReply += `Com energia solar fotovoltaica, você pode reduzir em até 95% o custo mensal da sua conta de energia elétrica. Cuidamos de 100% da engenharia e homologação junto à concessionária de energia. Deseja simular sua conta na nossa calculadora ou solicitar um orçamento grátis?`;
      }

      res.json({ reply: fallbackReply });
    }
  } catch (err: any) {
    console.error('Error in consultant endpoint:', err);
    res.status(500).json({ error: 'Erro interno ao processar consulta.' });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Solar Radiante running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

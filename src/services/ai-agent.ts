import { google } from '@ai-sdk/google'; // Importe o provedor correto
import { generateObject } from 'ai';
import { z } from 'zod';

export async function analyzeIncomingEmail(emailBody: string) {
  const { object } = await generateObject({
    // Mudamos para o modelo Gemini do Google
    model: google('gemini-1.5-flash'), 
    schema: z.object({
      priority: z.enum(['high', 'medium', 'low']),
      category: z.enum(['vendas', 'suporte', 'spam', 'reclamacao']),
      summary: z.string().describe('Resumo curto do que o cliente quer'),
      suggestedResponse: z.string().describe('Rascunho de resposta educada e profissional'),
      sentiment: z.enum(['positive', 'neutral', 'negative']),
    }),
    system: `Você é um Analista de Vendas e Suporte. 
             Sua missão é ler e-mails de clientes e extrair dados estruturados.
             Se o cliente estiver bravo ou for uma reclamação urgente, marque como priority: high.
             O tom da resposta deve ser empático e focado em resolver o problema.`,
    prompt: `Analise o seguinte e-mail: ${emailBody}`,
  });

  return object;
}
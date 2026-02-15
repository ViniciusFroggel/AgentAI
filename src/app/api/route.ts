import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

// --- POST: RECEBE E PROCESSA COM GEMINI 3 FLASH ---
export async function POST(req: Request) {
  try {
    const { from, subject, text } = await req.json();

    const model = genAI.getGenerativeModel(
      { model: "gemini-3-flash-preview" },
      { apiVersion: "v1beta" }
    );

    const prompt = `Analise o e-mail abaixo e classifique a prioridade seguindo estas regras estritas:
1. ALTA: Intenção de compra imediata, orçamentos grandes ou reclamações graves.
2. MÉDIA: Dúvidas técnicas, perguntas sobre produtos ou suporte simples.
3. BAIXA: Propostas de parceria, marketing, spam ou mensagens sem urgência.

Responda APENAS um JSON puro:
{ 
  "category": "vendas | suporte | outros", 
  "priority": "alta | média | baixa", 
  "summary": "resumo de 1 frase", 
  "reply": "sugestão de resposta profissional" 
}
E-mail: ${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text().replace(/```json|```/g, "").trim();
    const aiResponse = JSON.parse(responseText);

    const ticket = await prisma.emailTicket.create({
      data: {
        senderEmail: from,
        senderName: from.split('@')[0] || "Cliente",
        subject: subject,
        bodyRaw: text,
        category: aiResponse.category,
        priority: aiResponse.priority,
        analysisSummary: aiResponse.summary,
        suggestedResponse: aiResponse.reply,
        status: "pending",
      },
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error: any) {
    console.error("ERRO NO POST:", error.message);
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
}

// --- GET: BUSCA TICKETS FILTRADOS POR STATUS ---
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "pending"; // Padrão é a Inbox (pending)

    const tickets = await prisma.emailTicket.findMany({
      where: { status: status },
      orderBy: { receivedAt: 'desc' },
    });
    return NextResponse.json(tickets);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- PATCH: ATUALIZA STATUS (ENVIAR, ARQUIVAR, EXCLUIR) ---
export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    const updatedTicket = await prisma.emailTicket.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedTicket);
  } catch (error: any) {
    console.error("ERRO NO PATCH:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// Adicione ou substitua no seu route.ts
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.emailTicket.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: "Excluído com sucesso" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
'use client';
import { useEffect, useState } from 'react';
import { Mail, Send, Trash2, Archive, CheckCircle2, Clock, Inbox, AlertTriangle } from 'lucide-react';

export default function ProfessionalInbox() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [view, setView] = useState('pending'); // 'pending', 'sent', 'archived'

  const fetchTickets = async (status: string) => {
    const res = await fetch(`/api?status=${status}`);
    const data = await res.json();
    setTickets(Array.isArray(data) ? data : []);
    if (data.length > 0) setSelectedTicket(data[0]);
    else setSelectedTicket(null);
  };

  useEffect(() => { fetchTickets(view); }, [view]);

  const updateStatus = async (id: string, newStatus: string) => {
    await fetch('/api', {
      method: 'PATCH',
      body: JSON.stringify({ id, status: newStatus }),
    });
    fetchTickets(view);
  };

  // NOVA FUNÇÃO: Exclusão real do banco de dados
  const deletePermanently = async (id: string) => {
    if (!confirm("Deseja excluir este ticket permanentemente do banco de dados?")) return;
    
    await fetch('/api', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    fetchTickets(view);
  };

  return (
    <div className="flex h-screen bg-[#f3f2f1] text-[#323130]">
      {/* Sidebar de Pastas */}
      <aside className="w-64 bg-[#f3f2f1] border-r border-[#edebe9] flex flex-col p-4 gap-2">
        <h2 className="font-bold text-xs uppercase text-gray-500 mb-4 px-2">Favoritos</h2>
        <button onClick={() => setView('pending')} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${view === 'pending' ? 'bg-white shadow-sm text-blue-600 font-semibold border border-gray-200' : 'hover:bg-[#edebe9]'}`}>
          <Inbox size={18} /> Inbox
        </button>
        <button onClick={() => setView('sent')} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${view === 'sent' ? 'bg-white shadow-sm text-blue-600 font-semibold border border-gray-200' : 'hover:bg-[#edebe9]'}`}>
          <Send size={18} /> Enviados
        </button>
        <button onClick={() => setView('archived')} className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${view === 'archived' ? 'bg-white shadow-sm text-blue-600 font-semibold border border-gray-200' : 'hover:bg-[#edebe9]'}`}>
          <Archive size={18} /> Arquivados
        </button>
      </aside>

      {/* Lista de Mensagens */}
      <section className="w-96 bg-white border-r border-[#edebe9] overflow-y-auto">
        <div className="p-4 border-b border-[#edebe9] font-bold text-lg bg-white sticky top-0 z-10">
          {view === 'pending' ? 'Inbox' : view === 'sent' ? 'Enviados' : 'Arquivados'}
        </div>
        {tickets.map((t: any) => (
          <div 
            key={t.id} 
            onClick={() => setSelectedTicket(t)} 
            className={`p-4 border-b cursor-pointer transition-all ${selectedTicket?.id === t.id ? 'bg-[#f3f2f1] border-l-4 border-blue-600 shadow-sm' : 'hover:bg-gray-50'}`}
          >
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold truncate w-32">{t.senderName}</span>
              <span className="text-gray-400">{new Date(t.receivedAt).toLocaleDateString()}</span>
            </div>
            <div className="text-sm font-semibold text-[#0078d4] truncate">{t.subject}</div>
            
            {/* Visualização da Prioridade na Lista */}
            <div className="mt-2 flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                t.priority === 'alta' ? 'bg-red-100 text-red-600' : 
                t.priority === 'média' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {t.priority}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Visualização e Ações */}
      <main className="flex-1 bg-white flex flex-col">
        {selectedTicket ? (
          <>
            <div className="p-2 border-b bg-[#faf9f8] flex gap-2">
              <button onClick={() => updateStatus(selectedTicket.id, 'archived')} className="p-2 hover:bg-[#edebe9] rounded flex items-center gap-2 text-sm text-[#323130] transition-colors">
                <Archive size={16}/> Arquivar
              </button>
              <button onClick={() => deletePermanently(selectedTicket.id)} className="p-2 hover:bg-red-50 rounded flex items-center gap-2 text-sm text-red-600 transition-colors">
                <Trash2 size={16}/> Excluir permanentemente
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-2xl font-semibold text-[#323130]">{selectedTicket.subject}</h1>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${
                  selectedTicket.priority === 'alta' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}>
                  <AlertTriangle size={14} /> PRIORIDADE {selectedTicket.priority?.toUpperCase()}
                </div>
              </div>

              <div className="mb-8 p-6 bg-[#f3f2f1] rounded-lg italic text-gray-700 border-l-4 border-gray-300 shadow-inner">
                "{selectedTicket.bodyRaw}"
              </div>
              
              <div className="border border-blue-200 rounded-xl overflow-hidden shadow-md">
                <div className="bg-[#0078d4] text-white px-4 py-2 text-xs font-bold flex items-center gap-2 tracking-wider">
                  <CheckCircle2 size={16} /> ANÁLISE DO AGENTE (GEMINI 3 FLASH)
                </div>
                <div className="p-6 bg-white space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-1">Resumo do Lead</h4>
                    <p className="text-sm text-gray-600">{selectedTicket.analysisSummary}</p>
                  </div>
                  <div className="h-px bg-gray-100 w-full"></div>
                  <div>
                    <h4 className="text-[10px] font-bold text-blue-600 uppercase mb-2">Sugestão de Resposta</h4>
                    <p className="text-sm text-gray-800 leading-relaxed font-medium">{selectedTicket.suggestedResponse}</p>
                  </div>
                  
                  {selectedTicket.status === 'pending' && (
                    <button 
                      onClick={() => updateStatus(selectedTicket.id, 'sent')}
                      className="mt-4 bg-[#0078d4] hover:bg-[#106ebe] text-white px-8 py-3 rounded font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-200"
                    >
                      <Send size={18} /> Enviar Resposta Sugerida
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
            <Mail size={48} className="opacity-10" />
            <p className="text-sm">Selecione um e-mail para visualizar a análise da IA</p>
          </div>
        )}
      </main>
    </div>
  );
}
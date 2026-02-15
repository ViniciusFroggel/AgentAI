'use client';
import { useState } from 'react';
import { Send, Mail as MailIcon } from 'lucide-react';

export default function SimuladorCliente() {
  const [email, setEmail] = useState({ from: '', subject: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const enviarEmailFake = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Agente processando e-mail...');

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email),
      });

      if (res.ok) {
        setStatus('✅ Sucesso! O ticket apareceu no seu Dashboard.');
        setEmail({ from: '', subject: '', text: '' });
      } else {
        setStatus('❌ Erro na API.');
      }
    } catch (err) {
      setStatus('❌ Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f2f1] flex items-center justify-center p-4 text-[#323130]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-[#edebe9]">
        <h1 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-4">
          <MailIcon className="text-[#0078d4]" /> Simulador de Cliente
        </h1>
        
        <form onSubmit={enviarEmailFake} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">E-mail do Remetente</label>
            <input 
              required type="email" 
              className="w-full p-2 border border-[#edebe9] rounded focus:border-[#0078d4] outline-none text-sm"
              placeholder="exemplo@cliente.com"
              value={email.from}
              onChange={(e) => setEmail({...email, from: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Assunto da Mensagem</label>
            <input 
              required type="text" 
              className="w-full p-2 border border-[#edebe9] rounded focus:border-[#0078d4] outline-none text-sm"
              placeholder="Assunto do e-mail"
              value={email.subject}
              onChange={(e) => setEmail({...email, subject: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Corpo do E-mail</label>
            <textarea 
              required rows={5}
              className="w-full p-2 border border-[#edebe9] rounded focus:border-[#0078d4] outline-none text-sm"
              placeholder="Escreva sua dúvida ou solicitação..."
              value={email.text}
              onChange={(e) => setEmail({...email, text: e.target.value})}
            />
          </div>
          
          <button 
            disabled={loading}
            className={`w-full py-2 rounded font-semibold text-white transition-all flex items-center justify-center gap-2 ${loading ? 'bg-gray-300' : 'bg-[#0078d4] hover:bg-[#106ebe]'}`}
          >
            {loading ? 'Enviando...' : <><Send size={16}/> Enviar para o Agente</>}
          </button>
          
          {status && (
            <div className={`mt-4 p-3 rounded text-xs text-center font-medium ${status.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-gray-50'}`}>
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
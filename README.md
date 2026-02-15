# 🚀 AgentAI: Agente de Vendas Inteligente com Gemini 3 Flash

O **AgentAI** é um ecossistema moderno de gerenciamento de leads e automação de e-mails. Ele utiliza Inteligência Artificial generativa para transformar caixas de entrada desorganizadas em fluxos de trabalho estratégicos, categorizando demandas e sugerindo respostas em tempo real.

---

## 🧠 O Coração do Projeto
O sistema atua como um "cérebro" intermediário para o setor de vendas. Utilizando o modelo **Gemini 3 Flash**, cada e-mail recebido é analisado para extrair a intenção real do cliente, definir prioridades automáticas e preparar uma resposta técnica pronta para ser enviada.

### 🛠️ Tecnologias de Ponta
* **Framework**: Next.js 16 (App Router) com Turbopack para renderização instantânea.
* **Inteligência Artificial**: Google Generative AI (Gemini 3 Flash Preview) via SDK oficial.
* **ORM & Persistência**: Prisma ORM com SQLite para gestão robusta de tickets e histórico.
* **Design & UI**: Tailwind CSS v4 e Lucide React, criando uma experiência "Inbox" de alto nível.

---

## ✨ Funcionalidades Principais

* **Classificação Dinâmica de IA**: O Gemini identifica se o e-mail é de "Vendas", "Suporte" ou "Outros", atribuindo prioridades (Alta, Média, Baixa) com base no conteúdo.
* **Interface Estilo Outlook**: Uma dashboard profissional dividida em três colunas para navegação fluida entre Inbox, Enviados e Arquivados.
* **Sugestões de Resposta**: O agente redige automaticamente uma sugestão de resposta profissional baseada na análise do lead.
* **Gestão de Ciclo de Vida (CRUD)**: Possibilidade de enviar respostas, arquivar tickets ou realizar a exclusão permanente de registros diretamente no banco de dados.
* **Filtros por Pasta**: Sistema reativo que organiza mensagens em pastas específicas de acordo com o status no banco de dados.

---

## 🚀 Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone [https://github.com/ViniciusFroggel/AgentAI.git](https://github.com/ViniciusFroggel/AgentAI.git)
Instale as dependências:

Bash
npm install
Configuração de Ambiente:
Crie um arquivo .env na raiz do projeto (não compartilhe este arquivo) e adicione:

Snippet de código
GOOGLE_GENERATIVE_AI_API_KEY="SUA_CHAVE_AQUI"
DATABASE_URL="file:./dev.db"
Prepare o Banco de Dados (Prisma):

Bash
npx prisma db push
Inicie o Servidor:

Bash
npm run dev
📊 Demonstração de Fluxo Técnico
Ingestão: Um e-mail simulado via PowerShell ou integração de API chega ao endpoint POST.

Análise de IA: O Gemini 3 Flash processa o texto e retorna um JSON estruturado com a categoria, prioridade e resumo.

Persistência: O Prisma salva o ticket no banco de dados com o status inicial "pending".

Visualização: O frontend Next.js reflete o novo lead na Dashboard com etiquetas visuais de prioridade.

Ação: O usuário decide entre Enviar, Arquivar ou Excluir definitivamente o registro.
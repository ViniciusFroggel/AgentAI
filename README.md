# 🚀 AgentAI: Agente de Vendas Inteligente com Gemini 3 Flash

O **AgentAI** é um ecossistema moderno de gerenciamento de leads e automação de e-mails que utiliza Inteligência Artificial generativa para transformar caixas de entrada desorganizadas em fluxos de trabalho estratégicos. O sistema categoriza demandas, define prioridades e sugere respostas em tempo real para otimizar o setor comercial.

---

## 🧠 O Coração do Projeto

O sistema atua como uma camada de inteligência entre o cliente e a empresa. Utilizando o modelo **Gemini 3 Flash**, cada e-mail recebido é analisado para extrair a intenção real do lead, definir prioridades automáticas e preparar uma resposta técnica pronta para ser enviada.

### 🛠️ Tecnologias Utilizadas
* **Framework**: Next.js 16 (App Router) com Turbopack para performance extrema.
* **Inteligência Artificial**: Google Generative AI (Gemini 3 Flash Preview) via SDK oficial.
* **ORM & Persistência**: Prisma ORM com SQLite para gestão robusta de tickets e histórico.
* **Design & UI**: Tailwind CSS v4 e Lucide React, criando uma experiência "Inbox" profissional.

---

## ✨ Funcionalidades Principais

* **Classificação Dinâmica de IA**: Identifica se o e-mail é de "Vendas", "Suporte" ou "Outros", atribuindo prioridades (Alta, Média, Baixa) automaticamente via processamento de linguagem natural.
* **Inbox Estilo Outlook**: Interface profissional dividida em três colunas (pastas, lista e visualização de conteúdo) para navegação intuitiva.
* **Sugestões de Resposta**: Geração automática de textos profissionais baseados na análise estratégica realizada pelo Gemini 3 Flash.
* **Gestão de Ciclo de Vida (CRUD)**: Possibilidade de enviar respostas, arquivar tickets ou realizar a exclusão permanente de registros diretamente no banco de dados através do Prisma.
* **Filtros Reativos**: Organização automática das mensagens nas pastas "Inbox", "Enviados" e "Arquivados" conforme o status atual do registro no banco.

---

## 📊 Demonstração de Fluxo Técnico
Ingestão: Um e-mail simulado é enviado ao endpoint POST da API.

**Análise de IA**: O Gemini 3 Flash processa o texto e retorna um JSON estruturado com categoria, prioridade e sugestão de resposta.

**Persistência**: O Prisma salva o ticket no banco de dados com todos os metadados gerados pela IA.

**Visualização**: O frontend Next.js detecta a mudança e exibe o novo lead na Dashboard com etiquetas visuais de prioridade.

**Ação**: O usuário interage com a interface para enviar a resposta, arquivar o lead ou deletar o registro permanentemente do banco de dados.

<img width="1277" height="929" alt="image" src="https://github.com/user-attachments/assets/7b7eb372-fbac-4a0b-85a5-dd39758e8725" /> **dashboard com o email e a prioridade** dele

<img width="1273" height="937" alt="image" src="https://github.com/user-attachments/assets/cc3c677f-8508-41f4-b0d0-ce5826d093fe" /> **Um pouco sobre a estrutura do projeto**

<img width="1279" height="939" alt="image" src="https://github.com/user-attachments/assets/43702270-f7ed-4def-aee3-d76dc5914b3c" /> **Simulção do envio de um email no powershell**
 ``




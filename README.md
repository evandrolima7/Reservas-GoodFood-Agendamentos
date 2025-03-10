# Gerenciador de Reservas para Restaurantes 🍽️

Aplicação full-stack para gestão de reservas em restaurantes, desenvolvida com React e uma API personalizada. Gerencie reservas de forma eficiente com interface intuitiva e controle em tempo real.

## Funcionalidades ✨

- **Gestão de Reservas**
  - Criar/editar/excluir reservas
  - Registro de detalhes dos clientes (nome, telefone, quantidade)
  - Campo para observações especiais
  - Seleção de data/hora com suporte a fuso horário

- **Dashboard Analítico**
  - Visão geral das reservas em tempo real
  - Estatísticas diárias (reservas/clientes)
  - Gráficos interativos (linhas, pizza, barras)

- **Calendário Inteligente**
  - Visualização diária/semanal/mensal
  - Navegação por datas e acesso rápido ao dia atual
  - Indicadores coloridos de reservas

- **Busca Avançada**
  - Pesquisa por nome
  - Paginação de resultados

- **Autenticação**
  - Registro e login de usuários
  - Autenticação via JWT
  - Rotas protegidas

- **Design Responsivo**
  - Interface mobile-friendly
  - Compatibilidade cross-browser

## Tecnologias Utilizadas 🛠️

**Frontend:**
- React com TypeScript
- Axios para comunicação com API
- date-fns-tz para gestão de fuso horário
- FullCalendar para integração de calendário
- React Router para navegação
- Chart Js para os gráficos
- Componentes UI e modais personalizados

**Backend:**
- API RESTful personalizada ([disponível aqui](https://api-reservas-good-food.onrender.com))
- Autenticação JWT
- Banco de dados MongoDB (inferido dos endpoints)

## Instalação 💻

1. Clone o repositório:

git clone []
cd sistema-reservas-restaurante

Instale as dependências:

npm install
Configure o ambiente:

# Crie um arquivo .env

REACT_APP_API_URL=https://api-reservas-good-food.onrender.com

Inicie o servidor de desenvolvimento:

npm start

## Endpoints da API 🔌
Método	Endpoint	Descrição
POST	/register	Registro de usuário
POST	/login	Autenticação de usuário
GET	/reserva	Listar todas reservas
POST	/reserva	Criar nova reserva
PATCH	/reserva/:id	Atualizar reserva
DELETE	/reserva/:id	Excluir reserva

## Componentes Principais 🧩

Fluxo de Reservas

Formulários com validação

Atualizações em tempo real

Prevenção de conflitos de horários

Sistema de Calendário

Seleção interativa de datas

Indicadores visuais de reservas

Filtragem diária de reservas

Relatórios

Tendências temporais de reservas

Distribuição de tamanho de grupos

Análise de horários de pico

## Configuração ⚙️
Variáveis de ambiente necessárias:

env
Copy
REACT_APP_API_URL=https://api-reservas-good-food.onrender.com
PORT=3000 # Opcional

## Como Contribuir 🤝
Faça um fork do projeto

Crie uma branch para sua feature:

git checkout -b feature/sua-feature-incrivel
Commit suas mudanças:

git commit -m 'Adiciona feature incrível'
Push para a branch:

git push origin feature/sua-feature-incrivel
Abra um Pull Request

Licença 📄
MIT License 
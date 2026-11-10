# Clima Flow · Demo

**Um painel para organizar serviços de climatização, do pedido ao pagamento.**

Esta demonstração pública apresenta o painel do Clima Flow com quatro solicitações fictícias. Permite explorar o fluxo de atendimento sem credenciais ou acesso ao banco da aplicação principal.

## Explore

- Busca e filtros por status e data.
- Detalhes do cliente, equipamento e serviço.
- Alteração de status, agendamento e informações de pagamento.
- Observações internas e cópia de respostas sugeridas.
- Fluxo de WhatsApp simulado, sem abrir contato com pessoas reais.

As alterações ficam na memória da página e são descartadas ao recarregar. Os dados são ilustrativos; nenhum cliente real é consultado. Resumos e respostas de exemplo são textos definidos no código, sem integração com um modelo de IA.

## Executar

Use Node.js 22.12 ou posterior e npm.

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm run build
npm run preview
```

Não é necessário `.env`, chave de API ou Supabase para esta demo.

## Stack e estrutura

**React 19 · JavaScript · Vite · CSS · ESLint**

| Arquivo | Responsabilidade |
|---|---|
| `src/pages/Demo.jsx` | Dados fictícios, filtros e interações do painel |
| `src/App.css` | Estilos do painel |
| `src/main.jsx` | Entrada da aplicação |

## Relação com a aplicação principal

O Clima Flow completo inclui formulários por técnico, autenticação e persistência em Supabase. Seu repositório permanece privado. Este repositório publica somente a experiência de demonstração, com histórico próprio e sem configuração de produção.

## Próximos passos

Separar componentes e regras do domínio para reduzir o tamanho da página; ampliar acessibilidade e adicionar testes dos fluxos de filtros e agendamentos. A compilação desta demo não comprova as políticas de acesso nem o funcionamento do banco da aplicação principal.

---

*Public React showcase for HVAC service management. All sample records are fictional and changes are held in memory.*

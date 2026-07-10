# OKH AutoLedger - Backlog MVP

## Fase 0 - Prototipo atual

Status: concluido.

Entregue:

- Interface visual responsiva.
- Login demonstrativo por perfil.
- Painel do lojista.
- Painel Admin OKH.
- Dados simulados.
- Calculos client-side.
- Fluxos de carros, custos, checklist, vendas e premium.

Limite atual:

- Sem banco real.
- Sem login real.
- Sem upload real.
- Sem persistencia permanente.
- Sem permissoes reais no servidor.

## Fase 1 - Fundacao real

Objetivo: criar a base tecnica do SaaS.

Tarefas:

- Criar projeto Next.js com TypeScript.
- Configurar Supabase.
- Criar variaveis de ambiente.
- Aplicar schema SQL.
- Configurar RLS.
- Criar buckets de storage.
- Criar layout autenticado.
- Criar helper de sessao e perfil.
- Criar middleware de protecao de rotas.

Resultado esperado:

- Usuario loga.
- Sistema identifica papel e `store_id`.
- Redireciona para painel correto.

## Fase 2 - Admin OKH

Objetivo: permitir que a OKH controle lojas e usuarios.

Tarefas:

- Tela real de Dashboard Admin.
- CRUD de lojas.
- Geracao automatica de `store_code`.
- Criacao de usuario dono da loja.
- Edicao de plano.
- Bloqueio/desbloqueio de loja.
- Listagem de usuarios.
- Listagem de carros por loja.

Resultado esperado:

- Admin cria uma loja real.
- Dono da loja consegue acessar somente a propria loja.

## Fase 3 - Painel do Lojista

Objetivo: operar estoque real.

Tarefas:

- Dashboard com metricas reais.
- Lista de carros por `store_id`.
- Cadastro de carro.
- Detalhe do carro.
- Edicao de status.
- Arquivamento de carro.
- Alertas de carro parado, prejuizo e custo acima do previsto.

Resultado esperado:

- Lojista ve estoque real.
- Cada loja enxerga apenas seus dados.

## Fase 4 - Custos e checklist

Objetivo: controlar preparacao e dinheiro investido.

Tarefas:

- CRUD de custos previstos e reais.
- Historico automatico de alteracao financeira.
- CRUD de modelos de checklist.
- Aplicar checklist em carro.
- Criar custos previstos a partir do checklist.
- Kanban de preparacao.

Resultado esperado:

- Sistema responde: quanto ja gastei, quanto vou gastar e o que falta fazer.

## Fase 5 - Vendas e resultado

Objetivo: fechar lucro/prejuizo real.

Tarefas:

- Formulario de venda.
- Preco vendido.
- Data da venda.
- Comissao.
- Desconto.
- Forma de pagamento.
- Calculo de lucro real.
- Margem percentual.
- Historico da venda.

Resultado esperado:

- Sistema responde: qual foi o lucro real depois da venda.

## Fase 6 - Premium Operacional

Objetivo: criar o fluxo de cadastro assistido.

Tarefas:

- Loja cria solicitacao premium.
- Upload de fotos e documentos.
- Admin ve kanban de solicitacoes.
- Admin pede informacao faltando.
- Admin cria carro a partir da solicitacao.
- Admin escolhe checklist.
- Admin publica no painel da loja correta.
- Contagem mensal de carros cadastrados pela OKH.

Resultado esperado:

- OKH consegue vender servico operacional premium.

## Fase 7 - Relatorios

Objetivo: entregar informacao gerencial.

Tarefas:

- Relatorio de estoque atual.
- Relatorio de valor investido.
- Relatorio de lucro por carro.
- Relatorio de lucro mensal.
- Relatorio de custos por categoria.
- Relatorio previsto x real.
- Exportacao CSV.
- Exportacao PDF.
- Exportacao Excel.

Resultado esperado:

- Lojista consegue tomar decisao financeira.
- Admin OKH acompanha receita e operacao global.

## Fase 8 - Polimento e lancamento

Objetivo: deixar pronto para uso com clientes.

Tarefas:

- Revisao mobile.
- Revisao de textos.
- Tratamento de erros.
- Estados vazios.
- Loading states.
- Permissoes por papel.
- Testes basicos.
- Deploy.
- Backup.
- Documentacao de uso.

Resultado esperado:

- Primeiro SaaS real publicado para lojas piloto.

## Prioridade absoluta para nao atrasar

1. Login real.
2. `store_id` real.
3. Cadastro de loja pelo Admin.
4. Cadastro de carro pela loja.
5. Custos previstos e reais.
6. Calculo de lucro/prejuizo.
7. Historico financeiro.

## O que deixar para depois

- App nativo.
- IA complexa.
- Integracao com leilao.
- Marketplace publico.
- Pagamento automatico completo.
- Chat com comprador.
- Financiamento.

## Definicao de pronto do MVP

O MVP esta pronto quando:

- Admin OKH cria loja.
- Loja entra com login real.
- Loja cadastra carro.
- Loja adiciona custos.
- Loja aplica checklist.
- Loja marca venda.
- Dashboard atualiza lucro/prejuizo.
- Admin ve lojas e operacao.
- Dados ficam isolados por `store_id`.

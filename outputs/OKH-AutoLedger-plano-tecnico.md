# OKH AutoLedger - Plano tecnico para virar SaaS real

## Objetivo da proxima fase

Transformar o prototipo visual atual em um SaaS funcional para gestao interna de lojas de carros, mantendo o foco em:

- Multi-tenant por `store_id`.
- Painel do lojista isolado por loja.
- Painel Admin OKH com acesso global.
- Cadastro de carros, custos, checklist, vendas e solicitacoes premium.
- Historico financeiro e logs de atividade.
- Upload real de fotos e documentos.
- Relatorios basicos exportaveis.

## Stack recomendada

### Frontend e backend

Usar **Next.js App Router** com TypeScript.

Motivos:

- Permite telas web responsivas e rotas protegidas.
- API Routes / Server Actions para criar, editar e consultar dados.
- Facil deploy em Vercel.
- Boa base para evoluir depois para app mobile ou PWA.

### Banco, autenticacao e arquivos

Usar **Supabase**:

- PostgreSQL para dados.
- Supabase Auth para login.
- Row Level Security para isolamento por loja.
- Supabase Storage para fotos, documentos, recibos e contratos.

### ORM ou acesso a dados

Opcoes:

1. Supabase client direto, mais simples para MVP.
2. Prisma, melhor se o sistema crescer bastante e precisar de camada de dominio mais formal.

Para a primeira versao real, recomendo Supabase client + SQL bem definido.

## Estrutura do sistema real

```text
app/
  login/
  loja/
    dashboard/
    carros/
    carros/[vehicleId]/
    entrada/
    preparacao/
    custos/
    vendas/
    solicitacoes/
    relatorios/
    configuracoes/
  admin/
    dashboard/
    lojas/
    lojas/nova/
    planos/
    usuarios/
    solicitacoes-premium/
    cadastros-assistidos/
    carros-por-loja/
    pagamentos/
    relatorios/
    configuracoes/
components/
  layout/
  cards/
  vehicles/
  costs/
  checklist/
  admin/
lib/
  supabase/
  auth/
  permissions/
  money/
  calculations/
  audit/
database/
  schema.sql
  policies.sql
```

## Autenticacao e perfis

Perfis iniciais:

- `okh_admin_master`
- `okh_operator`
- `store_owner`
- `store_employee`
- `read_only`

Regra principal:

- Admin OKH ve tudo.
- Operador OKH ve fluxo operacional e cadastro assistido.
- Usuario de loja ve apenas dados do proprio `store_id`.
- Somente leitura nao altera dados.

## Multi-tenant

Todas as tabelas operacionais devem ter `store_id`:

- users/profile
- vehicles
- vehicle_costs
- vehicle_checklist_items
- checklist_templates
- cost_presets
- tire_presets
- premium_requests
- files
- activity_logs
- payments

Nenhuma consulta do painel da loja pode ser feita sem filtro de `store_id`.

## Regra de seguranca fundamental

O isolamento nao deve depender so do frontend.

Tambem deve existir:

- Row Level Security no banco.
- Validacao de permissao no servidor.
- Logs para alteracoes financeiras.
- Arquivamento em vez de exclusao definitiva.

## Calculos oficiais

```text
total_estimated_costs = soma(vehicle_costs.estimated_value)
total_actual_costs = soma(vehicle_costs.actual_value)
estimated_total_investment = purchase_price + total_estimated_costs
actual_total_investment = purchase_price + total_actual_costs
estimated_profit = advertised_price - estimated_total_investment
actual_profit = sold_price - actual_total_investment
margin_percentage = actual_profit / sold_price * 100
days_in_stock = current_date - entry_date
```

Para carros ainda nao vendidos, a interface deve mostrar lucro previsto.
Para carros vendidos, deve priorizar lucro real.

## Logs obrigatorios

Gerar log quando houver:

- Criacao de loja.
- Criacao de usuario.
- Cadastro de carro.
- Alteracao de valor de compra.
- Alteracao de custo previsto.
- Alteracao de custo real.
- Alteracao de preco anunciado.
- Alteracao de preco minimo.
- Venda.
- Arquivamento.
- Bloqueio/desbloqueio de loja.
- Publicacao de cadastro premium.

Toda alteracao financeira deve salvar:

- Valor antigo.
- Valor novo.
- Usuario.
- Data e hora.
- Motivo, se informado.

## Uploads

Buckets sugeridos no Supabase Storage:

- `vehicle-photos`
- `vehicle-documents`
- `premium-request-files`
- `receipts`

Estrutura de caminho:

```text
store/{store_id}/vehicles/{vehicle_id}/photos/{file}
store/{store_id}/vehicles/{vehicle_id}/documents/{file}
store/{store_id}/premium_requests/{request_id}/{file}
```

## Relatorios MVP

Primeira leva:

- Estoque atual.
- Valor investido em estoque.
- Lucro por carro.
- Lucro mensal.
- Carros vendidos no mes.
- Carros parados acima de 60 dias.
- Custos por categoria.
- Diferenca previsto x real.
- Ranking de lucro.
- Ranking de prejuizo.

Exportacao:

- CSV primeiro.
- PDF depois.
- Excel depois.

## Ordem recomendada de construcao

1. Criar projeto Next.js.
2. Configurar Supabase.
3. Criar schema SQL e RLS.
4. Criar login real.
5. Criar layout autenticado.
6. Migrar tela de Dashboard da Loja.
7. Migrar lista/cadastro/detalhe de carros.
8. Implementar custos e checklist.
9. Implementar venda.
10. Implementar Admin OKH.
11. Implementar solicitacoes premium.
12. Implementar uploads.
13. Implementar relatorios.
14. Revisar permissoes e logs.

## Primeiro MVP funcional

O primeiro MVP deve permitir:

- Admin OKH criar loja.
- Admin OKH criar usuario dono.
- Dono da loja entrar.
- Dono da loja cadastrar carro.
- Dono da loja adicionar custos.
- Dono da loja aplicar checklist.
- Dono da loja marcar carro como vendido.
- Dashboard recalcular estoque, investimento e lucro.
- Admin OKH ver todas as lojas e carros.

Isso ja valida o negocio central.

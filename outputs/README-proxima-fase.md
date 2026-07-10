# OKH AutoLedger - Proxima fase

Este pacote tem duas partes:

1. **Prototipo visual**
   - `index.html`
   - `styles.css`
   - `app.js`
   - `assets/`

2. **Base para transformar em SaaS real**
   - `OKH-AutoLedger-plano-tecnico.md`
   - `okh-autoledger-schema.sql`
   - `OKH-AutoLedger-backlog-MVP.md`

## O que fazer primeiro

1. Ler `OKH-AutoLedger-plano-tecnico.md`.
2. Criar projeto real em Next.js.
3. Criar projeto no Supabase.
4. Aplicar `okh-autoledger-schema.sql`.
5. Implementar login real e perfis.
6. Migrar o prototipo tela por tela para o projeto real.

## Decisao tecnica sugerida

Para o MVP, usar:

- Next.js
- TypeScript
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Row Level Security

## Primeiro objetivo real

Fazer o fluxo minimo funcionar:

- Admin OKH cria loja.
- Loja faz login.
- Loja cadastra carro.
- Loja adiciona custos.
- Loja aplica checklist.
- Loja marca venda.
- Dashboard calcula lucro/prejuizo real.

Quando isso estiver funcionando, o OKH AutoLedger deixa de ser prototipo e vira MVP operacional.

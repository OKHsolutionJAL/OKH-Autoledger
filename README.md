# OKH AutoLedger SaaS

Base real em Next.js para evoluir o prototipo aprovado em `outputs/`.

## Rodar local

```bash
pnpm install
pnpm run dev
```

Abra `http://localhost:3000`.

Se a porta 3000 ja estiver ocupada:

```bash
pnpm run dev:3001
```

Abra `http://127.0.0.1:3001/login?locale=pt`.

## Estrutura

- `src/app/login` - entrada demonstrativa por perfil.
- `src/app/loja/dashboard` - dashboard multi-tenant da loja.
- `src/app/loja/carros` - estoque da loja.
- `src/app/admin/dashboard` - visao global OKH.
- `src/lib` - dominio, dados demo, calculos, i18n, auth e Supabase.
- `database/schema.sql` - schema inicial para Supabase/Postgres.

## Proximo encaixe

1. Criar projeto Supabase.
2. Rodar `database/schema.sql`.
3. Preencher `.env.local`.
4. Trocar os repositorios demo por consultas reais.

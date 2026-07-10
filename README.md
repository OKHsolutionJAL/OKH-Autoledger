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

- `src/app/login` - login real por email/senha com Supabase Auth, com demo como fallback.
- `src/app/loja/dashboard` - dashboard multi-tenant da loja.
- `src/app/loja/carros` - estoque da loja.
- `src/app/admin/dashboard` - visao global OKH.
- `src/lib` - dominio, dados demo, calculos, i18n, auth e Supabase.
- `database/schema.sql` - schema inicial para Supabase/Postgres.

## Supabase Auth

O app usa `@supabase/ssr` para gravar a sessao em cookies do Next.js.

Variaveis locais:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_OKH_DEMO_MODE=true
```

Para um login real funcionar, crie o usuario em Supabase Auth e adicione uma linha em `public.profiles` com o mesmo `id` do usuario.

## Proximo encaixe

1. Criar usuarios reais em Supabase Auth.
2. Vincular cada usuario na tabela `profiles`.
3. Trocar repositorios demo por consultas reais.
4. Desativar `NEXT_PUBLIC_OKH_DEMO_MODE`.

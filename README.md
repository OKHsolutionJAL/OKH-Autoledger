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
- `src/app/cadastro` - cadastro de nova loja e usuario dono.
- `src/app/recuperar-senha` - envio do email de recuperacao de senha.
- `src/app/redefinir-senha` - troca da senha depois do link de recuperacao.
- `src/app/perfil` - perfil do usuario logado e loja vinculada.
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
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3001
NEXT_PUBLIC_OKH_DEMO_MODE=true
```

O cadastro novo usa Supabase Auth e o gatilho `private.handle_new_user()` para criar automaticamente a loja em `public.stores` e o perfil dono em `public.profiles`.

## Proximo encaixe

1. Configurar os templates de email no Supabase Auth com a URL publica.
2. Trocar os modulos restantes de demo por consultas reais.
3. Desativar `NEXT_PUBLIC_OKH_DEMO_MODE`.

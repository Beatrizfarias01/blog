# Blog Pessoal — Beatriz Faria

Blog pessoal fullstack desenvolvido do zero com Next.js, TypeScript, Prisma e PostgreSQL.

## 💡 Sobre o projeto

Projeto desenvolvido para portfólio, com foco em boas práticas de arquitetura fullstack utilizando o App Router do Next.js. O sistema conta com área pública para leitura dos posts e painel administrativo protegido para gerenciamento de conteúdo.

## ✨ Funcionalidades

- Listagem de posts publicados na home
- Página individual de cada post com rota dinâmica por slug
- Painel admin protegido por autenticação
- Criar, editar e deletar posts
- Login e logout com NextAuth (JWT)
- Geração automática de slug a partir do título

## 🛠️ Tecnologias

- **Next.js 15** — App Router, SSR, SSG, rotas dinâmicas
- **TypeScript** — tipagem em todo o projeto
- **Prisma ORM** — modelagem de banco, migrations e queries
- **PostgreSQL** (Neon) — banco de dados em nuvem
- **NextAuth.js** — autenticação com JWT e Credentials Provider
- **Tailwind CSS** — estilização
- **Vercel** — deploy e hospedagem

## 🚀 Como rodar localmente

\```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/blog.git
cd blog

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Preencha o .env com suas credenciais

# Rode as migrations
npx prisma migrate dev

# Inicie o servidor
npm run dev
\```

##  Estrutura

\```
app/
  page.tsx              → Home (listagem de posts)
  posts/[slug]/         → Página individual do post
  admin/                → Painel administrativo
  api/                  → Rotas de API (CRUD de posts + autenticação)
lib/
  prisma.ts             → Cliente Prisma reutilizável
  auth.ts               → Configuração do NextAuth
prisma/
  schema.prisma         → Modelagem do banco de dados
\```

##  Autora
**Beatriz Faria** — estudante de Eng. da Computação na FAINOR, apaixonada por desenvolvimento fullstack.
**Beatriz Faria** — estudante de [seu curso] na FAINOR, apaixonada por desenvolvimento fullstack.

[GitHub](https://github.com/SEU_USUARIO)

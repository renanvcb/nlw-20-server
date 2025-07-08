# NLW Agents

Projeto **NLW Agents** desenvolvido durante um evento da [Rocketseat](https://rocketseat.com.br/).

## Tecnologias e Bibliotecas Utilizadas

- **Node.js** + **TypeScript**
- [Fastify](https://fastify.dev/) — API HTTP
- [Zod](https://zod.dev/) — Validação de dados
- [Drizzle ORM](https://orm.drizzle.team/) — ORM para PostgreSQL
- [drizzle-seed](https://github.com/arthurfiorette/drizzle-seed) — Seed de dados
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados
- [pgvector](https://github.com/pgvector/pgvector) — Extensão para vetores no PostgreSQL
- [Biome](https://biomejs.dev/) — Lint e formatação

## Padrões de Projeto

- Organização por domínio (`src/db`, `src/http`)
- Validação de ambiente e dados com Zod
- Separação de rotas e schemas do banco

## Setup e Configuração

1. **Clone o repositório:**

```sh
git clone https://github.com/renanvcb/nlw-20-server.git
cd nlw-20-server
```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Configure o banco de dados:**

   - Copie `.env.example` para `.env` e ajuste as variáveis.
   - Suba o banco com Docker:
     ```sh
     docker-compose up -d
     ```

4. **Rode as migrations e seed:**

   ```sh
   npx drizzle-kit migrate
   ```

   ```sh
   npm run db:seed
   ```

5. **Inicie o servidor em modo desenvolvimento:**
   ```sh
   npm run dev
   ```

---

> Projeto criado para fins educacionais durante o NLW da Rocketseat.

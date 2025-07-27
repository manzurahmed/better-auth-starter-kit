# PROJECT SETUP

YouTube Link: [https://www.youtube.com/watch?v=UKfVG8zBteM]
Completed: 1:48:15

```bash
pnpm self-update
pnpm create next-app better-auth-starter-kit

pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input label card form sonner

pnpm install react-hook-form
pnpm i zod
pnpm i @hookform/resolvers/zod
pnpm install lucide
```

# Better Auth

Every user in the website must go through middleware.ts. It is like the gatekeeper.
In each and every pages that you want to be protected, you have to use the session to make sure that the user is permitted to view the pages in question.

If, for example, someone bypasses the middleware, he/she is still needed to be verified for authentication.

[https://www.better-auth.com/docs/installation]

```bash
pnpm add better-auth
```

## Set Environment variable

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

## Create A Better Auth Instance in lib/auth.ts file

```javascript
import db from "@/lib/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
});
```

## Configure Database

I shall use Prisma ORM. Replace _lib/auth.ts_ with the following code:

```javascript
import db from "@/lib/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
});
```

## Instal Prisma Adapter

[https://www.prisma.io/docs/guides/nextjs]

```bash
pnpm add prisma --save-dev
pnpm add @prisma/client

# I am using PostgreSql. So, simply run the following command:
npx prisma init
```

## Set up Prisma Client

Create a file "db.ts" file in the "lib" folder and add the following code:

```javascript
import { PrismaClient } from '../lib/generated/prisma';

const globalForPrisma = global as unknown as {
	prisma: PrismaClient
}

const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = db;
}

export default db;
```

[IMPORTANT]

Since as configured in the schema.prisma file, generated Prisma Client will be written in the _../lib/generated/prisma_ folder, the same path _must_ be provided in the db.ts file.

## Create Database Tables

```bash
npx @better-auth/cli generate
```

## SUPABASE DATABASE

- Go to supabase website, create a project and copy the password of the database.
  DBPW: qhPfTtVc7soLKayw
- Next, press the "Connect" button (at the top of the Supabase website).
- Copy DATABASE_URL and paste in the .env file.
- Copy the following Prisma ORM's code and replace with the following in the schema.prisma file:

```javascript
generator client {
  provider = "prisma-client-js"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

## Migration

Migration means, pushing our schema.prisma to Supabase database.

```bash
npx prisma migrate dev --name init
```

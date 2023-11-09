### How to use Prisma?

1. install prisma

```sh
npm i --save-dev prisma
```

2. init prisma

```sh
npx prisma init --datasource-provider mysql
```

- creates prisma dir (with schema.prisma) and end with DATABASE_URL

the Schema Prisma

```sh
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
}
```

generator is what the code is generated into, namely, when we make the model, subsequently, this will need to transform into cmd like commands for the actual DB to understand. 

3. add a Model to Schema

```sh
//Schema Prisma

generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
}

model User {
    id   Int    @id @default(autoincrement())
    name String
}
```

4. migrate changes of Prisma schema to DB (apply model User)

```sh
npx prisma migrate dev --name init
```

Creates a brand new migration and triggers npx prisma generate which, in turn, creates the Prisma Client 
( logs >> Generated Prisma Client);

**to sum it up**: we migrated (synchronised our Client and DB) while also actually initializing the Prisma Client

in 2. I said that the client schema produces code that will be executed low-level as a DB query, in our model User case that is:

migrations/123123123213_init/migration.sql

```sh
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
)
```

5. enable the use of this newly created Prisma Client:

```sh
npm i @prisma/client
```

(
    logs >> You can now start using Prisma Client
    import { PrismaClient } from '@prisma/client'
    const prisma = new PrismaClient()
)

6. query (note that we write data as key as a rule)

```sh
prisma.user.create({ data: {name: "Kyle"}})
```

for more [see](https://youtu.be/RebA5J-rlwg)
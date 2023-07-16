[good tutorial on docs basics](https://www.youtube.com/watch?v=RebA5J-rlwg)

npm init

npm i --save-dev prisma typescript ts-node @types/node nodemon

tsconfig.json
```sh
{
    "CompilerOptions": {
        "sourceMap": true,
        "outDir": "dist",
        "strict": true,
        "lib": ["esnext"],
        "esModulesInterop": true
    }
}
```


npx prisma init --datasource-provider [database/mongodb/postgresql]

install prisma extansion for vscode

add:

```sh
"[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma",
    "editor.formatOnSave": true
},
```


to setting.json


[schema.prisma](https://www.prisma.io/docs/concepts/components/prisma-schema)

generator is what your code is generated into (based on the default "prisma-client-js" formatter)

datasource: provider is where your data comes from, url is where specifically the db comes from via url NB, url end word must be of an actual db on the pc: localhost:5433/test, test needs to be a real db on the pc 

datasource s

```sh
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}

model User {
    id Int @id @default(autoincrement())
    name String
}
```

MERE definition of prisma schema does not do anything with the database,
you need to tell prisma to apply the schema to the DB -> migrate

npx prisma migrate dev --name init

the code above creates a new migration file which interacts with postgresql db

in summary prisma end goal is to generate client, which is the code that is going to be used to interact with your DB.

migration.sql

```sh
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
)
```
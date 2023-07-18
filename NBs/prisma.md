[docs basics](https://www.prisma.io/docs/concepts/overview/what-is-prisma)

[Prisma CLI commands](https://www.prisma.io/docs/reference/api-reference/command-reference#prisma-migrate)

[Starting SQL project from scratch](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)

--save-dev === -D

@Unique

In Prisma, there are multiple ways to define unique values for fields in your data model. Here are some of the ways to write unique values in Prisma:

1. Using @@unique directive: You can use the @@unique directive to mark a field or a combination of fields as unique. This directive is placed above the field definition in your Prisma schema. For example:

```sh
model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  username  String  @unique
  // other fields...
}
```
In the above example, both the email and username fields are marked as unique using the @unique attribute.

2. Using @unique attribute: Alternatively, you can use the @unique attribute directly on a field to make it unique. This attribute is placed next to the field definition in your Prisma schema. For example:

```sh
model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  username  String  @unique
  // other fields...
}
```

In this case, the email and username fields are marked as unique using the @unique attribute.

3. Using @unique attribute with composite keys: If you want to define a unique constraint on a combination of fields, you can use the @unique attribute with a list of fields. For example:

```sh
model User {
  id        Int     @id @default(autoincrement())
  email     String
  username  String
  @@unique([email, username])
  // other fields...
}
```
In this example, the combination of the email and username fields is marked as unique using the @@unique directive.





@Relation

How do relations work in prisma

Relations in Prisma define the connections between models in your data schema. They allow you to establish and navigate relationships between different entities. Here's an overview of how relations work in Prisma:

1. Defining Relations:
- You can define relations in your Prisma schema using the @relation attribute. This attribute is placed next to the field that represents the relation.
- The @relation attribute takes several arguments to specify the fields involved in the relation, such as fields and references. These arguments define the connection between the models.
- For example, consider a one-to-many relation between the User and Post models. The User model has a field posts of type Post[], and the Post model has a field author of type User. To define this relation, you can use the @relation attribute as follows:
```sh
     model User {
       id    Int    @id @default(autoincrement())
       posts Post[]
     }

     model Post {
       id       Int  @id @default(autoincrement())
       author   User @relation(fields: [authorId], references: [id])
       authorId Int
     }
```

In this example, the author field in the Post model is related to the id field in the User model using the @relation attribute.

2. Relation Modes:
- Prisma supports two relation modes: prisma and mongo.
- The prisma relation mode is the default mode for relational databases and enforces relations between records at the database level using foreign keys. The foreign key constraints and referential actions are handled by the database.
- The mongo relation mode is used for MongoDB and emulates relations in Prisma Client without relying on foreign keys in the database. Prisma handles the referential actions and constraints internally.
- You can set the relation mode in your Prisma schema using the relationMode field in the datasource block. For example:

```sh
datasource db {
    provider     = "mysql"
    url          = env("DATABASE_URL")
    relationMode = "prisma"
}
```


3. Working with Relations in Prisma Client:
- Prisma Client, which is generated from your Prisma schema, provides a fluent API for querying and manipulating data, including relations.
- You can perform nested reads (eager loading) to fetch related data using the include directive. For example, to fetch a user and their posts, you can use:

```sh
const userWithPosts = await prisma.user.findUnique({
    where: { id: userId },
    include: { posts: true },
});
```


Prisma Client also provides methods for creating and updating records with relations. For example, to create a new post for a user, you can use:

```sh
const newPost = await prisma.post.create({
    data: {
        title: "New Post",
        author: { connect: { id: userId } },
    },
});
```


These are the basic concepts and steps involved in working with relations in Prisma. You can refer to the sources mentioned above for more detailed explanations and examples.


Comparison with Mongoose in one-to-many relation (mongoose only has a field in the child, prisma has for child and parent):

```sh
// schema.prisma

model Author {
  id        Int      @id @default(autoincrement())
  name      String
  age       Int
  books     Book[]
}

model Book {
  id        Int      @id @default(autoincrement())
  title     String
  genre     String
  author    Author   @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

```sh
//mongoose

// Author model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number,
});

const Author = mongoose.model('Author', authorSchema);

// Book model
const bookSchema = new Schema({
  title: String,
  genre: String,
  author: { type: Schema.Types.ObjectId, ref: 'Author' }, // Reference to the Author model
});

const Book = mongoose.model('Book', bookSchema);
```

In Mongoose, you can  represent the owner of the relationship by creating a reference to the parent model in the child model using the **ref** property, and in Prisma, you achieve this through the Author model's books **field**.
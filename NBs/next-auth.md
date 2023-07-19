[next-auth for prisma](https://authjs.dev/reference/adapter/prisma)

[NEXT Auth does not support app/api](https://next-auth.js.org/configuration/nextjs#in-app-directory)

why do we use it here - to seamlessly provide custom and Google, Github credentials to the prisma DB we use.
BUT 
It comes with the constraint that users authenticated in this manner are not persisted in the database, and consequently that the Credentials provider can only be used if JSON Web Tokens are enabled for sessions.
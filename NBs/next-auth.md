[next-auth for prisma](https://authjs.dev/reference/adapter/prisma)

[NEXT Auth does not support app/api](https://next-auth.js.org/configuration/nextjs#in-app-directory)

[good video for basics](https://youtu.be/AbUVY16P4Ys)

why do we use it here - to seamlessly provide custom and Google, Github credentials to the prisma DB we use.
BUT 
It comes with the constraint that users authenticated in this manner are not persisted in the database, and consequently that the Credentials provider can only be used if JSON Web Tokens are enabled for sessions.

getServerSession
direct communication with the DB via our server component, thus, no need for error handling since there is not API call, we are using Next Server Components. Our app is also the BE, traditional case would be that we have a service that sends a request to BE and BE makes an inquiry in the DB, but with Server Component we skip the first step.
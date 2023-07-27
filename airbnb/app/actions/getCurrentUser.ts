import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/app/libs/prismadb';

// abstraction for readability
export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();
        // best practice to check if session exists, not directly return user which will be undefined if no-one is logged in
        if(!session?.user?.email){
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string //as string assertion because we want to tell ts what to expect, we know better in this case
            }
        })

        if(!currentUser){
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }; //to avoid possible error that object cannot be of type Date, but remember to change the User you are importing via primsa, too

    } catch (error: any) {
        return null; //we throw no errors so that if no user is currenlty available in DB, we dont breakt the code, no error handling since we are in Server Component and it is a direct communcation with DB, no API calls (meaning a service that requests in BE and BE requests in DB )
    }
}


// NB, no need for try catch since it is not an API call: see docs https://next-auth.js.org/configuration/nextjs#getserversession
// When calling from server-side i.e. in API routes or in getServerSideProps, 
// we recommend using this function instead of getSession to retrieve the session object. 
// This method is especially useful when you are using NextAuth.js with a database. 
// This method can drastically reduce response time when used over getSession on server-side, 
// due to avoiding an extra fetch to an API Route (this is generally not recommended in Next.js).
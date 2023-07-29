import prisma from '@/app/libs/prismadb'

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy:{
                createdAt:'desc'
            }
        });
        // WARNING: ONLY PLAIN OBJECTS CAN BE PASSED TO THE CLIENT COMPONENT FROM SERVER COMPONENT, DATE OBJECTS ARE NOT SUPPORTED 
        const safeListings = listings.map((listing)=>({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;

    } catch (error: any) {
        throw new Error(error)
    }
}

// we cannot just return listings, but safeListings
// we also need a new type
// see app/types
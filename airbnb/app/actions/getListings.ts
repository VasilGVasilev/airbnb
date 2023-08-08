import prisma from '@/app/libs/prismadb'

export interface IListingsParams {
    userId?: string;
}

export default async function getListings(
    params: IListingsParams
) {
    try {
        const { userId } = params;
        
        let query: any = {};

        if (userId){
            query.userId = userId;
        }

        const listings = await prisma.listing.findMany({
            where: query,
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
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
            where: query, //If you put where: {} (the case where we are not filtering but just starting home page with all listings) in the findMany method in Prisma, it will return all the records in the table. This is because the where clause is used to filter the results of the query, and if you don't specify any conditions, then all the records will be returned.
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
import prisma from '@/app/libs/prismadb'

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}
  

export default async function getListings(
    params: IListingsParams
) {
    try {
        const {
            userId,
            roomCount, 
            guestCount, 
            bathroomCount, 
            locationValue,
            startDate,
            endDate,
            category,
        } = params;
        
        let query: any = {};
        

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount //'gte' - greater than or equal, '+' - transforms the roomCount from a string to a definite number 
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = { // .NOT we want all but the following:
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            }, //exclude all startDates
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            } //exclude all endDates
                        ] // filter out all conflicts in reservations
                    }
                }
            }
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

// NB

// we cannot just return listings, but safeListings
// we also need a new type
// see app/types

// gte - Get all Post records where likes is greater than or equal to 9

// const getPosts = await prisma.post.findMany({
//     where: {
//       likes: {
//         gte: 9,
//       },
//     },
//  })
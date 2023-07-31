import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params: IParams
) {
    try {
        const { listingId } = params;

        // no need for checks for currentUser, etc, because this is not an API route

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true //includes User model to Listing
            }
        })

        if(!listing){
            return null;
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toString(),
                updatedAt: listing.user.updatedAt.toString(),
                emailVerified:
                    listing.user.emailVerified?.toString() || null, //might be null thus the '?' and defaulting to '|| null'
            }
        }

    } catch (error: any) {
        throw new Error(error)
    }
}

// NB 
// sanitize listing
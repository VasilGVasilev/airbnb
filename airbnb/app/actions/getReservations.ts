import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(
    params: IParams
) {

    try {

        const { listingId, userId, authorId } = params;

        const query: any = {};

        // depending on the input via params we have different query object

        // all resservation by listingId
        if (listingId) {
            query.listingId = listingId;
        }

        // all trips user has
        if (userId) {
            query.userId = userId;
        }

        // all reservation other users made for our listings
        if (authorId) {
            query.listing = { userId: authorId };
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        // mind that if return reservation directly we have DateObjects which are not plain objects, thus:

        const safeReservations = reservations.map(
            (reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString(),
                }
            })
        )

        return safeReservations;

    } catch (error: any) {
        throw new Error(error)
    }
}
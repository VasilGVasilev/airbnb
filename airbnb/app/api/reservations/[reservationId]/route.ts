import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

// DELETE is a subaction of create, create reservation is on /reservations/, delete is on /reservations/someId

interface IParams {
    reservationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string'){
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: { //where reservationId && userId: currentUser.id || reservationId && listing: { userId: currentUser.id }
            id: reservationId,
            OR: [
                { userId: currentUser.id}, 
                { listing: { userId: currentUser.id } }
            ]
        } // deleted is the reservation either by user that has made the reservation -> userId: currentUser.id; or the user that made the listing -> listing: { userId: currentUser.id }
    })

    return NextResponse.json(reservation);
}

import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

// this handles the DB update - BE 

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;
    
    if(!listingId || !startDate || !endDate || !totalPrice){
        return NextResponse.error();
    }

    // update current listing and create a new reservation in DB
    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: { //update listing by creating a new reservation that is also saved into current listing
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    });

    return NextResponse.json(listingAndReservation);
}

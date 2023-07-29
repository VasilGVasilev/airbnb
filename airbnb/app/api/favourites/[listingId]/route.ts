import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"

interface IParams {
    listingsId?: string;
}

export async function POST(
    request: Request,
    { params }: {params: IParams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }
    
    const { listingsId } = params;

    if(!listingsId || typeof listingsId !== 'string'){
        throw new Error('Invalid ID');
    }

    // create favs out of extracted user favs
    let favouriteIds = [...(currentUser.favouriteIds || [])]

    // add to favs
    favouriteIds.push(listingsId);

    // update DB with new favs array
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds: favouriteIds
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingsId } = params;

    if(!listingsId || typeof listingsId !== 'string'){
        throw new Error('Invalid ID');
    }
    
    // create favs out of extracted user favs
    let favouriteIds = [...(currentUser.favouriteIds || [])]

    // create a shallow copy without the filtered listingsId
    favouriteIds = favouriteIds.filter((id)=>id !== listingsId);

    // update DB with new favs array
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteIds
        }
    });

    return NextResponse.json(user);
}

// NB BEST PRACTICE TO clone arrays when copying    let favouriteIds = [...(currentUser.favouriteIds || [])]
// (currentUser.favouriteIds || []) will check if first arg is truthy and if so use its value, if not use an empty array value
// the spread syntax is necessary so that favouriteIds are a copy of the array, not a reference,
// BUT mind that spread syntax is making a shallow copy. see https://dev.to/vasilgvasilev/copying-an-array-in-javascript-2dg3
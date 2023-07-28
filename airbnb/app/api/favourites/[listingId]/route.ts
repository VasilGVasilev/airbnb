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

    let favoriteIds = [...(currentUser.favouriteIds || [])]

}

// NB BEST PRACTICE TO clone arrays when copying    let favoriteIds = [...(currentUser.favouriteIds || [])]
// (currentUser.favouriteIds || []) will check if first arg is truthy and if so use its value, if not use an empty array value
// the spread syntax is necessary so that favoriteIds are a copy of the array, not a reference,
// BUT mind that spread syntax is making a shallow copy. see https://dev.to/vasilgvasilev/copying-an-array-in-javascript-2dg3
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import React from 'react'

interface ListingClientProps{
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser;
    }; //see in getListingById.ts we include user into listing via prisma 'include:'
    currentUser?: SafeUser | null;
}


const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser
}) => {
    return (
        <div>
            Listing client
        </div>
    )
}

export default ListingClient

// & in a type position means intersection type
// https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
// https://stackoverflow.com/questions/38317625/what-does-the-ampersand-mean-in-a-typescript-type-definition
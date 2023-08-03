'use client'

import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SafeUser } from '@/app/types';
import Container from '@/components/Container';
import ListingHead from '@/components/listings/ListingHead';
import ListingInfo from '@/components/listings/ListingInfo';
import { categories } from '@/components/navbar/Categories';
import { Reservation } from '@prisma/client';
import { eachDayOfInterval } from 'date-fns'; //https://date-fns.org/v2.30.0/docs/eachDayOfInterval
import { useRouter } from 'next/navigation';
import { useMemo } from 'react'

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingClientProps{
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser;
    }; //see in getListingById.ts we include user into listing via prisma 'include:'
    currentUser?: SafeUser | null;
}


const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [], //set a default value to be an array so that you can safely run .find(), .map() without errors
    currentUser
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(()=>{
        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })
        })
    },[])

    const category = useMemo(()=>{
        return categories.find((item)=> item.label === listing.category)
    }, [listing.category]); //match DB category with default categories stored in a const

    return (
        <Container>
            <div className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col gap-6'>
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div
                        className='
                            grid
                            grid-cols-1
                            md:grid-cols-7
                            md:gap-10
                            mt-6
                        '
                    >
                        <ListingInfo
                            user={listing.user}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            category={category}
                            locationValue={listing.locationValue}
                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient

// NB

// & in a type position means intersection type
// https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
// https://stackoverflow.com/questions/38317625/what-does-the-ampersand-mean-in-a-typescript-type-definition

// max-width
// If the image is larger than its parent element. By using max-width: 100% , the width of the image won't exceed the width of its parent.
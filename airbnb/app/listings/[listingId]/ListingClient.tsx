'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';

import { useCallback, useEffect, useMemo, useState } from 'react'

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';

import Container from '@/components/Container';
import ListingHead from '@/components/listings/ListingHead';
import ListingInfo from '@/components/listings/ListingInfo';
import ListingReservation from '@/components/listings/ListingReservation';

import { categories } from '@/components/navbar/Categories';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'; //https://date-fns.org/v2.30.0/docs/eachDayOfInterval
import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingClientProps {
    reservations?: SafeReservation[];
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

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })
            dates = [...dates, ...range];
        })

        return dates;
    }, [reservations])


    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange); // due to error on value inside setDateRange down in ListingReservation:
    // The error: Argument of type 'Range' is not assignable to parameter of type 'SetStateAction<{ startDate: Date; endDate: Date; key: string; }>'.


    const onCreateReservation = useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }
        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
            .then(()=>{
                toast.success('Listing reserved!');
                setDateRange(initialDateRange);
                //redirect to /trips
                router.refresh();
            })
            .catch(()=>{
                toast.error('Something went wrong!');
            })
            .finally(()=>{
                setIsLoading(false);
            })
    },[
        totalPrice,
        dateRange,
        listing?.id,
        router,
        currentUser,
        loginModal
    ])

    // to update total price depending on user selection of dates on calendar
    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    },[dateRange, listing.price])

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
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
                        <div
                            className='
                                order-first
                                mb-10
                                md:order-last
                                md:col-span-3
                            '
                        >
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value)=> setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
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
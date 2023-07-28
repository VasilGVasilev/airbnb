'use client'

import useCountries from "@/app/hooks/useCountries";
import { useRouter } from "next/navigation";

import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

interface ListingCardProps {
    data: Listing; //cool that prisma client provides us with the object out of the model 
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser
}) => {

    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);//we only store the name of the location in DB, but we can use this to search in the whole array of country objects
    
    const handleCancel = useCallback((
        e: React.MouseEvent<HTMLButtonElement>
    )=>{
        e.stopPropagation();

        if(disabled){
            return;
        }
        
        onAction?.(actionId);
    }, [onAction, actionId, disabled])

    const price = useMemo(()=>{
        if (reservation){
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation, data.price])

    const reservationDate = useMemo(()=>{
        if(!reservation){
            return null;
        }
        
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation])
     
    return (
        <div>

        </div>
    )
}

export default ListingCard

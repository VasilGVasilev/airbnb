'use client'

import useCountries from "@/app/hooks/useCountries";
import { useRouter } from "next/navigation";

import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";

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
    actionId,
    currentUser
}) => {

    const router = useRouter();
    const { getByValue } = useCountries();

    return (
        <div>

        </div>
    )
}

export default ListingCard

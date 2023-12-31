import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/components/ClientOnly";

interface IParams {
    listingId?: string;
}

const ListingPage = async (
    {params} : { params: IParams}
) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing){
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    } // to catch -> 'listing' is possibly 'null'. 
    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage;

// NB
// listing.title cannot be catched with '?' listing?.title so need to check if listing is null and have an alternative component



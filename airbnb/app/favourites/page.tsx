import EmptyState from "@/components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";
import FavouritesClient from "./FavouritesClient";
import ClientOnly from "@/components/ClientOnly";



const ListingPage = async () => {

    const favouriteListings = await getFavouriteListings();
    const currentUser = await getCurrentUser();

    if(favouriteListings.length === 0){
        return (
            <div>
                <EmptyState
                    title="No favourites found"
                    subtitle="Looks like you have no listings."
                />
            </div>
        )
    }

    return (
        <ClientOnly>
            <FavouritesClient
                listings={favouriteListings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )

}

export default ListingPage;

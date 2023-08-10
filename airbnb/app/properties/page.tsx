import EmptyState from "@/components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";
import ClientOnly from "@/components/ClientOnly";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    // not really necessary since trips will be a protected route
    if(!currentUser){
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    const listings = await getListings({ 
        userId: currentUser.id
    });

    if(listings.length === 0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No properties found"
                    subtitle="Looks like you have no properties."
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
};

export default PropertiesPage;
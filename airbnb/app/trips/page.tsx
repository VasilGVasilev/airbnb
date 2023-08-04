import EmptyState from "@/components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <EmptyState
                title=""
                subtitle=""
            />
        )
    }
};
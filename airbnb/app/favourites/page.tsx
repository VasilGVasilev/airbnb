import EmptyState from "@/components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";



const ListingPage = async () => {
    return (
        <div>
            <EmptyState
                title="No favourites found"
                subtitle="Looks like you have no listings."
            />
        </div>
    )
}

export default ListingPage;

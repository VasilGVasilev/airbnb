import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

// look into nature of params and searchParams, katter being an object

interface HomeProps {
    searchParams: IListingsParams
}

const Home = async ({ searchParams}: HomeProps) => {

    const listings = await getListings(searchParams);
    const currentUser = await getCurrentUser();

    if(listings.length === 0){
        return (
            <EmptyState
                showReset
            />
        )
    }

    return (
        <Container>
            <div className="
                pt-24
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            ">
                {listings.map((listing) => {
                    return (
                        <ListingCard
                            currentUser={currentUser}
                            key={listing.id}
                            data={listing}
                        />
                    )
                })}
            </div>
        </Container>
    )
}

export default Home;
// NB  there is an error about importing server component data into a client component
// see ListingCard accepting data which is a fetched via prisma from DB
// to deal with it, we must update the return of getListings() action to have proper createdAt format 
// see getListings action

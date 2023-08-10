// export const dynamic = 'force-dynamic';

import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly";



interface HomeProps {
    searchParams: IListingsParams
}

const Home = async ({ searchParams}: HomeProps) => {
    
    const listings = await getListings(searchParams); //search params are gathered via {} the empty object, which is either showing all or when we apply filter and router.push the updatedQuery url, we have an object full of filters
    const currentUser = await getCurrentUser();

    if(listings.length === 0){
        return (
            <ClientOnly>
                <EmptyState
                    showReset
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
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
        </ClientOnly>
    )
}

export default Home;
// NB  there is an error about importing server component data into a client component
// see ListingCard accepting data which is a fetched via prisma from DB
// to deal with it, we must update the return of getListings() action to have proper createdAt format 
// see getListings action


// I had an issue understanding the following code before the filter functionality was added:

// interface HomeProps {
    // searchParams: IListingsParams
// }

// const Home = async ({ searchParams}: HomeProps) => {
    // console.log(searchParams); //<------------ LOGS {} due to IListingsParams being {userId?: string;}
    // const listings = await getListings(searchParams);
    // const currentUser = await getCurrentUser();
    // ...
// }

// the explanation is to add console.log for searchParams;

// we see that in fact we have an empty object which when passed onto getListings returns all listings:
// - we pass on searchParams which in getListings results in userId being undefined
// - in turn, we set userId as a property to query, which in itself is an empty object
// - in turn, we search prisma DB by where: query, which is equivalent to where: {}
// - This will return all the records in the table, because the where clause is used to filter the results of the query, and if you don't specify any conditions, then all the records will be returned. 
// see searchParams.png
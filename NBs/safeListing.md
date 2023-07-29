Deal with: WARNING: ONLY PLAIN OBJECTS CAN BE PASSED TO THE CLIENT COMPONENT FROM SERVER COMPONENT, DATE OBJECTS ARE NOT SUPPORTED 

We pass in object to client component from server component in app/index.js:

```sh
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getListings from "./actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {

    const listings = await getListings();
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


```
- NB  there is an error about importing server component data into a client component
- see ListingCard accepting data which is a fetched via prisma from DB
- to deal with it, we must update the return of getListings() action to have proper createdAt format 
- see getListings action


**Change actual values:**
```sh
import prisma from '@/app/libs/prismadb'

export default async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy:{
                createdAt:'desc'
            }
        });
        // WARNING: ONLY PLAIN OBJECTS CAN BE PASSED TO THE CLIENT COMPONENT FROM SERVER COMPONENT, DATE OBJECTS ARE NOT SUPPORTED 
        const safeListings = listings.map((listing)=>({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;

    } catch (error: any) {
        throw new Error(error)
    }
}
```
- we cannot just return listings, but safeListings
- we also need a new type
- see app/types


**Change actual types:**

```sh
import { Listing, User } from "@prisma/client";

export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string;
}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}
```


- Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals).
- https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys

- export: This keyword is used to make the type SafeListings accessible outside of the current file/module. It allows other files to import and use this type.

- type SafeListings: This is the declaration of the new type called SafeListings. It is an alias or a custom type created based on some existing types.

- Omit<Listing, "createdAt">: This is a utility type provided by TypeScript. It creates a new type by excluding a specified property from an existing type. In this case, it takes the Listing type and omits the property "createdAt", resulting in a new type that does not have the "createdAt" property.

- & { createdAt: string; }: The & symbol is used for intersection types. It combines two types into one. In this case, it takes the previously defined type (without "createdAt") and adds a new property called createdAt with the type string

see listing card

```sh
'use client'

import useCountries from "@/app/hooks/useCountries";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
    data: SafeListing; //cool that prisma client provides us with the object out of the model 
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}
```
import { Listing, Reservation, User } from "@prisma/client";

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

export type SafeReservation = Omit<
    Reservation,
    "startDate" | "endDate" | "createdAt" | "listing"
> & {
    startDate: string;
    endDate: string;
    createdAt: string;
    listing: SafeListing;
}

// Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals).
// https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys

// export: This keyword is used to make the type SafeListings accessible outside of the current file/module. It allows other files to import and use this type.

// type SafeListings: This is the declaration of the new type called SafeListings. It is an alias or a custom type created based on some existing types.

// Omit<Listing, "createdAt">: This is a utility type provided by TypeScript. It creates a new type by excluding a specified property from an existing type. In this case, it takes the Listing type and omits the property "createdAt", resulting in a new type that does not have the "createdAt" property.

// & { createdAt: string; }: The & symbol is used for intersection types. It combines two types into one. In this case, it takes the previously defined type (without "createdAt") and adds a new property called createdAt with the type string
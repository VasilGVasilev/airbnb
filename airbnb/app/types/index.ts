import { User } from "@prisma/client";

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}

// Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals).
// https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
export { default } from 'next-auth/middleware';

export const config = {
    matcher:  [
        "/trips",
        "/reservations",
        "/properties",
        "/favourties",
    ]
}

// https://next-auth.js.org/configuration/nextjs#middleware
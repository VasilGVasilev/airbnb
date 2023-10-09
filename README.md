# Full Stack Airbnb Clone with Next.js 13 App Router: React, Tailwind, Prisma, MongoDB, NextAuth 2023

## [Go to Website](https://vgv-rental.vercel.app/)
[![alt text](https://github.com/VasilGVasilev/airbnb/blob/main/NBs/airbnb-welcome-image.png)](https://vgv-rental.vercel.app/)

---
[![alt text](https://github.com/VasilGVasilev/airbnb/blob/main/NBs/login-form.png)](https://vgv-rental.vercel.app/)


## What's in the stack

- React Framework [Next.js](https://nextjs.org/) + [Typescript](https://www.typescriptlang.org/)
- VPS by [Vercel](https://vercel.com/)
- Styling with [Tailwind](https://tailwindcss.com/)
- Database via [Prisma](https://www.prisma.io/) and [MongodDB](https://www.mongodb.com/)

Features:

- Full responsiveness
- Credential authentication
- Google authentication
- Github authentication
- Image upload using Cloudinary CDN
- Client form validation and handling using *react-hook-form*
- Server error handling using *react-toast*
- Calendars with *react-date-range*
- Page loading state
- Page empty state
- Booking / Reservation system
- Guest reservation cancellation
- Owner reservation cancellation
- Creation and deletion of properties
- Pricing calculation
- Advanced search algorithm by category, date range, map location, number of guests, rooms and bathrooms
    - For example we will filter out properties that have a reservation in your desired date range to travel
- Favorites system
- Shareable URL filters (see Category and CategoryBox components)
    - Lets say you select a category, location and date range, you will be able to share URL with a logged out friend in another browser and they will see the same results
- How to write POST and DELETE routes in route handlers (app/api)
- How to fetch data in server react components by directly accessing database (see /actions)
- How to handle files like error.tsx and loading.tsx which are new Next 13 templating files to unify loading and error handling

## Learning achievements:
- Basic understanding of Typescript
- Utilizing advanced library for authentication
- Deep dive into modularity and reusablility of components
- Understanding useCallback() and useMemo() hooks
- Reflecting on the need to sanitize data from DB to be useable in React

## Other dependencies:

- react-icons
- zustand
- axios
- react-hook-form
- react-hot-toast
- next-auth @prisma/client @next-auth/prisma-adapter
- bcrypt + -D @types/bcrypt
- query-string
- world-countries
- react-select
- leaflet + -D @types/leaflet
- react-leaflet
- next-cloudinary + *cloudinary for imageupload*
- date-fns
- react-date-range + -D @types/react-date-range
- react-spinners


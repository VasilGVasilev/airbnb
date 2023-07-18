import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_END !== 'production') globalThis.prisma = client

export default client;


// see explanation in prismadb.md , but to prevent hot reloading from draining resources, assigning to global var will mean no affect of hot reload which is below global context, like variables retaining value above function
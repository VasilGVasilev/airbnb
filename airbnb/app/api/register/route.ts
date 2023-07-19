import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

export async function POST(
    req: Request
) {
    const body = await req.json();
    const {
        email,
        name,
        password
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    // store info on DB, here we are at server back-end level
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    })

    return NextResponse.json(user);
}

// NB bycrypt, notice that bcrypt hashes and decodes hash because it is a dependency overreaching the whole app client and server
// in pages/auth/[...nextauth] we compare the hashed password, here we hash it 
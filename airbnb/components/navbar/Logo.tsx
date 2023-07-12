'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation'

const Logo = () => {
    const router = useRouter();
  return (
    <Image
        alt="Logo"
        className='hidden md:block cursor-pointer'
        height={100}
        width={100}
        src='/images/logo.png'
    />
  )
}

export default Logo
// there may be a bug with loading the logo with local route, use imageLoader function on hostinger server, vercel may be an exception

'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import { useState, useCallback } from 'react'
import MenuItem from './MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import useRentModal from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'


interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {

    const router = useRouter();

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);

    const rentModal = useRentModal();

    // good practice that toggle is made reusable although in such a small project we can go without caching the function
    const toggleOpen = useCallback(()=>{
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }

        rentModal.onOpen();

    }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
                onClick={onRent}
                className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    rounded-full
                    hover:bg-neutral-50
                    transition
                    cursor-pointer
                "
            >
                AirBnb your home
            </div>
            <div
                onClick={toggleOpen}
                className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    hover:bg-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                "
            >
                <AiOutlineMenu />
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image} />
                </div>
            </div>
        </div>
        {isOpen && (
            <div
                className='
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm
                '
            >
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                        <>
                            <MenuItem 
                                onClick={()=> router.push('/trips')}
                                label="My trips"
                            />
                            <MenuItem 
                                onClick={()=> router.push('/favourites')}
                                label="My favourites"
                            />
                            <MenuItem 
                                onClick={()=> router.push('/reservations')}
                                label="My reservations"
                            />
                            <MenuItem 
                                onClick={()=>{}}
                                label="My properties"
                            />
                            <MenuItem 
                                onClick={rentModal.onOpen}
                                label="Airbnb my home"
                            />
                            <MenuItem 
                                onClick={() => signOut()}
                                label="Logout"
                            />
                        </>
                    ) : (
                        <>                        
                            <MenuItem 
                                onClick={loginModal.onOpen}
                                label="Login"
                            />
                            <MenuItem 
                                onClick={registerModal.onOpen}
                                label="Sign up"
                            />
                        </>
                    )}

                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu

// NB Transition only By default, Tailwind CSS provides a transition timing function of ease-in-out, a duration of 150ms, and a transition property of all.
// NB useCallback - lets you cache (saves functionality, ex. toggle) a function definition between re-renders, During subsequent renders, it will either return an already stored 'fn' function from the last render (if the dependencies haven’t changed), or return the fn function you have passed during this render.
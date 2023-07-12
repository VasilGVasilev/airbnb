'use client'
import { AiOutlineMenu } from 'react-icons/ai'

const UserMenu = () => {
  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
                onClick={()=>{}}
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
                onClick={()=>{}}
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
                    <Avatar />
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserMenu

// NB By default, Tailwind CSS provides a transition timing function of ease-in-out, a duration of 150ms, and a transition property of all.
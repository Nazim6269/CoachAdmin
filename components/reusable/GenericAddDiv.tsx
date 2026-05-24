'use client'

import PlusIcon from '@/icons/PlusIcon'
import { useRouter } from 'next/navigation'
import React from 'react'

const GenericAddDiv = ({ className, href }: { className: string, href: string }) => {
    const router = useRouter()
    return (
        <div
            onClick={() => router.push(href)}
            className={`${className} flex flex-col items-center justify-center border border-solid border-whiteColor gap-2 p-4 rounded-lg w-full  cursor-pointer hover:transition-all hover:duration-300 hover:ease-in-out hover:scale-105`}
        >
            <PlusIcon className='text-whiteColor' />
            <p className='text-lg text-whiteColor'>Add More</p>
        </div>
    )
}

export default GenericAddDiv
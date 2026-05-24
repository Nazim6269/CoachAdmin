'use client'

import React from 'react'
import CircleTick from '@/icons/CircleTick'
import CustomButton from '@/components/reusable/CustomButton'

type PricingCardProps = {
    price: number
    period?: string
    features: string[]
    buttonLabel?: string
    onEdit?: () => void
}

const PricingCard = ({
    price,
    period = 'per month',
    features,
    buttonLabel = 'Edit',
    onEdit,
}: PricingCardProps) => {
    return (
        <div className='flex flex-col w-full  max-h-[290px] gap-4 bg-primaryColor p-4 rounded-lg'>
            <div className='flex items-center gap-2 justify-between'>
                <span className='text-4xl font-bold text-whiteColor'>${price}</span>
                <p className='text-sm text-whiteColor'>/ {period}</p>
            </div>

            <div className='flex-grow' >
                {features.map((feature, idx) => (
                    <div key={idx} className='flex items-center  py-2 gap-2'>
                        <CircleTick />
                        <p className='text-sm text-whiteColor'>{feature}</p>
                    </div>
                ))}
            </div>

            <CustomButton
                label={buttonLabel}
                onClick={onEdit}
                className='w-full bg-blueColor text-whiteColor py-6 text-lg hover:bg-blueColor/80 hover:text-whiteColor'
            />
        </div>
    )
}

export default PricingCard
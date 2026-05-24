import DeleteIcon from '@/icons/DeleteIcon'
import EyeOnIcon from '@/icons/EyeOnIcon'
import WriteIcon from '@/icons/WriteIcon'
import React from 'react'

interface ContentManagementUserProfileCardProps {
    item: any
}

const ContentManagementUserProfileCard = ({ item }: ContentManagementUserProfileCardProps) => {
    return (
        <div className='flex items-center justify-between gap-4 bg-primaryColor border border-gray-800 p-4 rounded-xl text-gray-100 shadow-lg transition'>

            {/* left */}
            <div className='flex items-center gap-4'>

                {/* Image */}
                <div className='w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-sm text-gray-300'>
                    Img
                </div>

                {/* Info */}
                <div>
                    <h2 className='text-lg font-semibold'>{item?.name}</h2>
                    <p className='text-sm text-gray-400'>{item?.email}</p>

                    <div className='flex items-center gap-4 mt-1 text-sm'>
                        <span className='px-2 py-0.5 bg-green-600/20 text-green-400 rounded-full'>
                            Active
                        </span>
                        <p className='text-blueColor bg-blueColor/20 px-2 py-0.5 rounded-full'>Session: 21</p>
                    </div>
                </div>

            </div>

            {/* right */}
            <div className='flex items-center gap-3 text-gray-400'>
                <button className='hover:text-blue-400 transition'>
                    <EyeOnIcon className='w-7 h-7 border border-secondaryColor rounded-md p-1' />
                </button>
                <button className='hover:text-yellow-400 transition'>
                    <WriteIcon className='w-7 h-7 border border-secondaryColor rounded-md p-1' />
                </button>
                <button className='hover:text-red-400 transition'>
                    <DeleteIcon className='w-7 h-7 border border-secondaryColor rounded-md p-1' />
                </button>
            </div>

        </div>
    )
}

export default ContentManagementUserProfileCard
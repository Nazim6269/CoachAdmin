import Image from 'next/image'
import React from 'react'

interface UserActivityCardProps {
    activity: {
        user_avatar_url?: string | null;
        name?: string | null;
        receiver?: {
            name: string | null;
            avatar?: string | null;
            avatar_url?: string | null;
        };
        time_ago: string;
        timeInNumber?: string;
        img?: string;
        message: string;
        activity_date: string;
    };
}

export const getAvatarUrl = (url?: string | null) => {
    if (!url) return '/personOne.png';
    const lastHttpIndex = url.lastIndexOf('http');
    if (lastHttpIndex > 0) {
        return url.substring(lastHttpIndex);
    }
    return url;
};

const UserActivityCard = ({ activity }: UserActivityCardProps) => {


    const avatarUrl = getAvatarUrl(activity?.user_avatar_url || activity?.img);

    return (
        <div className='relative flex items-center gap-2'>
            <div className='w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0'>
                <Image
                    src={avatarUrl}
                    alt={activity?.name || activity?.receiver?.name || "User Avatar"}
                    width={40}
                    height={40}
                    className='rounded-full object-cover w-10 h-10'
                />
            </div>
            <div>
                <p className="text-whiteColor text-sm font-semibold">{activity?.message}</p>
                <div className='flex items-center gap-2'>
                    <span className='text-gray-500 text-sm font-semibold'>{activity?.time_ago}</span>
                    <span className='w-2 h-2 rounded-full bg-gray-600'></span>
                    <span className='text-gray-500 text-sm'>{activity?.activity_date}</span>
                </div>
            </div>
        </div>
    )
}

export default UserActivityCard
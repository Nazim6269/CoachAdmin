import React from 'react'

const SingleStatCard = ({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: number;
}) => {
    return (
        <div className="bg-primaryColor p-6 rounded-xl shadow-md w-full">
            <div className="flex items-center justify-start gap-4">
                <div className="bg-secondaryColor p-4 rounded-full">
                    {icon}
                </div>
                <div>
                    <h3 className="text-sm text-descriptionColor mb-3">{title}</h3>
                    <p className="text-2xl font-bold text-whiteColor">${value}</p>
                </div>

            </div>
        </div>
    )
}

export default SingleStatCard
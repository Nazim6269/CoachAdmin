import React from 'react'

const StatsCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => {
    return (
        <div className="bg-[#1b1b1b] p-4 rounded-lg shadow-md w-full">
            <div className="flex items-center justify-start gap-4">
                <div className="bg-[#2d2d2d] p-4 rounded-full">
                    {icon}
                </div>
                <div>
                    <h3 className="text-sm text-[#949494]">{title}</h3>
                    <p className="text-2xl font-bold">{value}</p>
                </div>

            </div>
        </div>
    )
}

export default StatsCard
import React from 'react'

const ContentContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='rounded-lg p-4 w-full text-white'>
            {children}
        </div>
    )
}

export default ContentContainer
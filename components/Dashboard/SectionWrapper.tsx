import React from 'react'

const SectionWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`py-6 ${className}`}>
            {children}
        </div>
    )
}

export default SectionWrapper
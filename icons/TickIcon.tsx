import React from 'react'

const TickIcon = ({ className }: { className?: string }) => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M3 9.66602C3 9.66602 4 9.66602 5.33333 11.9993C5.33333 11.9993 9.0392 5.88824 12.3333 4.66602" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default TickIcon
import React from 'react'

const ReversibaleIcon = ({ className }: { className?: string }) => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M5.33594 22.666H26.6693" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M25.3359 9.33398L5.33594 9.33398" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.33591 18.666C9.33591 18.666 5.33595 21.612 5.33594 22.666C5.33592 23.7201 9.33594 26.666 9.33594 26.666" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22.6641 5.33398C22.6641 5.33398 26.6641 8.27998 26.6641 9.33398C26.6641 10.3881 22.6641 13.334 22.6641 13.334" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default ReversibaleIcon
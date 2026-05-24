import React from 'react'

const CircleTick = ({ className }: { className?: string }) => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <g clipPath="url(#clip0_5426_66405)">
                <path d="M11.3281 2.22586C10.3475 1.65863 9.20906 1.33398 7.99479 1.33398C4.31289 1.33398 1.32812 4.31875 1.32812 8.00065C1.32812 11.6825 4.31289 14.6673 7.99479 14.6673C11.6767 14.6673 14.6615 11.6825 14.6615 8.00065C14.6615 7.54405 14.6155 7.09812 14.5281 6.66732" stroke="#007BFF" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5.32812 8.33398C5.32812 8.33398 6.32812 8.33398 7.66146 10.6673C7.66146 10.6673 11.3673 4.5562 14.6615 3.33398" stroke="#007BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_5426_66405">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default CircleTick
import React from 'react'

const NotificationIcon = ({ classname }: { classname: string }) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={classname}>
      <path d="M20.6673 24C20.6673 26.5773 18.578 28.6667 16.0007 28.6667C13.4233 28.6667 11.334 26.5773 11.334 24" fill="white" />
      <path d="M20.6673 24C20.6673 26.5773 18.578 28.6667 16.0007 28.6667C13.4233 28.6667 11.334 26.5773 11.334 24" stroke="#1B1B1B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25.6415 24.0002H6.35849C5.05593 24.0002 4 22.9442 4 21.6416C4 21.0162 4.24848 20.4163 4.69079 19.9739L5.49509 19.1696C6.24524 18.4195 6.66667 17.402 6.66667 16.3412V12.6668C6.66667 7.51218 10.8453 3.3335 16 3.3335C21.1547 3.3335 25.3333 7.51216 25.3333 12.6668V16.3412C25.3333 17.402 25.7548 18.4195 26.5049 19.1696L27.3092 19.9739C27.7515 20.4163 28 21.0162 28 21.6416C28 22.9442 26.944 24.0002 25.6415 24.0002Z" fill="white" stroke="#1B1B1B" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="23" cy="7" r="3.5" fill="#CF5C56" stroke="#1B1B1B" />
    </svg>
  )
}

export default NotificationIcon
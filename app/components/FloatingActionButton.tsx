'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const FloatingActionButton = () => {
  const router = useRouter()
  const [buttonText, setButtonText] = useState<'Join' | 'Support'>('Join')

  // Alternate between "Join" and "Support" every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setButtonText((prev) => (prev === 'Join' ? 'Support' : 'Join'))
    }, 5000) // 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    if (buttonText === 'Join') {
      router.push('/contact')
    } else {
      router.push('/Donate')
    }
  }

  return (
    <div className="fixed right-4 md:right-6 bottom-6 md:bottom-8 z-50">
      <button
        onClick={handleClick}
        className="group relative bg-action hover:bg-link-hover text-white px-4 md:px-6 py-3 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 md:gap-3"
        aria-label={buttonText === 'Join' ? 'Join Us - Contact' : 'Support Us - Donate'}
      >
        <div className="flex items-center gap-2 md:gap-3">
          {buttonText === 'Join' ? (
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          <span className="text-sm md:text-base font-semibold whitespace-nowrap transition-all duration-500">
            {buttonText}
          </span>
        </div>
        {/* Tooltip on hover */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:group-hover:block">
          <div className="bg-action text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap relative">
            {buttonText === 'Join' ? 'Get in touch with us' : 'Support our ministry'}
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-action"></div>
          </div>
        </div>
      </button>
    </div>
  )
}

export default FloatingActionButton


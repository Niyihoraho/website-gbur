'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Header = () => {
  const slides = [
    '/slide/g-1.jpg',
    '/slide/EZRA_PIC_2025[1].jpg',
    '/slide/g-4.jpg',
    '/slide/main.png',
    '/slide/DSC_9757 (1).jpg',
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div>
       <div className="relative h-[500px] overflow-hidden">
      {/* Background slides container */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${slide}')` }}
          ></div>
        ))}
      </div>

      <div className="absolute inset-0 header-overlay"></div>

      <div
        className="relative z-10 h-full flex items-center justify-center text-center px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-light mb-4 leading-tight"
          >
            Campus for
            <span
              className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              Christ
            </span>
          </h1>
          <p
            className="text-sm md:text-base text-light mb-6 leading-relaxed max-w-xl mx-auto opacity-90"
          >
            To see every student and graduate as an agent of Godly
            transformation in church and society
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary font-semibold px-6 py-2.5 rounded-lg text-sm hover:bg-gray-100"
            >
              Join Community
            </Link>
            <Link
              href="/OurMinistry"
              className="btn-secondary px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-custom"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </div>

      <div
        className="absolute top-20 left-10 w-20 h-20 border border-white/20 rounded-md animate-pulse"
      ></div>
      <div
        className="absolute bottom-20 right-10 w-16 h-16 border border-white/20 rounded-md animate-pulse"
      ></div>
      <div
        className="absolute top-1/2 left-20 w-12 h-12 border border-white/20 rounded-md animate-pulse"
      ></div>
    </div>
    </div>
  )
}

export default Header

'use client'

import React from 'react'
import Link from 'next/link'

const Involved = () => {
  const involvementOptions = [
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: 'Find a chapter',
      description:
        'Connect with an Gbur chapter near you to join in what God is doing on campus.',
      linkText: 'Search',
      linkHref: '/campus',
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
          <text
            x="12"
            y="16"
            fontSize="8"
            fill="currentColor"
            textAnchor="middle"
            fontWeight="bold"
          >
            $
          </text>
        </svg>
      ),
      title: 'Give to Gbur',
      description:
        'Empower kingdom building on campus by making a donation today.',
      linkText: 'Donate',
      linkHref: '/Donate',
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v13"
          />
        </svg>
      ),
      title: 'Graduate',
      description:
        "Connect with other GBUR graduates in your area.",
      linkText: 'Find a Small Group',
      linkHref: '/graduate',
    },
  ]

  return (
    <section className="bg-accent py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <h3 className="text-center text-sm md:text-base font-semibold link-color uppercase tracking-wide mb-6">
          Get Involved
        </h3>

        {/* Main Heading */}
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-action mb-6 leading-tight px-4">
          Join us in God&apos;s mission of
          <br />
          Transforming the Campus
        </h2>

        {/* Subtitle */}
        <p className="text-center text-secondary text-base leading-relaxed max-w-4xl mx-auto mb-16 px-4">
          Discover how to get involved with Gbur&apos;s ministry and be part of
          reaching every corner of every campus with the real hope of Jesus.
        </p>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {involvementOptions.map((option, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 shadow-custom hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-custom"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-accent rounded-lg flex items-center justify-center link-color">
                  {option.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-primary mb-4 text-center">
                {option.title}
              </h3>

              {/* Description */}
              <p className="text-secondary text-base leading-relaxed text-center mb-6">
                {option.description}
              </p>

              {/* Link Button */}
              <div className="flex justify-center">
                <Link
                  href={option.linkHref}
                  className="inline-flex items-center text-action font-bold text-base transition-all duration-300 hover:gap-3 gap-2 group"
                >
                  {option.linkText}
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Involved


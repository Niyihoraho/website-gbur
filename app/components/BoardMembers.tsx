'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface BoardMember {
  name: string
  position: string
  image: string
}

const BoardMembers = () => {
  const boardMembers: BoardMember[] = [
    {
      name: 'Gilbert Haston',
      position: 'Board Chair',
      image: '/leaders/Names-Gilbert HASTON-Position BOARD CHAIR.jpg',
    },
    {
      name: 'Jacques Bihozagara',
      position: 'Vice Chairman',
      image: '/leaders/Jacques BIHOZAGARA-VICE CHAIRMAN.jpg',
    },
    {
      name: 'Benithe Ngabonziza',
      position: 'Board Secretary',
      image: '/leaders/Benithe NGABONZIZA- BOARD SECRETARY.jpg',
    },
    {
      name: 'Georginah Muhoza',
      position: 'Board Treasurer',
      image: '/leaders/Georginah MUHOZA-BOARD TREASURER.jpg',
    },
    {
      name: 'Dr. Marcel Uwizeye',
      position: 'Board Advisor',
      image: '/leaders/Dr. Marcel UWIZEYE-BOARD ADVISOR.jpg',
    },
    {
      name: 'Anne Mukeshimana',
      position: 'Board Advisor',
      image: '/leaders/Anne MUKESHIMANA-BOARD ADVISOR.jpg',
    },
    {
      name: 'Hubert Diama',
      position: 'Graduate Representative - President',
      image: '/leaders/Hubert Diama-GRADUATE REPRESENTATIVE -PRESIDENT.jpg',
    },
    {
      name: 'Olive Mwalimwiza',
      position: 'Graduate Representative - Vice President',
      image: '/leaders/Olive MWALIMWIZA-GRADUATE REPRESENTATIVE -VICE PRESIDENT.jpg',
    },
    {
      name: 'Pacifique Mutijima',
      position: 'Student Representative - NASEC President',
      image: '/leaders/Pacifique MUTIJIMA-STUDENT REPRESENTATIVE-NASEC PRESIDENT.jpg',
    },
    {
      name: 'Joshua Rukundo',
      position: 'Student Representative - NASEC Vice President',
      image: '/leaders/Joshua RUKUNDO-STUDENT REPRESENTATIVE-NASEC vice  PRESIDENT.jpg',
    },
    {
      name: 'Rukundo Somson',
      position: 'General Secretary (GS)',
      image: '/leaders/Rukundo Somson-General secretary(GS).jpg',
    },
  ]

  return (
    <section className="bg-accent py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <h3 className="text-center text-sm md:text-base font-semibold link-color uppercase tracking-wide mb-3">
          Governance &amp; Leadership
        </h3>

        {/* Main Heading */}
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-action mb-4 leading-tight">
          Our Board Members
        </h2>

        {/* Subtitle */}
        <p className="text-center text-secondary text-base leading-relaxed max-w-3xl mx-auto mb-10 md:mb-14">
          Meet the dedicated leaders and trustees providing governance, spiritual guidance, and strategic direction to GBUR across Rwanda.
        </p>

        {/* Board Members Compact Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {boardMembers.map((member, index) => (
            <div
              key={index}
              className="bg-card rounded-xl overflow-hidden shadow-custom hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 border border-custom flex flex-col group"
            >
              {/* Leader Photo (Compact) */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-accent">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>

              {/* Name & Position Only */}
              <div className="p-3.5 sm:p-4 text-center flex-1 flex flex-col justify-center">
                <h4 className="text-sm sm:text-base md:text-lg font-bold text-brand group-hover:text-action transition-colors mb-1">
                  {member.name}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-action leading-snug">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Full Leadership */}
        <div className="mt-12 text-center">
          <Link
            href="/leaders"
            className="inline-flex items-center text-action font-bold text-base transition-all duration-300 hover:gap-3 gap-2 group"
          >
            <span>Learn more about our leadership</span>
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
    </section>
  )
}

export default BoardMembers

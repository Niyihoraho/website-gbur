import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingActionButton from '../components/FloatingActionButton'

const GetInvolvedPage = () => {
  return (
    <>
      <Navbar />
      <main className="bg-accent">
        {/* Hero Section with Title */}
        <section className="py-4 md:py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl md:text-3xl font-bold text-action">
              Get Involved
            </h1>
          </div>
        </section>

        {/* Banner Image Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-6 md:pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative w-full h-48 md:h-64 lg:h-80 rounded-xl overflow-hidden shadow-custom">
              <Image
                src="/Gbur/DSC_9972.jpg"
                alt="Students engaging in community"
                fill
                className="object-cover"
                priority
              />
              {/* Decorative circles overlay - matching the image style */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Left side circles */}
                <div className="absolute left-3 top-1/4 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 opacity-30" style={{ borderColor: 'var(--brand-secondary)' }}></div>
                <div className="absolute left-6 top-1/3 w-8 h-8 md:w-12 md:h-12 rounded-full border-2 opacity-40" style={{ borderColor: 'var(--brand-action)' }}></div>
                <div className="absolute left-9 top-1/2 w-6 h-6 md:w-10 md:h-10 rounded-full border-2 opacity-30" style={{ borderColor: 'var(--brand-accent)' }}></div>
                
                {/* Right side circles */}
                <div className="absolute right-3 top-1/4 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 opacity-30" style={{ borderColor: 'var(--brand-secondary)' }}></div>
                <div className="absolute right-6 top-1/3 w-8 h-8 md:w-12 md:h-12 rounded-full border-2 opacity-40" style={{ borderColor: 'var(--brand-action)' }}></div>
                <div className="absolute right-9 top-1/2 w-6 h-6 md:w-10 md:h-10 rounded-full border-2 opacity-30" style={{ borderColor: 'var(--brand-accent)' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Gbur Communities Section */}
        <section className="py-8 md:py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Section Heading */}
            <h2 className="text-xl md:text-2xl font-bold text-brand mb-4">
              Gbur Communities
            </h2>
            
            {/* Description */}
            <p className="text-secondary text-sm md:text-base leading-relaxed mb-6">
              Community is the heart of Gbur—where students and faculty share
              the Gospel, study the Word, and are transformed by Jesus.
            </p>
            
            {/* Join Community Button */}
            <Link
              href="#"
              className="btn-accent px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-custom inline-flex items-center gap-2 hover:scale-105"
            >
              Join a Community
            </Link>
          </div>
        </section>

        {/* Partner Through Giving Section */}
        <section className="py-8 md:py-10 px-4 sm:px-6 lg:px-8 border-t border-custom">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-8 text-center">
              <h2 className="text-lg md:text-xl font-bold text-action mb-3">
                PARTNER THROUGH GIVING
              </h2>
              <p className="text-secondary text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
                Gbur wants every student and faculty to have a chance to hear
                about Jesus. Your gift helps make that possible.
              </p>
            </div>

            {/* Giving Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Campus Giving */}
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-4 text-secondary">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-bold text-brand mb-2">
                  Campus Giving
                </h3>

                {/* Description */}
                <p className="text-secondary text-xs md:text-sm leading-relaxed mb-4">
                  Give toward a particular campus or campus minister.
                </p>

                {/* Button */}
                <Link
                  href="/Donate"
                  className="btn-primary px-5 py-2 rounded-lg font-semibold text-xs transition-all duration-300 shadow-sm"
                >
                  Give
                </Link>
              </div>

              {/* Give to Gbur */}
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-4 text-secondary">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-bold text-brand mb-2">
                  Give to Gbur
                </h3>

                {/* Description */}
                <p className="text-secondary text-xs md:text-sm leading-relaxed mb-4">
                  Give to where most needed.
                </p>

                {/* Button */}
                <Link
                  href="/Donate"
                  className="btn-primary px-5 py-2 rounded-lg font-semibold text-xs transition-all duration-300 shadow-sm"
                >
                  Give
                </Link>
              </div>

              {/* Make a Recurring Gift */}
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-4 text-secondary">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-bold text-brand mb-2">
                  Make a Recurring Gift
                </h3>

                {/* Description */}
                <p className="text-secondary text-xs md:text-sm leading-relaxed mb-4">
                  Schedule monthly, quarterly, or annually recurring gifts.
                </p>

                {/* Button */}
                <Link
                  href="/Donate"
                  className="btn-primary px-5 py-2 rounded-lg font-semibold text-xs transition-all duration-300 shadow-sm"
                >
                  Give
                </Link>
              </div>

              {/* Gift Planning */}
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-4 text-secondary">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-bold text-brand mb-2">
                  Gift Planning
                </h3>

                {/* Description */}
                <p className="text-secondary text-xs md:text-sm leading-relaxed mb-4">
                  Put Gbur in your will.
                </p>

                {/* Button */}
                <Link
                  href="/Donate"
                  className="btn-primary px-5 py-2 rounded-lg font-semibold text-xs transition-all duration-300 shadow-sm"
                >
                  Plan
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Beyond Campus Section */}
        <section className="py-3 md:py-4 px-4 sm:px-6 lg:px-8 border-t border-custom">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-3">
              <div className="flex items-center gap-3">
                <h2 className="text-sm md:text-xs font-bold text-muted whitespace-nowrap">
                  BEYOND CAMPUS
                </h2>
                <div className="flex-1 h-px bg-border"></div>
              </div>
            </div>

            {/* Three Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
              {/* Missions Column */}
              <div className="flex flex-col items-center text-center">
                {/* Image */}
                <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-lg overflow-hidden shadow-custom mb-2 mx-auto">
                  <Image
                    src="/Gbur/DSC_9972.jpg"
                    alt="Missions opportunities"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm md:text-base font-bold text-action mb-1.5">
                  Missions
                </h3>

                {/* Description */}
                <p className="text-secondary text-[10px] md:text-xs leading-relaxed mb-2">
                  Gbur offers a variety of missions opportunities, whether it's
                  for a weekend, spring break, or whole semester. Find out what
                  opportunities are available for you.
                </p>

                {/* Button */}
                <Link
                  href="#"
                  className="btn-outline px-3 py-1.5 rounded-lg font-semibold text-[10px] transition-all duration-300 shadow-sm"
                >
                  Missions Programs
                </Link>
              </div>

              {/* Alumni Column */}
              <div className="flex flex-col items-center text-center">
                {/* Image */}
                <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-lg overflow-hidden shadow-custom mb-2 mx-auto">
                  <Image
                    src="/Gbur/DSC_9816.jpg"
                    alt="Alumni connection"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm md:text-base font-bold text-action mb-1.5">
                  Alumni
                </h3>

                {/* Description */}
                <p className="text-secondary text-[10px] md:text-xs leading-relaxed mb-2">
                  Your Gbur story doesn't have to end just because you
                  graduated. Our alumni resources connect new graduates and long-time
                  partners with God's work through Gbur on campus.
                </p>

                {/* Button */}
                <Link
                  href="#"
                  className="btn-outline px-3 py-1.5 rounded-lg font-semibold text-[10px] transition-all duration-300 shadow-sm"
                >
                  Alumni Information
                </Link>
              </div>

              {/* Employment Column */}
              <div className="flex flex-col items-center text-center">
                {/* Image */}
                <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-lg overflow-hidden shadow-custom mb-2 mx-auto">
                  <Image
                    src="/Gbur/DSC_9909.jpg"
                    alt="Employment opportunities"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm md:text-base font-bold text-action mb-1.5">
                  Employment
                </h3>

                {/* Description */}
                <p className="text-secondary text-[10px] md:text-xs leading-relaxed mb-2">
                  Want to accelerate God's mission among students and faculty? We have
                  positions available at our National Service Center in Madison,
                  Wisconsin, as well as on campuses nationwide.
                </p>

                {/* Button */}
                <Link
                  href="#"
                  className="btn-outline px-3 py-1.5 rounded-lg font-semibold text-[10px] transition-all duration-300 shadow-sm"
                >
                  View Openings
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FloatingActionButton />
      <Footer />
    </>
  )
}

export default GetInvolvedPage


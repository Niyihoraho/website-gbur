import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingActionButton from '../components/FloatingActionButton'

const OurPurposePage = () => {
  return (
    <>
      <Navbar />
      <main className="bg-accent min-h-screen">
        {/* Title Section */}
        <section className="bg-main pt-8 md:pt-12 pb-4 md:pb-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg md:text-4xl lg:text-5xl font-bold text-action text-center">
              Our Purpose
            </h1>
          </div>
        </section>

        {/* Banner Image Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-6 md:pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-custom">
              <Image
                src="/Gbur/DSC_9972.jpg"
                alt="Diverse students and faculty laughing together in community"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Purpose Statement Section */}
        <section className="py-8 md:py-12 bg-main">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Sub-heading */}
            <h2 className="text-xl md:text-2xl font-bold text-action mb-6 md:mb-8">
              In response to God's love, grace, and truth:
            </h2>

            {/* Purpose Statement */}
            <div className="space-y-3 text-secondary text-base md:text-lg leading-relaxed">
              <p>
                The purpose of InterVarsity Christian Fellowship/USA
              </p>
              <p>
                is to establish and advance
              </p>
              <p>
                at colleges and universities
              </p>
              <p>
                witnessing communities of students and faculty
              </p>
              <p>
                who follow Jesus as Savior and Lord:
              </p>
              <div className="pl-6 md:pl-8 space-y-2 mt-4 border-l-2 border-action/20">
                <p>growing in love for God,</p>
                <p>God's Word,</p>
                <p>God's people of every ethnicity and culture,</p>
                <p>and God's purposes in the world.</p>
              </div>
            </div>

            {/* Call to Action Links */}
            <div className="mt-10 md:mt-12 pt-8 border-t border-custom space-y-3">
              <div>
                <Link
                  href="#"
                  className="text-action hover:text-link-hover font-semibold text-base md:text-lg transition-colors inline-flex items-center group"
                >
                  View the impact from our ministry in 2023-2024.
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Support & Donate Section */}
        <section className="py-8 md:py-12 bg-accent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-action mb-3">
                Support Our Ministry
              </h2>
              <p className="text-secondary text-base md:text-lg max-w-2xl mx-auto">
                Your generous support helps us reach every corner of every campus. Choose a convenient way to give:
              </p>
            </div>

            {/* Payment Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Bank Transfer Card */}
              <div className="bg-main rounded-xl p-6 shadow-custom border border-custom/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-action/10 mb-4 mx-auto">
                  <svg className="w-8 h-8 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand mb-4 text-center">
                  Bank Transfer
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-brand">Bank Name:</span>
                    <p className="text-secondary mt-1">[Bank Name]</p>
                  </div>
                  <div>
                    <span className="font-semibold text-brand">Account Name:</span>
                    <p className="text-secondary mt-1">GBUR / InterVarsity Rwanda</p>
                  </div>
                  <div>
                    <span className="font-semibold text-brand">Account Number:</span>
                    <p className="text-secondary font-mono mt-1">[Account Number]</p>
                  </div>
                  <div>
                    <span className="font-semibold text-brand">SWIFT Code:</span>
                    <p className="text-secondary font-mono mt-1">[SWIFT Code]</p>
                  </div>
                </div>
              </div>

              {/* Mobile Money Card */}
              <div className="bg-main rounded-xl p-6 shadow-custom border border-custom/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-action/10 mb-4 mx-auto">
                  <svg className="w-8 h-8 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand mb-4 text-center">
                  Mobile Money
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-brand">MTN Mobile Money:</span>
                    <p className="text-secondary font-mono mt-1">[MTN Number]</p>
                  </div>
                  <div>
                    <span className="font-semibold text-brand">Airtel Money:</span>
                    <p className="text-secondary font-mono mt-1">[Airtel Number]</p>
                  </div>
                  <div>
                    <span className="font-semibold text-brand">Tigo Cash:</span>
                    <p className="text-secondary font-mono mt-1">[Tigo Number]</p>
                  </div>
                  <div className="pt-2">
                    <span className="font-semibold text-brand">Account Name:</span>
                    <p className="text-secondary mt-1">GBUR / InterVarsity Rwanda</p>
                  </div>
                </div>
              </div>

              {/* Western Union Card */}
              <div className="bg-main rounded-xl p-6 shadow-custom border border-custom/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-action/10 mb-4 mx-auto">
                  <svg className="w-8 h-8 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand mb-4 text-center">
                  Western Union
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-brand">Receiver Name:</span>
                    <p className="text-secondary mt-1">GBUR / InterVarsity Rwanda</p>
                  </div>
                  <div>
                    <span className="font-semibold text-brand">Country:</span>
                    <p className="text-secondary mt-1">Rwanda</p>
                  </div>
                  <div>
                    <span className="font-semibold text-brand">City:</span>
                    <p className="text-secondary mt-1">[City]</p>
                  </div>
                  <div>
                    <span className="font-semibold text-brand">MTCN:</span>
                    <p className="text-secondary text-xs mt-1 italic">(Provided after transfer)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Online Donation Button */}
            <div className="text-center mt-8 md:mt-10">
              <Link
                href="/Donate"
                className="btn-primary px-8 py-3 rounded-lg font-semibold text-base transition-all duration-300 flex items-center shadow-custom mx-auto hover:shadow-lg inline-flex"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Donate Online
              </Link>
            </div>

            {/* Additional Information */}
            <div className="mt-8 pt-6 border-t border-custom">
              <p className="text-sm text-secondary text-center italic">
                For more information about giving or to set up recurring donations, please contact us.
              </p>
            </div>
          </div>
        </section>
      </main>
      <FloatingActionButton />
      <Footer />
    </>
  )
}

export default OurPurposePage


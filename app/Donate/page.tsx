import React from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingActionButton from '../components/FloatingActionButton'

const DonatePage = () => {
  const givingOptions = [
    {
      title: 'Campus Giving',
      description: 'Give toward a particular campus or campus minister.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'Give to GBUR',
      description: 'Give to where most needed.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'Recurring Gift',
      description: 'Schedule monthly, quarterly, or annually recurring gifts.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: 'Gift Planning',
      description: 'Put GBUR in your will.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ]

  return (
    <>
      <Navbar />
      <main className="bg-accent min-h-screen">
        {/* Hero Section */}
        <section className="bg-main pt-8 md:pt-12 pb-6 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-action mb-4">
                Support GBUR
              </h1>
              <p className="text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Your generous support helps us reach every corner of every campus. 
                Together, we can transform Rwanda's universities through gospel-centered communities.
              </p>
            </div>
          </div>
        </section>

             {/* Payment Methods Section */}
             <section className="py-8 md:py-12 bg-accent">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-action mb-3">
                Payment Methods
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
                    <p className="text-secondary mt-1">Kigali</p>
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
              <button className="btn-primary px-8 py-3 rounded-lg font-semibold text-base transition-all duration-300 flex items-center shadow-custom mx-auto hover:shadow-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Donate Online
              </button>
            </div>

        
          </div>
        </section>

        {/* Why Give Section */}
        <section className="py-8 md:py-12 bg-accent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-main rounded-xl p-6 md:p-8 shadow-custom border border-custom">
              <h2 className="text-2xl md:text-3xl font-bold text-brand mb-6 text-center">
                Why Give to GBUR?
              </h2>
              <div className="space-y-4 text-secondary text-base md:text-lg leading-relaxed">
                <p>
                  GBUR wants every student and faculty member to have a chance to hear about Jesus. 
                  Your gift helps make that possible by supporting:
                </p>
                <ul className="space-y-3 ml-6 list-disc">
                  <li>Campus ministry and chapter development across Rwanda's universities</li>
                  <li>Student leadership training and discipleship programs</li>
                  <li>Evangelism and outreach initiatives on campuses</li>
                  <li>Staff support and ministry resources</li>
                  <li>Conferences and training events like the Ezra Generation Conference</li>
                </ul>
                <p className="mt-6 font-semibold text-brand">
                  Every gift, no matter the size, makes a difference in reaching students with the gospel.
                </p>
              </div>
            </div>
          </div>
              {/* Additional Information */}
              <div className="mt-8 pt-6 border-t border-custom">
              <p className="text-sm text-secondary text-center italic">
                For more information about giving or to set up recurring donations, please{' '}
                <Link href="/contact" className="text-action hover:text-link-hover font-semibold">
                  contact us
                </Link>
                .
              </p>
            </div>
        </section>

        {/* Giving Options Section */}
 

   
      </main>
      <FloatingActionButton />
      <Footer />
    </>
  )
}

export default DonatePage



'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SubscribeModal from './SubscribeModal'

const Navbar = () => {
  const pathname = usePathname()
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu()
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <div>
      {/* Top Navigation Bar - Hidden on small screens, scrollable on medium */}
      <nav className="relative border-b border-custom z-20 overflow-hidden hidden md:block">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/umugogo/large_imigogo.png')" }}
        ></div>
        {/* Light Overlay */}
        <div className="absolute inset-0 navbar-overlay"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <div className="flex justify-center items-center space-x-4 lg:space-x-8 flex-1 overflow-x-auto">
              <Link
                href="/whatWeBelieve"
                className={`link-color hover:text-muted text-xs font-semibold transition-colors pb-1 whitespace-nowrap ${
                  pathname === '/whatWeBelieve' ? 'border-b-2 border-action' : 'border-b-2 border-transparent hover:border-link-hover'
                }`}
              >
                WHAT WE BELIEVE
              </Link>
              <div className="border-r-[1.5px] border-custom h-7"></div>
              <Link
                href="/ifes"
                className={`link-color hover:text-muted text-xs font-semibold transition-colors pb-1 whitespace-nowrap ${
                  pathname === '/ifes' ? 'border-b-2 border-action' : 'border-b-2 border-transparent hover:border-link-hover'
                }`}
              >
                GBUR/IFES History
              </Link>
              <Link
                href="/conference"
                className={`link-color hover:text-muted text-xs font-semibold transition-colors pb-1 whitespace-nowrap ${
                  pathname === '/conference' ? 'border-b-2 border-action' : 'border-b-2 border-transparent hover:border-link-hover'
                }`}
              >
                CONFERENCE
              </Link>

              <Link
                href="/lifeInMinistry"
                className={`link-color hover:text-muted text-xs font-semibold transition-colors pb-1 whitespace-nowrap ${
                  pathname === '/lifeInMinistry' ? 'border-b-2 border-action' : 'border-b-2 border-transparent hover:border-link-hover'
                }`}
              >
                LIFE IN MINISTRY
              </Link>

              <Link
                href="/contact"
                className={`link-color hover:text-muted text-xs font-semibold transition-colors pb-1 whitespace-nowrap ${
                  pathname === '/contact' ? 'border-b-2 border-action' : 'border-b-2 border-transparent hover:border-link-hover'
                }`}
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Navigation Bar */}
      <nav className="relative shadow-custom py-2.4 z-20 overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/umugogo/large_imigogo.png')" }}
        ></div>
        {/* Light Overlay */}
        <div className="absolute inset-0 navbar-overlay"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center" onClick={closeMobileMenu}>
                <div
                  className="w-[100px] sm:w-[120px] h-8 sm:h-10 rounded-md border-custom flex items-center justify-center mr-2 sm:mr-3"
                >
                  <Image 
                    src="/Gbur/logo-r.png" 
                    alt="GBUR Logo" 
                    width={120} 
                    height={40}
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:block">
              <div className="ml-10 h-10 flex items-baseline space-x-6 xl:space-x-8">
                <Link
                  href="/"
                  className={`text-primary link-color font-bold text-sm tracking-wide transition-colors pb-1 ${
                    pathname === '/' ? 'border-b-2 border-action' : 'border-b-2 border-transparent hover:border-link-hover'
                  }`}
                >
                  ABOUT US
                </Link>
                <Link
                  href="/OurMinistry"
                  className={`text-primary link-color font-bold text-sm tracking-wide transition-colors pb-1 ${
                    pathname === '/OurMinistry' ? 'border-b-2 border-action' : 'border-b-2 border-transparent hover:border-link-hover'
                  }`}
                >
                  OUR MINISTRY
                </Link>
                <Link
                  href="/blog"
                  className={`text-primary link-color font-bold text-sm tracking-wide transition-colors pb-1 ${
                    pathname === '/blog' ? 'border-b-2 border-action' : 'border-b-2 border-transparent hover:border-link-hover'
                  }`}
                >
                  BLOG
                </Link>
                <Link
                  href="/compus"
                  className={`text-primary link-color font-bold text-sm tracking-wide transition-colors pb-1 ${
                    pathname === '/compus' ? 'border-b-2 border-action' : 'border-b-2 border-transparent hover:border-link-hover'
                  }`}
                >
                  COMPUS
                </Link>
                <Link
                  href="/graduate"
                  className={`text-primary link-color font-bold text-sm tracking-wide transition-colors pb-1 ${
                    pathname === '/graduate' ? 'border-b-2 border-action' : 'border-b-2 border-transparent hover:border-link-hover'
                  }`}
                >
                  GRADUATE
                </Link>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Subscribe Button - Hidden on mobile, shown on tablet+ */}
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="hidden md:block text-primary link-color font-bold text-xs sm:text-sm transition-colors hover:text-link-hover"
              >
                Subscribe
              </button>

              {/* Donate Button */}
              <Link
                href="/Donate"
                className="btn-primary px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center shadow-custom"
              >
                <span className="hidden sm:inline">Donate</span>
                <span className="sm:hidden">Give</span>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>

              {/* Mobile Menu Hamburger Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden text-primary link-color p-2 rounded-lg hover:bg-main transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden relative z-10 bg-main border-t border-custom transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Mobile Top Nav Links */}
            <div className="space-y-3 mb-4 pb-4 border-b border-custom">
              <Link
                href="/whatWeBelieve"
                onClick={closeMobileMenu}
                className={`block link-color hover:text-muted text-sm font-semibold transition-colors py-2 ${
                  pathname === '/whatWeBelieve' ? 'text-action border-l-4 border-action pl-3' : 'pl-3'
                }`}
              >
                WHAT WE BELIEVE
              </Link>
              <Link
                href="/ifes"
                onClick={closeMobileMenu}
                className={`block link-color hover:text-muted text-sm font-semibold transition-colors py-2 ${
                  pathname === '/ifes' ? 'text-action border-l-4 border-action pl-3' : 'pl-3'
                }`}
              >
                GBUR/IFES History
              </Link>
              <Link
                href="/conference"
                onClick={closeMobileMenu}
                className={`block link-color hover:text-muted text-sm font-semibold transition-colors py-2 ${
                  pathname === '/conference' ? 'text-action border-l-4 border-action pl-3' : 'pl-3'
                }`}
              >
                CONFERENCE
              </Link>
              <Link
                href="/lifeInMinistry"
                onClick={closeMobileMenu}
                className={`block link-color hover:text-muted text-sm font-semibold transition-colors py-2 ${
                  pathname === '/lifeInMinistry' ? 'text-action border-l-4 border-action pl-3' : 'pl-3'
                }`}
              >
                LIFE IN MINISTRY
              </Link>
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className={`block link-color hover:text-muted text-sm font-semibold transition-colors py-2 ${
                  pathname === '/contact' ? 'text-action border-l-4 border-action pl-3' : 'pl-3'
                }`}
              >
                CONTACT US
              </Link>
            </div>

            {/* Mobile Main Nav Links */}
            <div className="space-y-3 mb-4 pb-4 border-b border-custom">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className={`block text-primary link-color font-bold text-base transition-colors py-2 ${
                  pathname === '/' ? 'text-action border-l-4 border-action pl-3' : 'pl-3'
                }`}
              >
                ABOUT US
              </Link>
              <Link
                href="/OurMinistry"
                onClick={closeMobileMenu}
                className={`block text-primary link-color font-bold text-base transition-colors py-2 ${
                  pathname === '/OurMinistry' ? 'text-action border-l-4 border-action pl-3' : 'pl-3'
                }`}
              >
                OUR MINISTRY
              </Link>
              <Link
                href="/blog"
                onClick={closeMobileMenu}
                className={`block text-primary link-color font-bold text-base transition-colors py-2 ${
                  pathname === '/blog' ? 'text-action border-l-4 border-action pl-3' : 'pl-3'
                }`}
              >
                BLOG
              </Link>
              <Link
                href="/compus"
                onClick={closeMobileMenu}
                className={`block text-primary link-color font-bold text-base transition-colors py-2 ${
                  pathname === '/compus' ? 'text-action border-l-4 border-action pl-3' : 'pl-3'
                }`}
              >
                COMPUS
              </Link>
              <Link
                href="/graduate"
                onClick={closeMobileMenu}
                className={`block text-primary link-color font-bold text-base transition-colors py-2 ${
                  pathname === '/graduate' ? 'text-action border-l-4 border-action pl-3' : 'pl-3'
                }`}
              >
                GRADUATE
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsSubscribeModalOpen(true)
                  closeMobileMenu()
                }}
                className="w-full text-left text-primary link-color font-bold text-base transition-colors py-2 pl-3 hover:text-link-hover"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </nav>
    
    {/* Subscribe Modal */}
    <SubscribeModal
      isOpen={isSubscribeModalOpen}
      onClose={() => setIsSubscribeModalOpen(false)}
    />
    </div>
  )
}

export default Navbar

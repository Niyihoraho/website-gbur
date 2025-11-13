'use client'

import React, { useState, useEffect } from 'react'

interface SubscribeModalProps {
  isOpen: boolean
  onClose: () => void
}

const SubscribeModal = ({ isOpen, onClose }: SubscribeModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isSubmitting, onClose])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed')
      }

      setSubmitStatus('success')
      setFormData({ firstName: '', lastName: '', email: '' })
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose()
        setSubmitStatus('idle')
      }, 2000)
    } catch (error: any) {
      console.error('Subscription error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ firstName: '', lastName: '', email: '' })
      setErrors({})
      setSubmitStatus('idle')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={handleClose}
    >
      <div
        className="bg-main rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-main border-b border-custom px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-xl z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-brand pr-2">Subscribe to Our Newsletter</h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-secondary hover:text-brand transition-colors disabled:opacity-50 flex-shrink-0"
            aria-label="Close"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-6 sm:py-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand mb-2">Thank You!</h3>
              <p className="text-sm sm:text-base text-secondary">
                You've been successfully subscribed to our newsletter.
              </p>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="text-center py-6 sm:py-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand mb-2">Something Went Wrong</h3>
              <p className="text-sm sm:text-base text-secondary mb-4">
                Please try again later.
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="btn-primary px-6 py-2 rounded-lg font-semibold text-sm"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm sm:text-base text-secondary mb-4 sm:mb-6">
                Stay updated with the latest news, events, and updates from GBUR. Join our community today!
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                      errors.firstName
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-custom focus:border-action focus:ring-action'
                    } focus:outline-none focus:ring-2 text-secondary bg-white transition-colors`}
                    placeholder="Enter your first name"
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                      errors.lastName
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-custom focus:border-action focus:ring-action'
                    } focus:outline-none focus:ring-2 text-secondary bg-white transition-colors`}
                    placeholder="Enter your last name"
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-custom focus:border-action focus:ring-action'
                    } focus:outline-none focus:ring-2 text-secondary bg-white transition-colors`}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-3 sm:pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-sm sm:text-base">Subscribing...</span>
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubscribeModal


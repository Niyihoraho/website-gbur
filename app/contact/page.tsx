'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingActionButton from '../components/FloatingActionButton'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phoneNumber: formData.phone || null,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (error: any) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Office Email',
      content: 'ugbroffice@gmail.com',
      link: 'mailto:ugbroffice@gmail.com',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Telephone',
      content: '+250 786 030 841',
      link: 'tel:+250786030841',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Mobile',
      content: '+250 788 613 494',
      link: 'tel:+250788613494',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Address',
      content: 'Gasabo District, Kacyiru, Cell: Kamutwa, P.O Box: 1116 Kigali, Rwanda',
      link: '#',
    },
  ]

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/intervarsityusa',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/intervarsityusa',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/intervarsityusa',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/intervarsityusa',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ]

  return (
    <>
      <Navbar />
      <main className="bg-accent min-h-screen">
        {/* Title Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-6 md:pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative w-full h-48 md:h-64 lg:h-80 rounded-xl overflow-hidden shadow-custom">
              <Image
                src="/ezra-2025/EZRA SG1A.jpg"
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
        <section className="bg-main pt-8 md:pt-12 pb-4 md:pb-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg md:text-4xl lg:text-5xl font-bold text-action text-center">
              Contact Us
            </h1>
            <p className="text-secondary text-base md:text-lg text-center mt-4 max-w-2xl mx-auto">
              We'd love to hear from you. Get in touch with us and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-8 md:py-12 bg-main">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Contact Information Cards */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-action mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-secondary text-base mb-6">
                    Have questions or want to learn more about GBUR? We're here to help. Reach out through any of the channels below.
                  </p>
                </div>

                {/* Contact Info Cards */}
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      className="block bg-main border border-custom rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-action/10 rounded-lg flex items-center justify-center mr-4">
                          <div className="text-action">{info.icon}</div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-brand mb-1">{info.title}</p>
                          <p className="text-base text-secondary">{info.content}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Office Hours */}
                <div className="bg-accent rounded-lg p-6 border border-custom/30">
                  <h3 className="text-lg font-bold text-brand mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Office Hours
                  </h3>
                  <div className="space-y-2 text-secondary">
                    <p className="text-base"><span className="font-semibold">Monday - Friday:</span> 9:00 AM - 5:00 PM</p>
                    <p className="text-base"><span className="font-semibold">Saturday:</span> 9:00 AM - 1:00 PM</p>
                    <p className="text-base"><span className="font-semibold">Sunday:</span> Closed</p>
                  </div>
                </div>

                {/* Additional Contact Email */}
                <div className="bg-main border border-custom rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-action/10 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-brand mb-1">Private Email</p>
                      <a href="mailto:rukundos.rs@gmail.com" className="text-base text-action hover:text-link-hover break-all">
                        rukundos.rs@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-lg font-bold text-brand mb-4">Follow Us</h3>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-action/10 rounded-lg flex items-center justify-center text-action hover:bg-action hover:text-white transition-all duration-300 hover:scale-110"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-main border border-custom rounded-xl p-6 md:p-8 shadow-custom">
                  <h2 className="text-xl md:text-2xl font-bold text-action mb-6">
                    Send us a Message
                  </h2>

                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-green-800 font-semibold">Thank you! Your message has been sent successfully.</p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-800 font-semibold">Something went wrong. Please try again later.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-brand mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.name ? 'border-red-500' : 'border-custom'
                          } focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent transition-all`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-brand mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.email ? 'border-red-500' : 'border-custom'
                          } focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent transition-all`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-brand mb-2">
                        Phone Number <span className="text-muted text-xs">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-custom focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent transition-all"
                        placeholder="+250 788 123 456"
                      />
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-brand mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.subject ? 'border-red-500' : 'border-custom'
                        } focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent transition-all bg-white`}
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="ministry">Ministry Information</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="donation">Donation Questions</option>
                        <option value="campus">Campus Chapter Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-brand mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.message ? 'border-red-500' : 'border-custom'
                        } focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent transition-all resize-none`}
                        placeholder="Tell us how we can help you..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                      <p className="mt-1 text-xs text-muted">
                        {formData.message.length} characters
                      </p>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary py-3 rounded-lg font-semibold text-base transition-all duration-300 flex items-center justify-center shadow-custom hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section (Placeholder) */}
        <section className="py-8 md:py-12 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl md:text-2xl font-bold text-action mb-6 text-center">
              Find Us
            </h2>
            <div className="bg-white rounded-xl overflow-hidden shadow-custom border border-custom">
              <div className="relative w-full h-64 md:h-96 bg-accent flex items-center justify-center">
                <div className="text-center px-4">
                  <svg className="w-16 h-16 text-action mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-secondary text-lg font-semibold mb-2">GBUR Office</p>
                  <p className="text-secondary text-base">Gasabo District, Kacyiru</p>
                  <p className="text-secondary text-base">Cell: Kamutwa</p>
                  <p className="text-secondary text-base">P.O Box: 1116 Kigali</p>
                  <p className="text-secondary text-base mt-2">Kigali, Kacyiru, Rwanda</p>
                  <p className="text-muted text-sm mt-4">Map integration coming soon</p>
                </div>
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

export default ContactPage


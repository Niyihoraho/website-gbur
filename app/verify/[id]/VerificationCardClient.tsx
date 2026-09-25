'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { StaffCard } from '@/app/lib/staffCards'
import { getVerificationUrl } from '@/app/lib/staffCards'
import { useAuth } from '@/app/contexts/AuthContext'

interface ClientProps {
  initialCard: StaffCard | null
  requestedId: string
}

export default function VerificationCardClient({ initialCard, requestedId }: ClientProps) {
  const router = useRouter()
  const { isAdmin } = useAuth()
  const [copied, setCopied] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [searchId, setSearchId] = useState('')

  const card = initialCard

  const handleCopyLink = () => {
    const url = getVerificationUrl(card ? card.id : requestedId)
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchId.trim()) {
      router.push(`/verify/${searchId.trim().toUpperCase()}`)
    }
  }

  // If card not found
  if (!card) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-center p-8 md:p-12 transition-all">
        <div className="w-20 h-20 mx-auto rounded-full bg-red-50 text-red-500 border border-red-200 flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-[#002a5c] mb-3">
          Staff Card Not Found
        </h1>
        <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm md:text-base leading-relaxed">
          No staff verification record was found matching ID{' '}
          <span className="font-mono font-bold bg-slate-100 text-slate-900 px-2 py-1 rounded">
            {requestedId}
          </span>
          . Please ensure you entered the exact ID format (e.g., <code className="text-sky-700">GBUR-2026-001</code>).
        </p>

        {/* Search Another ID */}
        <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto mb-8 flex gap-2">
          <input
            type="text"
            placeholder="Enter Staff ID (e.g. GBUR-2026-001)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2980b9]"
          />
          <button
            type="submit"
            className="bg-[#002a5c] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#003d7a] transition-colors"
          >
            Verify
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link
            href="/verify"
            className="text-[#2980b9] hover:underline font-semibold flex items-center gap-1.5"
          >
            ← Return to Verification Portal
          </Link>
          {isAdmin && (
            <>
              <span className="text-slate-300">•</span>
              <Link
                href="/staff-cards"
                className="text-[#002a5c] hover:underline font-semibold"
              >
                View Staff Directory
              </Link>
            </>
          )}
        </div>
      </div>
    )
  }

  // Parse validity
  let isValid = true
  let formattedValidity = 'N/A'
  if (card.validity) {
    const valDate = new Date(card.validity)
    const today = new Date()
    formattedValidity = valDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    isValid = valDate >= today
  }

  const initials = `${card.first_name.charAt(0)}${card.last_name.charAt(0)}`.toUpperCase()

  return (
    <>
      <div className="space-y-6">
        {/* Verification Card */}
        <div
          id="printable-card"
          className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-3xl"
        >
          {/* Header Banner */}
          <header className="relative bg-gradient-to-br from-[#001d3d] via-[#002a5c] to-[#175e91] text-white text-center py-6 px-6 sm:px-8 overflow-hidden">
            {/* Ambient Background Graphic */}
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-sky-300/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Verified Badge Icon */}
              <div className="mb-3 transform hover:scale-105 transition-transform duration-300">
                {isValid ? (
                  <svg
                    className="w-14 h-14 filter drop-shadow-lg"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 3.5L28.8 6.8L34.5 5.5L37.1 10.7L42.8 12.1L42.5 18L46.8 21.9L44.2 27.1L46.8 32.3L42.5 36.2L42.8 42.1L37.1 43.5L34.5 48.7L28.8 47.4L24 50.7L19.2 47.4L13.5 48.7L10.9 43.5L5.2 42.1L5.5 36.2L1.2 32.3L3.8 27.1L1.2 21.9L5.5 18L5.2 12.1L10.9 10.7L13.5 5.5L19.2 6.8L24 3.5Z"
                      fill="#5DAAE0"
                    />
                    <path
                      d="M24 6L28.2 8.9L33.2 7.8L35.5 12.3L40.5 13.5L40.2 18.7L44 22.1L41.7 26.7L44 31.3L40.2 34.7L40.5 39.9L35.5 41.1L33.2 45.6L28.2 44.5L24 47.4L19.8 44.5L14.8 45.6L12.5 41.1L7.5 39.9L7.8 34.7L4 31.3L6.3 26.7L4 22.1L7.8 18.7L7.5 13.5L12.5 12.3L14.8 7.8L19.8 8.9L24 6Z"
                      fill="#002a5c"
                    />
                    <path
                      d="M16 24.5L21.5 30L32 18.5"
                      stroke="#FFFFFF"
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <div className="w-14 h-14 rounded-full bg-red-600/80 border-2 border-red-300 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
              </div>

              <h1
                style={{ color: '#ffffff' }}
                className="text-xl sm:text-2xl font-black tracking-tight"
              >
                {isValid ? 'Staff Card Verified' : 'Staff Card Expired'}
              </h1>
              <p className="text-xs sm:text-sm text-sky-100/90 mt-1 max-w-sm">
                {isValid
                  ? 'Official ministry identification card registered and actively valid with GBUR.'
                  : 'This ministry card is recorded in the GBUR system but has passed its expiration date.'}
              </p>
            </div>
          </header>

          {/* Glowing Brand Line */}
          <div className="h-1 bg-gradient-to-r from-[#002a5c] via-[#5DAAE0] to-[#002a5c]" />

          {/* Profile Section with Member Photo */}
          <div className="p-5 sm:p-6 bg-sky-50/70 border-b border-sky-100 flex items-center gap-4 sm:gap-5">
            {/* Member Photo */}
            <div className="relative group cursor-pointer" onClick={() => setShowPhotoModal(true)}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#002a5c] text-white flex items-center justify-center font-black text-xl sm:text-2xl border-2 border-[#5DAAE0] shadow-md ring-4 ring-sky-200/50 flex-shrink-0 transition-transform group-hover:scale-105">
                {card.image_url && !imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={encodeURI(card.image_url)}
                    alt={`${card.first_name} ${card.last_name}`}
                    className="w-full h-full object-cover object-top"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              {card.image_url && !imgError && (
                <span className="absolute bottom-0 right-0 bg-[#002a5c] text-white p-1 rounded-full text-[10px] shadow border border-white" title="Click to view full photo">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </span>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-black text-[#002a5c] leading-tight break-words">
                {card.first_name} {card.last_name}
              </h2>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-white text-[#002a5c] border border-sky-200 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5DAAE0]" />
                  {card.position || 'Campus Staff'}
                </span>
              </div>
            </div>
          </div>

          {/* Details Table */}
          <div className="p-5 sm:p-7 space-y-3.5 divide-y divide-slate-100 text-sm">
            {/* Staff ID */}
            <div className="pt-2 first:pt-0 flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Staff ID
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-extrabold text-[#002a5c] bg-sky-50 border border-sky-200 px-2.5 py-1 rounded text-xs sm:text-sm tracking-wider">
                  {card.id}
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="text-xs text-slate-500 hover:text-[#2980b9] p-1 rounded transition-colors"
                  title="Copy ID & Link"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Department */}
            <div className="pt-3.5 flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Department
              </span>
              <span className="font-semibold text-slate-800 text-right">
                {card.department || 'Students Ministry'}
              </span>
            </div>

            {/* Work Field */}
            <div className="pt-3.5 flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Work Field / Region
              </span>
              <span className="font-semibold text-slate-800 text-right">
                {card.work_field || 'GBUR Head Office'}
              </span>
            </div>

            {/* Universities in Charge */}
            <div className="pt-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 pt-1">
                Universities in Charge
              </span>
              <div className="flex flex-wrap justify-start sm:justify-end gap-1.5 max-w-sm">
                {card.universities_in_charge && card.universities_in_charge.length > 0 ? (
                  card.universities_in_charge.map((uni, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sky-50 border border-sky-200 text-[#002a5c] text-xs font-semibold rounded"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5DAAE0] flex-shrink-0" />
                      {uni}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">None assigned / National Office</span>
                )}
              </div>
            </div>

            {/* Validity */}
            <div className="pt-3.5 flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Card Validity
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-2.5 py-1 rounded ${
                    isValid
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isValid ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
                    }`}
                  />
                  {isValid ? 'Valid Until' : 'Expired On'}
                </span>
                <span className="font-semibold text-slate-700 text-xs sm:text-sm">
                  {formattedValidity}
                </span>
              </div>
            </div>

            {/* Digital Verification QR Code */}
            <div className="pt-3.5 flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Digital Verification
              </span>
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex items-center justify-center flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&margin=2&data=${encodeURIComponent(getVerificationUrl(card.id))}`}
                    alt="Verification QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-[11px] text-slate-500 text-right leading-tight">
                  <span className="font-bold text-[#002a5c] block">Official QR Code</span>
                  <span>Scan to verify on gburwanda.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <footer className="bg-slate-100/80 border-t border-slate-200 px-6 py-3.5 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-[#002a5c]">
              <span className="w-4 h-4 rounded bg-[#002a5c] text-white flex items-center justify-center">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              Verified by GBUR
            </div>
            <a
              href={getVerificationUrl(card.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-600 hover:text-[#002a5c] transition-colors"
            >
              www.gburwanda.com/verify/{card.id}
            </a>
          </footer>
        </div>

        {/* Official Production URL Banner */}
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-semibold text-slate-700">Official Production Link:</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <code className="bg-slate-100 text-[#002a5c] px-2.5 py-1 rounded font-mono font-bold text-xs select-all border border-slate-200 truncate max-w-[280px] sm:max-w-none">
              {getVerificationUrl(card.id)}
            </code>
            <button
              type="button"
              onClick={handleCopyLink}
              className="bg-[#002a5c] hover:bg-[#003d7a] text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors flex-shrink-0"
              title="Copy official production link"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Action Buttons Toolbar */}

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-[#002a5c] hover:border-[#2980b9] shadow-sm text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-700 font-bold">Verification Link Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-[#2980b9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy Verification Link</span>
              </>
            )}
          </button>

          {/* Print Card Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-[#002a5c] hover:border-[#2980b9] shadow-sm text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4 text-[#2980b9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print / Save Card</span>
          </button>

          {/* Verify Another */}
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002a5c] text-white hover:bg-[#003d7a] shadow-sm text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Verify Another ID</span>
          </Link>

          {/* View Directory - Only for logged in admin */}
          {isAdmin && (
            <Link
              href="/staff-cards"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-50 text-[#002a5c] border border-sky-200 hover:bg-sky-100 shadow-sm text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              <span>Staff Directory</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Photo Modal */}
      {showPhotoModal && card.image_url && !imgError && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPhotoModal(false)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl p-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
            <div className="w-64 h-64 mx-auto rounded-xl overflow-hidden mb-4 shadow border-2 border-sky-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={encodeURI(card.image_url)}
                alt={`${card.first_name} ${card.last_name}`}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h3 className="font-extrabold text-lg text-[#002a5c]">
              {card.first_name} {card.last_name}
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-semibold">
              {card.position} • {card.id}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/app/components/navbar'
import Footer from '@/app/components/footer'
import type { StaffCard } from '@/app/lib/staffCards'
import { useAuth } from '@/app/contexts/AuthContext'

export default function VerifyPortalPage() {
  const router = useRouter()
  const { isAdmin } = useAuth()
  const [searchId, setSearchId] = useState('')
  const [featuredStaff, setFeaturedStaff] = useState<StaffCard[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetch('/api/staff-cards')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.staffCards) {
          setFeaturedStaff(data.staffCards)
        }
      })
      .catch((err) => console.error('Failed to load staff cards:', err))
      .finally(() => setLoading(false))
  }, [])

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = searchId.trim().toUpperCase()
    if (!clean) {
      setErrorMsg('Please enter a Staff Card ID')
      return
    }
    setErrorMsg('')
    router.push(`/verify/${clean}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none"
          style={{ backgroundImage: "url('/umugogo/large_imigogo.png')" }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Hero Section */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-[#002a5c] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-sky-200">
              <span className="w-2 h-2 rounded-full bg-[#5DAAE0] animate-pulse" />
              Official Verification System
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002a5c] tracking-tight leading-tight">
              GBUR Staff Card Verification
            </h1>
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              Verify the identity and ministry credentials of staff members belonging to Groupe
              Biblique Universitaire du Rwanda (GBUR). Enter a Staff Card ID below to authenticate.
            </p>

            {/* Search Input Box */}
            <form onSubmit={handleVerifySubmit} className="mt-8 max-w-lg mx-auto">
              <div className="relative flex items-center shadow-lg rounded-2xl bg-white border-2 border-sky-200 focus-within:border-[#002a5c] transition-all p-1.5">
                <div className="pl-3 pr-2 text-slate-400">
                  <svg className="w-5 h-5 text-[#2980b9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => {
                    setSearchId(e.target.value)
                    if (errorMsg) setErrorMsg('')
                  }}
                  placeholder="Enter ID, e.g. GBUR-2026-001"
                  className="w-full bg-transparent py-3 px-2 text-sm sm:text-base font-semibold text-slate-800 placeholder-slate-400 focus:outline-none uppercase"
                />
                <button
                  type="submit"
                  className="bg-[#002a5c] hover:bg-[#003d7a] text-white px-5 sm:px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>Verify</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
              {errorMsg && (
                <p className="mt-2 text-xs font-semibold text-red-600 text-left pl-3">{errorMsg}</p>
              )}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                <span>Sample ID:</span>
                <button
                  type="button"
                  onClick={() => setSearchId('GBUR-2026-001')}
                  className="font-mono font-bold text-[#2980b9] hover:underline"
                >
                  GBUR-2026-001
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setSearchId('GBUR-2026-008')}
                  className="font-mono font-bold text-[#2980b9] hover:underline"
                >
                  GBUR-2026-008
                </button>
              </div>
            </form>
          </div>

          {/* Quick Staff Verification Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#002a5c]">
                  Active GBUR Staff Members
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Select any staff member to view their verified digital credential.
                </p>
              </div>
              {isAdmin && (
                <Link
                  href="/staff-cards"
                  className="text-xs sm:text-sm font-bold text-[#2980b9] hover:text-[#002a5c] flex items-center gap-1 hover:underline"
                >
                  View Full Directory & Register →
                </Link>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <div key={n} className="bg-white rounded-xl p-4 border border-slate-200 animate-pulse space-y-3">
                    <div className="w-12 h-12 bg-slate-200 rounded-lg mx-auto" />
                    <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto" />
                    <div className="h-3 bg-slate-200 rounded w-1/2 mx-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {featuredStaff.map((staff) => (
                  <Link
                    key={staff.id}
                    href={`/verify/${staff.id}`}
                    className="group bg-white rounded-xl p-4 sm:p-5 border border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
                  >
                    {/* Staff Photo */}
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-[#002a5c] text-white flex items-center justify-center font-bold text-lg border-2 border-sky-200 shadow-md group-hover:ring-4 group-hover:ring-sky-200 transition-all mb-3 flex-shrink-0">
                      {staff.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={encodeURI(staff.image_url)}
                          alt={`${staff.first_name} ${staff.last_name}`}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <span>
                          {staff.first_name.charAt(0)}
                          {staff.last_name.charAt(0)}
                        </span>
                      )}
                    </div>

                    <span className="font-mono text-[11px] font-bold text-[#2980b9] bg-sky-50 px-2 py-0.5 rounded border border-sky-100 mb-1">
                      {staff.id}
                    </span>

                    <h3 className="font-extrabold text-sm sm:text-base text-[#002a5c] group-hover:text-[#2980b9] transition-colors line-clamp-1">
                      {staff.first_name} {staff.last_name}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {staff.position || 'Staff'}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 w-full flex items-center justify-between text-[11px]">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Verified
                      </span>
                      <span className="text-slate-400 group-hover:text-[#002a5c] font-semibold flex items-center gap-0.5 transition-colors">
                        View Card →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

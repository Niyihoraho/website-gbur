'use client'

import React, { useState, useEffect, useMemo, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/app/components/navbar'
import Footer from '@/app/components/footer'
import type { StaffCard } from '@/app/lib/staffCards'
import { getVerificationUrl } from '@/app/lib/staffCards'
import { useAuth } from '@/app/contexts/AuthContext'

function StaffCardsContent() {
  const { isAdmin, login, logout } = useAuth()
  const [adminPassword, setAdminPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'directory'

  const [activeTab, setActiveTab] = useState<'directory' | 'register'>(initialTab)

  // Directory State
  const [cards, setCards] = useState<StaffCard[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [regionFilter, setRegionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Registration Form State
  const [suggestedId, setSuggestedId] = useState('GBUR-2026-017')
  const [customId, setCustomId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [position, setPosition] = useState('Campus Staff')
  const [department, setDepartment] = useState('Students Ministry')
  const [workField, setWorkField] = useState('GBUR Head Office')
  const [universities, setUniversities] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [validity, setValidity] = useState('')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<StaffCard | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Load cards and suggestions on mount
  const loadCards = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/staff-cards')
      const data = await res.json()
      if (data.success && data.staffCards) {
        setCards(data.staffCards)
        if (data.nextSuggestedId) {
          setSuggestedId(data.nextSuggestedId)
          if (!customId) setCustomId(data.nextSuggestedId)
        }
      }
    } catch (err) {
      console.error('Failed to load cards:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCards()

    // Default validity to Dec 31 of next year
    const defaultDate = new Date()
    defaultDate.setFullYear(defaultDate.getFullYear() + 1)
    defaultDate.setMonth(11)
    defaultDate.setDate(31)
    setValidity(defaultDate.toISOString().split('T')[0])
  }, [])

  // Sync tab with URL param if changes
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam === 'register') {
      setActiveTab('register')
    } else if (tabParam === 'directory') {
      setActiveTab('directory')
    }
  }, [searchParams])

  // Filtered Cards
  const filteredCards = useMemo(() => {
    const now = new Date()
    return cards.filter((card) => {
      const q = searchQuery.toLowerCase().trim()
      const fullName = `${card.first_name} ${card.last_name}`.toLowerCase()
      const matchesSearch =
        !q ||
        card.id.toLowerCase().includes(q) ||
        fullName.includes(q) ||
        (card.position || '').toLowerCase().includes(q) ||
        (card.department || '').toLowerCase().includes(q) ||
        (card.work_field || '').toLowerCase().includes(q) ||
        (card.universities_in_charge || []).some((u) => u.toLowerCase().includes(q))

      const matchesDept =
        departmentFilter === 'all' ||
        (card.department || '').toLowerCase() === departmentFilter.toLowerCase()

      const matchesRegion =
        regionFilter === 'all' ||
        (card.work_field || '').toLowerCase().includes(regionFilter.toLowerCase())

      let matchesStatus = true
      if (statusFilter === 'active') {
        matchesStatus = !card.validity || new Date(card.validity) >= now
      } else if (statusFilter === 'expired') {
        matchesStatus = !!card.validity && new Date(card.validity) < now
      }

      return matchesSearch && matchesDept && matchesRegion && matchesStatus
    })
  }, [cards, searchQuery, departmentFilter, regionFilter, statusFilter])

  // Stats calculation
  const stats = useMemo(() => {
    const now = new Date()
    const total = cards.length
    const active = cards.filter((c) => !c.validity || new Date(c.validity) >= now).length
    const allUnis = new Set<string>()
    cards.forEach((c) => (c.universities_in_charge || []).forEach((u) => allUnis.add(u)))
    const depts = new Set<string>()
    cards.forEach((c) => c.department && depts.add(c.department))

    return {
      total,
      active,
      universitiesCount: allUnis.size,
      departmentsCount: depts.size,
    }
  }, [cards])

  // University tag handling
  const handleAddTag = (name: string) => {
    const trimmed = name.trim()
    if (trimmed && !universities.includes(trimmed)) {
      setUniversities((prev) => [...prev, trimmed])
      setTagInput('')
    }
  }

  const handleRemoveTag = (index: number) => {
    setUniversities((prev) => prev.filter((_, i) => i !== index))
  }

  const handleTagKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      handleAddTag(tagInput)
    }
  }

  // Photo change handler
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const previewUrl = URL.createObjectURL(file)
      setPhotoPreview(previewUrl)
    }
  }

  // Copy link handler
  const handleCopyLink = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const url = getVerificationUrl(id)
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Registration Form Submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      let finalImageUrl: string | null = null

      // If photo was selected, upload it first
      if (photoFile) {
        const formData = new FormData()
        formData.append('file', photoFile)
        const uploadRes = await fetch('/api/staff-cards/upload', {
          method: 'POST',
          body: formData,
        })
        const uploadData = await uploadRes.json()
        if (uploadData.success && uploadData.path) {
          finalImageUrl = uploadData.path
        }
      }

      const payload = {
        id: customId.trim() || suggestedId,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        position: position.trim() || 'Campus Staff',
        department: department,
        work_field: workField,
        universities_in_charge: universities,
        validity: validity || null,
        image_url: finalImageUrl,
      }

      const res = await fetch('/api/staff-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save staff card')
      }

      setSubmitSuccess(data.staffCard)
      // Refresh directory cards
      await loadCards()

      // Reset form fields
      setFirstName('')
      setLastName('')
      setUniversities([])
      setPhotoFile(null)
      setPhotoPreview(null)
    } catch (err: any) {
      console.error('Registration failed:', err)
      setSubmitError(err.message || 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setIsLoggingIn(true)
    setTimeout(() => {
      const success = login(adminPassword)
      if (success) {
        setAdminPassword('')
      } else {
        setLoginError('Incorrect password. Please try again.')
      }
      setIsLoggingIn(false)
    }, 250)
  }

  // Preview computed values
  const previewFullName = `${firstName.trim() || 'Aime'} ${lastName.trim() || 'IRADUKUNDA'}`
  const previewInitials = `${(firstName.trim() || 'A').charAt(0)}${(lastName.trim() || 'I').charAt(0)}`.toUpperCase()
  const isPreviewExpired = validity ? new Date(validity) < new Date() : false

  // If not logged in as admin, show access gate following login pattern
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />

        <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none"
            style={{ backgroundImage: "url('/umugogo/large_imigogo.png')" }}
          />

          <div className="relative z-10 max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#001d3d] via-[#002a5c] to-[#175e91] text-white text-center p-6 sm:p-8">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3 shadow">
                <svg className="w-7 h-7 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 style={{ color: '#ffffff' }} className="text-xl sm:text-2xl font-black tracking-tight">
                Staff Administration Access
              </h1>
              <p className="text-xs sm:text-sm text-sky-100/90 mt-1.5 leading-relaxed">
                Staff cards directory and registration are restricted to authorized GBUR administrators. Please login to continue.
              </p>
            </div>

            <div className="h-1 bg-gradient-to-r from-[#002a5c] via-[#5DAAE0] to-[#002a5c]" />

            {/* Login Form */}
            <form onSubmit={handleAdminLogin} className="p-6 sm:p-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Enter Admin Password
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value)
                    setLoginError('')
                  }}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2980b9] bg-slate-50 focus:bg-white"
                />
                {loginError && (
                  <p className="mt-2 text-xs font-semibold text-red-600 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{loginError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoggingIn || !adminPassword.trim()}
                className="w-full bg-[#002a5c] hover:bg-[#003d7a] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoggingIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Login to Staff Cards</span>
                )}
              </button>

              <div className="pt-2 text-center">
                <Link
                  href="/verify"
                  className="text-xs text-slate-500 hover:text-[#2980b9] font-semibold hover:underline"
                >
                  Need to verify a card instead? Go to Verification Portal →
                </Link>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-r from-[#001d3d] via-[#002a5c] to-[#175e91] text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-lg">
        {/* Background Imigogo overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('/umugogo/large_imigogo.png')" }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-200 border border-sky-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Ministry Credentials & Management
              </div>
              <h1
                style={{ color: '#ffffff' }}
                className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight"
              >
                GBUR Staff Card Portal
              </h1>
              <p className="mt-2 text-sky-100 text-sm md:text-base max-w-2xl">
                Browse verified ministry staff credentials, issue new identification cards, and
                authenticate active campus representatives across Rwanda.
              </p>
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-2 rounded-xl text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Admin Mode</span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                title="Logout from Admin Mode"
              >
                Logout
              </button>
              <Link
                href="/verify"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Verify a Card</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register')
                  setSubmitSuccess(null)
                }}
                className="bg-[#2980b9] hover:bg-[#3498db] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
                <span>Register New Staff</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/15">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
              <p className="text-[11px] sm:text-xs font-bold text-sky-200 uppercase tracking-wider">
                Total Staff
              </p>
              <p className="text-xl sm:text-2xl font-black text-white mt-1">{stats.total}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
              <p className="text-[11px] sm:text-xs font-bold text-sky-200 uppercase tracking-wider">
                Active & Valid
              </p>
              <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">{stats.active}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
              <p className="text-[11px] sm:text-xs font-bold text-sky-200 uppercase tracking-wider">
                Campuses In Charge
              </p>
              <p className="text-xl sm:text-2xl font-black text-sky-300 mt-1">{stats.universitiesCount}+</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
              <p className="text-[11px] sm:text-xs font-bold text-sky-200 uppercase tracking-wider">
                Departments
              </p>
              <p className="text-xl sm:text-2xl font-black text-white mt-1">{stats.departmentsCount}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tab Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              type="button"
              onClick={() => setActiveTab('directory')}
              className={`py-4 px-1 border-b-2 font-extrabold text-sm sm:text-base transition-colors flex items-center gap-2 ${
                activeTab === 'directory'
                  ? 'border-[#002a5c] text-[#002a5c]'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <svg className="w-5 h-5 text-[#2980b9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Registered Staff Directory</span>
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-[#002a5c]">
                {cards.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('register')
                setSubmitSuccess(null)
              }}
              className={`py-4 px-1 border-b-2 font-extrabold text-sm sm:text-base transition-colors flex items-center gap-2 ${
                activeTab === 'register'
                  ? 'border-[#002a5c] text-[#002a5c]'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <svg className="w-5 h-5 text-[#2980b9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>Register New Staff Card</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* ========================================================================= */}
        {/* TAB 1: REGISTERED STAFF DIRECTORY (VIEW PART)                             */}
        {/* ========================================================================= */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 space-y-4">
              <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, ID (e.g. GBUR-2026-001), position, university..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2980b9] bg-slate-50 focus:bg-white"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* View Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-end lg:self-auto">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      viewMode === 'grid'
                        ? 'bg-white text-[#002a5c] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span>Card Grid</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      viewMode === 'table'
                        ? 'bg-white text-[#002a5c] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span>Table View</span>
                  </button>
                </div>
              </div>

              {/* Dropdown Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                {/* Department Filter */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2980b9]"
                  >
                    <option value="all">All Departments</option>
                    <option value="Students Ministry">Students Ministry</option>
                    <option value="General Secretariat Office">General Secretariat Office</option>
                    <option value="Graduates Ministry">Graduates Ministry</option>
                    <option value="Finance">Finance</option>
                    <option value="Information and Technology">Information and Technology</option>
                  </select>
                </div>

                {/* Region / Work Field Filter */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Region / Work Field
                  </label>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2980b9]"
                  >
                    <option value="all">All Regions & Offices</option>
                    <option value="GBUR Office">GBUR Head Office</option>
                    <option value="Kigali Region">Kigali Region</option>
                    <option value="Southern Region">Southern Region</option>
                    <option value="Northern Region">Northern Region</option>
                    <option value="Eastern Region">Eastern Region</option>
                    <option value="Western Region">Western Region</option>
                  </select>
                </div>

                {/* Validity Status Filter */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Validity Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2980b9]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active & Valid Only</option>
                    <option value="expired">Expired Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>
                Showing <strong className="text-slate-800">{filteredCards.length}</strong> of{' '}
                <strong className="text-slate-800">{cards.length}</strong> registered staff cards
              </span>
              {(searchQuery || departmentFilter !== 'all' || regionFilter !== 'all' || statusFilter !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setDepartmentFilter('all')
                    setRegionFilter('all')
                    setStatusFilter('all')
                  }}
                  className="text-[#2980b9] font-bold hover:underline"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Content: Loading, Empty, Grid, or Table */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse space-y-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-slate-200 rounded-xl" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-slate-200 rounded w-3/4" />
                        <div className="h-3 bg-slate-200 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="h-10 bg-slate-100 rounded" />
                  </div>
                ))}
              </div>
            ) : filteredCards.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-sky-50 text-[#2980b9] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#002a5c] mb-1">No matching staff members found</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Try adjusting your search criteria or clearing filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setDepartmentFilter('all')
                    setRegionFilter('all')
                    setStatusFilter('all')
                  }}
                  className="bg-[#002a5c] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#003d7a]"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* ======================================= */
              /* CARD GRID VIEW                          */
              /* ======================================= */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCards.map((card) => {
                  const isValid = !card.validity || new Date(card.validity) >= new Date()
                  const formattedVal = card.validity
                    ? new Date(card.validity).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'N/A'

                  return (
                    <div
                      key={card.id}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 hover:border-sky-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                    >
                      {/* Top Header */}
                      <div className="p-5 pb-4">
                        <div className="flex items-start gap-4">
                          {/* Member Photo */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#002a5c] text-white flex items-center justify-center font-black text-xl border-2 border-[#5DAAE0] shadow-md flex-shrink-0">
                            {card.image_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={encodeURI(card.image_url)}
                                alt={`${card.first_name} ${card.last_name}`}
                                className="w-full h-full object-cover object-top"
                              />
                            ) : (
                              <span>
                                {card.first_name.charAt(0)}
                                {card.last_name.charAt(0)}
                              </span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-mono text-xs font-black text-[#002a5c] bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                                {card.id}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                  isValid
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${isValid ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                {isValid ? 'Valid' : 'Expired'}
                              </span>
                            </div>

                            <h3 className="font-black text-base sm:text-lg text-[#002a5c] leading-tight line-clamp-1 group-hover:text-[#2980b9] transition-colors">
                              {card.first_name} {card.last_name}
                            </h3>

                            <p className="text-xs font-bold text-slate-600 mt-0.5 line-clamp-1">
                              {card.position || 'Staff'}
                            </p>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                          <div className="flex items-center justify-between text-slate-600">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                              Dept
                            </span>
                            <span className="font-semibold text-slate-800 text-right truncate max-w-[65%]">
                              {card.department || 'Students Ministry'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-slate-600">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                              Field
                            </span>
                            <span className="font-semibold text-slate-800 text-right truncate max-w-[65%]">
                              {card.work_field || 'GBUR Head Office'}
                            </span>
                          </div>

                          {/* Universities In Charge */}
                          <div className="pt-1">
                            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                              <span>Universities</span>
                              <span className="text-sky-700 lowercase font-semibold">
                                {card.universities_in_charge?.length || 0} assigned
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto pr-1">
                              {card.universities_in_charge && card.universities_in_charge.length > 0 ? (
                                card.universities_in_charge.map((uni, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-sky-50 border border-sky-100 text-[#002a5c] text-[10.5px] font-medium rounded truncate max-w-full"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-[#5DAAE0] flex-shrink-0" />
                                    {uni}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[11px] text-slate-400 italic">None assigned</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="bg-slate-50 border-t border-slate-100 p-3 sm:px-5 flex items-center justify-between gap-2">
                        <div className="text-[11px] text-slate-500 font-medium">
                          Valid: <span className="font-bold text-slate-700">{formattedVal}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => handleCopyLink(card.id, e)}
                            className="p-1.5 text-slate-500 hover:text-[#002a5c] bg-white border border-slate-200 rounded-lg text-xs font-semibold shadow-sm transition-all hover:border-sky-300"
                            title="Copy Verification Link"
                          >
                            {copiedId === card.id ? (
                              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                            )}
                          </button>

                          <Link
                            href={`/verify/${card.id}`}
                            className="bg-[#002a5c] hover:bg-[#003d7a] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1"
                          >
                            <span>Verify Card</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              /* ======================================= */
              /* TABLE VIEW                              */
              /* ======================================= */
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 sm:pl-6">Staff Member</th>
                        <th className="px-3 py-3.5">Staff ID</th>
                        <th className="px-3 py-3.5">Department</th>
                        <th className="px-3 py-3.5">Work Field</th>
                        <th className="px-3 py-3.5">Universities in Charge</th>
                        <th className="px-3 py-3.5">Validity</th>
                        <th className="py-3.5 pl-3 pr-4 sm:pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {filteredCards.map((card) => {
                        const isValid = !card.validity || new Date(card.validity) >= new Date()
                        return (
                          <tr key={card.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 pl-4 pr-3 sm:pl-6 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#002a5c] text-white font-bold flex items-center justify-center border border-sky-300 flex-shrink-0">
                                  {card.image_url ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={encodeURI(card.image_url)}
                                      alt={`${card.first_name} ${card.last_name}`}
                                      className="w-full h-full object-cover object-top"
                                    />
                                  ) : (
                                    <span>
                                      {card.first_name.charAt(0)}
                                      {card.last_name.charAt(0)}
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <div className="font-extrabold text-slate-900 text-sm">
                                    {card.first_name} {card.last_name}
                                  </div>
                                  <div className="text-slate-500 font-medium text-[11px]">
                                    {card.position || 'Campus Staff'}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap font-mono font-bold text-[#002a5c]">
                              {card.id}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap font-medium text-slate-700">
                              {card.department || 'Students Ministry'}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap font-medium text-slate-600">
                              {card.work_field || 'GBUR Head Office'}
                            </td>
                            <td className="px-3 py-3 max-w-xs">
                              <div className="flex flex-wrap gap-1">
                                {card.universities_in_charge && card.universities_in_charge.length > 0 ? (
                                  card.universities_in_charge.slice(0, 2).map((u, i) => (
                                    <span
                                      key={i}
                                      className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-50 text-[#002a5c] border border-sky-100 truncate max-w-[120px]"
                                    >
                                      {u}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-slate-400 italic">None</span>
                                )}
                                {card.universities_in_charge && card.universities_in_charge.length > 2 && (
                                  <span className="text-[10px] text-slate-500 font-bold self-center">
                                    +{card.universities_in_charge.length - 2} more
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  isValid
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${isValid ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                {isValid ? 'Valid' : 'Expired'}
                              </span>
                            </td>
                            <td className="py-3 pl-3 pr-4 sm:pr-6 whitespace-nowrap text-right font-medium">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => handleCopyLink(card.id, e)}
                                  className="text-slate-400 hover:text-[#002a5c] p-1"
                                  title="Copy Verification Link"
                                >
                                  {copiedId === card.id ? (
                                    <span className="text-emerald-600 font-bold text-[11px]">Copied!</span>
                                  ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                  )}
                                </button>
                                <Link
                                  href={`/verify/${card.id}`}
                                  className="text-[#2980b9] hover:text-[#002a5c] font-bold text-xs hover:underline"
                                >
                                  Verify →
                                </Link>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: REGISTER NEW STAFF CARD (WITH LIVE CARD PREVIEW)                   */}
        {/* ========================================================================= */}
        {activeTab === 'register' && (
          <div className="space-y-6">
            {/* Success Banner */}
            {submitSuccess && (
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 text-center space-y-3 shadow-md animate-fadeIn">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-emerald-900">
                  Staff Card Successfully Registered!
                </h3>
                <p className="text-sm text-emerald-700 max-w-lg mx-auto">
                  Staff Card for{' '}
                  <strong>
                    {submitSuccess.first_name} {submitSuccess.last_name}
                  </strong>{' '}
                  has been created with ID <code className="font-bold text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-300">{submitSuccess.id}</code>.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    href={`/verify/${submitSuccess.id}`}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2"
                  >
                    <span>View Public Verification Page</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActiveTab('directory')}
                    className="bg-white border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-emerald-100/50"
                  >
                    View in Directory
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(null)}
                    className="text-xs text-emerald-700 hover:underline px-2"
                  >
                    Register Another
                  </button>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-semibold flex items-center justify-between">
                <span>{submitError}</span>
                <button type="button" onClick={() => setSubmitError(null)} className="text-red-500 hover:text-red-800">
                  ✕
                </button>
              </div>
            )}

            {/* Two-Column Workspace: Form + Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-[#002a5c] flex items-center gap-2">
                    <span className="w-1.5 h-5 rounded-full bg-[#5DAAE0]" />
                    Staff Card Details
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in the ministry credentials below. All changes will reflect in real-time in
                    the live card preview.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Staff ID */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Staff Card ID *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={customId || suggestedId}
                        onChange={(e) => setCustomId(e.target.value.toUpperCase())}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#2980b9]"
                        placeholder="GBUR-2026-017"
                      />
                      <span className="absolute right-3 top-2.5 text-[11px] font-semibold text-slate-400">
                        Editable
                      </span>
                    </div>
                  </div>

                  {/* Names Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Aime"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2980b9]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. IRADUKUNDA"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2980b9]"
                      />
                    </div>
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Position
                    </label>
                    <input
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder="e.g. Campus Staff, Coordinator, IT Officer"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2980b9]"
                    />
                  </div>

                  {/* Department & Region Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Department
                      </label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2980b9] bg-white font-medium"
                      >
                        <option value="Students Ministry">Students Ministry</option>
                        <option value="General Secretariat Office">General Secretariat Office</option>
                        <option value="Graduates Ministry">Graduates Ministry</option>
                        <option value="General Secretariat Office & Graduates Ministry">
                          General Secretariat Office & Graduates Ministry
                        </option>
                        <option value="Finance">Finance</option>
                        <option value="Information and Technology">Information and Technology</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Work Field / Region
                      </label>
                      <select
                        value={workField}
                        onChange={(e) => setWorkField(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2980b9] bg-white font-medium"
                      >
                        <option value="GBUR Head Office">GBUR Head Office</option>
                        <option value="GBUR Office - Kigali City">GBUR Office - Kigali City</option>
                        <option value="Kigali Region">Kigali Region</option>
                        <option value="Southern Region">Southern Region</option>
                        <option value="Northern Region">Northern Region</option>
                        <option value="Eastern Region">Eastern Region</option>
                        <option value="Western Region">Western Region</option>
                      </select>
                    </div>
                  </div>

                  {/* Universities in Charge */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Universities in Charge
                    </label>
                    <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/50 min-h-[48px] flex flex-wrap items-center gap-1.5">
                      {universities.map((uni, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sky-100 text-[#002a5c] border border-sky-200 rounded-lg text-xs font-semibold"
                        >
                          <span>{uni}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(idx)}
                            className="text-slate-400 hover:text-red-600 font-bold ml-0.5"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeydown}
                        placeholder="Type campus name & press Enter..."
                        className="flex-1 min-w-[160px] bg-transparent border-none text-xs sm:text-sm focus:outline-none p-1"
                      />
                    </div>

                    {/* Quick Add Presets */}
                    <div className="mt-2.5 space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Quick Add Rwandan Universities:
                      </span>
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pt-1">
                        {[
                          'University of Rwanda (UR)',
                          'UR Nyarugenge Campus',
                          'UR Huye Campus',
                          'UR Remera Campus',
                          'UR Gikondo Campus',
                          'UR Busogo Campus',
                          'UR Rukara Campus',
                          'University of Kigali (UoK)',
                          'Adventist University of Central Africa (AUCA)',
                          'INES Ruhengeri',
                          'ULK Kigali Main Campus',
                          'UTB Kigali Main Campus',
                          'RP Kigali College',
                          'RP Huye College',
                          'RP Musanze College',
                          'RP Ngoma College',
                          'RP Karongi College',
                          'CUR - Save',
                          'CUR - Taba',
                          'Mount Kigali University (MKU)',
                          'UNILAK Kigali Campus',
                          'PIASS',
                          'EAUR Nyagatare Campus',
                          'Carnegie Mellon University Africa (CMU-Africa)',
                          'African Leadership University (ALU)',
                        ].map((u) => (
                          <button
                            key={u}
                            type="button"
                            onClick={() => handleAddTag(u)}
                            disabled={universities.includes(u)}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-all ${
                              universities.includes(u)
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50 hover:text-[#002a5c]'
                            }`}
                          >
                            + {u.split(' (')[0].replace(' Campus', '').replace('University', 'Uni')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Validity Expiration Date */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Card Expiration Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={validity}
                      onChange={(e) => setValidity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2980b9] bg-white"
                    />
                  </div>

                  {/* Member Photo Upload */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Member Photo (Optional)
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                        {photoPreview ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoSelect}
                          className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#002a5c] file:text-white hover:file:bg-[#003d7a] cursor-pointer"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">
                          Accepts JPG, PNG, WebP up to 15MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#001d3d] to-[#002a5c] hover:from-[#002a5c] hover:to-[#175e91] text-white py-3.5 px-6 rounded-xl font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Saving to Database...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Register & Issue Staff Card</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Live Card Preview (Sticky) */}
              <div className="lg:col-span-5 sticky top-24 space-y-4">
                <div className="inline-flex items-center gap-2 bg-sky-100 text-[#002a5c] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-sky-200">
                  <span className="w-2 h-2 rounded-full bg-[#5DAAE0] animate-pulse" />
                  Live Card Preview
                </div>

                {/* Simulated Verification Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-br from-[#001d3d] via-[#002a5c] to-[#175e91] text-white text-center py-5 px-6 relative overflow-hidden">
                    <div className="flex flex-col items-center relative z-10">
                      <div className="w-10 h-10 rounded-full bg-[#5DAAE0]/20 flex items-center justify-center mb-2 border border-sky-300/40">
                        <svg className="w-6 h-6 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4
                        style={{ color: '#ffffff' }}
                        className="text-base sm:text-lg font-black"
                      >
                        {isPreviewExpired ? 'Staff Card Expired' : 'Staff Card Verified'}
                      </h4>
                      <p className="text-[11px] text-sky-100/90 mt-0.5">
                        Groupe Biblique Universitaire du Rwanda
                      </p>
                    </div>
                  </div>

                  <div className="h-1 bg-gradient-to-r from-[#002a5c] via-[#5DAAE0] to-[#002a5c]" />

                  {/* Profile Header */}
                  <div className="p-4 bg-sky-50/70 border-b border-sky-100 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#002a5c] text-white flex items-center justify-center font-black text-lg border-2 border-[#5DAAE0] shadow flex-shrink-0">
                      {photoPreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={photoPreview} alt="Live preview" className="w-full h-full object-cover" />
                      ) : (
                        <span>{previewInitials}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-black text-base text-[#002a5c] truncate">
                        {previewFullName}
                      </h5>
                      <span className="inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded bg-white text-[#002a5c] border border-sky-200">
                        {position || 'Campus Staff'}
                      </span>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-4 space-y-2.5 text-xs divide-y divide-slate-100">
                    <div className="pt-1 first:pt-0 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Staff ID
                      </span>
                      <span className="font-mono font-bold text-[#002a5c] bg-sky-50 px-2 py-0.5 rounded border border-sky-200 text-xs">
                        {customId || suggestedId}
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Department
                      </span>
                      <span className="font-semibold text-slate-700 text-right truncate max-w-[60%]">
                        {department}
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Work Field
                      </span>
                      <span className="font-semibold text-slate-700 text-right truncate max-w-[60%]">
                        {workField}
                      </span>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        <span>Universities</span>
                        <span>{universities.length} assigned</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {universities.length > 0 ? (
                          universities.map((u, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold bg-sky-50 text-[#002a5c] px-1.5 py-0.5 rounded border border-sky-100"
                            >
                              {u}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">None assigned</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Validity
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          isPreviewExpired
                            ? 'bg-red-50 text-red-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {validity ? (isPreviewExpired ? 'Expired' : `Valid to ${validity}`) : 'Set date'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[10px] text-slate-400 font-semibold">
                    Preview will be saved directly into public.staff_card
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default function StaffCardsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <StaffCardsContent />
    </Suspense>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import AddSmallGroupModal from '../components/AddSmallGroupModal'
import EditSmallGroupModal from '../components/EditSmallGroupModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import { organizationAPI, SmallGroup as APISmallGroup } from '../lib/api'

const GraduatePage = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>('All')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All')
  const [smallGroups, setSmallGroups] = useState<APISmallGroup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Modal states
  const [isSmallGroupModalOpen, setIsSmallGroupModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedSmallGroup, setSelectedSmallGroup] = useState<APISmallGroup | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch graduate small groups from database
  useEffect(() => {
    const fetchSmallGroups = async () => {
      try {
        setIsLoading(true)
        const data = await organizationAPI.smallGroups.getAll('graduate')
        setSmallGroups(data)
      } catch (err: any) {
        console.error('Error fetching small groups:', err)
        setError('Failed to load small groups. Please try again later.')
        setSmallGroups([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchSmallGroups()
  }, [])

  const scrollToSmallGroups = () => {
    const element = document.getElementById('find-small-groups')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Get unique provinces and districts from fetched data
  const provinces = ['All', ...Array.from(new Set(smallGroups.map(g => g.province).filter(Boolean)))]
  
  const districts = selectedProvince === 'All' 
    ? ['All', ...Array.from(new Set(smallGroups.map(g => g.district).filter(Boolean)))]
    : ['All', ...Array.from(new Set(smallGroups.filter(g => g.province === selectedProvince).map(g => g.district).filter(Boolean)))]

  const filteredGroups = smallGroups.filter(group => {
    const provinceMatch = selectedProvince === 'All' || group.province === selectedProvince
    const districtMatch = selectedDistrict === 'All' || group.district === selectedDistrict
    return provinceMatch && districtMatch
  })

  // Handle adding new items
  const handleAddSmallGroup = async (smallGroup: APISmallGroup) => {
    // Refresh small groups list
    try {
      const updatedGroups = await organizationAPI.smallGroups.getAll('graduate')
      setSmallGroups(updatedGroups)
    } catch (err) {
      console.error('Error refreshing small groups:', err)
    }
  }

  // Handle editing small group
  const handleEditSmallGroup = (smallGroup: APISmallGroup) => {
    setSelectedSmallGroup(smallGroup)
    setIsEditModalOpen(true)
  }

  const handleUpdateSmallGroup = async (updatedGroup: APISmallGroup) => {
    try {
      const updatedGroups = await organizationAPI.smallGroups.getAll('graduate')
      setSmallGroups(updatedGroups)
    } catch (err) {
      console.error('Error refreshing small groups:', err)
    }
  }

  // Handle deleting small group
  const handleDeleteClick = (smallGroup: APISmallGroup) => {
    setSelectedSmallGroup(smallGroup)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedSmallGroup) return

    setIsDeleting(true)
    try {
      await organizationAPI.smallGroups.delete(selectedSmallGroup.id)
      const updatedGroups = await organizationAPI.smallGroups.getAll('graduate')
      setSmallGroups(updatedGroups)
      setIsDeleteModalOpen(false)
      setSelectedSmallGroup(null)
    } catch (err: any) {
      console.error('Error deleting small group:', err)
      setError(err.response?.data?.error || 'Failed to delete small group')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-accent min-h-screen">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-6 md:pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative w-full h-48 md:h-64 lg:h-80 rounded-xl overflow-hidden shadow-custom">
              <Image
                src="/ezra-2025/EZRA PST DY2-2.jpg"
                alt="GBUR graduates in fellowship"
                fill
                className="object-cover"
                priority
              />
              {/* Decorative circles overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-3 top-1/4 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 opacity-30" style={{ borderColor: 'var(--brand-secondary)' }}></div>
                <div className="absolute left-6 top-1/3 w-8 h-8 md:w-12 md:h-12 rounded-full border-2 opacity-40" style={{ borderColor: 'var(--brand-action)' }}></div>
                <div className="absolute right-3 top-1/4 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 opacity-30" style={{ borderColor: 'var(--brand-secondary)' }}></div>
                <div className="absolute right-6 top-1/3 w-8 h-8 md:w-12 md:h-12 rounded-full border-2 opacity-40" style={{ borderColor: 'var(--brand-action)' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Title Section */}
        <section className="bg-main pt-8 md:pt-12 pb-4 md:pb-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg md:text-4xl lg:text-5xl font-bold text-action text-center">
              Life After Campus
            </h1>
            <p className="text-secondary text-base md:text-lg text-center mt-4 max-w-2xl mx-auto">
              Continuing the journey of discipleship beyond university
            </p>
          </div>
        </section>

        {/* Life After University Section */}
        <section className="py-8 md:py-12 bg-main">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-accent rounded-xl p-6 md:p-8 shadow-custom border border-custom">
              <h2 className="text-2xl md:text-3xl font-bold text-action mb-6">
                Life After University: The Graduate Wing
              </h2>
              <div className="prose prose-lg max-w-none text-secondary space-y-4">
                <p>
                  Ministry doesn't end at graduation. GBUR graduates continue thriving as disciples of Jesus Christ, gathering in small groups for Bible study and prayer based on where they live and work. These graduate communities provide ongoing spiritual nourishment, mutual encouragement, and accountability as they navigate workplace challenges and family life.
                </p>
                <p>
                  Graduates also play a vital role in sustaining the movement through faithful prayer support, financial giving, and mentoring current students. Together, students and graduates form two wings of one movement, united in the mission of being agents of godly transformation in the church and society.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-8 md:py-12 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-action text-center mb-8">
              Graduate Fellowship in Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-custom group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <Image
                  src="/lifeinGbu/family fellowship.jpg"
                  alt="Graduate fellowship gathering"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-custom group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <Image
                  src="/lifeinGbu/family fellowship-1.jpg"
                  alt="Graduate community gathering"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-custom group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <Image
                  src="/lifeinGbu/family fellowship-3.jpg"
                  alt="Graduate small group meeting"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated Staff Section */}
        <section className="py-8 md:py-12 bg-main">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-accent rounded-xl p-6 md:p-8 shadow-custom border border-custom">
              <h2 className="text-2xl md:text-3xl font-bold text-action mb-6">
                Dedicated Staff: Called to Serve
              </h2>
              <div className="prose prose-lg max-w-none text-secondary space-y-4">
                <p>
                  Some graduates answer a deeper call to full-time ministry with GBUR, serving as staff workers who pioneer new GBUs, disciple student leaders, and coordinate ministry across campuses and regions. These dedicated men and women invest their lives in reaching students with the gospel, providing spiritual guidance, training, and support to student-led movements.
                </p>
                <p>
                  Many serve as volunteers, balancing their professional careers with passionate ministry involvement, while others commit to full-time staff roles supported by the prayers and generosity of the GBUR community. Whether paid or voluntary, our staff embody whole-life commitment to Christ, pouring themselves into the next generation of student witnesses.
                </p>
                <p className="font-semibold text-brand mt-6">
                  Our Ministry Staff: Serving with Passion
                </p>
                <p>
                  After graduation, some answer the call to become GBUR staff workers—pioneering new campus groups, mentoring student leaders, and coordinating regional ministry. Many serve voluntarily alongside their careers, while others commit full-time to student ministry. Whether volunteer or supported staff, they share one mission: investing their lives in equipping the next generation of campus witnesses for Christ's glory.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Partnership Section */}
        <section className="py-8 md:py-12 bg-accent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-main rounded-xl p-6 md:p-8 shadow-custom border border-custom">
              <h2 className="text-2xl md:text-3xl font-bold text-action mb-6">
                Financial Partnership: Investing in Lives
              </h2>
              <div className="prose prose-lg max-w-none text-secondary space-y-4">
                <p>
                  You can become a permanent ministry partner through regular financial sponsorship. Your faithful giving fuels vital ministry activities—from pioneering new GBUs on unreached campuses to training student leaders, producing discipleship materials, supporting staff workers, and organizing evangelistic events.
                </p>
                <p>
                  Every contribution, whether monthly or occasional, enables us to reach more students with the gospel and equip them as agents of transformation. When you partner with GBUR financially, you invest in eternal impact across Rwanda's universities and beyond.
                </p>
                <div className="mt-8">
                  <Link
                    href="/Donate"
                    className="inline-block btn-primary px-8 py-3 rounded-lg font-semibold text-base transition-all duration-300 shadow-custom hover:shadow-lg"
                  >
                    Partner with Us
                    <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Find Small Groups Section */}
        <section id="find-small-groups" className="py-8 md:py-16 bg-main">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-action mb-4">
                    Find a Small Group
                  </h2>
                  <p className="text-secondary text-base md:text-lg max-w-2xl mx-auto">
                    Connect with other GBUR graduates in your area. We have small groups meeting across different provinces and districts for Bible study, prayer, and mutual encouragement.
                  </p>
                </div>
                {/* Dropdown Button */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setIsSmallGroupModalOpen(true)}
                    className="btn-primary px-6 py-3 rounded-lg font-semibold text-sm sm:text-base flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Small Group
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Section */}
            <div className="bg-accent rounded-xl p-6 md:p-8 shadow-custom border border-custom mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="province" className="block text-sm font-semibold text-brand mb-2">
                    Select Province
                  </label>
                  <select
                    id="province"
                    value={selectedProvince}
                    onChange={(e) => {
                      setSelectedProvince(e.target.value)
                      setSelectedDistrict('All')
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-custom focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent transition-all bg-white"
                  >
                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="district" className="block text-sm font-semibold text-brand mb-2">
                    Select District
                  </label>
                  <select
                    id="district"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-custom focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent transition-all bg-white"
                    disabled={selectedProvince === 'All'}
                  >
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Small Groups List */}
            {isLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-action"></div>
                  <p className="text-secondary text-lg">Loading small groups...</p>
                </div>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-600 text-lg">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.length > 0 ? (
                  filteredGroups.map((group) => (
                    <div
                      key={group.id}
                      className="bg-accent rounded-xl p-6 shadow-custom border border-custom hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
                    >
                      {/* Edit and Delete Icons */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditSmallGroup(group)
                          }}
                          className="p-1.5 text-action hover:text-brand hover:bg-accent rounded transition-colors"
                          title="Edit small group"
                          aria-label="Edit small group"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteClick(group)
                          }}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="Delete small group"
                          aria-label="Delete small group"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-action mb-2 pr-16">
                          {group.name}
                        </h3>
                        {/* Location Information */}
                        <div className="space-y-1">
                          {group.province && (
                            <div className="flex items-center text-secondary text-sm">
                              <svg className="w-4 h-4 mr-2 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Province: {group.province}
                            </div>
                          )}
                          {group.district && (
                            <div className="flex items-center text-secondary text-sm">
                              <svg className="w-4 h-4 mr-2 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              District: {group.district}
                            </div>
                          )}
                          {group.sector && (
                            <div className="flex items-center text-secondary text-sm">
                              <svg className="w-4 h-4 mr-2 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              Sector: {group.sector}
                            </div>
                          )}
                          {group.address && (
                            <div className="flex items-start text-secondary text-sm">
                              <svg className="w-4 h-4 mr-2 text-action mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="break-words">{group.address}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-3 pt-4 border-t border-custom">
                        {/* Cell Leader */}
                        {group.cellLeaderName && (
                          <div className="flex items-center text-secondary text-sm">
                            <svg className="w-4 h-4 mr-2 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Cell Leader: {group.cellLeaderName}
                          </div>
                        )}
                        {/* WhatsApp Number */}
                        {group.WhatappNumber && (
                          <div className="flex items-center text-secondary text-sm">
                            <svg className="w-4 h-4 mr-2 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <a 
                              href={`https://wa.me/${group.WhatappNumber.replace(/[^0-9]/g, '')}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-action transition-colors"
                            >
                              {group.WhatappNumber}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-secondary text-lg">No small groups found for the selected filters.</p>
                    <button
                      onClick={() => {
                        setSelectedProvince('All')
                        setSelectedDistrict('All')
                      }}
                      className="mt-4 text-action hover:text-link-hover font-semibold transition-colors"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Floating Sidebar Button - Find Small Group */}
        <div className="fixed right-4 md:right-6 bottom-6 md:bottom-8 z-50">
          <button
            onClick={scrollToSmallGroups}
            className="group relative bg-action hover:bg-link-hover text-white px-4 md:px-6 py-3 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 md:gap-3 animate-pulse hover:animate-none"
            aria-label="Find a Small Group"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm md:text-base font-semibold whitespace-nowrap">
                Find Small Group
              </span>
            </div>
            {/* Tooltip on hover */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:group-hover:block">
              <div className="bg-brand text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap relative">
                Connect with graduates in your area
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-brand"></div>
              </div>
            </div>
          </button>
        </div>
      </main>
      <Footer />
      
      {/* Modals */}
      <AddSmallGroupModal
        isOpen={isSmallGroupModalOpen}
        onClose={() => setIsSmallGroupModalOpen(false)}
        onAdd={handleAddSmallGroup}
      />
      <EditSmallGroupModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedSmallGroup(null)
        }}
        smallGroup={selectedSmallGroup}
        onUpdate={handleUpdateSmallGroup}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedSmallGroup(null)
        }}
        onConfirm={handleDeleteConfirm}
        title={selectedSmallGroup?.name || ''}
        isDeleting={isDeleting}
        type="post"
      />
    </>
  )
}

export default GraduatePage


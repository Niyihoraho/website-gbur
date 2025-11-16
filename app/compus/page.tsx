'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingActionButton from '../components/FloatingActionButton'
import AddRegionModal from '../components/AddRegionModal'
import AddUniversityModal from '../components/AddUniversityModal'
import AddRegionalStaffModal from '../components/AddRegionalStaffModal'
import EditUniversityModal from '../components/EditUniversityModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import { organizationAPI, Region, University, RegionalStaff } from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

const FindChapterPage = () => {
  const { isAdmin } = useAuth()
  const queryClient = useQueryClient()
  const [selectedRegion, setSelectedRegion] = useState<string>('All')
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  // Dropdown and modal states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false)
  const [isUniversityModalOpen, setIsUniversityModalOpen] = useState(false)
  const [isRegionalStaffModalOpen, setIsRegionalStaffModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  // --- THIS IS THE FIX ---
  // The state variable 'selectedUniversity' was already defined.
  // Renamed this to 'selectedUniversityForEdit' to match the setter and avoid the error.
  const [selectedUniversityForEdit, setSelectedUniversityForEdit] = useState<University | null>(null)
  // --- END OF FIX ---

  // Queries for data
  const {
    data: universities = [],
    isLoading: isLoadingUniversities,
    error: universitiesError,
  } = useQuery({
    queryKey: ['universities'],
    queryFn: () => organizationAPI.universities.getAll(),
    retry: 2,
    retryDelay: 300,
    placeholderData: (previousData) => previousData,
  })

  const {
    data: regions = [],
    isLoading: isLoadingRegions,
    error: regionsError,
  } = useQuery({
    queryKey: ['regions'],
    queryFn: () => organizationAPI.regions.getAll(),
    retry: 2,
    retryDelay: 300,
    placeholderData: (previousData) => previousData,
  })

  const {
    data: regionalStaff = [],
    isLoading: isLoadingStaff,
    error: staffError,
  } = useQuery({
    queryKey: ['regionalStaff'],
    queryFn: () => organizationAPI.regionalStaff.getAll(),
    retry: 2,
    retryDelay: 300,
    placeholderData: (previousData) => previousData,
  })

  const isLoading = isLoadingUniversities || isLoadingRegions || isLoadingStaff
  const error = universitiesError || regionsError || staffError

  // Helper function to get staff for a region
  const getStaffForRegion = (regionId: number): RegionalStaff | undefined => {
    return regionalStaff.find(staff => staff.regionId === regionId)
  }

  const filteredUniversities = universities.filter(uni => {
    const matchesRegion = selectedRegion === 'All' || uni.regionId.toString() === selectedRegion
    const matchesSearch = searchQuery === '' || 
      uni.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRegion && matchesSearch
  })

  const handleUniversityClick = (university: University) => {
    setSelectedUniversity(university)
  }

  const closeDetails = () => {
    setSelectedUniversity(null)
  }

  // Handle adding new items
  // Delete mutation
  const deleteUniversityMutation = useMutation({
    mutationFn: (universityId: number) => organizationAPI.universities.delete(universityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['universities'] })
      queryClient.invalidateQueries({ queryKey: ['regionalStaff'] })
      setIsDeleteModalOpen(false)
      setSelectedUniversityForEdit(null)
    },
    retry: 2,
  })

  const handleAddRegion = async (region: Region) => {
    // Invalidate query to refetch
    await queryClient.invalidateQueries({ queryKey: ['regions'] })
  }

  const handleAddUniversity = async (university: University) => {
    // Invalidate query to refetch
    await queryClient.invalidateQueries({ queryKey: ['universities'] })
  }

  const handleAddRegionalStaff = async (staff: RegionalStaff) => {
    // Invalidate query to refetch
    await queryClient.invalidateQueries({ queryKey: ['regionalStaff'] })
  }

  // Handle editing university
  const handleEditUniversity = (university: University) => {
    setSelectedUniversityForEdit(university)
    setIsEditModalOpen(true)
  }

  const handleUpdateUniversity = async (updatedUniversity: University) => {
    // Invalidate queries to refetch
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['universities'] }),
      queryClient.invalidateQueries({ queryKey: ['regionalStaff'] }),
    ])
  }

  // Handle deleting university
  const handleDeleteClick = (university: University) => {
    setSelectedUniversityForEdit(university)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedUniversityForEdit) return
    await deleteUniversityMutation.mutateAsync(selectedUniversityForEdit.id)
  }

  const handleDropdownOption = (option: string) => {
    setIsDropdownOpen(false)
    switch (option) {
      case 'region':
        setIsRegionModalOpen(true)
        break
      case 'university':
        setIsUniversityModalOpen(true)
        break
      case 'regionalStaff':
        setIsRegionalStaffModalOpen(true)
        break
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-accent min-h-screen">
        {/* Hero Banner Section */}
        <section className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
          <Image
            src="/Gbur/DSC_9972.jpg"
            alt="Students in GBUR community"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Find Chapter
              </h1>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-8 md:py-12 bg-main">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Description and Add Button */}
            <div className="mb-8 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <p className="text-base md:text-lg text-secondary leading-relaxed">
                  Are you a student looking to join a GBUR community on your campus? Search below to find a GBUR chapter near you. Click on a university to see detailed contact information and connect with the campus minister.
                </p>
                {/* Dropdown Button - Only visible to admin */}
                {isAdmin && (
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
                      Add New
                      <svg
                        className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-main rounded-xl shadow-2xl border border-custom z-50 overflow-hidden">
                        <button
                          onClick={() => handleDropdownOption('region')}
                          className="w-full px-4 py-3 text-left text-sm text-secondary hover:bg-accent transition-colors flex items-center gap-3"
                        >
                          <svg className="w-5 h-5 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Add Region</span>
                        </button>
                        <button
                          onClick={() => handleDropdownOption('university')}
                          className="w-full px-4 py-3 text-left text-sm text-secondary hover:bg-accent transition-colors flex items-center gap-3"
                        >
                          <svg className="w-5 h-5 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span>Add University</span>
                        </button>
                        <button
                          onClick={() => handleDropdownOption('regionalStaff')}
                          className="w-full px-4 py-3 text-left text-sm text-secondary hover:bg-accent transition-colors flex items-center gap-3"
                        >
                          <svg className="w-5 h-5 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Add Regional Staff</span>
                        </button>
                      </div>
                    </>
                  )}
                  </div>
                )}
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-accent rounded-xl p-6 md:p-8 shadow-custom mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Search by Name */}
                <div>
                  <label className="block text-sm font-semibold text-brand mb-2">
                    Search by Name
                  </label>
                  <input
                    type="text"
                    placeholder="University name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-custom focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent"
                  />
                </div>

                {/* Region Filter */}
                <div>
                  <label className="block text-sm font-semibold text-brand mb-2">
                    Region
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-custom focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent bg-main"
                    disabled={isLoading}
                  >
                    <option value="All">All Regions</option>
                    {regions.map((region) => (
                      <option key={region.id} value={region.id.toString()}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-action"></div>
                  <h2 className="text-xl md:text-2xl font-bold text-brand">Loading...</h2>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              ) : (
                <h2 className="text-xl md:text-2xl font-bold text-brand">
                  {filteredUniversities.length} {filteredUniversities.length === 1 ? 'Chapter' : 'Chapters'} Found
                  {selectedRegion !== 'All' && ` in ${regions.find(r => r.id.toString() === selectedRegion)?.name || ''}`}
                </h2>
              )}
            </div>

            {/* University Cards Grid */}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredUniversities.map((university) => {
                  const staff = getStaffForRegion(university.regionId)
                  return (
                    <div
                      key={university.id}
                      className="bg-main rounded-xl p-6 shadow-custom border border-custom/30 hover:shadow-lg hover:border-action/50 transition-all duration-300 transform hover:-translate-y-1 relative"
                    >
                      {/* Edit and Delete Icons - Only visible to admin */}
                      {isAdmin && (
                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditUniversity(university)
                          }}
                          className="p-1.5 text-action hover:text-brand hover:bg-accent rounded transition-colors"
                          title="Edit university"
                          aria-label="Edit university"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002 2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteClick(university)
                          }}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="Delete university"
                          aria-label="Delete university"
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
                      )}
                      <div 
                        onClick={() => handleUniversityClick(university)}
                        className="mb-4 cursor-pointer"
                      >
                        <h3 className={`text-lg font-bold text-brand mb-2 ${isAdmin ? 'pr-16' : ''}`}>
                          {university.name}
                        </h3>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-secondary">
                          <svg className="w-4 h-4 mr-2 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {university.region?.name || 'Unknown Region'}
                        </div>
                        {staff && (
                          <>
                            <div className="flex items-center text-secondary">
                              <svg className="w-4 h-4 mr-2 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Staff: {staff.name}
                            </div>
                            {staff.phone && (
                              <div className="flex items-center text-secondary">
                                <svg className="w-4 h-4 mr-2 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href={`tel:${staff.phone}`} className="hover:text-action transition-colors">
                                  {staff.phone}
                                </a>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <div 
                        onClick={() => handleUniversityClick(university)}
                        className="mt-4 pt-4 border-t border-custom cursor-pointer"
                      >
                        <button className="btn-primary w-full py-2 rounded-lg font-semibold text-sm transition-all duration-300">
                          View Details
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {!isLoading && !error && filteredUniversities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-secondary">No chapters found matching your criteria.</p>
                <p className="text-sm text-secondary mt-2">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </section>

        {/* University Details Modal */}
        {selectedUniversity && (() => {
          const staff = getStaffForRegion(selectedUniversity.regionId)
          return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeDetails}>
              <div 
                className="bg-main rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-main border-b border-custom px-6 py-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-brand">University Details</h2>
                  <button
                    onClick={closeDetails}
                    className="text-secondary hover:text-brand transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6 md:p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-brand mb-2">{selectedUniversity.name}</h3>
                    <p className="text-sm text-secondary mt-1">
                      {selectedUniversity.region?.name || 'Unknown Region'}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Region */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-action/10 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-brand mb-1">Region</p>
                        <p className="text-lg text-secondary">{selectedUniversity.region?.name || 'Unknown'}</p>
                      </div>
                    </div>

                    {/* Staff Information */}
                    {staff && (
                      <>
                        <div className="pt-4 border-t border-custom">
                          <h4 className="text-lg font-semibold text-brand mb-4">Regional Staff Coordinator</h4>
                        </div>

                        {/* Staff Name */}
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-12 h-12 bg-action/10 rounded-lg flex items-center justify-center mr-4">
                            <svg className="w-6 h-6 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-brand mb-1">Name</p>
                            <p className="text-lg text-secondary">{staff.name}</p>
                          </div>
                        </div>

                        {/* Staff Phone */}
                        {staff.phone && (
                          <div className="flex items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-action/10 rounded-lg flex items-center justify-center mr-4">
                              <svg className="w-6 h-6 text-action" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-brand mb-1">Phone</p>
                              <a href={`tel:${staff.phone}`} className="text-action hover:text-link-hover text-lg font-semibold">
                                {staff.phone}
                              </a>
                            </div>
                          </div>
                        )}

                      </>
                    )}

                    {!staff && (
                      <div className="pt-4 border-t border-custom">
                        <p className="text-secondary text-sm italic">No regional staff coordinator assigned to this region.</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {staff && staff.phone && (
                    <div className="mt-8 pt-6 border-t border-custom">
                      <a
                        href={`tel:${staff.phone}`}
                        className="w-full btn-primary py-3 rounded-lg font-semibold text-center transition-all duration-300 block"
                      >
                        Call Staff
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })()}
      </main>
      <FloatingActionButton />
      <Footer />
      
      {/* Modals */}
      <AddRegionModal
        isOpen={isRegionModalOpen}
        onClose={() => setIsRegionModalOpen(false)}
        onAdd={handleAddRegion}
      />
      <AddUniversityModal
        isOpen={isUniversityModalOpen}
        onClose={() => setIsUniversityModalOpen(false)}
        onAdd={handleAddUniversity}
      />
      <AddRegionalStaffModal
        isOpen={isRegionalStaffModalOpen}
        onClose={() => setIsRegionalStaffModalOpen(false)}
        onAdd={handleAddRegionalStaff}
      />
      <EditUniversityModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedUniversityForEdit(null)
        }}
        university={selectedUniversityForEdit}
        onUpdate={handleUpdateUniversity}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedUniversityForEdit(null)
        }}
        onConfirm={handleDeleteConfirm}
        title={selectedUniversityForEdit?.name || ''}
        isDeleting={deleteUniversityMutation.isPending}
        type="post"
      />
    </>
  )
}

export default FindChapterPage
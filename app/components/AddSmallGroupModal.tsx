'use client'

import React, { useState, useEffect } from 'react'
import { organizationAPI, SmallGroup } from '../lib/api'

interface AddSmallGroupModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (smallGroup: SmallGroup) => void
}

const AddSmallGroupModal = ({ isOpen, onClose, onAdd }: AddSmallGroupModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'student' as 'student' | 'graduate',
    province: '',
    district: '',
    sector: '',
    address: '',
    cellLeaderName: '',
    WhatappNumber: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setFormData({ 
        name: '', 
        type: 'student', 
        province: '', 
        district: '', 
        sector: '', 
        address: '', 
        cellLeaderName: '', 
        WhatappNumber: '' 
      })
      setErrors({})
      setSubmitError(null)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isSubmitting, onClose])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Small group name is required'
    } else if (formData.name.trim().length > 255) {
      newErrors.name = 'Small group name is too long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
    setSubmitError(null)

    try {
      const newSmallGroup = await organizationAPI.smallGroups.create({
        name: formData.name.trim(),
        type: formData.type,
        province: formData.province?.trim() || null,
        district: formData.district?.trim() || null,
        sector: formData.sector?.trim() || null,
        address: formData.address?.trim() || null,
        cellLeaderName: formData.cellLeaderName?.trim() || null,
        WhatappNumber: formData.WhatappNumber?.trim() || null,
      })

      onAdd(newSmallGroup)
      onClose()
    } catch (error: any) {
      console.error('Error adding small group:', error)
      setSubmitError(error.response?.data?.error || 'Failed to create small group. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
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
        className="bg-main rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-main border-b border-custom px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-xl z-10 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-brand pr-2">Add New Small Group</h2>
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

        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {submitError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{submitError}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Small Group Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                  errors.name
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-custom focus:border-action focus:ring-action'
                } focus:outline-none focus:ring-2 text-secondary bg-white transition-colors`}
                placeholder="Enter small group name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="type" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-custom focus:border-action focus:ring-action focus:outline-none focus:ring-2 text-sm sm:text-base text-secondary bg-white transition-colors"
                disabled={isSubmitting}
              >
                <option value="student">Student</option>
                <option value="graduate">Graduate</option>
              </select>
            </div>

            <div>
              <label htmlFor="province" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Province <span className="text-xs text-secondary font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-custom focus:border-action focus:ring-action focus:outline-none focus:ring-2 text-sm sm:text-base text-secondary bg-white transition-colors"
                placeholder="Enter province"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="district" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                District <span className="text-xs text-secondary font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-custom focus:border-action focus:ring-action focus:outline-none focus:ring-2 text-sm sm:text-base text-secondary bg-white transition-colors"
                placeholder="Enter district"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="sector" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Sector <span className="text-xs text-secondary font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-custom focus:border-action focus:ring-action focus:outline-none focus:ring-2 text-sm sm:text-base text-secondary bg-white transition-colors"
                placeholder="Enter sector"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Address <span className="text-xs text-secondary font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-custom focus:border-action focus:ring-action focus:outline-none focus:ring-2 text-sm sm:text-base text-secondary bg-white transition-colors"
                placeholder="e.g., kacyiru kuri minubumwe street k 50st"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="cellLeaderName" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Cell Leader Name <span className="text-xs text-secondary font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="cellLeaderName"
                name="cellLeaderName"
                value={formData.cellLeaderName}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-custom focus:border-action focus:ring-action focus:outline-none focus:ring-2 text-sm sm:text-base text-secondary bg-white transition-colors"
                placeholder="Enter cell leader name"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="WhatappNumber" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                WhatsApp Number <span className="text-xs text-secondary font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="WhatappNumber"
                name="WhatappNumber"
                value={formData.WhatappNumber}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-custom focus:border-action focus:ring-action focus:outline-none focus:ring-2 text-sm sm:text-base text-secondary bg-white transition-colors"
                placeholder="Enter WhatsApp number"
                disabled={isSubmitting}
              />
            </div>

            <div className="pt-3 sm:pt-4 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base border border-custom text-secondary hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 btn-primary py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm sm:text-base">Adding...</span>
                  </>
                ) : (
                  'Add Small Group'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddSmallGroupModal


'use client'

import React, { useState } from 'react'
import { categoryAPI, BlogCategory, CreateBlogCategoryInput } from '../lib/api'

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (category: BlogCategory) => void
}

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

const AddCategoryModal = ({ isOpen, onClose, onAdd }: AddCategoryModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    order: 0,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Handle Escape key to close modal
  React.useEffect(() => {
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
      newErrors.name = 'Category name is required'
    }

    if (formData.name.trim().length > 255) {
      newErrors.name = 'Category name is too long (max 255 characters)'
    }

    if (formData.order < 0) {
      newErrors.order = 'Order must be a positive number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value, 10) || 0 : value
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
    setSubmitError(null)

    try {
      const slug = generateSlug(formData.name)

      // Create category data
      const categoryData: CreateBlogCategoryInput = {
        name: formData.name.trim(),
        slug,
        order: formData.order,
        isActive: true,
      }

      // Create the category via API
      const newCategory = await categoryAPI.create(categoryData)

      // Call the onAdd callback with the new category
      onAdd(newCategory)

      // Reset form
      setFormData({
        name: '',
        order: 0,
      })
      setErrors({})
      setSubmitError(null)
      onClose()
    } catch (error: any) {
      console.error('Error adding category:', error)
      setSubmitError(error.response?.data?.error || error.response?.data?.message || 'Failed to create category. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: '',
        order: 0,
      })
      setErrors({})
      setSubmitError(null)
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
        className="bg-main rounded-xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-main border-b border-custom px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-xl z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-brand pr-2">Add New Category</h2>
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
          {submitError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{submitError}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Category Name <span className="text-red-500">*</span>
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
                placeholder="Enter category name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Order */}
            <div>
              <label htmlFor="order" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Order <span className="text-xs text-secondary font-normal">(Optional)</span>
              </label>
              <input
                type="number"
                id="order"
                name="order"
                value={formData.order}
                onChange={handleChange}
                min="0"
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                  errors.order
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-custom focus:border-action focus:ring-action'
                } focus:outline-none focus:ring-2 text-secondary bg-white transition-colors`}
                placeholder="0"
                disabled={isSubmitting}
              />
              {errors.order && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.order}</p>
              )}
              <p className="mt-1 text-xs text-secondary">Categories are sorted by this number (lower numbers appear first)</p>
            </div>

            {/* Submit Button */}
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
                  'Add Category'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddCategoryModal


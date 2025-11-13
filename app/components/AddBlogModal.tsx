'use client'

import React, { useState, useEffect } from 'react'
import { blogAPI, categoryAPI, BlogPost, BlogCategory, CreateBlogPostInput } from '../lib/api'

interface AddBlogModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (post: BlogPost) => void
  onRefresh?: () => void
}

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

const AddBlogModal = ({ isOpen, onClose, onAdd, onRefresh }: AddBlogModalProps) => {
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    image: '',
    excerpt: '',
    content: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Fetch categories when modal opens (always refresh to get latest categories)
  useEffect(() => {
    if (isOpen) {
      fetchCategories()
    }
  }, [isOpen])

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true)
      const fetchedCategories = await categoryAPI.getAll()
      setCategories(fetchedCategories)
    } catch (error: any) {
      console.error('Error fetching categories:', error)
      setErrors({ categoryId: 'Failed to load categories' })
    } finally {
      setLoadingCategories(false)
    }
  }

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting && !uploadingImage) {
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
  }, [isOpen, isSubmitting, uploadingImage, onClose])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required'
    }

    // Only validate URL if no file is selected and image field has value
    if (!imageFile && formData.image && !isValidUrl(formData.image) && !formData.image.startsWith('/')) {
      newErrors.image = 'Image must be a valid URL or path starting with /'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        image: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'
      }))
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        image: 'File size exceeds 5MB limit'
      }))
      return
    }

    setImageFile(file)
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.image
      return newErrors
    })

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleImageUpload = async (): Promise<string | null> => {
    if (!imageFile) return null

    setUploadingImage(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', imageFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload image')
      }

      const data = await response.json()
      return data.path
    } catch (error: any) {
      console.error('Error uploading image:', error)
      setErrors(prev => ({
        ...prev,
        image: error.message || 'Failed to upload image'
      }))
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setFormData(prev => ({ ...prev, image: '' }))
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors.image
      return newErrors
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Upload image file if one was selected
      let imagePath = formData.image.trim()
      if (imageFile && !imagePath) {
        const uploadedPath = await handleImageUpload()
        if (uploadedPath) {
          imagePath = uploadedPath
        } else {
          setIsSubmitting(false)
          return // Error already set in handleImageUpload
        }
      }

      const slug = generateSlug(formData.title)
      const categoryId = parseInt(formData.categoryId, 10)

      // Prepare content - join paragraphs with newlines for storage
      const content = formData.content.trim()
      const excerpt = formData.excerpt.trim() || null

      // Create blog post data
      const blogData: CreateBlogPostInput = {
        title: formData.title.trim(),
        slug,
        content,
        excerpt,
        featuredImage: imagePath || null,
        categoryId,
        status: formData.status,
        publishedAt: formData.status === 'published' ? new Date().toISOString() : null,
      }

      // Create the blog post via API
      const newPost = await blogAPI.create(blogData)

      // Call the onAdd callback with the new post
      onAdd(newPost)

      // Refresh the blog list if callback provided
      if (onRefresh) {
        await onRefresh()
      }

      // Reset form
      setFormData({
        title: '',
        categoryId: '',
        image: '',
        excerpt: '',
        content: '',
        status: 'draft',
      })
      setImageFile(null)
      setImagePreview(null)
      setErrors({})
      setSubmitError(null)
      onClose()
    } catch (error: any) {
      console.error('Error adding blog post:', error)
      setSubmitError(error.response?.data?.error || 'Failed to create blog post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting && !uploadingImage) {
      setFormData({
        title: '',
        categoryId: '',
        image: '',
        excerpt: '',
        content: '',
        status: 'draft',
      })
      setImageFile(null)
      setImagePreview(null)
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
        className="bg-main rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-main border-b border-custom px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-xl z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-brand pr-2">Add New Blog Post</h2>
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
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                  errors.title
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-custom focus:border-action focus:ring-action'
                } focus:outline-none focus:ring-2 text-secondary bg-white transition-colors`}
                placeholder="Enter blog post title"
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="categoryId" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                  errors.categoryId
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-custom focus:border-action focus:ring-action'
                } focus:outline-none focus:ring-2 text-secondary bg-white transition-colors`}
                disabled={isSubmitting || loadingCategories}
              >
                <option value="">
                  {loadingCategories ? 'Loading categories...' : 'Select a category'}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.categoryId}</p>
              )}
            </div>

            {/* Featured Image */}
              <div>
              <label className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Featured Image <span className="text-xs text-secondary font-normal">(Optional)</span>
              </label>
              
              {/* Image Preview */}
              {(imagePreview || formData.image) && (
                <div className="mb-3 relative">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-custom">
                    <img
                      src={imagePreview || formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                    disabled={isSubmitting || uploadingImage}
                    aria-label="Remove image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Upload from PC */}
              <div className="mb-3">
                <label
                  htmlFor="imageFile"
                  className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    errors.image
                      ? 'border-red-500 bg-red-50'
                      : 'border-custom hover:border-action hover:bg-accent'
                  } ${isSubmitting || uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <input
                    type="file"
                    id="imageFile"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={handleImageFileChange}
                    className="hidden"
                    disabled={isSubmitting || uploadingImage}
                  />
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-8 h-8 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-sm text-secondary">
                      {uploadingImage ? 'Uploading...' : imageFile ? imageFile.name : 'Click to upload from PC'}
                    </span>
                    <span className="text-xs text-secondary">Max 5MB (JPEG, PNG, WebP, GIF)</span>
                  </div>
                </label>
              </div>

              {/* Or use URL */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-custom"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-main px-2 text-secondary">Or</span>
                </div>
              </div>

              {/* Image URL Input */}
              <div className="mt-3">
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                    errors.image
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-custom focus:border-action focus:ring-action'
                  } focus:outline-none focus:ring-2 text-secondary bg-white transition-colors`}
                  placeholder="/path/to/image.jpg or https://example.com/image.jpg"
                  disabled={isSubmitting || uploadingImage || !!imageFile}
                />
              </div>

                {errors.image && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.image}</p>
                )}
              </div>

            {/* Status */}
              <div>
              <label htmlFor="status" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Status
                </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-custom focus:border-action focus:ring-action focus:outline-none focus:ring-2 text-sm sm:text-base text-secondary bg-white transition-colors"
                  disabled={isSubmitting}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Excerpt <span className="text-xs text-secondary font-normal">(Optional)</span>
                <span className="text-xs text-secondary font-normal ml-2">(One paragraph per line)</span>
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                  errors.excerpt
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-custom focus:border-action focus:ring-action'
                } focus:outline-none focus:ring-2 text-secondary bg-white transition-colors resize-y`}
                placeholder="Enter excerpt paragraphs (one per line)..."
                disabled={isSubmitting}
              />
              {errors.excerpt && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.excerpt}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-xs sm:text-sm font-semibold text-brand mb-2">
                Content <span className="text-red-500">*</span>
                <span className="text-xs text-secondary font-normal ml-2">(One paragraph per line)</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={6}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border text-sm sm:text-base ${
                  errors.content
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-custom focus:border-action focus:ring-action'
                } focus:outline-none focus:ring-2 text-secondary bg-white transition-colors resize-y`}
                placeholder="Enter full content paragraphs (one per line)..."
                disabled={isSubmitting}
              />
              {errors.content && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.content}</p>
              )}
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
                  'Add Blog Post'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBlogModal



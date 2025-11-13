'use client'

import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

const PasswordModal = ({ isOpen, onClose }: PasswordModalProps) => {
  const { login, isAdmin } = useAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Small delay for better UX
    setTimeout(() => {
      const success = login(password)
      if (success) {
        setPassword('')
        onClose()
      } else {
        setError('Incorrect password. Please try again.')
      }
      setIsSubmitting(false)
    }, 300)
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setPassword('')
      setError('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-main rounded-xl shadow-2xl max-w-md w-full border border-custom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-custom px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand">Admin Access</h2>
          <button
            onClick={handleClose}
            className="text-secondary hover:text-brand transition-colors"
            disabled={isSubmitting}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isAdmin ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-brand mb-2">You are logged in as admin</p>
              <p className="text-sm text-secondary mb-4">You can now manage content on the website.</p>
              <button
                onClick={handleClose}
                className="btn-primary px-6 py-2 rounded-lg font-semibold text-sm"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-brand mb-2"
                >
                  Enter Admin Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  className="w-full px-4 py-2.5 rounded-lg border border-custom focus:outline-none focus:ring-2 focus:ring-action focus:border-transparent"
                  placeholder="Enter password"
                  disabled={isSubmitting}
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-custom text-secondary hover:bg-accent transition-colors font-semibold text-sm"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary px-4 py-2.5 rounded-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting || !password.trim()}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Verifying...
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default PasswordModal


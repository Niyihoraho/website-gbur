'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAdmin: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Admin password - in production, this should be in environment variables
// For now, we'll use a constant. Change this to your desired password
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'gbur@0788'

// Storage key for admin session
const ADMIN_SESSION_KEY = 'gbur_admin_session'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem(ADMIN_SESSION_KEY)
      if (session === 'true') {
        setIsAdmin(true)
      }
    }
  }, [])

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_SESSION_KEY, 'true')
      }
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_SESSION_KEY)
    }
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


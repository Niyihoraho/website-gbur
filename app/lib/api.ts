import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface BlogPost {
  id: number
  title: string
  slug: string
  image: string
  category: string
  date: string
  excerpt: string[]
  content: string[]
  author: {
    name: string
    avatar: string
  }
  status?: string
  publishedAt?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface BlogCategory {
  id: number
  name: string
  slug: string
  order: number
  isActive: boolean
}

export interface CreateBlogPostInput {
  title: string
  slug: string
  content: string
  excerpt?: string | null
  featuredImage?: string | null
  categoryId: number
  status?: 'draft' | 'published' | 'archived'
  publishedAt?: string | null
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {
  id: number
}

export interface CreateBlogCategoryInput {
  name: string
  slug: string
  order?: number
  isActive?: boolean
}

// Blog API functions
export const blogAPI = {
  // Get all blog posts
  getAll: async (params?: { status?: string; categoryId?: number; limit?: number; offset?: number }): Promise<BlogPost[]> => {
    try {
      const response = await api.get<{ posts: BlogPost[]; total: number }>('/blog', { params })
      return response.data.posts || []
    } catch (error: any) {
      console.error('Error in blogAPI.getAll:', error)
      // If 500 error and no posts, return empty array
      if (error.response?.status === 500) {
        console.warn('Server error, returning empty array')
        return []
      }
      throw error
    }
  },

  // Get a single blog post by slug
  getBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await api.get<BlogPost>(`/blog/${slug}`)
    return response.data
  },

  // Get a single blog post by ID (uses slug route with numeric ID)
  getById: async (id: number): Promise<BlogPost> => {
    const response = await api.get<BlogPost>(`/blog/${id}`)
    return response.data
  },

  // Create a new blog post
  create: async (data: CreateBlogPostInput): Promise<BlogPost> => {
    const response = await api.post<BlogPost>('/blog', data)
    return response.data
  },

  // Update a blog post (uses slug route with numeric ID)
  update: async (id: number, data: Partial<CreateBlogPostInput>): Promise<BlogPost> => {
    const response = await api.put<BlogPost>(`/blog/${id}`, data)
    return response.data
  },

  // Delete a blog post (uses slug route with numeric ID)
  delete: async (id: number): Promise<void> => {
    await api.delete(`/blog/${id}`)
  },
}

// Category API functions
export const categoryAPI = {
  // Get all categories
  getAll: async (): Promise<BlogCategory[]> => {
    const response = await api.get<{ categories: BlogCategory[] }>('/blog/categories')
    return response.data.categories
  },

  // Create a new category
  create: async (data: { name: string; slug: string; order?: number; isActive?: boolean }): Promise<BlogCategory> => {
    const response = await api.post<BlogCategory>('/blog/categories', data)
    return response.data
  },

  // Update a category
  update: async (id: number, data: { name: string; slug: string; order?: number; isActive?: boolean }): Promise<BlogCategory> => {
    const response = await api.put<BlogCategory>(`/blog/categories/${id}`, data)
    return response.data
  },

  // Delete a category
  delete: async (id: number): Promise<void> => {
    await api.delete(`/blog/categories/${id}`)
  },
}

// Organization interfaces
export interface Region {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface University {
  id: number
  name: string
  regionId: number
  createdAt: string
  updatedAt: string
  region?: Region
}

export interface SmallGroup {
  id: number
  name: string
  type: 'student' | 'graduate'
  province?: string | null
  district?: string | null
  sector?: string | null
  address?: string | null
  cellLeaderName?: string | null
  WhatappNumber?: string | null
  createdAt: string
  updatedAt: string
}

export interface RegionalStaff {
  id: number
  regionId: number
  name: string
  phone?: string | null
  WhatappNumber?: string | null
  createdAt: string
  updatedAt: string
  region?: Region
}

export interface User {
  id: string
  email: string | null
}

// Organization API functions
export const organizationAPI = {
  // Regions
  regions: {
    getAll: async (): Promise<Region[]> => {
      const response = await api.get<{ regions: Region[] }>('/organization/regions')
      return response.data.regions
    },
    create: async (data: { name: string }): Promise<Region> => {
      const response = await api.post<Region>('/organization/regions', data)
      return response.data
    },
  },

  // Universities
  universities: {
    getAll: async (regionId?: number): Promise<University[]> => {
      const response = await api.get<{ universities: University[] }>('/organization/universities', {
        params: regionId ? { regionId } : {},
      })
      return response.data.universities
    },
    create: async (data: { name: string; regionId: number }): Promise<University> => {
      const response = await api.post<University>('/organization/universities', data)
      return response.data
    },
    update: async (id: number, data: { name: string; regionId: number }): Promise<University> => {
      const response = await api.put<University>(`/organization/universities/${id}`, data)
      return response.data
    },
    delete: async (id: number): Promise<void> => {
      await api.delete(`/organization/universities/${id}`)
    },
  },

  // Small Groups
  smallGroups: {
    getAll: async (type?: 'student' | 'graduate'): Promise<SmallGroup[]> => {
      const response = await api.get<{ smallGroups: SmallGroup[] }>('/organization/small-groups', {
        params: { ...(type && { type }) },
      })
      return response.data.smallGroups
    },
    create: async (data: { 
      name: string
      type?: 'student' | 'graduate'
      province?: string | null
      district?: string | null
      sector?: string | null
      address?: string | null
      cellLeaderName?: string | null
      WhatappNumber?: string | null
    }): Promise<SmallGroup> => {
      const response = await api.post<SmallGroup>('/organization/small-groups', data)
      return response.data
    },
    update: async (id: number, data: {
      name: string
      type?: 'student' | 'graduate'
      province?: string | null
      district?: string | null
      sector?: string | null
      address?: string | null
      cellLeaderName?: string | null
      WhatappNumber?: string | null
    }): Promise<SmallGroup> => {
      const response = await api.put<SmallGroup>(`/organization/small-groups/${id}`, data)
      return response.data
    },
    delete: async (id: number): Promise<void> => {
      await api.delete(`/organization/small-groups/${id}`)
    },
  },

  // Regional Staff
  regionalStaff: {
    getAll: async (regionId?: number): Promise<RegionalStaff[]> => {
      const response = await api.get<{ regionalStaff: RegionalStaff[] }>('/organization/regional-staff', {
        params: regionId ? { regionId } : {},
      })
      return response.data.regionalStaff
    },
    create: async (data: {
      regionId: number
      name: string
      phone?: string | null
      WhatappNumber?: string | null
    }): Promise<RegionalStaff> => {
      const response = await api.post<RegionalStaff>('/organization/regional-staff', data)
      return response.data
    },
  },

  // Users (for regional staff dropdown)
  users: {
    getAll: async (): Promise<User[]> => {
      // Note: This endpoint doesn't exist yet, but we'll need it for the regional staff form
      // For now, return empty array or implement if needed
      return []
    },
  },
}

export default api


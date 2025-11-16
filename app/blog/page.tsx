'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingActionButton from '../components/FloatingActionButton'
import AddBlogModal from '../components/AddBlogModal'
import AddCategoryModal from '../components/AddCategoryModal'
import EditBlogModal from '../components/EditBlogModal'
import EditCategoryModal from '../components/EditCategoryModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import { blogAPI, categoryAPI, BlogPost, BlogCategory } from '../lib/api'
import { useAuth } from '../contexts/AuthContext'

const BlogPage = () => {
  const { isAdmin } = useAuth()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const categoryIdParam = searchParams.get('categoryId')
  const selectedCategoryId = categoryIdParam ? parseInt(categoryIdParam, 10) : undefined
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false)
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null)

  // Query for blog posts
  const queryParams: { status: string; categoryId?: number } = { status: 'published' }
  if (selectedCategoryId && !isNaN(selectedCategoryId)) {
    queryParams.categoryId = selectedCategoryId
  }

  const {
    data: posts = [],
    isLoading: isLoadingPosts,
    error: postsError,
  } = useQuery({
    queryKey: ['blogPosts', queryParams],
    queryFn: () => blogAPI.getAll(queryParams),
    retry: 2,
    retryDelay: 300,
    placeholderData: (previousData) => previousData,
  })

  // Query for categories
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ['blogCategories'],
    queryFn: () => categoryAPI.getAll(),
    retry: 2,
    retryDelay: 300,
    placeholderData: (previousData) => previousData,
  })

  const isLoading = isLoadingPosts || isLoadingCategories
  const error = postsError || categoriesError

  // Mutation for refreshing data
  const refreshMutation = useMutation({
    mutationFn: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['blogPosts'] }),
        queryClient.invalidateQueries({ queryKey: ['blogCategories'] }),
      ])
    },
  })

  const handleAddBlog = async (newPost: BlogPost) => {
    // Invalidate queries to refetch
    await queryClient.invalidateQueries({ queryKey: ['blogPosts'] })
  }

  const handleRefresh = async () => {
    await refreshMutation.mutateAsync()
  }

  const handleAddCategory = async (newCategory: BlogCategory) => {
    // Invalidate categories query to refetch
    await queryClient.invalidateQueries({ queryKey: ['blogCategories'] })
  }

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post)
    setIsEditModalOpen(true)
  }

  const handleUpdatePost = async (updatedPost: BlogPost) => {
    // Invalidate queries to refetch
    await queryClient.invalidateQueries({ queryKey: ['blogPosts'] })
    setIsEditModalOpen(false)
    setSelectedPost(null)
  }

  const handleDeleteClick = (post: BlogPost) => {
    setSelectedPost(post)
    setIsDeleteModalOpen(true)
  }

  // Delete mutation
  const deletePostMutation = useMutation({
    mutationFn: (postId: number) => blogAPI.delete(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] })
      setIsDeleteModalOpen(false)
      setSelectedPost(null)
    },
    retry: 2,
  })

  const handleDeleteConfirm = async () => {
    if (!selectedPost) return
    await deletePostMutation.mutateAsync(selectedPost.id)
  }

  const handleEditCategory = (category: BlogCategory) => {
    setSelectedCategory(category)
    setIsEditCategoryModalOpen(true)
  }

  const handleUpdateCategory = async (updatedCategory: BlogCategory) => {
    // Invalidate categories query to refetch
    await queryClient.invalidateQueries({ queryKey: ['blogCategories'] })
    setIsEditCategoryModalOpen(false)
    setSelectedCategory(null)
  }

  const handleDeleteCategoryClick = (category: BlogCategory) => {
    setSelectedCategory(category)
    setIsDeleteCategoryModalOpen(true)
  }

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId: number) => categoryAPI.delete(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogCategories'] })
      setIsDeleteCategoryModalOpen(false)
      setSelectedCategory(null)
    },
    retry: 2,
  })

  const handleDeleteCategoryConfirm = async () => {
    if (!selectedCategory) return
    await deleteCategoryMutation.mutateAsync(selectedCategory.id)
  }

  return (
    <>
      <Navbar />
      <main className="bg-accent">
        {/* Main Content Area */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
              {/* Left Column - Blog Posts */}
              <main className="lg:w-3/5 xl:w-2/3">
                {/* Add Blog Button - Only visible to admin */}
                {isAdmin && (
                  <div className="mb-6">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="btn-primary px-6 py-3 rounded-lg font-semibold text-sm sm:text-base flex items-center gap-2 hover:opacity-90 transition-opacity"
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
                      Add New Blog Post
                    </button>
                  </div>
                )}

                {isLoading && (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-action"></div>
                    <p className="mt-4 text-secondary">Loading blog posts...</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">
                      {error instanceof Error ? error.message : 'Failed to load blog posts'}
                    </p>
                    <button
                      onClick={handleRefresh}
                      className="mt-2 text-red-600 hover:text-red-800 underline text-sm"
                      disabled={refreshMutation.isPending}
                    >
                      {refreshMutation.isPending ? 'Refreshing...' : 'Try again'}
                    </button>
                  </div>
                )}

                {!isLoading && !error && posts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-secondary text-lg">No blog posts found.</p>
                  </div>
                )}

                {!isLoading && posts.map((post, index) => {
                  return (
                    <article key={post.id || index} className={`${index > 0 ? 'mt-10 pt-10 border-t border-custom' : ''}`}>
                      <div className="flex gap-4 items-start">
                        {/* Blog Post Content */}
                        <Link href={`/singlePage/${post.slug}`} className="flex-1 block hover:opacity-90 transition-opacity">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            {/* Image */}
                            <div className="md:w-1/3 lg:w-2/5 flex-shrink-0">
                              <div className="relative w-full aspect-square md:aspect-[4/3] rounded-lg overflow-hidden shadow-custom">
                                <Image
                                  src={post.image}
                                  alt={post.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="md:w-2/3 lg:w-3/5 flex-1">
                              {/* Category */}
                              <p className="uppercase text-xs text-secondary tracking-wider mb-1">
                                {post.category}
                              </p>

                              {/* Title */}
                              <h2 className="text-xl md:text-2xl font-semibold text-brand leading-snug mb-2 hover:text-action transition-colors">
                                {post.title}
                              </h2>

                              {/* Date */}
                              <p className="text-xs text-secondary mb-3">
                                {post.date}
                              </p>

                              {/* Excerpt */}
                              <div>
                                {post.excerpt.map((paragraph, pIndex) => (
                                  <p key={pIndex} className="text-sm md:text-base text-secondary leading-relaxed mb-3">
                                    {paragraph}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Link>

                        {/* Edit and Delete Icons - Only visible to admin */}
                        {isAdmin && (
                          <div className="flex flex-col gap-2 pt-1 flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleEditPost(post)
                              }}
                              className="p-1.5 text-action hover:text-brand hover:bg-accent rounded transition-colors"
                              title="Edit post"
                              aria-label="Edit post"
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
                                e.preventDefault()
                                e.stopPropagation()
                                handleDeleteClick(post)
                              }}
                              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                              title="Delete post"
                              aria-label="Delete post"
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
                      </div>
                    </article>
                  )
                })}
              </main>

              {/* Right Column - Categories Sidebar */}
              <aside className="lg:w-2/5 xl:w-1/3 mt-10 lg:mt-0">
                <div className="lg:sticky lg:top-8 bg-main rounded-lg p-6 shadow-custom">
                  {/* Categories Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-custom mb-4">
                    <h3 className="uppercase text-xs text-action font-semibold tracking-wider">
                      CATEGORIES
                    </h3>
                    {/* Add Category Button - Only visible to admin */}
                    {isAdmin && (
                      <button
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="text-action hover:text-brand transition-colors p-1 rounded-full hover:bg-accent"
                        title="Add new category"
                        aria-label="Add new category"
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
                      </button>
                    )}
                  </div>

                  {/* Categories List */}
                  <ul className="space-y-0">
                    {categories.length === 0 && !isLoading && (
                      <li className="text-sm text-secondary">No categories available</li>
                    )}
                    <li
                      className={`flex items-center justify-between gap-2 pb-3 mb-3 border-b border-custom`}
                    >
                      <Link
                        href="/blog"
                        className={`flex-1 text-sm transition-colors ${
                          !selectedCategoryId 
                            ? 'text-action font-semibold' 
                            : 'text-secondary hover:text-action'
                        }`}
                      >
                        All Posts
                      </Link>
                    </li>
                    {categories.map((category, index) => (
                      <li
                        key={category.id}
                        className={`flex items-center justify-between gap-2 ${index < categories.length - 1 ? 'pb-3 mb-3 border-b border-custom' : 'pt-1'}`}
                      >
                        <Link
                          href={`/blog?categoryId=${category.id}`}
                          className={`flex-1 text-sm transition-colors ${
                            selectedCategoryId === category.id 
                              ? 'text-action font-semibold' 
                              : 'text-secondary hover:text-action'
                          }`}
                        >
                          {category.name}
                        </Link>
                        {/* Edit and Delete Icons - Only visible to admin */}
                        {isAdmin && (
                          <div className="flex gap-1">
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleEditCategory(category)
                              }}
                              className="p-1 text-action hover:text-brand hover:bg-accent rounded transition-colors"
                              title="Edit category"
                              aria-label="Edit category"
                            >
                              <svg
                                className="w-3.5 h-3.5"
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
                                e.preventDefault()
                                e.stopPropagation()
                                handleDeleteCategoryClick(category)
                              }}
                              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                              title="Delete category"
                              aria-label="Delete category"
                            >
                              <svg
                                className="w-3.5 h-3.5"
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
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <FloatingActionButton />
      <Footer />
      <AddBlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddBlog}
        onRefresh={handleRefresh}
      />
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onAdd={handleAddCategory}
      />
      <EditBlogModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedPost(null)
        }}
        post={selectedPost}
        onUpdate={handleUpdatePost}
        onRefresh={handleRefresh}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedPost(null)
        }}
        onConfirm={handleDeleteConfirm}
        title={selectedPost?.title || ''}
        isDeleting={deletePostMutation.isPending}
      />
      <EditCategoryModal
        isOpen={isEditCategoryModalOpen}
        onClose={() => {
          setIsEditCategoryModalOpen(false)
          setSelectedCategory(null)
        }}
        category={selectedCategory}
        onUpdate={handleUpdateCategory}
      />
      <DeleteConfirmModal
        isOpen={isDeleteCategoryModalOpen}
        onClose={() => {
          setIsDeleteCategoryModalOpen(false)
          setSelectedCategory(null)
        }}
        onConfirm={handleDeleteCategoryConfirm}
        title={selectedCategory?.name || ''}
        isDeleting={deleteCategoryMutation.isPending}
        type="category"
      />
    </>
  )
}

export default BlogPage


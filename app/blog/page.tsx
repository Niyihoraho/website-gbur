'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false)
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null)
  const [isDeletingCategory, setIsDeletingCategory] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const [blogPosts, blogCategories] = await Promise.all([
          blogAPI.getAll({ status: 'published' }),
          categoryAPI.getAll(),
        ])
        setPosts(blogPosts)
        setCategories(blogCategories)
      } catch (err: any) {
        console.error('Error fetching blog data:', err)
        console.error('Error details:', err.response?.data)
        setError(err.response?.data?.error || err.response?.data?.message || 'Failed to load blog posts')
        // Set empty array on error
        setPosts([])
        setCategories([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddBlog = async (newPost: BlogPost) => {
    // Add new post to the beginning of the array optimistically
    setPosts([newPost, ...posts])
  }

  const handleRefresh = async () => {
    try {
      setIsLoading(true)
      const [blogPosts, blogCategories] = await Promise.all([
        blogAPI.getAll({ status: 'published' }),
        categoryAPI.getAll(),
      ])
      setPosts(blogPosts)
      setCategories(blogCategories)
    } catch (err: any) {
      console.error('Error refreshing blog posts:', err)
      setError(err.response?.data?.error || 'Failed to refresh blog posts')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCategory = async (newCategory: BlogCategory) => {
    // Refresh categories list to get the updated order from the server
    try {
      const updatedCategories = await categoryAPI.getAll()
      setCategories(updatedCategories)
    } catch (err: any) {
      console.error('Error refreshing categories:', err)
      // Fallback: add new category to the list manually
      setCategories([...categories, newCategory].sort((a, b) => a.order - b.order))
    }
  }

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post)
    setIsEditModalOpen(true)
  }

  const handleUpdatePost = async (updatedPost: BlogPost) => {
    // Update the post in the list
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p))
    setIsEditModalOpen(false)
    setSelectedPost(null)
  }

  const handleDeleteClick = (post: BlogPost) => {
    setSelectedPost(post)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedPost) return

    setIsDeleting(true)
    try {
      await blogAPI.delete(selectedPost.id)
      // Remove the post from the list
      setPosts(posts.filter(p => p.id !== selectedPost.id))
      setIsDeleteModalOpen(false)
      setSelectedPost(null)
    } catch (err: any) {
      console.error('Error deleting blog post:', err)
      setError(err.response?.data?.error || 'Failed to delete blog post')
      setIsDeleteModalOpen(false)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEditCategory = (category: BlogCategory) => {
    setSelectedCategory(category)
    setIsEditCategoryModalOpen(true)
  }

  const handleUpdateCategory = async (updatedCategory: BlogCategory) => {
    // If category becomes inactive, refresh the list (since we only show active categories)
    if (!updatedCategory.isActive) {
      try {
        const refreshedCategories = await categoryAPI.getAll()
        setCategories(refreshedCategories)
      } catch (err: any) {
        console.error('Error refreshing categories:', err)
        // Fallback: update in state anyway
        setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c))
      }
    } else {
      // Update the category in the list
      setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c))
    }
    setIsEditCategoryModalOpen(false)
    setSelectedCategory(null)
  }

  const handleDeleteCategoryClick = (category: BlogCategory) => {
    setSelectedCategory(category)
    setIsDeleteCategoryModalOpen(true)
  }

  const handleDeleteCategoryConfirm = async () => {
    if (!selectedCategory) return

    setIsDeletingCategory(true)
    try {
      await categoryAPI.delete(selectedCategory.id)
      // Remove the category from the list
      setCategories(categories.filter(c => c.id !== selectedCategory.id))
      setIsDeleteCategoryModalOpen(false)
      setSelectedCategory(null)
    } catch (err: any) {
      console.error('Error deleting category:', err)
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to delete category')
      setIsDeleteCategoryModalOpen(false)
    } finally {
      setIsDeletingCategory(false)
    }
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
                    <p className="text-red-800">{error}</p>
                    <button
                      onClick={handleRefresh}
                      className="mt-2 text-red-600 hover:text-red-800 underline text-sm"
                    >
                      Try again
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
                    {categories.map((category, index) => (
                      <li
                        key={category.id}
                        className={`flex items-center justify-between gap-2 ${index < categories.length - 1 ? 'pb-3 mb-3 border-b border-custom' : 'pt-1'}`}
                      >
                        <Link
                          href={`/blog?categoryId=${category.id}`}
                          className="flex-1 text-sm text-secondary hover:text-action transition-colors"
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
        isDeleting={isDeleting}
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
        isDeleting={isDeletingCategory}
        type="category"
      />
    </>
  )
}

export default BlogPage


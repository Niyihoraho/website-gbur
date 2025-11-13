import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import FloatingActionButton from '../../components/FloatingActionButton'

interface SinglePostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Server-side function to fetch blog post directly from database
async function getBlogPost(slug: string) {
  try {
    // Import prisma directly for server-side usage (more efficient than API call)
    const { prisma } = await import('../../lib/prisma')
    
    const post = await prisma.blog.findFirst({
      where: { 
        slug,
        status: 'published', // Only show published posts publicly
      },
      include: {
        category: true,
      },
    })

    if (!post) {
      return null
    }

    // Transform post to match frontend expectations
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      image: post.featuredImage || '/Gbur/DSC_9972.jpg',
      category: post.category.name.toUpperCase(),
      date: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
      excerpt: post.excerpt ? post.excerpt.split('\n').filter((line) => line.trim()) : [],
      content: post.content.split('\n').filter((line) => line.trim()),
      author: {
        name: 'GBUR Team',
        avatar: '/Gbur/DSC_9816.jpg',
      },
      status: post.status,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

const SinglePostPage = async ({ params }: SinglePostPageProps) => {
  const { slug } = await params
  
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const content = post.content || post.excerpt

  return (
    <>
      <Navbar />
      <main className="bg-accent min-h-screen">
        {/* Back to Blog Link */}
        <section className="pt-8 pb-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-action hover:text-link-hover transition-colors text-sm font-medium mb-6"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article>
              {/* Category */}
              <p className="uppercase text-xs text-secondary tracking-wider mb-4">
                {post.category}
              </p>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-brand leading-tight mb-4">
                {post.title}
              </h1>

              {/* Date and Author */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-custom">
                <p className="text-sm text-secondary mb-2 sm:mb-0">
                  {post.date}
                </p>
                <div className="flex items-center">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-secondary">
                    By <span className="font-medium text-brand">{post.author.name}</span>
                  </p>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-custom mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg text-secondary leading-relaxed mb-6"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

  

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-custom">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-action hover:text-link-hover transition-colors text-sm font-medium"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to All Posts
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <FloatingActionButton />
      <Footer />
    </>
  )
}

export default SinglePostPage


'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingActionButton from '../components/FloatingActionButton'

const LifeInMinistryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  // Reorganized into 4 main categories
  const ministryCategories = [
    {
      id: 'worship',
      title: 'Worship & Fellowship',
      description: 'Gathering together in worship, prayer, and celebration to honor God and build community.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      subcategories: [
        {
          title: 'Sunday Services',
          description: 'Weekly worship and teaching that transforms hearts and minds.',
          images: [
            '/lifeinGbu/sunday-service.jpg',
            '/lifeinGbu/sunday-service-2.jpg',
            '/lifeinGbu/sunday-service-3.jpg',
            '/lifeinGbu/sunday-service-4.jpg',
            '/lifeinGbu/sunday-service-5.jpg',
            '/lifeinGbu/sunday-service-6.jpg',
          ],
        },
        {
          title: 'Friday Fellowship',
          description: 'End the week together in worship, prayer, and celebration.',
          images: [
            '/lifeinGbu/friday-fellowship.jpg',
          ],
        },
        {
          title: 'After Fellowship',
          description: 'Continuing community through meals, conversations, and life together.',
          images: [
            '/lifeinGbu/after fellowship.jpg',
            '/lifeinGbu/home.jpg',
          ],
        },
      ],
    },
    {
      id: 'community',
      title: 'Community & Discipleship',
      description: 'Growing together in faith through intentional relationships, Bible study, and spiritual formation.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      subcategories: [
        {
          title: 'Small Groups',
          description: 'Intimate gatherings where students grow together in faith and community.',
          images: [
            '/lifeinGbu/small group.jpg',
            '/lifeinGbu/small group-1.jpg',
            '/lifeinGbu/small group-4.jpg',
            '/lifeinGbu/smallgroup.jpg',
            '/lifeinGbu/smallgroup-3.jpg',
            '/lifeinGbu/smallgroup-4.jpg',
          ],
        },
        {
          title: 'Bible Study',
          description: 'Deep dive into God\'s Word together, discovering truth and applying it to life.',
          images: [
            '/lifeinGbu/biblestudy.jpg',
            '/lifeinGbu/biblestudy-2.jpg',
          ],
        },
        {
          title: 'Discipleship Classes',
          description: 'Intentional training to grow as followers of Christ and leaders in ministry.',
          images: [
            '/lifeinGbu/discipleship class.jpg',
          ],
        },
        {
          title: 'Family Fellowship',
          description: 'Building lasting relationships and supporting one another as a spiritual family.',
          images: [
            '/lifeinGbu/family fellowship.jpg',
            '/lifeinGbu/family fellowship-1.jpg',
            '/lifeinGbu/family fellowship-3.jpg',
            '/lifeinGbu/family fellowship-4.jpg',
          ],
          video: '/lifeinGbu/video/family fellowship.mp4',
        },
      ],
    },
    {
      id: 'training',
      title: 'Training & Growth',
      description: 'Equipping students and staff with skills, knowledge, and vision for effective ministry and campus expansion.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      subcategories: [
        {
          title: 'Training & Development',
          description: 'Equipping students and staff with skills and knowledge for effective ministry.',
          images: [
            '/lifeinGbu/office trainning.jpg',
            '/lifeinGbu/training to the compus.jpg',
          ],
        },
        {
          title: 'Campus Planting',
          description: 'Expanding God\'s kingdom by establishing new chapters at universities across Rwanda.',
          images: [
            '/lifeinGbu/plantation to new university.jpg',
          ],
        },
      ],
    },
    {
      id: 'events',
      title: 'Special Events',
      description: 'Celebrating milestones, conferences, and special gatherings that inspire, unite, and mark significant moments in our journey together.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      subcategories: [
        {
          title: 'Conferences & Gatherings',
          description: 'Celebrating milestones, conferences, and special gatherings that inspire and unite.',
          images: [
            '/lifeinGbu/special-2.jpg',
            '/lifeinGbu/special-3.jpg',
            '/lifeinGbu/EZRA_SG1A[1].jpg',
            '/lifeinGbu/ezra.jpg',
          ],
        },
      ],
    },
  ]

  const filteredCategories = activeCategory === 'all' 
    ? ministryCategories 
    : ministryCategories.filter(cat => cat.id === activeCategory)

  return (
    <>
      <Navbar />
      <main className="bg-accent min-h-screen">
        {/* Hero Section */}
        <section className="bg-main pt-12 md:pt-16 pb-8 md:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-action mb-6">
                Life in GBUR
              </h1>
              <p className="text-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Experience the vibrant community, transformative worship, and life-changing relationships 
                that define ministry life at GBUR. From small groups to large gatherings, discover how 
                students and faculty grow together in faith.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-action text-white shadow-lg scale-105'
                    : 'bg-accent text-secondary hover:bg-main hover:text-action'
                }`}
              >
                All Categories
              </button>
              {ministryCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === category.id
                      ? 'bg-action text-white shadow-lg scale-105'
                      : 'bg-accent text-secondary hover:bg-main hover:text-action'
                  }`}
                >
                  <span className="hidden sm:inline">{category.icon}</span>
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Ministry Categories */}
        {filteredCategories.map((category, categoryIndex) => (
          <section 
            key={category.id} 
            className={`py-12 md:py-16 ${categoryIndex % 2 === 0 ? 'bg-main' : 'bg-accent'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Category Header Card */}
              <div className="bg-accent rounded-2xl p-8 md:p-10 shadow-custom border border-custom mb-10 md:mb-12">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-action/10 rounded-xl flex items-center justify-center text-action">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand mb-3">
                      {category.title}
                    </h2>
                    <p className="text-secondary text-base md:text-lg leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subcategories */}
              <div className="space-y-12 md:space-y-16">
                {category.subcategories.map((subcategory, subIndex) => (
                  <div key={subIndex} className="space-y-6">
                    {/* Subcategory Header */}
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-custom to-transparent"></div>
                      <h3 className="text-2xl md:text-3xl font-bold text-action whitespace-nowrap">
                        {subcategory.title}
                      </h3>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-custom to-transparent"></div>
                    </div>
                    <p className="text-secondary text-center text-base md:text-lg max-w-2xl mx-auto">
                      {subcategory.description}
                    </p>

                    {/* Video Section (if available) */}
                    {subcategory.video && (
                      <div className="mb-8 rounded-2xl overflow-hidden shadow-xl border border-custom">
                        <video
                          controls
                          className="w-full h-auto"
                          poster={subcategory.images[0]}
                        >
                          <source src={subcategory.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}

                    {/* Image Gallery Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {subcategory.images.map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] aspect-[4/3]"
                          onClick={() => setSelectedImage(image)}
                        >
                          <Image
                            src={image}
                            alt={`${subcategory.title} - Image ${imageIndex + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-4 text-white w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <p className="text-sm font-semibold">{subcategory.title}</p>
                              <p className="text-xs opacity-90 mt-1">Click to view full size</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Call to Action Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-main via-accent to-main">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-main rounded-2xl p-8 md:p-12 shadow-xl border border-custom">
              <h2 className="text-3xl md:text-4xl font-bold text-brand mb-6">
                Join Us in Ministry
              </h2>
              <p className="text-secondary text-lg md:text-xl mb-10 leading-relaxed">
                Experience the joy of community, the power of worship, and the transformation 
                that comes from walking with Christ together. Whether you're a student or faculty 
                member, there's a place for you in GBUR.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/involved"
                  className="btn-primary px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 shadow-custom hover:shadow-lg inline-flex items-center justify-center gap-2"
                >
                  Get Involved
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="/contact"
                  className="btn-outline px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 shadow-sm hover:shadow-md inline-flex items-center justify-center gap-2"
                >
                  Contact Us
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FloatingActionButton />

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Full size view"
              fill
              className="object-contain"
              sizes="100vw"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
              className="absolute top-4 right-4 text-white bg-black/70 hover:bg-black/90 rounded-full p-3 transition-all duration-300 z-10"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default LifeInMinistryPage

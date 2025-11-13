'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingActionButton from '../components/FloatingActionButton'

// Safe Image Component with error handling
const SafeImage = ({ src, alt, onError, ...props }: { src: string; alt: string; onError?: () => void; [key: string]: any }) => {
  const [imgError, setImgError] = useState(false)
  const [imgSrc, setImgSrc] = useState(src)

  const handleError = () => {
    if (!imgError && onError) {
      setImgError(true)
      onError()
    } else if (!imgError) {
      setImgError(true)
      setImgSrc('/Gbur/logo-r.png') // Fallback image
    }
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleError}
      unoptimized={imgError}
      {...props}
    />
  )
}

const ConferencePage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [showAllSchedule, setShowAllSchedule] = useState(false)
  const [activeYear, setActiveYear] = useState<string>('2025')
  const [showAllImages, setShowAllImages] = useState<{ [key: string]: boolean }>({
    '2025': false,
    '2022': false,
  })
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const toggleAllSchedule = () => {
    setShowAllSchedule((prev) => !prev)
  }

  const toggleShowAllImages = (year: string) => {
    setShowAllImages((prev) => ({
      ...prev,
      [year]: !prev[year],
    }))
  }

  const speakers = [
    {
      name: 'Rev. Manasseh Eric Muvandimwe',
      title: 'Pastor at The Metropolitan Bible Church, Ottawa, Canada',
      bio: 'Rev. Manasseh Eric Muvandimwe is a pastor at The Metropolitan Bible Church in Ottawa, Canada, where he leads the ministry to retirees. He also serves as a teaching facilitator with The Timothy Trust and sits on the leadership of several ministries, including the board of Langham Partnership Canada and the Wells Salvation Churches\' leadership council.',
      education: 'MDiv from Heritage College & Seminary, MGHD from the University of Global Health Equity',
      experience: 'Before entering full-time ministry, he worked in public health for eight years and has served in student ministry and church planting for over a decade, including with GBUR and the Lausanne Movement.',
      passion: 'Manasseh is passionate about expository preaching and is committed to training and encouraging pastors and preachers.',
      image: '/ezra-2025/ezra-pastor-manaseh.jpg',
    },
    {
      name: 'Ev. Emmanuel Kwizera',
      title: 'International Missions Director, African Enterprise',
      bio: 'Ev. Emmanuel Kwizera is from Rwanda, serving in Kenya as International Missions Director of African Enterprise. He served as the President of GBU Butare and the Board Chair of GBUR.',
      role: 'Emmanuel is the Proclamation Evangelism Global Catalyst of the Lausanne Movement, a global network started by Billy Graham.',
      education: 'Masters degree in Evangelism and Leadership from Wheaton College. Currently pursuing PhD in Evangelism and Missions at Trinity Evangelical Divinity School TEDS.',
      family: 'He is married to Coco and they have three children Ella, Kefa and Tessa. Emmanuel is an evangelist and a member of Wheaton Bible Church since 2021 with his family.',
      image: '/ezra-2025/EZRA SG Main Spk.jpg',
    },
    {
      name: 'Dr. Femi Adeleye',
      title: 'Africa Director for Langham Preaching',
      bio: 'Dr. Femi Adeleye currently serves as Africa Director for Langham Preaching and as Director of the Institute for Christian Impact (ICI)—an initiative committed to nurturing a new generation of leaders to impact Africa with Kingdom values.',
      experience: 'He has served in Christian ministry for over three decades, including 32 years with the International Fellowship of Evangelical Students (IFES), where he began his work in his home country of Nigeria.',
      passion: 'Throughout his ministry, Dr. Adeleye has been deeply passionate about reaching young people and helping them follow Jesus in word, deed, and lifestyle. He continues to challenge Christians across Africa to walk the talk of following Christ faithfully.',
      family: 'Dr. Adeleye lives in Ghana with his wife, Affy. They are blessed with four children: Remi, Philip, Kemi, and Emmanuel.',
      image: '/ezra-2025/ezra-pastor-training.jpg',
    },
  ]





  // Conference data organized by year - base data without filtering
  const conferencesBaseData = {
    '2025': {
      year: '2025',
      title: 'Ezra Generation Conference 2025',
      date: 'August 20-24, 2025',
      description: 'The sixth edition of the Ezra Generation Conference focusing on Malachi and James.',
      heroImage: '/ezra-2025/EZRA PIC 2025.jpg',
      videos: [
        {
          title: 'Ezra Conference for Students & Graduates 2025',
          src: '/ezra-2025/Ezra Conference for Students & Graduates 2025.mp4',
          thumbnail: '/ezra-2025/EZRA PIC 2025.jpg',
        },
        {
          title: 'Ezra Generation Training for Pastors - Day 1',
          src: '/ezra-2025/Ezra Generation Training for Pastors - Day 1 - 2025.mp4',
          thumbnail: '/ezra-2025/EZRA PST DY2-2.jpg',
        },
        {
          title: 'Ezra Generation Training for Pastors - Day 2',
          src: '/ezra-2025/Ezra Generation Training for Pastors - Day 2 - 2025.mp4',
          thumbnail: '/ezra-2025/EZRA PST DY2-3 SG.jpg',
        },
      ],
      images: [
        '/ezra-2025/EZRA PIC 2025.jpg',
        '/ezra-2025/EZRA WS1.jpg',
        '/ezra-2025/EZRA PST DY2-2.jpg',
        '/ezra-2025/EZRA PST DY2-3 SG.jpg',
        '/ezra-2025/EZRA SPT1.jpg',
        '/ezra-2025/EZRA SG Main Spk.jpg',
        '/ezra-2025/EZRA SG1A.jpg',
        '/ezra-2025/EZRA MMM.jpg',
        '/ezra-2025/ezra.jpg',
        '/ezra-2025/ezra-x.jpg',
        '/ezra-2025/workshop-ezra.jpg',
        '/ezra-2025/ezraaa.jpg',
        '/ezra-2025/ezra-xx.jpg',
        '/ezra-2025/ezra-xxx.jpg',
        '/ezra-2025/ezra-xxxx.jpg',
        '/ezra-2025/ezra-xxxxx.jpg',
        '/ezra-2025/ezra-x5.jpg',
        '/ezra-2025/ezra-pastor-manaseh.jpg',
        '/ezra-2025/ezra-pastor-training.jpg',
      ],
    },
    '2022': {
      year: '2022',
      title: 'Ezra Generation Conference 2022',
      date: '2022',
      description: 'Previous edition of the Ezra Generation Conference featuring inspiring sessions and community gatherings.',
      heroImage: '/ezra-2022/3.png',
      videos: [
        {
          title: 'EZRA Generation Conference 2022 Day 1 - Highlights',
          src: '/ezra-2022/EZRA Generation Conference 2022 Day 1- Highlights.mp4',
          thumbnail: '/ezra-2022/2.png',
        },
        {
          title: 'EZRA Generation Conference Day 2 Highlights',
          src: '/ezra-2022/EZRA Generation conference day 2 Highlights.mp4',
          thumbnail: '/ezra-2022/3.png',
        },
      ],
      images: [
        '/ezra-2022/2.png',
        '/ezra-2022/3.png',
        '/ezra-2022/4.png',
        '/ezra-2022/5.png',
        '/ezra-2022/6.png',
      ],
    },
  }


  const resources = [
    {
      title: 'Expositional Preaching: How We Speak God\'s Word Today',
      author: 'David R. Helm',
      publisher: 'Crossway, 2014',
    },
    {
      title: 'Proclaiming the Word: Principles and Practices for Expository Preaching',
      author: 'David Jackman and Peter Nichols',
      publisher: 'Crossway, 2024',
    },
    {
      title: 'Preaching Christ from The Old Testament: A Contemporary Hermeneutical Method',
      author: 'Sidney Greidanus',
      publisher: 'Eerdmans, 1999',
    },
    {
      title: 'Christ-Centered Preaching: Redeeming the Expository Sermon',
      author: 'Bryan Chapell',
      publisher: 'Baker Academic, 2018',
    },
  ]

  const handleImageError = (imageSrc: string) => {
    setFailedImages(prev => new Set([...prev, imageSrc]))
  }

  const years = Object.keys(conferencesBaseData).sort().reverse()
  
  // Convert Set to Array for dependency tracking
  const failedImagesArray = Array.from(failedImages)
  
  // Memoize current conference to update when year or failed images change
  const currentConference = useMemo(() => {
    const base = conferencesBaseData[activeYear as keyof typeof conferencesBaseData]
    return {
      ...base,
      images: base.images.filter(img => !failedImages.has(img)),
    }
  }, [activeYear, failedImagesArray])
  
  const validImages = currentConference.images
  const showAll = showAllImages[activeYear] || false
  const displayedImages = showAll ? validImages : validImages.slice(0, 4)
  const hasMoreImages = validImages.length > 4

  return (
    <>
      <Navbar />
      <main className="bg-accent min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-main pt-12 md:pt-16 pb-8 md:pb-12 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <h2 className="text-sm md:text-base font-semibold text-action uppercase tracking-wider mb-2">
                  Groupe Biblique Universitaire du Rwanda
                </h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand mb-4">
                  EZRA CONFERENCE
                </h1>
                <p className="text-xl md:text-2xl text-secondary font-semibold">
                  {currentConference.date}
                </p>
              </div>
            </div>
            
            {/* Year Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setActiveYear(year)
                  }}
                  className={`px-6 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                    activeYear === year
                      ? 'bg-action text-white shadow-lg scale-105'
                      : 'bg-accent text-secondary hover:bg-main hover:text-action'
                  }`}
                >
                  Ezra {year}
                </button>
              ))}
            </div>
            
            {/* Hero Image */}
            <div key={`hero-${activeYear}`} className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-custom">
              <SafeImage
                src={currentConference.heroImage}
                alt={currentConference.title}
                fill
                className="object-cover"
                priority
                onError={() => handleImageError(currentConference.heroImage)}
              />
            </div>
          </div>
        </section>

        {/* Conference Info Section */}
        {activeYear === '2025' && (
          <>
            {/* Welcome Section */}
            <section className="py-12 md:py-16 bg-gradient-to-b from-accent to-main">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-main rounded-2xl p-8 md:p-12 shadow-xl border border-custom">
                  <div className="text-center mb-8">
                    <div className="inline-block bg-action/10 rounded-full px-6 py-2 mb-4">
                      <span className="text-action font-semibold text-sm uppercase tracking-wider">Sixth Edition</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-brand mb-4">Welcome to Ezra 2025</h2>
                  </div>
                  <div className="space-y-4 text-secondary text-base md:text-lg leading-relaxed">
                    <p>
                      Welcome to the Ezra Generation Conference, a Bible training conference grounded in Ezra's desire to call both Israel and today's church to return to the Bible as our ultimate authority.
                    </p>
                    <blockquote className="border-l-4 border-action pl-4 italic text-brand">
                      "For Ezra had set his heart to study the Law of the LORD, and to do it and to teach his statutes and rules in Israel." — Ezra 7:10 (ESV)
                    </blockquote>
                    <p>
                      We're so glad that you're here! Our prayer is that through this conference, you will be equipped to faithfully handle the Word of God and leave feeling both refreshed and strengthened for ministry.
                    </p>
                    <p>
                      Now in its sixth edition, the Ezra Generation Conference will focus on two often-overlooked yet timely and deeply rich books of the Bible: <strong>Malachi</strong> from the Old Testament and <strong>James</strong> from the New Testament.
                    </p>
                    <p>
                      Both speak powerfully into our current moment, calling for authentic worship, faithful leadership, and living faith in times of trial. Through expository preaching, you will be invited to hear God's voice afresh. In addition, you will be trained in Inductive Bible Study, grounded in biblical theology, and exposed to key doctrines that will equip you to develop a biblical perspective on today's challenges, and to always preach Christ in every sermon and teaching.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Speakers Section */}
            <section className="py-12 md:py-16 bg-main">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-brand mb-4">Our Speakers</h2>
                  <p className="text-secondary text-lg max-w-2xl mx-auto">
                    Meet the distinguished speakers who will guide us through God's Word
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  {speakers.map((speaker, index) => (
                    <div key={index} className="bg-accent rounded-xl p-3 shadow-lg border border-custom hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                      <div className="relative w-full h-69 rounded-lg overflow-hidden mb-3 shadow-md">
                        <SafeImage
                          src={speaker.image}
                          alt={speaker.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-brand mb-1">{speaker.name}</h3>
                          <p className="text-xs text-action font-semibold mb-2 border-l-2 border-action pl-2">{speaker.title}</p>
                        </div>
                        <div className="space-y-2 text-xs text-secondary leading-relaxed">
                          <p className="text-sm line-clamp-3">{speaker.bio}</p>
                          {speaker.education && (
                            <div className="pt-1 border-t border-custom">
                              <p className="font-semibold text-brand text-xs mb-0.5">Education</p>
                              <p className="text-xs line-clamp-2">{speaker.education}</p>
                            </div>
                          )}
                          {speaker.experience && (
                            <div className="pt-1 border-t border-custom">
                              <p className="font-semibold text-brand text-xs mb-0.5">Experience</p>
                              <p className="text-xs line-clamp-2">{speaker.experience}</p>
                            </div>
                          )}
                          {speaker.role && (
                            <div className="pt-1 border-t border-custom">
                              <p className="font-semibold text-brand text-xs mb-0.5">Role</p>
                              <p className="text-xs line-clamp-2">{speaker.role}</p>
                            </div>
                          )}
                          {speaker.passion && (
                            <div className="pt-1 border-t border-custom">
                              <p className="font-semibold text-brand text-xs mb-0.5">Passion</p>
                              <p className="text-xs line-clamp-2">{speaker.passion}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </>
        )}

        {/* Videos Section */}
        <section className={`py-12 md:py-16 ${activeYear === '2025' ? 'bg-main' : 'bg-main'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand mb-4">
                Conference Videos {activeYear}
              </h2>
              <p className="text-secondary text-lg">Watch highlights and full sessions from the conference</p>
            </div>
            <div className={`grid grid-cols-1 ${currentConference.videos.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6 lg:gap-8`}>
              {currentConference.videos.map((video, index) => (
                <div key={`${activeYear}-video-${index}-${video.src}`} className="bg-accent rounded-2xl overflow-hidden shadow-lg border border-custom hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  <div className="relative w-full h-56 cursor-pointer" onClick={() => setSelectedVideo(video.src)}>
                    <SafeImage
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={() => handleImageError(video.thumbnail)}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group hover:bg-black/50 transition-colors">
                      <svg className="w-16 h-16 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-brand text-sm md:text-base">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

            {/* Image Gallery Section */}
        <section key={`gallery-${activeYear}`} className={`py-12 md:py-16 ${activeYear === '2025' ? 'bg-gradient-to-b from-main to-accent' : 'bg-accent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand mb-4">
                Conference Photos {activeYear}
              </h2>
              <p className="text-secondary text-base md:text-lg">
                {displayedImages.length} of {validImages.length} photos
              </p>
            </div>
            {displayedImages.length > 0 ? (
              <div key={`images-grid-${activeYear}`} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {displayedImages.map((image, index) => (
                  <div
                    key={`${activeYear}-${image}-${index}`}
                    className="relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <SafeImage
                      src={image}
                      alt={`Conference ${activeYear} - ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      onError={() => handleImageError(image)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-sm font-semibold">Click to view full size</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-secondary text-lg">No images available at the moment.</p>
              </div>
            )}
            
            {/* Show All Button */}
            {hasMoreImages && (
              <div className="text-center mt-10">
                <button
                  onClick={() => toggleShowAllImages(activeYear)}
                  className="btn-primary px-8 py-4 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3 hover:scale-105"
                >
                  {showAll ? (
                    <>
                      <span>Show Less</span>
                      <svg className="w-5 h-5 transition-transform duration-300 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Show All Photos</span>
                      <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-secondary text-sm md:text-base mt-4">
                  {showAll 
                    ? `Showing all ${validImages.length} photos` 
                    : `Showing 4 of ${validImages.length} photos - Click to view all`
                  }
                </p>
              </div>
            )}
          </div>
        </section>


        {/* Contact Section */}
        <section className="py-8 md:py-12 bg-accent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-main rounded-xl p-6 md:p-8 shadow-custom border border-custom">
              <h2 className="text-2xl md:text-3xl font-bold text-brand mb-4">Contact Us</h2>
              <p className="text-secondary text-base md:text-lg mb-4">
                General Secretary<br />
                IFES- Rwanda (International Fellowship of Evangelical Students) - GBUR
              </p>
              <div className="space-y-2 text-secondary">
                <p><strong>Email:</strong> <a href="mailto:ugbroffice@gmail.com" className="text-action hover:text-link-hover">ugbroffice@gmail.com</a></p>
                <p><strong>Website:</strong> <a href="https://gburwanda.org" target="_blank" rel="noopener noreferrer" className="text-action hover:text-link-hover">gburwanda.org</a></p>
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

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative max-w-7xl w-full">
            <video
              controls
              autoPlay
              className="w-full h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white bg-black/70 hover:bg-black/90 rounded-full p-3 transition-all duration-300"
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

export default ConferencePage

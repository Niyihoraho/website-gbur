import React from 'react'
import Image from 'next/image'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingActionButton from '../components/FloatingActionButton'

const LeadersPage = () => {
  const leaders = [
    {
      name: 'Rukundo Somson',
      role: 'General Secretary (GS)',
      image: '/leaders/Rukundo Somson-General secretary(GS).jpg',
      description: 'Leading GBUR with vision and dedication to transform Rwanda\'s universities through gospel-centered communities.',
    },
    {
      name: 'Alex Shyaka',
      role: 'Student Ministry',
      image: '/leaders/Alex shyaka-student ministry.jpg',
      description: 'Passionately serving students and equipping them to be mature disciples of Jesus Christ.',
    },
    {
      name: 'Murenzi Suzan',
      role: 'Accountant',
      image: '/leaders/Murenzi suzan-accountant.png',
      description: 'Ensuring financial integrity and stewardship of resources for effective ministry operations.',
    },
  ]

  return (
    <>
      <Navbar />
      <main className="bg-accent min-h-screen">
        {/* Hero Section */}
        <section className="bg-main pt-8 md:pt-12 pb-6 md:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-action mb-4">
                Our Leadership
              </h1>
              <p className="text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Meet the dedicated leaders who guide GBUR in its mission to reach, equip, and mobilize 
                students and graduates to be agents of godly transformation in Rwanda and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Leaders Grid Section */}
        <section className="py-8 md:py-12 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {leaders.map((leader, index) => (
                <div
                  key={index}
                  className="bg-main rounded-xl overflow-hidden shadow-custom border border-custom hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Leader Image */}
                  <div className="relative w-full h-80 md:h-96 overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  {/* Leader Info */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-bold text-brand mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-action font-semibold text-base md:text-lg mb-4">
                      {leader.role}
                    </p>
                    <p className="text-secondary text-sm md:text-base leading-relaxed">
                      {leader.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Message Section */}
        <section className="py-8 md:py-12 bg-main">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-accent rounded-xl p-6 md:p-8 shadow-custom border border-custom">
              <h2 className="text-2xl md:text-3xl font-bold text-brand mb-6 text-center">
                Leading with Purpose
              </h2>
              <div className="space-y-4 text-secondary text-base md:text-lg leading-relaxed">
                <p>
                  Our leadership team is committed to serving GBUR with excellence, integrity, and a 
                  passion for seeing students transformed by the gospel. Each leader brings unique 
                  gifts and experiences that contribute to our mission of reaching every student, 
                  equipping them as disciples, and mobilizing them for godly transformation.
                </p>
                <p>
                  Together, we work to create vibrant Christian communities on campuses across Rwanda, 
                  ensuring that every student has the opportunity to hear the gospel and grow in their 
                  faith. Our leadership is dedicated to supporting student leaders, facilitating 
                  discipleship, and building partnerships that advance God's kingdom in higher education.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FloatingActionButton />
      <Footer />
    </>
  )
}

export default LeadersPage



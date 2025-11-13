'use client'

import React, { useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingActionButton from '../components/FloatingActionButton'

const IfesHistoryPage = () => {
  const [expandedDecades, setExpandedDecades] = useState<Record<string, boolean>>({
    '1980s': true,
    '1990s-2000s': false,
    '2010s-Present': false,
  })

  const toggleDecade = (decade: string) => {
    setExpandedDecades(prev => ({
      ...prev,
      [decade]: !prev[decade]
    }))
  }

  return (
    <>
      <Navbar />
      <main className="bg-accent min-h-screen">
        {/* Title Section */}
        <section className="bg-main py-8 md:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 mb-6 text-center">
              GBUR and IFES History
            </h1>
            <p className="text-base md:text-lg text-secondary leading-relaxed">
              Groupes Bibliques Universitaires du Rwanda (GBUR) officially began in <span className="text-action underline cursor-pointer">1984</span> when Israel Havugimana pioneered the first campus fellowship at the National University of Rwanda (UNR). What started as a small group of students committed to Bible study and prayer has grown into a nationwide movement reaching 30 GBUs across 29 university campuses.
            </p>
          </div>
        </section>

        {/* Cambridge Section */}
        <section className="py-8 md:py-12 bg-main">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-action mb-6">
              Cambridge University, England - The Global Roots
            </h2>
            
            <div className="space-y-4 text-base md:text-lg text-secondary leading-relaxed">
              <p>
                The roots of the GBUR movement reach back to 1877 at Cambridge University, where a small group of students met regularly for Bible study and prayer. Despite the university's disapproval, these students were determined to share their faith with fellow students. In 1919, the British Inter-Varsity Fellowship (BIVF) was formed, with "inter" meaning "between" and "varsity" referring to university life. The name symbolized the vision of linking Christian students across different universities.
              </p>
              
              <p>
                From its earliest days, the movement had a global vision. Students at Cambridge were passionate about spreading the gospel worldwide, and this commitment to missions became a defining characteristic of what would become the International Fellowship of Evangelical Students (IFES).
              </p>
            </div>
          </div>
        </section>

        {/* Birth of IFES Section */}
        <section className="py-8 md:py-12 bg-accent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-action mb-6">
              The Birth of IFES
            </h2>
            
            <div className="space-y-4 text-base md:text-lg text-secondary leading-relaxed">
              <p>
                In 1947, a historic gathering took place at Harvard University in Boston, United States. Representatives from ten countries—Australia, the United Kingdom, Canada, China, Netherlands, Norway, France, New Zealand, Switzerland, and the United States—came together with a shared dream: to see a clear witness to the Lord Jesus established in every university in the world.
              </p>
              
              <p>
                From this 1947 meeting emerged the International Fellowship of Evangelical Students (IFES), which now unites student movements in over 180 countries. IFES provides a network of mutual support, shared resources, and a common commitment to reaching students with the gospel. The headquarters is located in Oxford, England.
              </p>
            </div>
          </div>
        </section>

        {/* IFES Leadership Section */}
        <section className="py-8 md:py-12 bg-main">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-action mb-6">
              IFES Leadership Through the Years
            </h2>
            
            <div className="space-y-4 text-base md:text-lg text-secondary leading-relaxed">
              <p>
                Representatives of all member movements gather once every four years at the "World Assembly," where the General Committee conducts official business of the fellowship. IFES's General Secretaries have included:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Stacey Woods (1947–1972)</li>
                <li>Chua Wee Hian (1972–1991)</li>
                <li>Lindsay Brown (1991–2007)</li>
                <li>Daniel Bourdanné (2007–2019)</li>
                <li>Jamil (acting, 2019–2020)</li>
                <li>Tim Adams (2021–present)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* IFES Global Regions Section */}
        <section className="py-8 md:py-12 bg-accent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-action mb-6">
              IFES Global Regions
            </h2>
            
            <div className="space-y-4 text-base md:text-lg text-secondary leading-relaxed">
              <p>
                Today, IFES operates through regional networks spanning:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>North America</li>
                <li>Caribbean</li>
                <li>Latin America</li>
                <li>Europe</li>
                <li>Middle East and North Africa</li>
                <li>Francophone Africa (including GBUR)</li>
                <li>EPSA (English-speaking Africa)</li>
                <li>Eurasia</li>
                <li>South Asia</li>
                <li>East Asia</li>
                <li>South Pacific</li>
              </ul>
            </div>
          </div>
        </section>

        {/* GBUR History by Decade Section */}
        <section className="py-8 md:py-12 bg-main">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-action mb-8">
              GBUR History by the Decade
            </h2>

            {/* 1980s */}
            <div className="mb-4">
              <button
                onClick={() => toggleDecade('1980s')}
                className="w-full bg-neutral-200 rounded-lg p-4 flex items-center justify-between hover:bg-neutral-300 transition-colors"
              >
                <span className="font-semibold text-brand text-lg">
                  {expandedDecades['1980s'] ? '−' : '+'} 1980s: The Beginning
                </span>
              </button>
              {expandedDecades['1980s'] && (
                <div className="bg-accent rounded-b-lg p-6 space-y-4 text-base md:text-lg text-secondary leading-relaxed">
                  <p>
                    In 1984, Israel Havugimana founded GBUR at the National University of Rwanda (UNR). What began as a small gathering of students committed to studying God's Word and sharing the gospel quickly demonstrated the power of student-led ministry. Despite challenges, these pioneering students were determined to establish a clear witness to Jesus Christ on their campus.
                  </p>
                  <p>
                    The vision was ambitious: to reach every student in Rwandan universities with the gospel, equip them to be mature disciples of Jesus Christ, and mobilize them to be agents of godly transformation in the church and society.
                  </p>
                </div>
              )}
            </div>

            {/* 1990s-2000s */}
            <div className="mb-4">
              <button
                onClick={() => toggleDecade('1990s-2000s')}
                className="w-full bg-neutral-200 rounded-lg p-4 flex items-center justify-between hover:bg-neutral-300 transition-colors"
              >
                <span className="font-semibold text-brand text-lg">
                  {expandedDecades['1990s-2000s'] ? '−' : '+'} 1990s-2000s: Growth and Expansion
                </span>
              </button>
              {expandedDecades['1990s-2000s'] && (
                <div className="bg-accent rounded-b-lg p-6 space-y-4 text-base md:text-lg text-secondary leading-relaxed">
                  <p>
                    Through the 1990s and into the 2000s, GBUR expanded its reach across Rwanda's growing university landscape. New GBUs were pioneered on campuses throughout the country, with students taking initiative to establish Bible study groups, prayer meetings, and evangelistic outreaches.
                  </p>
                  <p>
                    The movement deepened its commitment to discipleship, emphasizing inductive Bible study in small groups and the development of student leaders. GBUR maintained its connection to the global IFES family, drawing encouragement and resources from sister movements across Francophone Africa and beyond.
                  </p>
                </div>
              )}
            </div>

            {/* 2010s-Present */}
            <div className="mb-4">
              <button
                onClick={() => toggleDecade('2010s-Present')}
                className="w-full bg-neutral-200 rounded-lg p-4 flex items-center justify-between hover:bg-neutral-300 transition-colors"
              >
                <span className="font-semibold text-brand text-lg">
                  {expandedDecades['2010s-Present'] ? '−' : '+'} 2010s-Present: A Thriving Movement
                </span>
              </button>
              {expandedDecades['2010s-Present'] && (
                <div className="bg-accent rounded-b-lg p-6 space-y-4 text-base md:text-lg text-secondary leading-relaxed">
                  <p>
                    Today, GBUR continues to fulfill its mission as part of the IFES global fellowship. With 30 GBUs operating across 29 university campuses in Rwanda, the movement reaches thousands of students each year with the gospel of Jesus Christ.
                  </p>
                  <p>
                    GBUR's mission remains focused on establishing and advancing student-led witnessing communities who follow Jesus as Savior and Lord, growing in love for God, God's Word, God's people of every ethnicity and culture, and God's purposes in the world.
                  </p>
                  <p>
                    The movement operates through a structured network including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>A National General Assembly (GA)</li>
                    <li>National Executive Committee (NEC/Board)</li>
                    <li>Regional and National Staff (RSEC & NASEC)</li>
                    <li>Local GBU structures with Executive Committees, department leaders, and cell groups</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Ministry Today Section */}
        <section className="py-8 md:py-12 bg-accent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 mb-6">
              Ministry Today
            </h2>
            
            <div className="space-y-4 text-base md:text-lg text-secondary leading-relaxed">
              <p>
                GBUR's strategic priorities focus on:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Thriving in Witness</strong> - Equipping students for effective evangelism on their campuses</li>
                <li><strong>Thriving in Whole-life Commitment</strong> - Developing disciples and leaders who integrate faith with every area of life</li>
                <li><strong>Thriving on New Ground</strong> - Pioneering new GBUs and expanding into high school ministry</li>
                <li><strong>Thriving into the Future</strong> - Building sustainable structures with good governance and accountability</li>
                <li><strong>Involvement in Missions</strong> - Mobilizing students for cross-cultural gospel witness</li>
              </ul>
              
              <p>
                GBUR continues to be made up of two wings working together: students actively ministering on campuses, and graduates who support the work through prayer, financial partnership, mentoring, and staff service. This intergenerational partnership ensures that the gospel movement continues to thrive in Rwanda's student world.
              </p>
              
              <p>
                Through partnership with IFES, GBUR remains connected to a global movement of students and graduates committed to seeing every campus transformed by the gospel, for the glory of Christ.
              </p>
            </div>
          </div>
        </section>
      </main>
      <FloatingActionButton />
      <Footer />
    </>
  )
}

export default IfesHistoryPage


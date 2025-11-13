'use client'

import React, { useState } from 'react'

type TabType = 'STUDENT' | 'DONOR' | 'GRADUATE'

const Iam = () => {
  const [activeTab, setActiveTab] = useState<TabType>('STUDENT')

  const tabs: TabType[] = ['STUDENT', 'DONOR', 'GRADUATE']

  const content: Record<TabType, Array<{title: string; subtitle: string; description: string}>> = {
    STUDENT: [
      {
        title: 'Join an GBUR community',
        subtitle: 'Subscribe',
        description:
          'Find your place to belong and grow your faith in college. Join an Gbur community on your campus now!',
      },
      {
        title: 'Start something new on campus',
        subtitle: 'Start something new',
        description:
          'Learn how to reach your campus, a corner of campus, or an unreached campus near you with the hope of Jesus.',
      },
      {
        title: 'Grow in your faith',
        subtitle: 'Spiritual formation resources',
        description:
          'Explore resources that will strengthen your faith in college.',
      },
    ],
    DONOR: [
      {
        title: 'Support our mission',
        subtitle: 'Make a donation',
        description:
          'Help us reach more students and campuses with the hope of Jesus through your generous support.',
      },
      {
        title: 'Partner with us',
        subtitle: 'Become a partner',
        description:
          'Join our community of supporters who are making a lasting impact on student lives.',
      },
      {
        title: 'See the impact',
        subtitle: 'Read our stories',
        description:
          'Discover how your support is transforming lives and campuses across the nation.',
      },
    ],


    GRADUATE: [
      {
        title: 'Stay connected',
        subtitle: 'Join graduates network',
        description:
          'Reconnect with fellow graduates and stay involved with the Gbur community.',
      },
      {
        title: 'Give back',
        subtitle: 'Support students',
        description:
          'Invest in the next generation of students through mentorship, giving, or volunteering.',
      },
      {
        title: 'Share your story',
        subtitle: 'Get involved',
        description:
          'Share how Gbur impacted your life and inspire others to get involved.',
      },
    ],
  }

  return (
    <div className="bg-accent py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-brand">
          I am a...
        </h1>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 ${
                activeTab === tab
                  ? 'btn-secondary shadow-custom'
                  : 'btn-outline shadow-sm'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-card rounded-xl shadow-custom p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {content[activeTab].map((item, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold link-color mb-4">
                  {item.title}
                </h3>
                <div className="bg-main rounded-lg p-6 shadow-sm border border-custom">
                  <h4 className="text-lg font-semibold text-primary mb-3">
                    {item.subtitle}
                  </h4>
                  <p className="text-sm md:text-base leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Iam


import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingActionButton from '../components/FloatingActionButton'

const WhatWeBelievePage = () => {
  const beliefs = [
    {
      title: "The only true God",
      description: "the almighty Creator of all things, existing eternally in three persons Father; Son; and Holy Spirit; full of love and glory."
    },
    {
      title: "The unique divine inspiration",
      description: "entire trustworthiness, and authority of the Bible."
    },
    {
      title: "The value and dignity of all people",
      description: "created in God's image to live in love and holiness, but alienated from God and each other because of our sin and guilt, and justly subject to God's wrath."
    },
    {
      title: "Jesus Christ",
      description: "fully human and fully divine, who lived as a perfect example, who assumed the judgment due sinners by dying in our place, and who was bodily raised from the dead and ascended as Savior and Lord."
    },
    {
      title: "Justification",
      description: "by God's grace to all who repent and put their faith in Jesus Christ alone for salvation."
    },
    {
      title: "The indwelling presence and transforming power of the Holy Spirit",
      description: "who gives to all believers a new life and a new calling to obedient service."
    },
    {
      title: "The Unity of Believers",
      description: "manifested in worshiping and witnessing churches making disciples throughout the world."
    },
    {
      title: "The victorious reign and future personal return of Jesus Christ",
      description: "who will judge all people with justice and mercy, giving over the unrepentant to eternal condemnation but receiving the redeemed into eternal life. To God be glory forever."
    }
  ]

  const coreValues = [
    {
      title: "Biblical Authority",
      description: "We submit to the authority of Scripture as God's inspired Word, our guide for faith and practice.",
      icon: "📖"
    },
    {
      title: "Prayer",
      description: "We depend on prayer as the foundation for all we do, recognizing our need for God's guidance and power.",
      icon: "🙏"
    },
    {
      title: "Evangelism",
      description: "We are committed to sharing the good news of Jesus Christ with students and faculty on campus.",
      icon: "✝️"
    },
    {
      title: "Discipleship",
      description: "We help believers grow in their relationship with Christ and become more like Him.",
      icon: "🌱"
    },
    {
      title: "Community",
      description: "We build authentic relationships that reflect God's love and support one another in faith.",
      icon: "👥"
    },
    {
      title: "Multiethnicity",
      description: "We celebrate and embrace the diversity of God's people, working toward reconciliation and unity.",
      icon: "🌍"
    },
    {
      title: "Leadership Development",
      description: "We equip students and faculty to serve as leaders in ministry and in their future vocations.",
      icon: "👔"
    },
    {
      title: "Integrity",
      description: "We commit to living with integrity, honesty, and excellence in all we do.",
      icon: "⭐"
    }
  ]

  return (
    <>
      <Navbar />
      <main className="bg-accent min-h-screen">
        {/* Hero Section */}
        <section className="bg-main">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-2 py-12">
            <div className="text-center">
                 <h1 className="text-3xl md:text-4xl font-bold text-action">
                We believe in:
              </h1>
              <div className="w-12 h-0.5 bg-action mx-auto"></div>
             
            </div>
          </div>
        </section>

        {/* Beliefs Section */}
        <section className="md:py-12    bg-main">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative pl-10 md:pl-12">
              {/* Vertical connecting line */}
              <div className="absolute left-5 md:left-6 top-2 bottom-2 w-px bg-brand/20 hidden md:block"></div>
              
              <div className="space-y-6 md:space-y-8">
                {beliefs.map((belief, index) => (
                  <div 
                    key={index}
                    className="relative flex items-start gap-4"
                  >
                    {/* Numbered badge */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-10 h-10 rounded-full bg-main border-2 border-brand flex items-center justify-center">
                        <span className="text-brand font-bold text-sm">{index + 1}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-0.5">
                      <h2 className="text-lg md:text-xl font-bold text-action leading-tight mb-1.5">
                        {belief.title},
                      </h2>
                      <p className="text-sm md:text-base text-secondary leading-relaxed">
                        {belief.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Adoption Date */}
            <div className="mt-10 md:mt-12 pt-8 border-t border-custom">
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-10 md:py-12 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-8 md:mb-10">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl md:text-3xl font-bold text-action">
                  our beliefs lead us to these core values
                </h2>
                <div className="flex-1 h-px bg-custom max-w-md"></div>
              </div>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="bg-main rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-custom/30"
                >
                  {/* Icon */}
                  <div className="text-3xl mb-3">
                    {value.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-base font-bold text-brand mb-2 leading-tight">
                    {value.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Living Out Our Beliefs Section */}
        <section className="py-10 md:py-12 bg-main">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-accent/30 rounded-lg p-6 md:p-8 shadow-sm border border-custom/20">
              <h3 className="text-xl md:text-2xl font-bold text-brand mb-4 text-center">
                Living Out Our Beliefs
              </h3>
              
              <div className="space-y-4 text-secondary">
                <p className="text-sm md:text-base leading-relaxed text-center">
                  These beliefs are not just statements we affirm—they shape how we live, how we serve, and how we relate to one another. They guide our ministry on campus, our relationships with students and faculty, and our commitment to making disciples of all nations.
                </p>
                <p className="text-sm md:text-base leading-relaxed text-center">
                  We invite you to join us as we seek to live out these beliefs together, growing in faith, serving our communities, and sharing the hope we have in Jesus Christ.
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

export default WhatWeBelievePage

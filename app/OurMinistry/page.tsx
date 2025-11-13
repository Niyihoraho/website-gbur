"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FloatingActionButton from "../components/FloatingActionButton";

const OurMinistryPage = () => {
  // Statistics data
  const statistics = [
    {
      label: "GBUR Members",
      value: 2500,
      suffix: "+",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      image: "/Gbur/DSC_9972.jpg",
    },
    {
      label: "Universities",
      value: 22,
      suffix: "+",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      image: "/Gbur/DSC_9909.jpg",
    },
    {
      label: "Colleges",
      value: 8,
      suffix: "+",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      image: "/Gbur/DSC_9816.jpg",
    },
    {
      label: "Staff Members",
      value: 13,
      suffix: "+",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      image: "/Gbur/DSC_9781.jpg",
    },
  ];

  // Animated Counter Component
  const AnimatedCounter = ({
    value,
    suffix = "",
    duration = 2000,
  }: {
    value: number;
    suffix?: string;
    duration?: number;
  }) => {
    const [count, setCount] = useState(0);
    const hasAnimatedRef = useRef(false);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const animateCounter = () => {
        const startTime = Date.now();
        const startValue = 0;
        const endValue = value;

        const animate = () => {
          const currentTime = Date.now();
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function (ease-out)
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(
            startValue + (endValue - startValue) * easeOut
          );

          setCount(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(endValue);
          }
        };

        animate();
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimatedRef.current) {
              hasAnimatedRef.current = true;
              animateCounter();
            }
          });
        },
        { threshold: 0.5 }
      );

      const currentRef = counterRef.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [value, duration]);

    return (
      <div
        ref={counterRef}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-light text-center leading-tight"
      >
        <span className="drop-shadow-lg">{count.toLocaleString()}</span>
        {suffix && <span className="text-action drop-shadow-lg">{suffix}</span>}
      </div>
    );
  };

  const ministries = [
    {
      title: "Evangelism",
      description: "Draw students to Jesus as Savior and Lord",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
          />
          <circle cx="12" cy="17" r="1.5" fill="currentColor" />
        </svg>
      ),
      buttonText: "Explore Evangelism",
      link: "#",
    },
    {
      title: "Discipleship",
      description: "Teach students to respond to God's Word",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
          <circle
            cx="12"
            cy="12"
            r="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
      buttonText: "Grow in Discipleship",
      link: "#",
    },
    {
      title: "Leadership Development",
      description: "Equip students and faculty to serve as leaders in ministry and in their future vocations.",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="6" cy="6" r="2" fill="currentColor" />
          <circle cx="18" cy="6" r="2" fill="currentColor" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <circle cx="6" cy="18" r="2" fill="currentColor" />
          <circle cx="18" cy="18" r="2" fill="currentColor" />
          <circle
            cx="12"
            cy="6"
            r="1.5"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="12"
            cy="18"
            r="1.5"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      ),
      buttonText: "Learn About Diversity",
      link: "#",
    },
    {
      title: "Missions",
      description: "Encourage service to God's purposes in the world",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M2 12h20"
          />
        </svg>
      ),
      buttonText: "Get Involved",
      link: "#",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-accent">
        {/* Hero Section */}
   

        {/* Statistics Section with Images */}
        <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-custom/20"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={stat.image}
                      alt={stat.label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  {/* Enhanced Overlay - Darker and more prominent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/90 via-brand-primary/85 to-brand-secondary/90"></div>

                  {/* Additional subtle overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/20"></div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center text-center p-6 z-10">
                    {/* Icon - Smaller and more refined */}
                    <div className="mb-3 md:mb-4 text-action/90 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                      {stat.icon}
                    </div>

                    {/* Animated Number - Better balanced size */}
                    <div className="w-full flex justify-center items-center my-3 md:my-4">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>

                    {/* Label - Better spacing and styling */}
                    <p className="text-light text-xs md:text-sm lg:text-base font-semibold mt-3 md:mt-4 uppercase tracking-widest drop-shadow-md">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand mb-6">
                How We Do Ministry
              </h2>
              <p className="text-secondary text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
                We minister in a variety of ways, including establishing
                student-led GBUs on campuses nationwide, equipping disciples
                through small group Bible studies and prayer meetings,
                developing Christian leaders through training events, mobilizing
                students for cross-cultural missions, and partnering with
                churches and universities to see every student transformed by
                the gospel and empowered as an agent of godly change.
              </p>
            </div>

            {/* Ministry Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {ministries.map((ministry, index) => (
                <div
                  key={index}
                  className="bg-main rounded-xl p-8 shadow-custom hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-custom flex flex-col items-center text-center"
                >
                  {/* Icon */}
                  <div className="mb-6 text-action">{ministry.icon}</div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-brand mb-4">
                    {ministry.title}
                  </h3>

                  {/* Description */}
                  <p className="text-secondary text-sm md:text-base leading-relaxed mb-6 flex-grow">
                    {ministry.description}
                  </p>

                  {/* Button */}
                  <Link
                    href={ministry.link}
                    className="border border-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-sm inline-block w-full"
                  >
                    {ministry.buttonText}
                  </Link>
                </div>
              ))}
            </div>

            {/* Join Community Button */}
            <div className="flex justify-center">
              <Link
                href="#"
                className="btn-accent px-8 py-3 rounded-lg font-semibold text-base transition-all duration-300 shadow-custom inline-flex items-center gap-2 hover:scale-105"
              >
                Join a Community
              </Link>
            </div>
          </div>
        </section>

        {/* GBUR Vision Section */}
        <section className="py-8 md:py-12 bg-main">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-accent rounded-xl p-6 md:p-8 shadow-custom border border-custom">
              <h2 className="text-2xl md:text-3xl font-bold text-brand mb-6 text-center">
                GBUR Vision
              </h2>
              <p className="text-lg md:text-xl text-secondary text-center leading-relaxed mb-6">
                To connect and nurture national movements so that students and
                graduates thrive as witnesses for Christ.
              </p>

              {/* IFES & GBUR's Vision */}
              <div className="mt-8 pt-8 border-t border-custom">
                <h3 className="text-xl md:text-2xl font-bold text-brand mb-4 text-center">
                  IFES & GBUR's Vision
                </h3>
                <p className="text-base md:text-lg text-secondary leading-relaxed mb-4">
                  Students thriving together as communities of disciples,
                  transformed by the gospel, and impacting the university, the
                  church, and society for the glory of Christ.
                </p>
                <blockquote className="border-l-4 border-action pl-4 italic text-brand text-base md:text-lg my-4">
                  "To see every{" "}
                  <span className="text-action font-semibold">student</span> and
                  every{" "}
                  <span className="text-action font-semibold">graduate</span> to
                  be an agent of{" "}
                  <span className="text-action font-semibold">
                    godly transformation
                  </span>{" "}
                  in the{" "}
                  <span className="text-action font-semibold">
                    Church and society
                  </span>
                  "
                </blockquote>
                <p className="text-sm text-muted text-right mt-4">
                  Romans 12:1-2
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GBUR Mission Section */}
        <section className="py-8 md:py-12 bg-accent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-main rounded-xl p-6 md:p-8 shadow-custom border border-custom">
              <h2 className="text-2xl md:text-3xl font-bold text-brand mb-6 text-center">
                GBUR's Mission
              </h2>
              <ul className="space-y-4 text-base md:text-lg text-secondary">
                <li className="flex items-start">
                  <span className="text-action mr-3 mt-1">◆</span>
                  <span>
                    To <span className="text-action font-bold">REACH</span>{" "}
                    every student in universities and colleges of Rwanda with
                    the Gospel
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-action mr-3 mt-1">◆</span>
                  <span>
                    To <span className="text-action font-bold">EQUIP</span> them
                    to be mature/real disciples of Jesus Christ
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-action mr-3 mt-1">◆</span>
                  <span>
                    To <span className="text-action font-bold">MOBILIZE</span>{" "}
                    them to be agents of Godly transformation
                  </span>
                </li>
              </ul>

              {/* Scripture Reference */}
              <div className="mt-8 pt-8 border-t border-custom">
                <blockquote className="text-base md:text-lg text-secondary leading-relaxed italic mb-2">
                  "Him we{" "}
                  <span className="text-action font-semibold">proclaim</span>,{" "}
                  <span className="text-action font-semibold">warning</span>{" "}
                  everyone and{" "}
                  <span className="text-action font-semibold">teaching</span>{" "}
                  everyone with all wisdom, that we may{" "}
                  <span className="text-action font-semibold">present</span>{" "}
                  everyone mature in Christ."
                </blockquote>
                <blockquote className="text-base md:text-lg text-secondary leading-relaxed italic mb-4">
                  "To this end I labor, struggling with all his energy, which so
                  powerfully works in me"
                </blockquote>
                <p className="text-sm text-muted text-right">
                  Colossians 1:28-29
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Do Ministry Section */}

      </main>
      <FloatingActionButton />
      <Footer />
    </>
  );
};

export default OurMinistryPage;

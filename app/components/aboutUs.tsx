"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
  const slides = [
    "/slide-2/DSC_0026.jpg",
    "/slide-2/g-3.jpg",
    "/slide-2/iprc-2.jpg",
    "/slide-2/m-13.jpg",
    "/slide-2/m-14.jpg",
    "/slide-2/m-4.jpg",
    "/slide-2/m-7.jpg",
    "/slide-2/m-9.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="bg-main py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <h3 className="text-sm md:text-base font-semibold link-color uppercase tracking-wide">
              About Us
            </h3>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand leading-tight">
              Transforming Rwanda's universities through gospel-centered
              communities since 1984
            </h2>

            <p className="text-secondary text-base leading-relaxed">
              Since its founding by Israel Havugimana in 1984 at UNR, GBUR
              (Groupes Bibliques Universitaires du Rwanda) has established
              vibrant Christian student movements across Rwanda's campuses.
              Today, we operate in 30 GBUs across 29 university campuses,
              equipping students and graduates to be agents of godly
              transformation in the church and society — for the glory of
              Christ. As part of IFES (International Fellowship of Evangelical
              Students), a global movement operating in over 180 countries, we
              are committed to reaching every student with the gospel,
              discipling them to spiritual maturity, and mobilizing them to
              impact their universities, workplaces, and communities with the
              love of Jesus Christ.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/OurMinistry"
                className="btn-secondary px-6 py-2.5 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 shadow-custom inline-block text-center"
              >
                Our Organization
              </Link>
              <Link
                href="/leaders"
                className="btn-outline px-6 py-2.5 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 shadow-sm inline-block text-center"
              >
                Our Leadership
              </Link>
            </div>
          </div>

          {/* Right Column - Slideshow */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-custom">
            {/* Slides */}
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={slide}
                    alt={`Campus Ministry Activity ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* Overlay for better text readability if needed */}
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-main/80 hover:bg-main text-primary p-3 rounded-full shadow-custom transition-all duration-300 hover:scale-110"
              aria-label="Previous slide"
            >
              <svg
                className="w-6 h-6"
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
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-main/80 hover:bg-main text-primary p-3 rounded-full shadow-custom transition-all duration-300 hover:scale-110"
              aria-label="Next slide"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? "bg-main w-8 h-2"
                      : "bg-main/50 w-2 h-2 hover:bg-main/75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

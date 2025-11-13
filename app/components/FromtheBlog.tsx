"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogAPI, BlogPost } from "../lib/api";

const FromtheBlog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        // Fetch only published posts, limit to 6 for the homepage
        const posts = await blogAPI.getAll({ status: 'published', limit: 6 });
        setBlogPosts(posts || []);
      } catch (error: any) {
        console.error('Error fetching blog posts:', error);
        // Set empty array on error to prevent UI crashes
        setBlogPosts([]);
        // Log detailed error for debugging
        if (error.response) {
          console.error('API Error Response:', error.response.data);
          console.error('API Error Status:', error.response.status);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Calculate how many slides to show based on screen size
  const slidesPerView = 3;
  const totalSlides = Math.ceil(blogPosts.length / slidesPerView);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="bg-main py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
          <div className="flex-1">
            <h3 className="text-sm md:text-base font-semibold link-color uppercase tracking-wide">From the Blog</h3>
          </div>
          <Link 
            href="/blog" 
            className="text-action hover:text-link-hover text-sm font-semibold transition-colors"
          >
            View All Posts →
          </Link>
        </div>
        {/* Blog Cards Slideshow */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-action"></div>
            <p className="mt-4 text-secondary">Loading blog posts...</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary">No blog posts available.</p>
          </div>
        ) : (
        <div className="relative">
          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6"
                >
                  {blogPosts
                    .slice(
                      slideIndex * slidesPerView,
                      slideIndex * slidesPerView + slidesPerView
                    )
                    .map((post, index) => {
                      // Get first paragraph of excerpt or content as description
                      const description = post.excerpt && post.excerpt.length > 0 
                        ? post.excerpt[0] 
                        : post.content && post.content.length > 0 
                        ? post.content[0] 
                        : '';

                      return (
                        <div
                          key={post.id || index}
                          className="bg-card rounded-xl overflow-hidden shadow-custom hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-custom"
                        >
                          {/* Image */}
                          <div className="relative w-full h-48 md:h-56 overflow-hidden">
                            <Image
                              src={post.image || '/Gbur/DSC_9972.jpg'}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            {/* Title */}
                            <h3 className="text-base md:text-lg font-bold link-color mb-3 leading-tight hover:text-link-hover transition-colors">
                              <Link href={`/singlePage/${post.slug}`}>{post.title}</Link>
                            </h3>

                            {/* Description */}
                            <p className="text-secondary text-sm leading-relaxed mb-3 line-clamp-3">
                              {description}
                            </p>

                            {/* Read More Link */}
                            <Link
                              href={`/singlePage/${post.slug}`}
                              className="inline-flex items-center text-action font-bold text-sm md:text-base transition-all duration-300 hover:gap-3 gap-2 group"
                            >
                              Read more
                              <svg
                                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-main/80 hover:bg-main text-primary p-3 rounded-full shadow-custom transition-all duration-300 hover:scale-110 hidden lg:block"
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
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-main/80 hover:bg-main text-primary p-3 rounded-full shadow-custom transition-all duration-300 hover:scale-110 hidden lg:block"
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
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "bg-link w-8 h-2"
                    : "bg-border w-2 h-2 hover:bg-link/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default FromtheBlog;

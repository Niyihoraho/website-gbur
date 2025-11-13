"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PasswordModal from "./PasswordModal";

const Footer = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@gburwanda",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      url: "https://www.instagram.com/gburwanda/",
    },
    {
      name: "YouTube",
      handle: "Groupe Biblique Universitaire du Rwanda",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      url: "https://www.youtube.com/@gburwanda",
    },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/umugogo/large_imigogo.png')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 footer-overlay"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-light">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Left Section - Logo and CTA */}
          <div className="flex flex-col space-y-6">
            <div className="w-64">
              <Image
                src="/Gbur/logo2.jpg"
                alt="GBUR Logo"
                width={256}
                height={80}
                className="object-contain"
              />
            </div>
            <p className="text-base leading-relaxed">
              Give to reach every corner of every campus
              <br />
              Discover how students across campus are coming together to build
              meaningful relationships centered on Christ and His teachings.
            </p>
            <div>
              <Link
                href="/Donate"
                className="inline-block text-white border-2 border-white px-6 py-2.5 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 hover:bg-white hover:text-brand shadow-sm"
              >
                Donate
              </Link>
            </div>
          </div>

          {/* Middle Section - Links */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="#"
                className="flex items-center gap-2 text-light hover:text-light/80 transition-colors text-sm md:text-base group"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-light hover:text-light/80 transition-colors text-sm md:text-base group"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Terms of Use
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-light hover:text-light/80 transition-colors text-sm md:text-base group"
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Us
              </Link>
              <div className="flex items-start gap-2 text-light/90 text-sm md:text-base pt-2">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Member of the International Fellowship of Evangelical Students
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Social Media */}
          <div className="flex flex-col space-y-4">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-light hover:text-light/80 transition-colors group"
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {social.icon}
                </div>
                <span className="text-sm md:text-base">{social.handle}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-light/30 pt-8">
          <p className="text-light/80 text-sm text-center lg:text-center">
            © 2025{' '}
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="underline hover:text-light transition-colors cursor-pointer"
            >
              GBUR®
            </button>
            . All rights reserved.
          </p>
        </div>
      </div>

      {/* Password Modal */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;

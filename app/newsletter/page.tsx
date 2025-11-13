import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingActionButton from '../components/FloatingActionButton'

const NewsletterPage = () => {
  return (
    <>
      <Navbar />
      <main className="bg-accent min-h-screen">
        {/* Header Section */}
        <section className="bg-main py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-action text-center">
              GBUR Newsletter
            </h1>
            <p className="text-center text-secondary mt-2">
              Stay updated with our latest news and stories
            </p>
          </div>
        </section>

        {/* PDF Viewer Section */}
        <section className="py-6 md:py-8 bg-main">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-accent rounded-lg shadow-custom p-4 md:p-6">
              {/* PDF Viewer */}
              <div className="relative w-full" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
                <iframe
                  src="/GBUR-Newsletter.pdf"
                  className="w-full h-full rounded-lg border border-custom"
                  title="GBUR Newsletter PDF"
                />
              </div>

              {/* Download Button */}
              <div className="mt-6 text-center">
                <a
                  href="/GBUR-Newsletter.pdf"
                  download="GBUR-Newsletter.pdf"
                  className="inline-flex items-center btn-primary px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 shadow-custom hover:shadow-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Newsletter
                </a>
              </div>

              {/* Alternative View Note */}
              <div className="mt-4 text-center">
                <p className="text-sm text-secondary">
                  If the PDF doesn't display properly,{' '}
                  <a
                    href="/GBUR-Newsletter.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-action hover:text-link-hover underline"
                  >
                    click here to open in a new tab
                  </a>
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

export default NewsletterPage




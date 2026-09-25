import React from 'react'
import type { Metadata } from 'next'
import Navbar from '@/app/components/navbar'
import Footer from '@/app/components/footer'
import { getStaffCardById, getVerificationUrl } from '@/app/lib/staffCards'
import VerificationCardClient from './VerificationCardClient'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const card = await getStaffCardById(id)
  const canonicalUrl = getVerificationUrl(id)

  if (!card) {
    return {
      title: 'Staff Card Not Found | GBUR Verification',
      description: 'The requested GBUR staff card could not be verified in our records.',
      alternates: {
        canonical: canonicalUrl,
      },
    }
  }

  const fullName = `${card.first_name} ${card.last_name}`
  return {
    title: `${fullName} - GBUR Staff Card Verification (${card.id})`,
    description: `Official GBUR Staff Card Verification for ${fullName}, ${card.position || 'Staff'} in ${card.department || 'GBUR'}. Valid until ${card.validity ? new Date(card.validity).toLocaleDateString('en-GB') : 'N/A'}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${fullName} - GBUR Verified Staff Card`,
      description: `Official ministry identification verified by Groupe Biblique Universitaire du Rwanda (GBUR).`,
      url: canonicalUrl,
      images: card.image_url ? [card.image_url] : ['/logo2.jpg'],
    },
  }
}

export default async function StaffVerificationPage({ params }: PageProps) {
  const { id } = await params
  const card = await getStaffCardById(id)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 py-10 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex items-center justify-center">
        {/* Background Decorative Pattern */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('/umugogo/large_imigogo.png')" }}
        />
        <div className="absolute inset-0 bg-radial from-sky-100/40 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-xl mx-auto">
          <VerificationCardClient initialCard={card} requestedId={id} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

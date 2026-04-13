import type { Metadata } from 'next'
import React from 'react'
import { Sora, Martian_Mono } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
})

const martianMono = Martian_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'Peptide United — Research-First Peptide Encyclopedia',
    template: '%s | Peptide United',
  },
  description:
    'Comprehensive, evidence-based profiles for 100+ peptides. Mechanisms, pharmacokinetics, studies, and trusted suppliers.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Peptide United',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${martianMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-black antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

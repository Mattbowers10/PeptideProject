import type { Metadata } from 'next'
import React from 'react'
import { DM_Sans, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'Peptide Wiki — Research-First Peptide Encyclopedia',
    template: '%s | Peptide Wiki',
  },
  description:
    'Comprehensive, evidence-based profiles for 100+ peptides. Mechanisms, pharmacokinetics, studies, and trusted suppliers.',
  openGraph: {
    type: 'website',
    siteName: 'Peptide Wiki',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-black antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

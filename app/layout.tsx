import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import 'katex/dist/katex.min.css'


const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'OpenCognitive — Free Matrix Reasoning Assessment',
  description:
    'A transparent, 100% free matrix reasoning assessment based on open-source psychometrics. No paywalls, no subscriptions.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'OpenCognitive — Free Matrix Reasoning Assessment',
    description:
      'A transparent, 100% free matrix reasoning assessment based on open-source psychometrics. No paywalls, no subscriptions.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OpenCognitive Assessment Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenCognitive — Free Matrix Reasoning Assessment',
    description:
      'A transparent, 100% free matrix reasoning assessment based on open-source psychometrics. No paywalls, no subscriptions.',
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0c1118',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

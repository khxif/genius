import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Genius',
  description: 'Taste the power of future-AI!',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}

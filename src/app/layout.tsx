import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Omniguard - AI Admin Dashboard',
  description: 'Autonomous AI-powered admin dashboard with knowledge base and analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
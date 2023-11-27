import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import UserContextProvider from '../contexts/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Story Spark AI',
  description: 'Takehome assignment for Full Stack position',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </body>
    </html>
  )
}

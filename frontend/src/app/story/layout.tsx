"use client"

import Nav from '../../components/Nav'
import StoryContextProvider from '../../contexts/StoryContext'

export default function DashboardLayout({ children }: {
    children: React.ReactNode
  }) {

    return (
        <StoryContextProvider>
            <Nav />
            {children}
        </StoryContextProvider>
    )
  }
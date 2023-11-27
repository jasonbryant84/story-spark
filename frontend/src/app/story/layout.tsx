"use client"

import { useContext, useEffect, useState } from 'react'

import Nav from '../../components/Nav'
import { UserContext } from '../../contexts/UserContext'
import StoryContextProvider from '../../contexts/StoryContext'

import { createSession } from '../../api/backend'

export default function DashboardLayout({ children }: {
    children: React.ReactNode
  }) {
    const { user, updateUser } = useContext(UserContext)

    const handleSession = async (user: any) => {
      if(!user?.sessionToken) {
        const { sessionToken } = await createSession()

        if (sessionToken) {
          updateUser({
            name: 'Some Name',
            username: 'some-name',
            sessionToken
          })
        }
      }
    }

    useEffect(() => {
      handleSession(user)
    }, [user])

    return (
      <StoryContextProvider>
          <Nav />
          {children}
      </StoryContextProvider>
    )
  }
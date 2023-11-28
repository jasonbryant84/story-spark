"use client"

import { useContext, useEffect, useRef } from 'react'

import Nav from '../../components/Nav'
import { UserContext } from '../../contexts/UserContext'
import StoryContextProvider from '../../contexts/StoryContext'

import { createSession, createWebsocket } from '../../api/backend'

export default function DashboardLayout({ children }: {
    children: React.ReactNode
  }) {
    const { user, updateUser } = useContext(UserContext)
    const hasRun = useRef(false);

    const handleSession = async (user: any) => {
      if(!user?.sessionToken) {
        const { sessionToken } = await createSession()

        if (sessionToken) {
          const tempUser = {
            name: 'Some Name',
            username: 'some-name',
            sessionToken
          }

          updateUser(tempUser)
          createWebsocket(tempUser)
        }
      }
    }

    useEffect(() => {
      if (hasRun.current) return
      
      handleSession(user)
      hasRun.current = true;
    }, [user])

    return (
      <StoryContextProvider>
          <Nav />
          {children}
      </StoryContextProvider>
    )
  }
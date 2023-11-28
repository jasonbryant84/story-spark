"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { StoryForm, Loading } from '../../../components'

const Create = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleRouting = (url: string) => {
    setTimeout(() => {
      router.push(url)
    }, 2000)
  }

  const handleCloseLoading = (isLoading: boolean) => {
    if(isLoading) setIsLoading(isLoading)
    else {
      setTimeout(() => {
        setIsLoading(isLoading)
      }, 1000) // Delay removing loading state for better UX on transition to new url
    }
  }

  return (
    <>
      {isLoading && 
        <Loading
          firstLine='Please wait, your story is being crafted and will be available in 2 minutes.'
          secondLine='Did you know that once your story is ready, you can share it with your friends and family to enjoy together?'
        />
      }

      <div className='flex flex-col align-center justify-center h-[500px] px-[5%] gradient-bkg'>
        <h1 className='text-5xl font-extralight	text-white mb-[60px]'>Create Story</h1>
        
        <StoryForm
          className='max-w-[450px]'
          handleCloseLoading={handleCloseLoading}
          handleRouting={handleRouting}
        />
      </div>
    </>
  );
};

export default Create;

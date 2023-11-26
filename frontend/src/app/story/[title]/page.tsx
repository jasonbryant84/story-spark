"use client"

import { useContext, useEffect, useState } from 'react'

import StoryContextProvider from '../../../contexts/StoryContext'
import { Loading } from '../../../components'
import { StoryContext } from '../../../contexts/StoryContext'
import { getLocalStorageStories } from '../../../utils/localStorage'

const Story = ({ params }: { params: { title: string } }) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const { stories, updateStories } = useContext(StoryContext)

  useEffect(() => {
    // Checking localStorage for old stories and adding them to context provider
    const localStorageStories = getLocalStorageStories()

    if (localStorageStories) {
      updateStories(...localStorageStories)
    }
  }, [])


  useEffect(() => {
    console.log('stories useEffect => [stories]', stories)

    // Set content for DOM
    const pathname = window.location.pathname.replace('/story/', '')
    const storyArray = stories.filter(currStory => currStory.titleHyphenated === pathname)

    if (storyArray.length) {
      const story = storyArray[0]
      setTitle(story?.title)
      setContent(story?.content)
    }
  }, [stories])

  return (
    <StoryContextProvider>
      <div className='flex flex-col align-center justify-center px-[15%] py-[5%] gradient-bkg'>
        <h1 className='text-5xl font-extralight	text-white'>{title}</h1>
      </div>

      {content && 
        <div className='px-[15%] pt-[10%] pb-[15%] whitespace-pre-wrap	'>
          {content}
        </div>
      }
    </StoryContextProvider>
  );
};

export default Story;

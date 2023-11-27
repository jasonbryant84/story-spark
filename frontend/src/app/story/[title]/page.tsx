"use client"

import { useContext, useEffect, useState } from 'react'

import { StoryContext } from '../../../contexts/StoryContext'
import { getLocalStorageStories } from '../../../utils/localStorage'

import Book from '../../../components/Book'

const Story = ({ params }: { params: { title: string } }) => {
  const [story, setStory] = useState<any>(null)
  const [contentParagraphs, setContentParagraphs] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])

  const { stories, updateStories } = useContext(StoryContext)

  useEffect(() => {
    // Checking localStorage for old stories and adding them to context provider
    const localStorageStories = getLocalStorageStories()

    if (localStorageStories) {
      updateStories(...localStorageStories)
    }
  }, [])

  useEffect(() => {
    // Set content for DOM
    const pathname = window.location.pathname.replace('/story/', '')
    const storyArray = stories.filter(currStory => currStory.titleHyphenated === pathname)

    if (storyArray.length) {
      const story = storyArray[0]
      setStory(story)
      setContentParagraphs(story?.contentArray)
      setImages(story.images)
    }
  }, [stories])

  return (
    <>
      <div className='flex flex-col align-center justify-center px-[15%] py-[5%] gradient-bkg'>
        <h1 className='text-5xl font-extralight	text-white'>{story?.title}</h1>
      </div>
      <div className='flex flex-col items-center px-[10px] md:px-[5%] lg:px-[15%]'>
        <Book story={story} />
      </div>
    </>
  );
};

export default Story;

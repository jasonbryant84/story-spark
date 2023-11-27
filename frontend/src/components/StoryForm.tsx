import React, { useContext, useState, useEffect } from 'react'

import { UserContext } from '../contexts/UserContext'
import { createStory } from '../api/opeanai'
import { StoryContext } from '../contexts/StoryContext'
import Button from './Button'

const minChars = 20

interface StoryFormType {
  className: string;
  handleCloseLoading: Function;
  handleRouting: Function;
}

const StoryForm = (formInfo: StoryFormType) => {
  const { className, handleCloseLoading, handleRouting } = formInfo
  const {
    updatePrompt,
    updateStories,
    updateCurrentStory,
    stories
  } = useContext(StoryContext)

  const [tempPrompt, setTempPrompt] = useState<string>('')
  const [error, setError] = useState<string>('')

  const { user } = useContext(UserContext)

  useEffect(() => {
    if(stories?.length) {
      handleCloseLoading(false)
      const lastStory = stories[0]
      localStorage.setItem('stories', JSON.stringify({stories}))

      // TODO: Fix this for nav back from created story
      handleRouting(`/story/${lastStory?.titleHyphenated}`)
    }
  }, [stories])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    updatePrompt(tempPrompt)

    if(tempPrompt.length > minChars) {
      setError('')

      handleCloseLoading(true)

      const storyObj = await createStory({ prompt: tempPrompt, user })

      updateCurrentStory(storyObj)
      
      updateStories({
        prompt: tempPrompt,
        ...storyObj // { title, titleHyphenated, content } 
      })
    } else {
      setError(`Please provide a prompt longer than ${minChars} characters`)
    }
  }

  const handleOnChange = (e: any) => {
    const value = e.target?.value
    setTempPrompt(value)

    if (value.length > minChars) setError('')
  }


  return (
    <form className={`${className}`}>
      <div className='relative w-full h-[135px] p-[20px] mb-[20px] rounded-[16px] bg-white'>
        <label>Subject of the Story:</label>
        <textarea
          className='w-full h-[calc(100%-20px)] select-none	outline-none resize-none'
          value={tempPrompt}
          onChange={(e) => handleOnChange(e)}
          placeholder="Ex: A young girl named Sara loves exploring the world, and she faces challenge along the way."
        />
        {error && <span className='absolute right-[20px] bottom-2 text-xs error'>{error}</span>}
      </div>
      <Button
        className='cta-button text-[13px] px-[20px] py-[15px] pr-[40px]'
        label='Create Story'
        onClick={handleSubmit}
      />
    </form>
  );
};

export default StoryForm;

import React, { useContext, useState } from 'react'

import { createStory } from '../api/opeanai'
import { StoryContext } from '../contexts/StoryContext'
import Button from './Button'

const minChars = 20

interface StoryFormType {
  className: string;
}

const StoryForm = (formInfo: StoryFormType) => {
  const { className } = formInfo
  const { updatePrompt } = useContext(StoryContext)

  const [tempPrompt, setTempPrompt] = useState<string>('')
  const [error, setError] = useState<string>('')


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    updatePrompt(tempPrompt)

    if(tempPrompt.length > minChars) {
      setError('')
      const story = await createStory({prompt: tempPrompt, sessionToken: 'undefined'})
      console.log('story', story)
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

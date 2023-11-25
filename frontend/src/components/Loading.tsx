import React from 'react'

interface LoadingType {
    text: string;
}

export default function Loading(loadingInfo: LoadingType) {
    const { text } = loadingInfo

    return (
        <div className='flex justify-center align-center w-[100vw] h-[100vh]'>
            <img className='w-200' src="/StorySparkLogo.webp" />
            <span>{text}</span>
            <span>Please wait, your story is being crafted and will be available in 2 minutes.</span>
            <span>Did you know that once your story is ready, you can share it with your friends and family to enjoy together?</span>
        </div>
    )
}

import React from 'react'

interface LoadingType {
    text: string;
}

export default function Loading(loadingInfo: LoadingType) {
    const { text } = loadingInfo

    return (
        <div className='absolute flex flex-col justify-center items-center w-[100vw] h-[100vh] bg-white z-50 top-0'>
            <img
                className='mb-[20px] max-w-[300px]'
                src="/StorySparkLogo.webp"
            />
            
            <div className='flex flex-col justify-center max-w-[400px] whitespace-pre-wrap text-center'>{text}</div>
            {/* <span>Please wait, your story is being crafted and will be available in 2 minutes.</span>
            <span>Did you know that once your story is ready, you can share it with your friends and family to enjoy together?</span> */}
        </div>
    )
}

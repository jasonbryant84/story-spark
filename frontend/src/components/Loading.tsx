import React from 'react'

interface LoadingType {
    firstLine: string;
    secondLine?: string;
}

export default function Loading(loadingInfo: LoadingType) {
    const { firstLine, secondLine } = loadingInfo

    return (
        <div className='absolute flex flex-col justify-center items-center w-[100vw] h-[100vh] bg-white z-50 top-0'>
            <img
                className='mb-[20px] max-w-[200px] rotate-auto'
                src="/StorySparkLogo.webp"
            />
            
            <div className='flex flex-col justify-center max-w-[450px] text-center text-[#524872]'>{firstLine}</div>
            {secondLine && 
                <div className='flex flex-col justify-center max-w-[450px] text-center mt-[20px] text-[#524872]'>{secondLine}</div>
            }
        </div>
    )
}

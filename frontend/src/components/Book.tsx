import React, { useContext, useState } from 'react';

import { UserContext } from '../contexts/UserContext'

interface PageProps {
  story: any;
}

const Book = (info: PageProps) => {
    const { story } = info
    const [currentPage, setCurrentPage] = useState(0)
    const { user } = useContext(UserContext)
    
    const onNextPage = () => {
        setCurrentPage(current => {
          return current + 1 >= story.contentArray.length ? current : current + 1
        })
    }
    
    const onPreviousPage = () => {
        setCurrentPage(current => {
          return current - 1 < 0 ? 0 : current - 1
        })
    }

    let host = process.env.NEXT_PUBLIC_BACKEND_HOST
    const port = process.env.NEXT_PUBLIC_BACKEND_PORT

    if (port) host += `:${port}`

    const path = `images/${user?.username}/${story?.titleHyphenated}`

    return (
        <div className='pt-[10%] pb-[15%] max-h-[512px] max-w-[1024px] whitespace-pre-wrap'>
          {story && user?.username && (
            <>
              <div className='flex flex-row'>
                <div className='page-transition w-[50%] p-[30px]' onClick={onPreviousPage}>
                  {story.contentArray[currentPage]}
                </div>
                <img
                  src={`${host}/${path}/image-${currentPage}.png`}
                  className='page-transition w-[50%]'
                  onClick={onNextPage}
                />
              </div>
              <div className='flex flex-row justify-between mt-[10px]'>
                <button onClick={() => setCurrentPage(current => current - 1)} disabled={currentPage === 0}>
                    Previous Page
                </button>
                <button onClick={() => setCurrentPage(current => current + 1)} disabled={currentPage === story.contentArray.length - 1}>
                    Next Page
                </button>
              </div>
            </>
          )}
        </div>
    )
}

export default Book
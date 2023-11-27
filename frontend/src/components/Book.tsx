import React, { useState } from 'react';

interface PageProps {
  contentParagraphs: string[];
  images: string[];
}


const Book = (info: PageProps) => {
    const { contentParagraphs, images } = info
    const [currentPage, setCurrentPage] = useState(0)
    
    const onNextPage = () => {
        setCurrentPage(current => current + 1)
    }
    
    const onPreviousPage = () => {
        setCurrentPage(current => current - 1)
    }

    return (
        <div className='pt-[10%] pb-[15%] max-h-[512px] max-w-[1024px] whitespace-pre-wrap'>
          <div className='flex flex-row'>
            <div className='page-transition w-[50%] p-[30px]' onClick={onPreviousPage}>
              {contentParagraphs[currentPage]}
            </div>
            <img
              src={images[currentPage]} 
              className='page-transition w-[50%]'
              onClick={onNextPage}
            />
          </div>
          <div className='flex flex-row justify-between mt-[10px]'>
            <button onClick={() => setCurrentPage(current => current - 1)} disabled={currentPage === 0}>
                Previous Page
            </button>
            <button onClick={() => setCurrentPage(current => current + 1)} disabled={currentPage === contentParagraphs.length - 1}>
                Next Page
            </button>
          </div>
        </div>
    )
}

export default Book
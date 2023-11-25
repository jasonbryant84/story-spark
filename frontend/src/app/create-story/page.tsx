"use client"

import StoryContextProvider from '../../contexts/StoryContext'
import { Loading, StoryForm } from '../../components'

const Home: React.FC = () => {

  return (
    <StoryContextProvider>
      <div className='flex flex-col align-center justify-center h-[500px] px-[5%] gradient-bkg'>
        <h1 className='text-5xl font-extralight	text-white mb-[60px]'>Create Story</h1>
        <StoryForm className='max-w-[450px]' />
      </div>
    </StoryContextProvider>
  );
};

export default Home;

"use client";
import { createContext, useState } from "react";

export interface StoryType {
  prompt: string;
  title: string;
  titleHyphenated: string;
  content: string;
  contentArray: string[];
  images: string[];
}

export interface StoryContextType {
  prompt: string;
  updatePrompt: Function;
  currentStory: StoryType | null;
  updateCurrentStory: Function;
  stories: StoryType[];
  updateStories: Function;
}

export const StoryContext = createContext<StoryContextType>({
  prompt: '',
  updatePrompt: (prompt: string) => {},
  currentStory: null,
  updateCurrentStory: (story: StoryType) => {},
  stories: [],
  updateStories: (newStory: StoryType) => {}
});

/* Story Context Provider */
interface StoryContextProviderProps {
  children?: any;
}

const StoryContextProvider = ({
  children
}: StoryContextProviderProps) => {
  // User
  const [prompt, setPrompt] = useState<string>(''),
  updatePrompt = (prompt: string) => {
      setPrompt(prompt);
  };

  // Stories
  const [stories, setStories] = useState<StoryType[]>([]),
  updateStories = (newStory: StoryType) => {
    const isNewStory = stories.filter(currStory => currStory.title === newStory.title).length === 0

    if (isNewStory) {
      setStories([newStory, ...stories])
    }
  };

  // CurrentStory
  const [currentStory, setCurrentStory] = useState<any>(null),
  updateCurrentStory = (story: StoryType) => { // StoryType
    setCurrentStory(story)
  }
  

  return (
    <StoryContext.Provider
      value={{
        prompt,
        updatePrompt,
        currentStory,
        updateCurrentStory,
        stories,
        updateStories
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export default StoryContextProvider;


"use client";
import { createContext, useState } from "react";

export interface StoryContextType {
  prompt: string;
  updatePrompt: Function;
}

export const StoryContext = createContext<StoryContextType>({
  prompt: '',
  updatePrompt: (prompt: string) => {}
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

  return (
    <StoryContext.Provider
      value={{
        prompt,
        updatePrompt,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export default StoryContextProvider;


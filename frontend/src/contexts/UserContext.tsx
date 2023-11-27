"use client";
import { createContext, useState } from "react";

export interface UserType {
    name: string;
    username: string;
    sessionToken: string | null;
    stories: any[];
}

export interface UserContextType {
  user: UserType | null;
  updateUser: Function;
  stories: any[] // should be StoryType
  updateStories: Function;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  updateUser: (user: UserType) => {},
  stories: [],
  updateStories: (user: UserType) => {},
});

/* Story Context Provider */
interface StoryContextProviderProps {
  children?: any;
}

const UserContextProvider = ({
  children
}: StoryContextProviderProps) => {
  // User
  const [user, setUser] = useState<any>(null),
  updateUser = (user: UserType) => {
    setUser(user)
  }

  // Stories
  const [stories, setStories] = useState<any>(null),
  updateStories = (story: any) => { // StoryType
    setStories(story)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        stories,
        updateStories
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;


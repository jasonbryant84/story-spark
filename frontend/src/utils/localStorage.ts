const storiesKey = 'stories'

export const getLocalStorageStories = () => {
    const localStorageStoriesStr = localStorage.getItem(storiesKey) || '{}' as string
    return JSON.parse(localStorageStoriesStr)?.stories
}

export const setLocalStorageStories = (stories: any[]) => { // should be StoryType[]
    localStorage.setItem(storiesKey, JSON.stringify({stories}));
}
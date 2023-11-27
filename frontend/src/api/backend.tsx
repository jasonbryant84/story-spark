interface StoryType {
    text: string;
    images: string[];
}

export const saveStory = async (storyInfo: StoryType, sessionToken: string) => {
    return await fetch(`http://${process.env.BACK_END_HOST}:3000/saveStory`, {
        method: 'POST',
        headers: {
            Cookie: `SESSION_TOKEN=${sessionToken}`,
        },
    })
}

export const getStories = async (sessionToken: string) => {
    return await fetch(`http://${process.env.BACK_END_HOST}:3000/getStories`, {
        method: 'GET',
        headers: {
            Cookie: `SESSION_TOKEN=${sessionToken}`,
        },
    })
}
  
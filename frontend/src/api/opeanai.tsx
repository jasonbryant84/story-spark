interface StoryType {
    prompt: string;
    sessionToken?: string
}

export const createStory = async (storyInfo: StoryType) => {
    const { prompt, sessionToken } = storyInfo

    console.log(prompt, sessionToken)

    if (sessionToken) {
        return await fetch(`http://${process.env.BACK_END_HOST}:3000/saveStory`, {
            method: 'GET',
            headers: {
                Cookie: `SESSION_TOKEN=${sessionToken}`,
            },
        })
    }
    
    return {
        success: false,
        error: true,
        message: 'no session token'
    }
}
  
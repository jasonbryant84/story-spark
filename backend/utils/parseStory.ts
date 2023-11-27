export const parseStory = (initialStory: string) => {
    const splitStory = initialStory.split('\n')

    // Title: Some Title Format
    const title = splitStory[0].split(': ')[1] 

    // Some-Tite-Format (removing non-alphanumeric values, except hyphens)
    const titleHyphenated = title.replace(/ /g, '-').replace(/[^A-Za-z0-9\-]/g, '')
    
    // skipping the title and the first \n
    const content = splitStory.slice(2).join('\n')

    // skipping the title and the first \n
    const contentArray = splitStory.slice(2).filter(e => e.length > 0) // excluding ''

    // Use Each paragraph as an image prompt
    const imagePrompts = splitStory.slice(2).filter(e => e.length > 0) // excluding ''

    return { title, titleHyphenated, content, contentArray, imagePrompts }
}
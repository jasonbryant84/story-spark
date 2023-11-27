require('dotenv').config()
import express from 'express'
import fs from 'fs'

// OpenAI
import OpenAI from "openai"
const { OPENAI_API_KEY, FRONTEND_URL } = process.env
const openai: OpenAI = new OpenAI({ // OpenAI
    apiKey: OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
})

const path = require('path')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

// Utils
import { createSession, parseStory, downloadImage } from '../utils'

// Middleware
app.use(express.json())
app.use(cors({ origin: FRONTEND_URL }))
app.use(express.static('public'))

app.post('/api/create-session', cors(), async (req: express.Request, res: express.Response) => {
    const sessionToken = await createSession()
    res.json({ sessionToken })
})

interface CreateStoryRequestType {
    prompt: string;
    user: any;
}
app.post('/api/create-story', cors(), async (req: express.Request, res: express.Response) => {
    const { prompt, user }: CreateStoryRequestType = req.body;

    if (!user) return res.status(400).send({ message: 'User is required.' })
    if (!prompt) return res.status(400).send({ message: 'Prompt is required.' })

    // Generate story's text from user prompt
    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are telling a story to a young child."},
            {"role": "user", "content": `Can you give me a short story for a child about ${prompt} and begin by giving me a title as well. Also, please limit story to 4 paragraphs. Thanks!`}],
        model: "gpt-3.5-turbo",
    });
    
    // Parsing the story for consumption
    const storyAsString = completion?.choices[0]?.message?.content as string
    const { title, titleHyphenated, content, contentArray, imagePrompts } = parseStory(storyAsString)
    
    // Creating folder(s) to store images - should go in a db
    let folderPath = `./public/images/${user.username}`
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath)
    folderPath += `/${titleHyphenated}`
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath)

    // Generating images based off of each paragraph of the story
    const images = await Promise.all(imagePrompts.map(async (imagePrompt: string, index: number) => {
        const prompt = `I need a pic to illustrate this scene for a children's book with no text in the images: ${imagePrompt}. The title of the story is: ${title}`

        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt,
            n: 1,
            size: '1024x1024', // 1024 is minimum for Dall-E 3
        })
        const url = response.data[0].url || ''
        downloadImage(url, `${folderPath}/image-${index}.png`)
        return url
    }))

    // Return all needed information
    res.json({ title, titleHyphenated, content, contentArray, images })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})

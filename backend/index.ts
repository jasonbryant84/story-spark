require('dotenv').config()
import express from 'express'
import fs from 'fs'
import WebSocket from 'ws'

// OpenAI
import OpenAI from "openai"
const { OPENAI_API_KEY, FRONTEND_URL, FRONTEND_PORT } = process.env
const openai: OpenAI = new OpenAI({ // OpenAI
    apiKey: OPENAI_API_KEY,
})

const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001
const wsConnections = new Map()

// Utils
import { createSession, parseStory, downloadImage } from './utils'

// Middleware
app.use(express.json())

const allowedOrigins = [`${FRONTEND_URL}:${FRONTEND_PORT}`, 'https://story-spark-frontend.vercel.app']
app.use(cors({
    origin: (origin: string, callback: Function) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}))

app.use(express.static('public'))

app.get('/healthcheck', async (req: express.Request, res: express.Response) => {
    res.json({ success: true })
})

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

    // Ensure we have a valid WebSocket
    const ws = wsConnections.get(user?.username) // should/could be token
    if (!ws) {
        return res.status(400).send({ message: `WebSocket connection not found: ${user?.sessionToken}` });
    } else {
        ws.send(JSON.stringify({
            success: true,
            status: 'WebSocket acknowledged. Generating text...'
        }))
    }

    if (!user) return res.status(400).send({ message: 'User is required.' })
    if (!prompt) return res.status(400).send({ message: 'Prompt is required.' })

    // Generate story's text from user prompt
    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are telling a story to a young child."},
            {"role": "user", "content": `Please write a concise, four-paragraph story for a child about ${prompt} and begin by giving me a title as well. Thanks!`}],
        model: "gpt-3.5-turbo",
    }),
    storyAsString = completion?.choices[0]?.message?.content as string
    ws.send(JSON.stringify({
        success: true,
        status: 'Story text generated by OpenAI...',
        storyAsString: storyAsString
    }))

    // Parsing the story for consumption
    const parsedInfo = parseStory(storyAsString)
    const { title, titleHyphenated, content, contentArray, imagePrompts } = parsedInfo
    ws.send(JSON.stringify({
        success: true,
        status: 'Story parsed on server...',
        ...parsedInfo
    }))

    // Creating folder(s) to store images - should go in a db
    let folderPath = `./public`
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath)
    folderPath += `/images`
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath)
    folderPath += `/${user.username}`
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath)
    folderPath += `/${titleHyphenated}`
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath)
    ws.send(JSON.stringify({
        success: true,
        status: 'Directories created as needed for image storage...',
        folderPath
    }))

    // Generating images based off of each paragraph of the story
    const images = await Promise.all(imagePrompts.map(async (imagePrompt: string, index: number) => {
        const prompt = `I need a pic to illustrate this paragraph for a children's book with no text in the images: ${imagePrompt}. The title of the story is: ${title}. The full story is: ${storyAsString}`

        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt,
            n: 1,
            size: '1024x1024', // 1024 is minimum for Dall-E 3
        })
        const url = response.data[0].url || ''
        downloadImage(url, `${folderPath}/image-${index}.png`)

        ws.send(JSON.stringify({
            success: true,
            status: `Generated image ${index + 1} of ${imagePrompts.length}...`
        }))
        return url
    }))

    // Return all needed information
    res.json({ title, titleHyphenated, content, contentArray, images })
})

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})

const wss = new WebSocket.Server({ server })

wss.on('connection', (ws: any, req: express.Request) => {
    const urlParams = new URLSearchParams(req.url)
    const token =  urlParams.get('/?token') // passing token in URL
    const username =  urlParams.get('username')

    if (token && username && !wsConnections.has(username)) {
        const key = username //`${username}:${token}` // maybe use later
        wsConnections.set(key, ws)
        console.log('wsConnections', wsConnections.size)
    }

    ws.on('close', () => {
        wsConnections.delete(token)
    });
});
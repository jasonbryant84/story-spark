require('dotenv').config()
import express from 'express'

// OpenAI
import OpenAI from "openai"
const { OPENAI_API_URL = '', OPENAI_API_KEY } = process.env
const openai: OpenAI = new OpenAI({ // OpenAI
    apiKey: OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
})

// Utils
import { parseStory } from '../utils/parseStory'

const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:3000' })) // CORS Middleware

interface CreateStoryRequestType {
    prompt: string;
    sessionToken: string;
}
app.post('/api/create-story', cors(), async (req: express.Request, res: express.Response) => {
    const { prompt, sessionToken }: CreateStoryRequestType = req.body;

    if (!prompt) {
      return res.status(400).send({ message: 'Prompt is required.' });
    }

    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "You are telling a story to a young child."},
            {"role": "user", "content": `Can you give me a short story for a child about ${prompt} and begin by giving me a title as well. Thanks!`}],
        model: "gpt-3.5-turbo",
    });
    
    const storyAsString = completion?.choices[0]?.message?.content as string
    const { title, titleHyphenated, content } = parseStory(storyAsString)

    // Do some error checking for returning
    console.log(content)
    console.log('--------------------------')
    console.log(completion)

    res.json({ title, titleHyphenated, content })
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



// const openai = new OpenAIApi(configuration)
// app.post('/api/create-story', cors(), async (req, res) => {
//     const { prompt, sessionToken } = req.body;

//     // Check if prompt and sessionToken are defined and are strings
//     if (typeof prompt !== 'string' || typeof sessionToken !== 'string') {
//         return res.status(400).send("Invalid input");
//     }

//     console.log('prompt, sessionToken', prompt, sessionToken)
//     console.log('OPEN_AI_API_URL', OPEN_AI_API_URL)
//     console.log('OPEN_AI_API_KEY', OPEN_AI_API_KEY)

//     try {
//         const response = await axios.post(OPEN_AI_API_URL, {
//             prompt: prompt,
//             sessionToken: sessionToken,
//             max_tokens: 150 // Adjust as needed
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log('response.data.choices', response.data.choices)
//         res.json({ story: response.data.choices[0].text });
//     } catch (error) {
//         console.log('error', error)
//         res.status(500).send("Error generating story");
//     }
// });

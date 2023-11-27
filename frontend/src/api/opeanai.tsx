interface StoryType {
    prompt: string;
    user: any; // UserType
}

function wait(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export const createStory = async (storyInfo: StoryType) => {
    const { prompt, user } = storyInfo

    let host = process.env.NEXT_PUBLIC_BACKEND_HOST
    const port = process.env.NEXT_PUBLIC_BACKEND_PORT

    if (port) host += `:${port}`

    
    if (user?.sessionToken) {
        return await fetch(`${host}/api/create-story`, {
            method: 'POST', // Change from GET to POST
            headers: {
                'Content-Type': 'application/json',
                Cookie: `SESSION_TOKEN=${user?.sessionToken}`,
            },
            body: JSON.stringify({ prompt, user }),
            }).then(async (resp) => {
                return await resp.json();
            })// error condition needs handling
    }
    
    return {
        success: false,
        error: true,
        message: 'no session token'
    }
}

const storyExample ={
    "prompt": "A cup befriends a saucer",
    "title": "\"The Cup and the Saucer's Special Friendship\"",
    "titleHyphenated": "The-Cup-and-the-Saucers-Special-Friendship",
    "content": "Once upon a time in a cozy kitchen, there was a little cup and a small saucer who lived side by side. The cup was made of delicate porcelain, while the saucer was a shiny, silver-plated beauty. Every morning, they would sit together on the wooden shelf, waiting eagerly for someone to fill the cup with warm, comforting tea.\n\nThe cup and the saucer became friends right away. They would chat and giggle, especially when the teapot poured the tea too quickly, causing the cup to splash and make a tiny mess. They learned to balance the cup on the saucer expertly so that the tea would stay inside, not spilling a single drop.\n\nHowever, one day disaster struck when the teapot slipped from a clumsy hand, tumbling over and smashing the cup into pieces. The saucer was heartbroken and felt terribly lonely without its friend. But then, something wonderful happened. The kind kitchen fairies gathered the broken pieces and glued them back together, carefully making the cup whole again.\n\nWhen the cup and saucer were reunited, they were overjoyed. Their love and friendship had made them stronger, and they realized that their bond was unbreakable. From that day forward, they promised to support each other, not just with tea but in good times and bad.\n\nAnd so, the cup and the saucer continued their journey together, sharing many more cups of tea and creating lasting memories. Their special friendship taught them the value of love, forgiveness, and sticking together through thick and thin. The cup and saucer knew that no matter what challenges came their way, they would always have each other. And that made their friendship truly magical. The end.",
    "contentArray": [
        "Once upon a time in a cozy kitchen, there was a little cup and a small saucer who lived side by side. The cup was made of delicate porcelain, while the saucer was a shiny, silver-plated beauty. Every morning, they would sit together on the wooden shelf, waiting eagerly for someone to fill the cup with warm, comforting tea.",
        "The cup and the saucer became friends right away. They would chat and giggle, especially when the teapot poured the tea too quickly, causing the cup to splash and make a tiny mess. They learned to balance the cup on the saucer expertly so that the tea would stay inside, not spilling a single drop.",
        "However, one day disaster struck when the teapot slipped from a clumsy hand, tumbling over and smashing the cup into pieces. The saucer was heartbroken and felt terribly lonely without its friend. But then, something wonderful happened. The kind kitchen fairies gathered the broken pieces and glued them back together, carefully making the cup whole again.",
        "When the cup and saucer were reunited, they were overjoyed. Their love and friendship had made them stronger, and they realized that their bond was unbreakable. From that day forward, they promised to support each other, not just with tea but in good times and bad.",
        "And so, the cup and the saucer continued their journey together, sharing many more cups of tea and creating lasting memories. Their special friendship taught them the value of love, forgiveness, and sticking together through thick and thin. The cup and saucer knew that no matter what challenges came their way, they would always have each other. And that made their friendship truly magical. The end."
    ],
    "images": [
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-naY1M0VSeGI9DxFd719sCJpY/user-HOJJM6ShGzKUiCpuL4VvOxJX/img-Z6CGYQtfP4fU7NdnnHNpcN1i.png?st=2023-11-27T12%3A18%3A44Z&se=2023-11-27T14%3A18%3A44Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-27T06%3A18%3A23Z&ske=2023-11-28T06%3A18%3A23Z&sks=b&skv=2021-08-06&sig=fiifHUyTmy8T1Fza9cM18h/w925UrKb2REryW%2BtyD%2BU%3D",
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-naY1M0VSeGI9DxFd719sCJpY/user-HOJJM6ShGzKUiCpuL4VvOxJX/img-ya7jlIh3FVq63fF5wRNtbtlX.png?st=2023-11-27T12%3A18%3A47Z&se=2023-11-27T14%3A18%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-27T00%3A21%3A06Z&ske=2023-11-28T00%3A21%3A06Z&sks=b&skv=2021-08-06&sig=Xn1yJgIRS3ohDUmemEBOmkJkKsuAsCkgR/CJrxY64cY%3D",
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-naY1M0VSeGI9DxFd719sCJpY/user-HOJJM6ShGzKUiCpuL4VvOxJX/img-qR9haL5HKlVITL9LF5YjUgaG.png?st=2023-11-27T12%3A18%3A48Z&se=2023-11-27T14%3A18%3A48Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-26T20%3A37%3A55Z&ske=2023-11-27T20%3A37%3A55Z&sks=b&skv=2021-08-06&sig=3A78dGRUCZPm3QwFhVw7CsHwLAWWwahuwkD9jETrwMM%3D",
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-naY1M0VSeGI9DxFd719sCJpY/user-HOJJM6ShGzKUiCpuL4VvOxJX/img-McIBuIPy7jDvh8hWEL6OTUNF.png?st=2023-11-27T12%3A18%3A44Z&se=2023-11-27T14%3A18%3A44Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-27T12%3A15%3A03Z&ske=2023-11-28T12%3A15%3A03Z&sks=b&skv=2021-08-06&sig=153bLR6PSHnTTTBH9G4HLfzEwlhWrZg0cWTvfYFH4GQ%3D",
        "https://oaidalleapiprodscus.blob.core.windows.net/private/org-naY1M0VSeGI9DxFd719sCJpY/user-HOJJM6ShGzKUiCpuL4VvOxJX/img-iKWIk8IsQh6vLf9EEOyoOxrH.png?st=2023-11-27T12%3A18%3A45Z&se=2023-11-27T14%3A18%3A45Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-27T01%3A25%3A15Z&ske=2023-11-28T01%3A25%3A15Z&sks=b&skv=2021-08-06&sig=048ImtI898xA62cICRGDbdDPUqH82VHRjXf/XXf2Ock%3D"
    ]
}

const storyExample2 = {
    prompt: "A family of deer go on an interstellar trip through their own minds.",
    story: "Title: \"The Daring Deer's Dreamy Adventure\"\n\nOnce upon a time, in a lush forest filled with tall green trees, there lived a family of deer – Papa Deer, Mama Deer, and their two curious fawns, Daisy and Max. They were a happy bunch who loved exploring the wonders of the world around them.\n\nOne bright sunny day, while grazing on a meadow, Papa Deer spotted a shooting star streaking across the sky. \"Oh, my dear family,\" he exclaimed, \"that shooting star holds a magical secret! It can take us on an interstellar journey.\" The deer family's eyes sparkled with excitement.\n\nThat night, as they nestled under the twinkling stars, they closed their eyes and began to imagine the most incredible adventure. Suddenly, their minds became a spaceship, blasting off into the vastness of the universe.\n\nFirst, they soared high above the moon, marveling at its magnificent craters. Mama Deer pointed out the constellations, teaching Daisy and Max about the stories behind them. Papa Deer shared fascinating facts about distant planets, making their journey feel even more extraordinary.\n\nAs their minds traveled through space, they flew past glowing meteor showers and visited distant galaxies, where colorful nebulas painted the skies. Each place they visited had its own charm and magic.\n\nOne day, they landed on a dreamy planet made entirely of cotton candy clouds. The air was sweet and sugary, and the deer happily nibbled on fluffy clouds until their tummy's were full. They giggled as they bounced high in the sky, feeling weightless and free.\n\nAnother day, they discovered a planet where everything was made of shining crystals. The deer admired the glimmering landscapes, and Mama Deer crafted sparkling jewelry for her fawns using the crystals they found. Daisy and Max proudly wore their new crystal necklaces, feeling like the most extraordinary deer in the universe.\n\nAfter what felt like a million adventures, it was time for the deer family to return home. They closed their eyes, and their minds transformed their spaceship back into the familiar forest they loved. Opening their eyes, they found themselves snuggled together, back on the cozy meadow under the moonlit sky.\n\nThe family of deer looked at each other, realizing their interstellar journey had only been a dream. But it was a dream they would cherish forever, always remembering the incredible places they had visited together.\n\nAnd from that day forward, whenever they looked up at the stars, they would be reminded of their boundless imagination and the extraordinary adventures they could create in their minds. For, you see, the greatest adventures are often found in the dreams we dare to dream.\n\nWith a smile on their faces, the deer family fell asleep, ready to dream a new dream in the enchanting world of their imagination. And who knows what fantastic journeys they would embark on next!\n\nThe End"
}
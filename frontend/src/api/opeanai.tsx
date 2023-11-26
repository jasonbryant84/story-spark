interface StoryType {
    prompt: string;
    sessionToken?: string
}

function wait(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export const createStory = async (storyInfo: StoryType) => {
    const { prompt, sessionToken } = storyInfo

    const { BACKEND_HOST, BACKEND_PORT } = process.env
    const uri = `${BACKEND_HOST}:${BACKEND_PORT}/api`
    console.log(`${BACKEND_HOST}:${BACKEND_PORT}/api`, process.env.REACT_APP_BACKEND_PORT)

    // await wait(3)
    // return storyExample
    
    if (sessionToken) {
        return await fetch(`//127.0.0.1:3001/api/create-story`, {
            method: 'POST', // Change from GET to POST
            headers: {
                'Content-Type': 'application/json',
                Cookie: `SESSION_TOKEN=${sessionToken}`,
            },
            body: JSON.stringify({ prompt, sessionToken }),
            }).then(async (resp) => {
                return await resp.json();
            });// error condition needs handling
    }
    
    return {
        success: false,
        error: true,
        message: 'no session token'
    }
}

const storyExample ={
    prompt: "Lionel Messi makes a Mess",
    title: "Lionel Messi's Amazing Adventure",
    titleHyphenated: "Lionel-Messis-Amazing-Adventure",
    content: "Once upon a time, in a small town called Goalville, there lived a young boy named Lionel Messi. Lionel was known for his incredible soccer skills. He could kick the ball with such precision and speed that it seemed to dance across the field.\n\nOne sunny day, Lionel woke up feeling adventurous. He gathered his soccer ball, put on his favorite jersey, and headed out to the park. As he walked, he couldn't help but notice the colorful flowers swaying in the breeze and the birds singing their cheerful tunes.\n\nWhen Lionel reached the park, he saw a group of children playing with their own soccer ball. They invited Lionel to join them, and he gladly accepted. They laughed, cheered, and played for hours. Lionel's fancy footwork amazed everyone, and they called him \"The Magic Messi.\"\n\nBut as evening approached, Lionel decided to head home. He waved goodbye to his new friends and began walking back. Suddenly, he noticed a swirling cloud of pink dust floating nearby. Curiosity sparked within him, and he followed it, wondering where it would lead.\n\nThe cloud led Lionel to an enchanted forest filled with tall trees and sparkling brooks. The air was thick with magic, and Lionel felt both excited and nervous. As he walked deeper into the forest, he spotted a clearing with a table laid out for a picnic.\n\nLionel's stomach rumbled, and he couldn't resist the delicious aroma of the food on the table. He took a small bite of a sandwich and, to his surprise, everything started to shake! Plates toppled, glasses tipped over, and food flew through the air.\n\n\"Oh no! What have I done?\" Lionel exclaimed, panicking as he watched the mess he had created. He knew he had to fix it.\n\nThinking quickly, Lionel kicked his soccer ball towards the airborne food, skillfully catching it on his plate. He passed the mashed potatoes to the gravy, the carrots to the peas, and the sandwiches to the bread slices. With each kick, things started to fall back into place.\n\nAs Lionel continued to play, his skillful kicks turned the chaotic mess into a beautifully balanced picnic once again. The forest spirits marveled at Lionel's ingenuity and applauded his efforts.\n\nAfter the last dish was perfectly set, the sun began to set, and the forest transformed back to its normal, peaceful self. The cloud of pink dust reappeared, leading Lionel back to the park.\n\nWith a happy heart, Lionel returned home, realizing that sometimes even messes could lead to magic. He knew he had learned an important lesson about using his skills to fix problems and bring order to chaos.\n\nFrom that day forward, Lionel became not only a legendary soccer player but also a hero who used his talent to bring joy and order wherever he went. And every now and then, he would smile and remember the magical adventure he had in the forest, turning a mess into a triumph."
}

const storyExample2 = {
    prompt: "A family of deer go on an interstellar trip through their own minds.",
    story: "Title: \"The Daring Deer's Dreamy Adventure\"\n\nOnce upon a time, in a lush forest filled with tall green trees, there lived a family of deer – Papa Deer, Mama Deer, and their two curious fawns, Daisy and Max. They were a happy bunch who loved exploring the wonders of the world around them.\n\nOne bright sunny day, while grazing on a meadow, Papa Deer spotted a shooting star streaking across the sky. \"Oh, my dear family,\" he exclaimed, \"that shooting star holds a magical secret! It can take us on an interstellar journey.\" The deer family's eyes sparkled with excitement.\n\nThat night, as they nestled under the twinkling stars, they closed their eyes and began to imagine the most incredible adventure. Suddenly, their minds became a spaceship, blasting off into the vastness of the universe.\n\nFirst, they soared high above the moon, marveling at its magnificent craters. Mama Deer pointed out the constellations, teaching Daisy and Max about the stories behind them. Papa Deer shared fascinating facts about distant planets, making their journey feel even more extraordinary.\n\nAs their minds traveled through space, they flew past glowing meteor showers and visited distant galaxies, where colorful nebulas painted the skies. Each place they visited had its own charm and magic.\n\nOne day, they landed on a dreamy planet made entirely of cotton candy clouds. The air was sweet and sugary, and the deer happily nibbled on fluffy clouds until their tummy's were full. They giggled as they bounced high in the sky, feeling weightless and free.\n\nAnother day, they discovered a planet where everything was made of shining crystals. The deer admired the glimmering landscapes, and Mama Deer crafted sparkling jewelry for her fawns using the crystals they found. Daisy and Max proudly wore their new crystal necklaces, feeling like the most extraordinary deer in the universe.\n\nAfter what felt like a million adventures, it was time for the deer family to return home. They closed their eyes, and their minds transformed their spaceship back into the familiar forest they loved. Opening their eyes, they found themselves snuggled together, back on the cozy meadow under the moonlit sky.\n\nThe family of deer looked at each other, realizing their interstellar journey had only been a dream. But it was a dream they would cherish forever, always remembering the incredible places they had visited together.\n\nAnd from that day forward, whenever they looked up at the stars, they would be reminded of their boundless imagination and the extraordinary adventures they could create in their minds. For, you see, the greatest adventures are often found in the dreams we dare to dream.\n\nWith a smile on their faces, the deer family fell asleep, ready to dream a new dream in the enchanting world of their imagination. And who knows what fantastic journeys they would embark on next!\n\nThe End"
}
let host = process.env.NEXT_PUBLIC_BACKEND_HOST
const port = process.env.NEXT_PUBLIC_BACKEND_PORT
if (port) host += `:${port}`

export const createSession = async () => {
    return await fetch(`${host}/api/create-session`, {
        method: 'POST'
    }).then(async (resp) => {
        const { sessionToken } = await resp.json()
        return { sessionToken };
    })
}

export const createWebsocket = (user: any) => {
    const { sessionToken, username } = user
    const socket = new WebSocket(`ws:${host}?token=${sessionToken}&username=${username}`)

    socket.onopen = () => {
        console.log('WebSocket connection established');
        socket.send('Hello, server!');
    };

    socket.onmessage = (event) => {
        const json = JSON.parse(event?.data)
        console.log('From server:', json)
        // TODO: introduce logiic here to update UserContext and/or StoryContext
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    // TODO: add websocket to usertype user

    return socket
}
  
export const createSession = async () => {
    const host = process.env.NEXT_PUBLIC_BACKEND_HOST
    const port = process.env.NEXT_PUBLIC_BACKEND_PORT
    return await fetch(`${host}:${port}/api/create-session`, {
        method: 'POST'
    }).then(async (resp) => {
        return await resp.json();
    })
}
  
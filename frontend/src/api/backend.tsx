export const createSession = async () => {
    let host = process.env.NEXT_PUBLIC_BACKEND_HOST
    const port = process.env.NEXT_PUBLIC_BACKEND_PORT

    if (port) host += `:${port}`

    return await fetch(`${host}/api/create-session`, {
        method: 'POST'
    }).then(async (resp) => {
        return await resp.json();
    })
}
  
const crypto = require('crypto')

export const createSession = async () => { // res: Response, user
    const sessionToken = crypto.randomBytes(32).toString('hex')

    try {
      // Normally, would persist the token to the database and return session with sessionToken below
      return sessionToken
    } catch (e) {
    //   return passError('Failed to create session.', e, res);
    }
  }
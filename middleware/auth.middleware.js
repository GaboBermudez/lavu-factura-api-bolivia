import { secret } from '../handlers/login.handlers.js'
import jwt from 'jsonwebtoken'

export function validateBearerToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Bearer token inválido' })
    }

    const token = authHeader.slice(7) // Se le quita el 'Bearer '
    const userId = validateJwtToken(token)

    req.userId = userId
    next()
  } catch (error) {
    return res.status(401).json({ error })
  }
}

function validateJwtToken(token) {
  try {
    const decodedToken = jwt.verify(token, secret)

    const isTokenExpired = Date.now() >= decodedToken.exp * 1000
    if (isTokenExpired) {
      throw new Error('el token ya expiró')
    }

    const userId = decodedToken.userId

    return userId
  } catch (error) {
    throw new Error(`Error validando el token: ${error.message}`)
  }
}

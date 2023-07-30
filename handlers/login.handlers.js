import Usuarios from '../models/usuarios.js'
import jwt from 'jsonwebtoken'

const secret = process.env.SECRET

export async function loginHandler(req, res) {
  try {
    const { username, password } = req.body
    const usuario = await Usuarios.findOne({ where: { username } })

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidos' })
    }

    const isPasswordValid = usuario.password === password

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidos' })
    }

    const payload = { userId: usuario.id }
    const expiresInOneYear = 60 * 60 * 24 * 365

    const token = jwt.sign(payload, secret, { expiresIn: expiresInOneYear })

    res.json({ token })
  } catch (error) {
    console.error('Error iniciando sesión:', error)
    res.status(500).json({ error: 'Falló inicio de sesión' })
  }
}

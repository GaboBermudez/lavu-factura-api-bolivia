import Consecutivos from '../models/consecutivos.js'
import { getJsonForEmizor } from '../util/LavuToEmizor.js'
import { enviarFactura } from '../services/EmizorService.js'
import jwt from 'jsonwebtoken'

export async function facturarHandler(req, res) {
  try {
    const { orderId, codigoMetodoPago, numeroTarjeta } = req.body

    const token = req.cookies.token
    console.log('🚀 ~ file: facturar.handlers.js:10 ~ facturarHandler ~ req.cookies:', req.cookies.token)

    if (!token) res.status(401).send('Unauthorized: no token provided')

    const decoded = jwt.verify(token)

    // Token is valid, access the user ID from the decoded payload
    const userId = decoded.userId
    res.send(`Protected route accessed by user with ID: ${userId}`)

    // if (!orderId) {
    //   return res.status(400).json({ message: 'No hay numero de orden' })
    // }

    // if (codigoMetodoPago === '2' && !numeroTarjeta) {
    //   return res.status(400).json({ message: 'No hay numero de tarjeta' })
    // }

    // const { jsonToEmizor, consecutivoObj } = await getJsonForEmizor(req.body)
    // const resultadoFactura = await enviarFactura(jsonToEmizor)

    // if (resultadoFactura.status === 'success') {
    //   const newConsecutivo = Number(consecutivoObj.consecutivo) + 1
    //   consecutivoObj.update({ consecutivo: newConsecutivo })
    // }
    // res.json(resultadoFactura)
  } catch (e) {
    console.log('Error: ', e)
    res.status(500).json(e.response.data)
  }
}

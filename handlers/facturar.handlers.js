import { getJsonForEmizor } from '../util/LavuToEmizor.js'
import { enviarFactura } from '../services/EmizorService.js'

export async function facturarHandler(req, res) {
  try {
    const { orderId } = req.body

    if (!orderId) {
      res.status(400).json({ message: 'No hay numero de orden' })
    }
    const jsonToEmizor = await getJsonForEmizor(orderId)

    const resultadoFactura = await enviarFactura(jsonToEmizor)

    res.json(resultadoFactura)
  } catch (e) {
    console.log('Error: ', e.response)
    res.status(500).json(e)
  }
}

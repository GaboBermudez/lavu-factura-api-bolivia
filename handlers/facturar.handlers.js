import Consecutivos from '../models/consecutivos.js'
import { getJsonForEmizor } from '../util/LavuToEmizor.js'
import { enviarFactura } from '../services/EmizorService.js'

export async function facturarHandler(req, res) {
  try {
    const { orderId } = req.body
    if (!orderId) {
      res.status(400).json({ message: 'No hay numero de orden' })
    }
    const { jsonToEmizor, consecutivoObj } = await getJsonForEmizor(orderId)
    const resultadoFactura = await enviarFactura(jsonToEmizor)

    if (resultadoFactura.status === 'success') {
      const newConsecutivo = Number(consecutivoObj.consecutivo) + 1
      consecutivoObj.update({ consecutivo: newConsecutivo })
    }
    res.json(resultadoFactura)
  } catch (e) {
    console.log('Error: ', e.response.data)
    res.status(500).json(e.response.data)
  }
}

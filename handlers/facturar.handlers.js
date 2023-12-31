import { getJsonForEmizor } from '../util/LavuToEmizor.js'
import { enviarFactura } from '../services/EmizorService.js'

export async function facturarHandler(req, res) {
  try {
    const { orderId, codigoMetodoPago, numeroTarjeta } = req.body

    if (!orderId) {
      return res.status(400).json({ message: 'No hay numero de orden' })
    }

    if (codigoMetodoPago === '2' && !numeroTarjeta) {
      return res.status(400).json({ message: 'No hay numero de tarjeta' })
    }

    const { jsonToEmizor, consecutivoObj } = await getJsonForEmizor(req.body)
    const resultadoFactura = await enviarFactura(jsonToEmizor)

    if (resultadoFactura.status === 'success') {
      const newConsecutivo = Number(consecutivoObj.consecutivo) + 1
      consecutivoObj.update({ consecutivo: newConsecutivo })
    }
    return res.json(resultadoFactura)
  } catch (e) {
    if (e && e.response && e.response.data) {
      console.log('Error response.data: ', JSON.stringify(e.response.data))
      return res.status(500).json(e.response.data)
    } else {
      console.log('Error: ', e)
      return res.status(500).json(e)
    }
  }
}

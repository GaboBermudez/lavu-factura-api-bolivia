import Compras from '../models/compras.js'

export async function comprarHandler(req, res) {
  try {
    const { buyer, seller, monto } = req.body

    await Compras.create({ buyer, seller, monto })

    return res.json({ resultado: 'exito' })
  } catch (e) {
    return res.status(500).json(e)
  }
}

export async function comprasHandler(req, res) {
  const compras = await Compras.findAll()

  return res.json(compras)
}

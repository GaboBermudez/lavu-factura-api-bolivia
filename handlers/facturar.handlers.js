import LavuService from '../services/LavuService.js'
import { buscarProducto, homologarProducto } from '../services/EmizorService.js'
import { getProductos } from '../util/LavuOrderUtils.js'

export async function facturarHandler(req, res) {
  try {
    const { orderId } = req.body

    if (!orderId) {
      res.status(400).json({ message: 'No hay numero de orden' })
    }

    // Obtener datos de LAVU, armar JSON y enviar a Emizor
    // Homologar productos nuevos
    const orderContents = await LavuService.getOrderContents(orderId)
    const productos = getProductos(orderContents)

    const productosHomologados = []

    for (const producto of productos) {
      const searchResult = await buscarProducto(producto.itemId)
      const esProductoCreado = searchResult.data.productos_homologados.length > 0
      if (esProductoCreado) {
        delete searchResult.data.productos_homologados[0].description
        productosHomologados.push({
          ...searchResult.data.productos_homologados[0],
          descripcion: producto.descripcion,
          subTotal: producto.subTotal,
          cantidad: producto.cantidad,
        })
      } else {
        const result = await homologarProducto(producto.itemId)
        if (result.status === 'success') {
          delete result.data.description
          productosHomologados.push({
            ...result.data,
            descripcion: producto.descripcion,
            subTotal: producto.subTotal,
            cantidad: producto.cantidad,
          })
        }
      }
    }

    // productosHomologados tiene los productos listos

    res.json(productosHomologados)
  } catch (e) {
    res.status(500).json(e)
  }
}

import Consecutivo from '../models/consecutivo.js'
import { buscarProducto, homologarProducto } from '../services/EmizorService.js'
import { getProductos, getRowValue } from '../util/LavuOrderUtils.js'
import jsonTemplate from './InvoiceTemplate.js'
import LavuService from '../services/LavuService.js'

const codigoSucursal = 0

export async function getJsonForEmizor(orderId) {
  const productosHomologados = await obtenerProductos(orderId)
  const { consecutivo } = await Consecutivo.findOne({ where: { locacion: 'LaPaz' } })

  const orderInfo = await LavuService.getOrderGeneralInfo(orderId)
  const total = getRowValue(orderInfo.elements[0], 'total')

  jsonTemplate.numeroFactura = Number(consecutivo) // Aumentar para guardar en DB, aumentar aquí o devolverlo al handler y guardarlo ahí?
  jsonTemplate.detalles = productosHomologados
  jsonTemplate.montoTotal = total
  jsonTemplate.montoTotalSujetoIva = total
  jsonTemplate.montoTotalMoneda = total
  jsonTemplate.extras.facturaTicket = orderId

  return jsonTemplate
}

async function obtenerProductos(orderId) {
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
        precioUnitario: producto.precioUnitario,
        unidadMedida: 57,
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
          precioUnitario: producto.precioUnitario,
          unidadMedida: 57,
        })
      }
    }
  }

  return productosHomologados
}

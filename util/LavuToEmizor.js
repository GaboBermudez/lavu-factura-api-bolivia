import Consecutivos from '../models/consecutivos.js'
import { buscarProducto, homologarProducto } from '../services/EmizorService.js'
import { getProductos, getRowValue } from '../util/LavuOrderUtils.js'
import jsonTemplate from './InvoiceTemplate.js'
import LavuService from '../services/LavuService.js'

export async function getJsonForEmizor(body) {
  const jsonToEmizor = { ...jsonTemplate }
  const {
    orderId,
    esControlTributario,
    codigoMetodoPago,
    numeroTarjeta,
    codigoTipoDocumentoIdentidad,
    nombreRazonSocial,
    numeroDocumento,
    emailCliente,
    telefonoCliente,
  } = body
  const productosHomologados = await obtenerProductos(orderId)
  const consecutivoObj = await Consecutivos.findOne({ where: { locacion: 'LaPaz' } })
  const orderInfo = await LavuService.getOrderGeneralInfo(orderId)
  const total = getRowValue(orderInfo.elements[0], 'total')

  if (!esControlTributario) {
    jsonToEmizor.codigoTipoDocumentoIdentidad = codigoTipoDocumentoIdentidad
    jsonToEmizor.numeroDocumento = numeroDocumento
    jsonToEmizor.nombreRazonSocial = nombreRazonSocial
    jsonToEmizor.codigoCliente = numeroDocumento
    jsonToEmizor.emailCliente = emailCliente ? emailCliente : ''
    jsonToEmizor.telefonoCliente = telefonoCliente ? telefonoCliente : ''
  }

  jsonToEmizor.numeroFactura = Number(consecutivoObj.consecutivo)
  jsonToEmizor.detalles = productosHomologados
  jsonToEmizor.codigoMetodoPago = codigoMetodoPago
  jsonToEmizor.montoTotal = total
  jsonToEmizor.montoTotalSujetoIva = total
  jsonToEmizor.montoTotalMoneda = total
  jsonToEmizor.extras.facturaTicket = orderId

  if (codigoMetodoPago === 2) jsonToEmizor.numeroTarjeta = numeroTarjeta

  return { jsonToEmizor, consecutivoObj }
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

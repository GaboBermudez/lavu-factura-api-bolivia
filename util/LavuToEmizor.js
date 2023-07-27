import {
  getCustomerData,
  getCustomerField,
  getRowValue,
  getLote,
  getVoucher,
} from './LavuOrderUtils.js'
import { NombComercialConsts, rucMap } from '../consts/Constants.js'
import jsonTemplate from './InvoiceTemplate.js'
import LavuService from '../services/LavuService.js'

export async function getJSONFromLavu(orderData) {
  return jsonTemplate
  // return new Promise(async resolve => {
  //   const orderId = getRowValue(orderData, 'order_id')

  //   const receptor = getCustomerData(orderData)

  //   const rucReceptor = getCustomerField(receptor, 'CI/RUC') || ''
  //   const nombreReceptor = getCustomerField(receptor, 'First_Name') || ''
  //   const apellidoReceptor = getCustomerField(receptor, 'Last_Name') || ''
  //   const emailReceptor = getCustomerField(receptor, 'Email') || ''
  //   const nombreCompletoReceptor = `${nombreReceptor} ${apellidoReceptor}`

  //   // Datos empresa
  //   jsonTemplate.Encabezado.RucEmpresa = rucMap[process.env.NOMBRE_COMERCIAL]
  //   jsonTemplate.Encabezado.NombreEmpresa =
  //     NombComercialConsts[process.env.NOMBRE_COMERCIAL]

  //   // Datos cliente
  //   jsonTemplate.Encabezado.RucCliente = rucReceptor
  //   jsonTemplate.Encabezado.NombreCliente = nombreCompletoReceptor
  //   jsonTemplate.Encabezado.EmailCliente = emailReceptor
  //   jsonTemplate.Encabezado.SecuencialCompleto = orderId

  //   // Precio
  //   const precioTotal = Number(getRowValue(orderData, 'total'))
  //   const impuesto = Number(getRowValue(orderData, 'itax'))
  //   jsonTemplate.Detalle[0].Precio = precioTotal - impuesto

  //   // Datos pago
  //   if (precioTotal > 0) {
  //     const datosPago = await LavuService.getOrderPayments(orderId)
  //     const formaPago = getRowValue(datosPago.elements[0], 'pay_type') || ''
  //     jsonTemplate.Encabezado.FormaPago = formaPago

  //     if (formaPago.toLowerCase() === 'card') {
  //       const orderContents = await LavuService.getOrderContents(orderId)
  //       const voucher = getVoucher(orderContents[0].elements)
  //       const lote = getLote(orderContents[0].elements)

  //       jsonTemplate.Encabezado.LoteTarjeta = lote
  //       jsonTemplate.Encabezado.Notas = voucher
  //     }

  //     resolve(jsonTemplate)
  //   }

  //   resolve(false)
  // })
}

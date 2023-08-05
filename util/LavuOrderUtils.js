export function getRowValue(row, key) {
  const field = row.elements.find(e => e.name === key)
  // console.log(JSON.stringify(field));
  if (!field || !field.elements) return false
  return field.elements[0].text
}

export function getProductos(data) {
  if (!data.elements || data.elements.length === 0) return false

  let items = []
  const productos = data.elements

  productos.forEach(producto => {
    const itemId = getRowValue(producto, 'item_id')
    const descripcion = getRowValue(producto, 'item')
    const precioUnitario = Number(getRowValue(producto, 'price'))
    const subTotal = Number(getRowValue(producto, 'subtotal'))
    const cantidad = Number(getRowValue(producto, 'quantity'))
    const precioExtra = Number(getRowValue(producto, 'modify_price')) || 0
    if (cantidad > 0) {
      items.push({
        cantidad,
        descripcion,
        itemId,
        precioUnitario: precioUnitario + precioExtra,
        subTotal: subTotal + precioExtra * cantidad,
      })
    }
  })

  return items
}

export function getOrderData(orders, id) {
  let orderToFind
  orders.forEach(order => {
    const orderId = getRowValue(order, 'order_id')
    if (orderId === id) {
      orderToFind = order
      return
    }
  })
  return orderToFind
}

export function getCustomerField(customer, key) {
  const field = customer.find(e => e.fields_db_name === key)
  if (!field) return false
  return field.info
}

export function roundAmount(value, decimals = 5) {
  return +(Math.round(`${value}e+${decimals}`) + `e-${decimals}`)
}

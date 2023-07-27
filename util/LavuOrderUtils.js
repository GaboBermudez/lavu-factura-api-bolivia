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
    const subTotal = getRowValue(producto, 'price')
    const cantidad = getRowValue(producto, 'quantity')
    items.push({
      cantidad,
      descripcion,
      itemId,
      subTotal,
    })
  })

  return items
}

export function getCustomerData(data) {
  const originalIdObj = data.elements.find(e => e.name === 'original_id')
  if (originalIdObj.elements) {
    const originalId = originalIdObj.elements[0].text
    const indexOfBracket = originalId.indexOf('{')
    const objectStr = originalId.substr(indexOfBracket, originalId.length)
    const newStr = objectStr.split('&quot;').join('"').split('|o|')[0]
    return JSON.parse(newStr).print_info
  }

  return false
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

export function getCustomerEmail(data) {
  const originalIdObj = data.elements.find(e => e.name === 'original_id')
  // console.log(JSON.stringify(originalIdObj));
  if (originalIdObj.elements) {
    const originalId = originalIdObj.elements[0].text
    const indexOfBracket = originalId.indexOf('{')
    const objectStr = originalId.substr(indexOfBracket, originalId.length)
    const newStr = objectStr.split('&quot;').join('"').split('|o|')[1]
    const customerProps = JSON.parse(newStr)
    return customerProps.field1
  }

  return false
}

export function getCustomerField(customer, key) {
  const field = customer.find(e => e.fields_db_name === key)
  if (!field) return false
  return field.info
}

export function roundAmount(value, decimals = 5) {
  return +(Math.round(`${value}e+${decimals}`) + `e-${decimals}`)
}

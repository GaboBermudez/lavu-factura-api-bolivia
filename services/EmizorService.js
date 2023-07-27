import axios from 'axios'
import { createClient } from 'redis'

const REDIS_PREFIX = 'lapaz'
const baseUrl = 'https://sinfel.emizor.com'
const tokenUrl = `${baseUrl}/oauth/token`
const redisClient = createClient()

async function setBearerToken() {
  await redisClient.connect()
  const body = {
    grant_type: 'client_credentials',
    client_id: process.env.EMIZOR_CLIENT_ID,
    client_secret: process.env.EMIZOR_CLIENT_SECRET,
  }

  const response = await axios.get(tokenUrl, { body })

  redisClient.set(redisKey('bearerToken'), response.data.access_token)
  await redisClient.quit()
}

async function getBearerToken() {
  await redisClient.connect()
  const bearerToken = await redisClient.get(redisKey('bearerToken'))
  await redisClient.quit()
  return bearerToken
}

function redisKey(key) {
  return `${REDIS_PREFIX}:${key}`
}

export async function buscarProducto(codigoProducto) {
  const bearerToken = await getBearerToken()
  const params = { search: codigoProducto }
  const headers = { Authorization: `Bearer ${bearerToken}` }
  const result = await axios.get(`${baseUrl}/api/v1/productos`, {
    headers,
    params,
  })
  return result.data
}

export async function homologarProducto(codigoProducto) {
  const payload = {
    codigoProducto: codigoProducto,
    codigoProductoSIN: 63310,
    codigoActividadSin: '561110',
  }
  const bearerToken = await getBearerToken()
  const headers = { Authorization: `Bearer ${bearerToken}` }
  const result = await axios.post(`${baseUrl}/api/v1/productos`, payload, { headers })

  return result.data
}

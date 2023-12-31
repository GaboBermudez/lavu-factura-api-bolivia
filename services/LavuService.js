import axios from 'axios'
import convert from 'xml-js'
import qs from 'qs'
import Logger from '../logger/Logger.js'

const loggerGeneral = Logger()

class LavuService {
  constructor() {
    this.url = 'https://api.poslavu.com/cp/reqserv/'
    this.config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  }

  getOrderContents(orderId) {
    const params = {
      dataname: process.env.LAVU_DATA,
      key: process.env.LAVU_KEY,
      token: process.env.LAVU_TOKEN,
      table: process.env.LAVU_ORDER_CONTENTS_TABLE,
      column: 'order_id',
      value: orderId,
      valid_xml: 1,
    }

    return this.postRequest(params)
  }
  getOrderPayments(orderId) {
    const params = {
      dataname: process.env.LAVU_DATA,
      key: process.env.LAVU_KEY,
      token: process.env.LAVU_TOKEN,
      table: process.env.LAVU_ORDER_PAYMENTS_TABLE,
      column: 'order_id',
      value: orderId,
      valid_xml: 1,
    }

    return this.postRequest(params)
  }

  async getOrderGeneralInfo(orderId) {
    const params = {
      dataname: process.env.LAVU_DATA,
      key: process.env.LAVU_KEY,
      token: process.env.LAVU_TOKEN,
      table: process.env.LAVU_ORDERS_TABLE,
      column: 'order_id',
      value: orderId,
      valid_xml: 1,
    }

    return this.postRequest(params)
  }

  async postRequest(params) {
    // loggerGeneral.info(`GET ORDER DATA PARAMS: \n' ${qs.stringify(params)}`)
    const result = await axios.post(this.url, qs.stringify(params), this.config)
    return convert.xml2js(result.data, { ignoreComment: true }).elements[0]
    // return result.data;
  }
}

export default new LavuService()

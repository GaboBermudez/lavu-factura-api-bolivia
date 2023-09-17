import pkg from 'winston'

const { createLogger, transports, format } = pkg

const logger = (orderId = '') => {
  if (orderId) {
    return createLogger({
      transports: [
        new transports.File({
          filename: `logs/orders/${orderId}.log`,
          level: 'info',
          format: format.combine(format.timestamp(), format.simple()),
        }),
      ],
    })
  }
  return createLogger({
    transports: [
      new transports.File({
        filename: 'logs/general.log',
        level: 'info',
        format: format.combine(format.timestamp(), format.simple()),
      }),
    ],
  })
}

export const mailLogger = createLogger({
  transports: [
    // new transports.Mail({
    //   to: 'selina.ecuador.facturacion@gmail.com',
    //   from: 'selina.ecuador.facturacion@gmail.com',
    //   subject: `${process.env.LOCACION_DB} - Error al facturar orden`,
    //   host: 'smtp.gmail.com',
    //   username: 'selina.ecuador.facturacion@gmail.com',
    //   password: 'auqvcuqivcsuxnys',
    //   ssl: true,
    // }),
  ],
})

export default logger

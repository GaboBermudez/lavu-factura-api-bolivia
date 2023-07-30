import express from 'express'
import facturarRoutes from './routes/facturar.routes.js'
import pingRoutes from './routes/ping.routes.js'
import loginRoutes from './routes/login.routes.js'

const app = express()

// Middleware
app.use(express.json())

app.use(facturarRoutes)
app.use(pingRoutes)
app.use(loginRoutes)

app.use((req, res) => {
  res.status(404).json({
    message: '404 not found',
  })
})

export default app

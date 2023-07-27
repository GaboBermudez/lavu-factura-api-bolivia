import express from 'express'
import facturarRoutes from './routes/facturar.routes.js'

const app = express()

// Middleware
app.use(express.json())

app.use(facturarRoutes)

app.use((req, res) => {
  res.status(404).json({
    message: '404 not found',
  })
})

export default app

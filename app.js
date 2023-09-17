import cors from 'cors'
import express from 'express'
import comprarRoutes from './routes/comprar.routes.js'

const app = express()

app.use(cors())

// Middleware
app.use(express.json())

app.use(comprarRoutes)

app.use((req, res) => {
  res.status(404).json({
    message: '404 not found',
  })
})

export default app

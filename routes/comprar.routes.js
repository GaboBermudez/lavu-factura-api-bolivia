import express from 'express'
import { comprarHandler, comprasHandler } from '../handlers/comprar.handlers.js'

const router = express.Router()

router.get('/compras', comprasHandler)
router.post('/comprar', comprarHandler)

export default router

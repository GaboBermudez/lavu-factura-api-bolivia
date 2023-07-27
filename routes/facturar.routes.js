import express from 'express'
import { facturarHandler } from '../handlers/facturar.handlers.js'

const router = express.Router()

router.post('/facturar', facturarHandler)

export default router

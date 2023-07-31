import express from 'express'
import { facturarHandler } from '../handlers/facturar.handlers.js'
import { validateBearerToken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/facturar', validateBearerToken, facturarHandler)

export default router

import express from 'express'
import { getStates } from '../controllers/statesControllers/getStates.js'
import { getStatesLimiter } from '../middlewares/rate-limiter.js'

const router = express.Router()

//Get States endpoint.

router.get('/', getStates)
// getStatesLimiter,

export { router as statesRouter }

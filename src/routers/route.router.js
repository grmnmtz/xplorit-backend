import express from 'express'
import { getRoutes } from '../controllers/routesControllers/getRoutes.js'
import { getRoute } from '../controllers/routesControllers/getRoute.js'
import { saveRoute } from '../controllers/routesControllers/saveRoute.js'
import { updateRoute } from '../controllers/routesControllers/updateRoute.js'
import { deleteRoute } from '../controllers/routesControllers/deleteRoute.js'
import { validateGetRoute } from '../validators/routesValidators/getRouteValidation'

const router = express.Router()

//Routes controller
router.get('/', getRoutes)
router.get('/:routeId',  validateGetRoute, getRoute)
router.post('/', saveRoute)
router.patch('/:routeId', updateRoute)
router.delete('/:routeId', deleteRoute)

export { router as RoutesRouter }

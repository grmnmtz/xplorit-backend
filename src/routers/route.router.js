import express from 'express'
import { getRoutes } from '../controllers/routesControllers/getRoutes.js'
import { getRoute } from '../controllers/routesControllers/getRoute.js'
import { saveRoute } from '../controllers/routesControllers/saveRoute.js'
import { updateRoute } from '../controllers/routesControllers/updateRoute.js'
import { deleteRoute } from '../controllers/routesControllers/deleteRoute.js'
import { validateRouteCreation } from '../validators/routesValidators/saveRouteValidation.js'
import { validateRouteUpdate } from '../validators/routesValidators/updateRouteValidation.js'
import { validateGetRoute } from '../validators/routesValidators/getRouteValidation.js'
import { validateRouteDeletion } from '../validators/routesValidators/deleteRouteValidation.js'
import { getReviewsInRoute } from '../controllers/reviewsControllers/getReviewsInRoute.js'
import { saveReviewInRoute } from '../controllers/reviewsControllers/saveReviewInRoute.js'
import { updateReviewInRoute } from '../controllers/reviewsControllers/updateReviewInRoute.js'
import { deleteReviewInRoute } from '../controllers/reviewsControllers/deleteReviewInRoute.js'
import { validateSaveReviewInRoute } from '../validators/reviewsValidators/saveReviewInRouteValidation.js'
import { getLikesInRoute } from '../controllers/likesControllers/getLikesInRoute.js'
import { saveLikeInRoute } from '../controllers/likesControllers/saveLikeInRoute.js'
import { deleteLikeInRoute } from '../controllers/likesControllers/deleteLikeInRoute.js'
import { validateGetReviewsFromRoute } from '../validators/reviewsValidators/getReviewsInRouteValidation.js'
import { validateReviewUpdateInRoute } from '../validators/reviewsValidators/updateReviewInRouteValidation.js'

// import { validateGetRouteQuery } from '../validators/routesValidators/getRouteQueryValidator.js'

const router = express.Router()

//Routes controller
router.get('/', getRoutes)
router.get('/:routeId', validateGetRoute, getRoute)
router.post('/', validateRouteCreation, saveRoute)
router.patch('/:routeId', validateRouteUpdate, updateRoute)
router.delete('/:routeId', validateRouteDeletion, deleteRoute)

//Reviews in Routes Controllers
router.get('/:routeId/reviews', validateGetReviewsFromRoute, getReviewsInRoute)
router.post('/:routeId/reviews', validateSaveReviewInRoute, saveReviewInRoute)
router.patch(
  '/:routeId/reviews/:reviewId',
  validateReviewUpdateInRoute,
  updateReviewInRoute
)
router.delete('/:routeId/reviews/:reviewId', deleteReviewInRoute)

//Likes in routes controllers
router.get('/:routeId/likes', getLikesInRoute)
router.post('/:routeId/likes', saveLikeInRoute)
router.delete('/:routeId/likes/:likeId', deleteLikeInRoute)

export { router as routesRouter }

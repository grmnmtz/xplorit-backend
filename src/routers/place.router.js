import express from 'express'
import multer from 'multer'

import { getPlaces } from '../controllers/placesControllers/getPlaces.js'
import { getPlace } from '../controllers/placesControllers/getPlace.js'
import { savePlace } from '../controllers/placesControllers/savePlace.js'
import { updatePlace } from '../controllers/placesControllers/updatePlace.js'
import { deletePlace } from '../controllers/placesControllers/deletePlace.js'
import { validatePlaceCreation } from '../validators/placesValidators/savePlaceValidation.js'
import { validateGetPlace } from '../validators/placesValidators/getPlaceValidation.js'
import { validatePlaceDeletion } from '../validators/placesValidators/deletePlaceValidation.js'
import { validatePlaceUpdate } from '../validators/placesValidators/updatePlaceValidation.js'
import { getReviewsInPlace } from '../controllers/reviewsControllers/getReviewsInPlace.js'
import { saveReviewInPlace } from '../controllers/reviewsControllers/saveReviewInPlace.js'
import { updateReviewInPlace } from '../controllers/reviewsControllers/updateReviewInPlace.js'
import { deleteReviewInPlace } from '../controllers/reviewsControllers/deleteReviewInPlace.js'
import { validateSaveReviewInPlace } from '../validators/reviewsValidators/saveReviewInPlaceValidation.js'
import { getLikesInPlace } from '../controllers/likesControllers/getLikesInPlace.js'
import { saveLikeInPlace } from '../controllers/likesControllers/saveLikeInPlace.js'
import { deleteLikeInPlace } from '../controllers/likesControllers/deleteLikeInPlace.js'
import { validateGetReviewsFromPlace } from '../validators/reviewsValidators/getReviewsInPlaceValidation.js'
import { validateReviewUpdateInPlace } from '../validators/reviewsValidators/updateReviewInPlaceValidation.js'
import { validateReviewDeleteInPlace } from '../validators/reviewsValidators/deleteReviewInPlaceValidation.js'
import { getLikesFromPlaceValidation } from '../validators/likesValidators/getLikesInPlaceValidation.js'
import { validateLikeInPlace } from '../validators/likesValidators/saveLikeInPlaceValidation.js'
import { validateLikeDeletionInPlace } from '../validators/likesValidators/deleteLikeInPlaceValidation.js'
import { validatePlaceImages } from '../validators/placesValidators/placeImagesValidation.js'
import { postReviewLimiter } from '../middlewares/rate-limiter.js'
import { updateReviewLimiter } from '../middlewares/rate-limiter.js'
import { getReviewsLimiter } from '../middlewares/rate-limiter.js'
import { postLikeLimiter } from '../middlewares/rate-limiter.js'
import { deleteLikeLimiter } from '../middlewares/rate-limiter.js'
import { getLikesLimiter } from '../middlewares/rate-limiter.js'
import { postPlaceOrRouteLimiter } from '../middlewares/rate-limiter.js'
import { getPlacesOrRoutesLimiter } from '../middlewares/rate-limiter.js'
import { getPlaceOrRouteLimiter } from '../middlewares/rate-limiter.js'
import { updatePlaceOrRouteLimiter } from '../middlewares/rate-limiter.js'
import { verifyToken } from '../middlewares/authentication.js'
// import { validateGetPlaceQuery } from '../validators/placesValidators/getPlaceQueryValidator.js'

const router = express.Router()

const maxSize = 2 * 1024 * 1024 //2mb limit size

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },
})

//Places controllers
router.get('/', getPlacesOrRoutesLimiter, getPlaces)

router.get('/:placeId', getPlaceOrRouteLimiter, validateGetPlace, getPlace)

router.post(
  '/',
  postPlaceOrRouteLimiter,
  verifyToken,
  upload.array('images', 6),
  validatePlaceImages,
  validatePlaceCreation,
  savePlace
)

router.patch(
  '/:placeId',
  updatePlaceOrRouteLimiter,
  verifyToken,
  validatePlaceUpdate,
  updatePlace
)

//Pending authentication middleware

router.delete('/:placeId', validatePlaceDeletion, deletePlace)

//Reviews in places controllers

router.get(
  '/:placeId/reviews',
  getReviewsLimiter,
  validateGetReviewsFromPlace,
  getReviewsInPlace
)

//Pending authentication middleware

router.post(
  '/:placeId/reviews',
  postReviewLimiter,
  validateSaveReviewInPlace,
  saveReviewInPlace
)

//Pending authentication middleware

router.patch(
  '/:placeId/reviews/:reviewId',
  updateReviewLimiter,
  validateReviewUpdateInPlace,
  updateReviewInPlace
)

//Pending authentication middleware

router.delete(
  '/:placeId/reviews/:reviewId',
  validateReviewDeleteInPlace,
  deleteReviewInPlace
)

//Likes in places controllers

router.get(
  '/:placeId/likes',
  getLikesLimiter,
  getLikesFromPlaceValidation,
  getLikesInPlace
)

//Pending authentication middleware

router.post(
  '/:placeId/likes',
  postLikeLimiter,
  verifyToken,
  validateLikeInPlace,
  saveLikeInPlace
)

//Pending authentication middleware

router.delete(
  '/:placeId/likes/',
  deleteLikeLimiter,
  validateLikeDeletionInPlace,
  deleteLikeInPlace
)

//To be deprecated?

// router.delete(
//   '/:placeId/likes/:likeId',
//   validateLikeDeletionInPlace,
//   deleteLikeInPlace
// )

export { router as placesRouter }

import { ApiError } from '../../errors/ApiError.js'
import { getAllReviewsFromPlace } from '../../usecases/reviewUsecases/getAllReviewsFromPlace.js'
import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import validator from 'express-validator'
const { param, validationResult } = validator

const validateReviewDeleteInPlace = async (req, res, next) => {
  const { placeId, reviewId } = req.params

  // const { id } = req.user

  //Validate payload equals to the user in the database they need to match.
  //Otherwise throw an error.

  // const foundUser = await getSingleUser({ _id: id })

  try {
    const placeIdChain = param('placeId')
      .exists()
      .withMessage('Please provide a place Id.')
      .isMongoId()
      .withMessage('Please provide a valid place Id.')
      .run(req)

    const reviewIdChain = param('reviewId')
      .exists()
      .withMessage('Please provide a review Id.')
      .isMongoId()
      .withMessage('Please provide a valid review Id.')
      .run(req)

    await Promise.all([placeIdChain, reviewIdChain])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const placeExists = await getSinglePlace({ _id: placeId })

    if (!placeExists) {
      next(ApiError.badRequest('Place not found.'))
      return
    }

    //Validate that the userId of the review is equal to the payload of the token.
    //PENDING

    const reviewExists = await getAllReviewsFromPlace({
      _id: reviewId,
    })

    if (isEmptyArray(reviewExists.reviews)) {
      next(ApiError.badRequest('Review not found'))
      return
    }

    next()
  } catch (err) {
    console.error(err)
    next(ApiError.badRequest('No valid request to query a specific review.'))
  }
}

export { validateReviewDeleteInPlace }

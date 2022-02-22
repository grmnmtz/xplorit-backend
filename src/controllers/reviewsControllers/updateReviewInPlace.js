import { updateReviewFromPlace } from '../../usecases/reviewUsecases/updateReviewFromPlace.js'
import { ApiError } from '../../errors/ApiError.js'

const updateReviewInPlace = async (req, res, next) => {
  try {
    const { reviewId } = req.params
    const updatedContent = req.body

    const updatedReview = await updateReviewFromPlace(reviewId, updatedContent)

    if (updatedReview) {
      res.json({
        message: 'Review updated successfully',
        statusCode: 200,
        data: updatedReview,
      })
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        ApiError.badRequest({
          message: 'Validation Error',
          errors: err,
        })
      )
      return
    } else {
      console.log(err)
      next({})
    }
  }
}

export { updateReviewInPlace }

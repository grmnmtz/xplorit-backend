import { postReviewToPlace } from '../../usecases/reviewUsecases/postReviewToPlace.js'
import { ApiError } from '../../errors/ApiError.js'

const saveReviewInPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params
    const newReview = req.body

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    newReview.placeId = placeId

    const savedReview = await postReviewToPlace(newReview)

    if (savedReview) {
      res.json({
        description: 'Review created in the place successfully',
        statusCode: 200,
        data: savedReview,
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

export { saveReviewInPlace }

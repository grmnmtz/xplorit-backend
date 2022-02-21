import { getReviewsMadeByUser } from '../../usecases/userUsecases/getReviewsMadeByUser.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getReviewsByUser = async (req, res, next) => {
  // const { userId } = req.params

  //Validate payload equals to the user in the database they need to match.
  //Otherwise throw an error.

  // const foundUser = await getSingleUser({ _id: id })

  try {
    const { id } = req.user

    const reviewsByUser = await getReviewsMadeByUser(id)

    if (isEmptyArray(reviewsByUser)) {
      next(ApiError.notFound('No reviews created by this user were found.'))
      return
    }

    res.json({
      message: 'success',
      statusCode: 200,
      data: reviewsByUser,
    })
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

export { getReviewsByUser }

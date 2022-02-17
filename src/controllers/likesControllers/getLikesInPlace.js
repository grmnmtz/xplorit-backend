import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getLikesInPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    const allLikesInPlace = await getLikesFromPlace({ placeId: placeId })

    if (isEmptyArray(allLikesInPlace)) {
      next(
        ApiError.notFound({
          message: 'No likes for this place were found.',
          data: allLikesInPlace,
        })
      )
      return
    }

    res.json({
      message: 'success',
      statusCode: 200,
      data: allLikesInPlace,
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

export { getLikesInPlace }

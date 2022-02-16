import { postLikeToPlace } from '../../usecases/likeUsecases/postLikeToPlace.js'
import { updateSinglePlace } from '../../usecases/placeUsecases/updateSinglePlace.js'
import { ApiError } from '../../errors/ApiError.js'

const saveLikeInPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params
    const { userId } = req.body

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    const savedLike = await postLikeToPlace({
      placeId: placeId,
      userId: userId,
    })

    if (savedLike) {
      const updatedPlace = await updateSinglePlace(placeId, {
        $inc: { likes: 1 },
      })

      if (updatedPlace) {
        res.json({
          message: 'Like saved in place successfully',
          statusCode: 200,
          data: updatedPlace,
        })
      }
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

export { saveLikeInPlace }

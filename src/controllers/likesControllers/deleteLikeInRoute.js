import { deleteLikeFromRoute } from '../../usecases/likeUsecases/deleteLikeFromRoute.js'
import { updateSingleRoute } from '../../usecases/routeUsecases/updateSingleRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const deleteLikeInRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params
    const { userId } = req.body

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    const deletedLike = await deleteLikeFromRoute({
      routeId: routeId,
      userId: userId,
    })

    if (deletedLike) {
      const updatedRoute = await updateSingleRoute(routeId, {
        $inc: { likes: -1 },
      })

      if (updatedRoute) {
        res.json({
          message: 'success',
          statusCode: 204,
          data: 'Deleted like in place successfully',
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

export { deleteLikeInRoute }

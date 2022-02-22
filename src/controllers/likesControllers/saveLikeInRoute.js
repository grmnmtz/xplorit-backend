import { postLikeToRoute } from '../../usecases/likeUsecases/postLikeToRoute.js'
import { updateSingleRoute } from '../../usecases/routeUsecases/updateSingleRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const saveLikeInRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params

    const { id } = req.user

    const savedLike = await postLikeToRoute({
      routeId: routeId,
      userId: id,
    })

    if (savedLike) {
      const updatedRoute = await updateSingleRoute(routeId, {
        $inc: { likes: 1 },
      })

      if (updatedRoute) {
        res.json({
          message: 'Like saved in route successfully',
          statusCode: 200,
          data: updatedRoute,
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

export { saveLikeInRoute }

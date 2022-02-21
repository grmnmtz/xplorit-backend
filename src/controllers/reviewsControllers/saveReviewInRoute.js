import { postReviewToRoute } from '../../usecases/reviewUsecases/postReviewToRoute.js'
import { ApiError } from '../../errors/ApiError.js'
import { updateSingleRoute } from '../../usecases/routeUsecases/updateSingleRoute.js'
import { getReviewsInRouteBeforeCalculation } from '../../usecases/../usecases/reviewUsecases/getReviewsInRoute.js'
import { averageReducer } from '../../utils/averageReducer.js'

const saveReviewInRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params

    const newReview = req.body

    const savedReview = await postReviewToRoute(newReview)

    if (savedReview) {
      const reviews = await getReviewsInRouteBeforeCalculation({
        routeId: routeId,
      })

      const starsArray = reviews.map((review) => review.stars)

      const weightedAverage = starsArray.reduce(averageReducer, 0).toFixed(1)

      const filter = { _id: routeId }

      const update = { average: weightedAverage }

      const routeUpdated = await updateSingleRoute(filter, update)

      if (routeUpdated) {
        res.json({
          description: 'Review created in the route successfully',
          statusCode: 200,
          data: savedReview,
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

export { saveReviewInRoute }

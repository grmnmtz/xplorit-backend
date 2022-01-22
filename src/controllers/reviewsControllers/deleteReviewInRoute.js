import { deleteReviewFromRoute } from '../../usecases/reviewUsecases/deleteReviewFromRoute.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'

const deleteReviewInRoute = async (req, res) => {
  const { routeId, reviewId } = req.params

  try {
    const foundRoute = await getSingleRoute(routeId)

    const deletedReview = await deleteReviewFromRoute(foundRoute._id, reviewId)

    if (deletedReview) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted review successfully',
          statusCode: 204,
        },
      })
    }
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Route not found.',
        statusCode: 404,
      },
    })
  }
}

export { deleteReviewInRoute }

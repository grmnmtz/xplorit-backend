import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'

const getRoute = async (req, res, next) => {
  const { routeId, ownerId, name, description, tags, fullRoute, images } = req.params

  try {
    const singleRoute = await getSingleRoute(routeId)

    res.json({
      description: 'Route found',
      statusCode: 200,
      data: singleRoute,
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getRoute }

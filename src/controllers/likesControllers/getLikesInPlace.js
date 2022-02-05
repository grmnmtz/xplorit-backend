import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getLikesInPlace = async (req, res, next) => {
  const { placeId } = req.params
  try {
    const allLikesInPlace = await getLikesFromPlace({ placeId: placeId })

    if (isEmptyArray(allLikesInPlace)) {
      next(ApiError.notFound('No likes for this place were found.'))
      return
    }

    res.json({
      message: 'success',
      statusCode: 200,
      data: allLikesInPlace,
    })
  } catch (err) {
    console.log(err)

    next({})
  }
}

export { getLikesInPlace }

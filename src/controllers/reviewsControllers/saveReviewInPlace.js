import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { postReviewToPlace } from '../../usecases/reviewUsecases/postReviewToPlace.js'

const saveReviewInPlace = async (req, res) => {
  const { placeId } = req.params
  const { newReview } = req.body

  try {
    const foundPlace = await getSinglePlace(placeId)

    const savedReview = await postReviewToPlace(foundPlace._id, newReview)

    res.json({
      message: 'success',
      payload: {
        data: savedReview,
        description: 'Review created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not save review.',
        statusCode: 400,
      },
    })
  }
}

export { saveReviewInPlace }

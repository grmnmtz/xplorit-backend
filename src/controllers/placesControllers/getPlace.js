import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'

const getPlace = async (req, res) => {
  const { id } = req.params

  try {
    const singlePlace = await getSinglePlace(id)

    res.json({
      message: 'success',
      payload: {
        data: singlePlace,
        description: 'Place found',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Place not found.',
        statusCode: 404,
      },
    })
  }
}

export { getPlace }

import { createSinglePlace } from '../../usecases/placeUsecases/createSinglePlace.js'
import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'

const savePlace = async (req, res) => {
  try {
    const { ownerId, name, description, address, city, state, zipcode, tags, scheduleStart, scheduleFinish, ubication, images } = req.body

    const savedPlace = await createSinglePlace({
      ownerId,
      name,
      description,
      address, city,
      state,
      zipcode,
      tags,
      scheduleStart,
      scheduleFinish,
      ubication,
      images
    })

    if (savedPlace) {
      res.json({
        message: 'success',
        payload: {
          data: savedPlace,
          description: 'Place created successfully',
          statusCode: 200,
        },
      })
    }
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not create place.',
        statusCode: 400,
      },
    })
  }
}

export { savePlace }

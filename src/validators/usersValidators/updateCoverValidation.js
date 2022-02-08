import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, validationResult } = validator
import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { variables } from '../../config/config.js'
import { Storage } from '@google-cloud/storage'

const validateCoverUpdate = async (req, res, next) => {
  try {
    const { userId } = req.params

    const userIDChain = param('userId')
      .exists()
      .withMessage('Please provide a user ID.')
      .isMongoId()
      .withMessage('Please provide a valid ID.')
      .run(req)

    await userIDChain

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const userNameExists = await searchForUserBeforeCreation({
      _id: userId,
    })

    if (isEmptyArray(userNameExists)) {
      next(ApiError.badRequest('User not found.'))
      return
    }

    if (!req.file) {
      next(ApiError.badRequest('No file found for upload.'))
      return
    }

    const typesAllowed = ['image/jpeg', 'image/png']

    if (typesAllowed.indexOf(req.file.mimetype) === -1) {
      next(
        ApiError.badRequest(
          'Only an image of type png and jpeg is allowed with a maximum size of 512kb.'
        )
      )
      return
    }

    const storage = new Storage({
      keyFile: process.env.GCP_SECRET,
    })

    const bucket = storage.bucket(variables.GCP_BUCKET)

    const uploadImage = async (file) => {
      const newFile = file.buffer
      const destination = `users/${userId}/${Date.now()}-cover.jpeg`
      const fileHandle = bucket.file(destination) //where the file will be stored.
      await fileHandle.save(newFile)
      return fileHandle.publicUrl()
    }

    const imageUrl = await uploadImage(req.file)

    const updatedBody = {
      cover: imageUrl,
    }

    req.body = updatedBody

    next()
  } catch (err) {
    console.error(err)
    next(ApiError.badRequest('No valid request to query a specific user.'))
  }
}

export { validateCoverUpdate }

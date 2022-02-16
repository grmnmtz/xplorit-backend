import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
const { param, validationResult } = validator

const validateUserLikes = async (req, res, next) => {
  try {
    const { userId } = req.params

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

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

    const userExists = await getSingleUser({
      _id: userId,
    })

    if (!userExists) {
      next(ApiError.notFound('User not found.'))
      return
    }

    next()
  } catch (err) {
    console.error(err)

    next(ApiError.badRequest('No valid request to query a specific user.'))
  }
}

export { validateUserLikes }

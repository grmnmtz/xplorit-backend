import { ApiError } from '../../errors/ApiError.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
// import validator from 'express-validator'
// const { param, validationResult } = validator

const validateUserLikes = async (req, res, next) => {
  try {
    const { id } = req.user

    const foundUser = await getSingleUser({ _id: id })

    if (!foundUser) {
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

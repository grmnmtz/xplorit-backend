import { createSingleUser } from '../../usecases/userUsecases/createSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'
import { hashPassword } from '../../lib/bcrypt.js'
import gravatar from 'gravatar'

const saveUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body

    const secureUrl = gravatar.url(
      email,
      { s: '128', r: 'g', d: 'identicon' },
      true
    )

    const defaultCoverPhoto =
      'https://storage.googleapis.com/xplorit-images/xplorit_cover_default.png'

    const hashedPassword = await hashPassword(password)

    const savedUser = await createSingleUser({
      username,
      password: hashedPassword,
      email,
      avatar: secureUrl,
      coverPhoto: defaultCoverPhoto,
    })

    if (savedUser) {
      res.json({
        success: true,
        description: 'New user created successfully',
        statusCode: 201,
      })
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

export { saveUser }

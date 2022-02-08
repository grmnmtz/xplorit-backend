import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'

const updateCover = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { cover } = req.body

    const updatedUser = await updateSingleUser(userId, {
      coverPhoto: cover,
    })

    if (updatedUser) {
      res.json({
        success: true,
        description: 'Cover photo updated successfully',
        statusCode: 201,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { updateCover }

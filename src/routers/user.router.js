import express from 'express'
import multer from 'multer'

import { getUsers } from '../controllers/usersControllers/getUsers.js'
import { getUser } from '../controllers/usersControllers/getUser.js'
import { saveUser } from '../controllers/usersControllers/saveUser.js'
import { deleteUser } from '../controllers/usersControllers/deleteUser.js'
import { getLikesByUser } from '../controllers/userOpsControllers/getLikesByUser.js'
import { getReviewsByUser } from '../controllers/userOpsControllers/getReviewsByUser.js'
import { getPlacesByUser } from '../controllers/userOpsControllers/getPlacesByUser.js'
import { getRoutesByUser } from '../controllers/userOpsControllers/getRoutesByUser.js'
import { validateUserSignup } from '../validators/usersValidators/saveUserValidation.js'
import { validateGetUser } from '../validators/usersValidators/getUserValidation.js'
import { validateUserDeletion } from '../validators/usersValidators/deleteUserValidation.js'
import { validateUserLikes } from '../validators/userOpsValidators/getLikesFromUserValidation.js'
import { validateUserReviews } from '../validators/userOpsValidators/getReviewsFromUserValidation.js'
import { validateUserPlaces } from '../validators/userOpsValidators/getPlacesFromUserValidation.js'
import { validateUserRoutes } from '../validators/userOpsValidators/getRoutesFromUserValidation.js'
import { validateUsernameUpdate } from '../validators/usersValidators/updateUsernameValidation.js'
import { updateUsername } from '../controllers/usersControllers/updateUsername.js'
import { validatePasswordUpdate } from '../validators/usersValidators/updatePasswordValidation.js'
import { updatePassword } from '../controllers/usersControllers/updatePassword.js'
import { validateAvatarUpdate } from '../validators/usersValidators/updateAvatarValidation.js'
import { updateAvatar } from '../controllers/usersControllers/updateAvatar.js'
import { validateCoverUpdate } from '../validators/usersValidators/updateCoverValidation.js'
import { updateCover } from '../controllers/usersControllers/updateCover.js'
import { getUsersLimiter } from '../middlewares/rate-limiter.js'
import { userSignupLimiter } from '../middlewares/rate-limiter.js'
import { getUserLimiter } from '../middlewares/rate-limiter.js'
import { updateUserLimiter } from '../middlewares/rate-limiter.js'
import { getUserOpsLimiter } from '../middlewares/rate-limiter.js'
import { verifyToken } from '../middlewares/authentication.js'
// import { verifyToken } from '../middlewares/authentication.js'

const router = express.Router()
const maxSize = 0.5 * 1024 * 1024

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },
})

//To be deprecated (Not public information about users will be provided.)
router.get('/', getUsersLimiter, getUsers)

//Pending authentication middleware

router.get('/me', getUserLimiter, verifyToken, validateGetUser, getUser)

// router.get('/:userId', getUserLimiter, validateGetUser, getUser)

router.post('/', userSignupLimiter, validateUserSignup, saveUser)

//Pending authentication middleware (Pending deprecation or soft delete.)

router.delete('/:userId', validateUserDeletion, deleteUser)

//User information update endpoints.

//Pending authentication middleware

router.patch(
  '/:userId/password',
  updateUserLimiter,
  validatePasswordUpdate,
  updatePassword
)

//Pending authentication middleware

router.patch(
  '/:userId/username',
  updateUserLimiter,
  validateUsernameUpdate,
  updateUsername
)

//Pending authentication middleware

router.patch(
  '/:userId/avatar',
  updateUserLimiter,
  upload.single('avatar'),
  validateAvatarUpdate,
  updateAvatar
)

//Pending authentication middleware

router.patch(
  '/:userId/cover',
  updateUserLimiter,
  upload.single('cover'),
  validateCoverUpdate,
  updateCover
)

//User Ops controllers

//Pending authentication middleware

router.get(
  '/:userId/likes',
  getUserOpsLimiter,
  validateUserLikes,
  getLikesByUser
)

//Pending authentication middleware

router.get(
  '/:userId/reviews',
  getUserOpsLimiter,
  validateUserReviews,
  getReviewsByUser
)

//Pending authentication middleware

router.get(
  '/:userId/places',
  getUserOpsLimiter,
  validateUserPlaces,
  getPlacesByUser
)

//Pending authentication middleware

router.get(
  '/:userId/routes',
  getUserOpsLimiter,
  validateUserRoutes,
  getRoutesByUser
)

export { router as usersRouter }

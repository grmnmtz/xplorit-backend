import validator from 'express-validator'
import { ApiError } from '../../errors/ApiError.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { sanitizeInput } from '../../utils/inputSanitizer.js'
const { body, check, validationResult } = validator

const validatePlaceCreation = async (req, res, next) => {
  try {
    // const { ownerId } = req.body

    const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    const foundUser = await getSingleUser({ _id: id })

    // const userNameExists = await getSingleUser({
    //   _id: id,
    // })

    if (!foundUser) {
      next(ApiError.badRequest('User not found.'))
      return
    }

    // const userNameExists = await getSingleUser({
    //   _id: id,
    // })

    // if (!userNameExists) {
    //   next(ApiError.badRequest('User not found.'))
    //   return
    // }

    // req.body.ownerId = id

    // const ownerIdChain = body('ownerId')
    //   .exists({ checkNull: true, checkFalsy: true })
    //   .withMessage('Please provide a valid ID.')
    //   .isMongoId()
    //   .withMessage('Please provide a valid ID.')
    //   .run(req)

    const nameChain = body('name')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Please provide a name for the place.')
      .isString()
      .withMessage('Name must be a string.')
      .isLength({ max: 300 })
      .trim()
      .run(req)

    const descriptionChain = body('description')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Please provide a description for the place.')
      .isString()
      .withMessage('Name must be a string.')
      .isLength({ max: 3000 })
      .trim()
      .run(req)

    const addressChain = check('address')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Address must be an object.')
      .run(req)

    const streetChain = check('address.street')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('please provide a street')
      .run(req)

    const cityChain = check('address.city')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('please provide a city')
      .run(req)

    const stateChain = check('address.state')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('please provide a state')
      .run(req)

    const zipCodeChain = check('address.zipcode')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('Zipcode must be a valid number.')
      .run(req)

    const tagsChain = body('tags')
      .isArray()
      .withMessage('Tags must be an array.')
      .run(req)

    const tagsStringsChain = body('tags.*')
      .isString()
      .withMessage('tags inside tags array must be strings.')
      .run(req)

    const scheduleStartChain = body('scheduleStart')
      .exists({ checkNull: true, checkFalsy: true })
      .isDate()
      .withMessage('Schedule start is not a valid date.')
      .run(req)

    const scheduleFinishChain = body('scheduleFinish')
      .exists({ checkNull: true, checkFalsy: true })
      .isDate()
      .withMessage('Schedule finish is not a valid date.')
      .run(req)

    const locationChain = body('location')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Location must be an object.')
      .run(req)

    const pointChain = body('location.type')
      .exists({ checkNull: true, checkFalsy: true })
      .matches('Point')
      .withMessage('type of location must be a string named Point.')
      .not()
      .isEmpty()
      .withMessage('Point must be a a string.')
      .run(req)

    const coordenatesChain = body('location.coordinates')
      .exists({ checkNull: true, checkFalsy: true })
      .isArray()
      .withMessage('Coordenates must be a valid GeoJSON Array.')
      .not()
      .isEmpty()
      .withMessage('Coordenates must be an array of valid coordenates.')
      .run(req)

    const imagesChain = body('images')
      .exists({ checkNull: true, checkFalsy: true })
      .isArray()
      .withMessage('Images must be an array.')
      .run(req)

    const imagesUrlsChain = body('images.*')
      .exists()
      .isURL()
      .withMessage(
        'Images array must contain an array of valid URL strings and a maximum of 6 items.'
      )
      .run(req)

    await Promise.all([
      // ownerIdChain,
      nameChain,
      descriptionChain,
      addressChain,
      streetChain,
      cityChain,
      stateChain,
      zipCodeChain,
      tagsChain,
      tagsStringsChain,
      scheduleStartChain,
      scheduleFinishChain,
      locationChain,
      pointChain,
      coordenatesChain,
      imagesChain,
      imagesUrlsChain,
    ])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    // const foundUser = await getSingleUser({ _id: id })

    const sanitizedDescription = sanitizeInput(req.body?.description)
    req.body.description = sanitizedDescription

    const owner = id //el id del usuario en string

    req.body.ownerId = owner

    next()
  } catch (error) {
    console.error(error)
    next({})
  }
}

export { validatePlaceCreation }

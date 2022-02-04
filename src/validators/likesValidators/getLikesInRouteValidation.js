import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'



const { param, validationResult } = validator

const getLikesFromRouteValidation = async (req, res, next) => {
    try {
        const { routeId } = req.params
  
      //Sanitization and validator chains on user registration requested information from body.
  
      const routeIdChain = param('routeId')
      .exists()
      .withMessage('Please provide a route ID.')
      .isMongoId()
      .withMessage('Please provide a valid route ID.')
      .run(req)

      await routeIdChain

      //Validation on request results
      const result = validationResult(req)
  
      if (!result.isEmpty()) {
        next(
          ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
        )
        return
      }

      //route exists validation
      const routeExists = await getSingleRoute({ _id: routeId })
      console.log(routeExists)

      if (isEmptyArray(routeExists)) {
        next(ApiError.badRequest('route not found.'))
        return
      }

          
      next()
    } catch (err) {
      console.error(err)
      next(ApiError.badRequest(err))
    }
  }
  
  export { getLikesFromRouteValidation }
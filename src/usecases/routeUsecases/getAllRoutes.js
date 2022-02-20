import { Route } from '../../models/route.model.js'
import { isSafeRegex } from '../../utils/regexCheck.js'

const getAllRoutes = async (requestQuery = {}) => {
  const myCustomLabels = {
    totalDocs: 'totalRoutes',
    docs: 'routes',
  }

  let sorted = requestQuery.sort || 'average'

  let user = { path: 'ownerId', select: 'username avatar' }

  const options = {
    page: requestQuery.page || 1,
    limit: requestQuery.limit || 9,
    sort: { [sorted]: -1 },
    customLabels: myCustomLabels,
    populate: user,
    projection: {
      _id: 1,
      ownerId: 1,
      name: 1,
      description: 1,
      average: 1,
      likes: 1,
      tags: 1,
      images: 1,
      createdAt: 1,
      updatedAt: 1,
      location: 1,
    },
  }

  // My Query Object which will be constructed logically from the queries sent in the request.

  let query = {}

  let $and = []

  //Filters for the q parameter, searches globally for keywords in the selected fields.

  console.log('requestQuery found??', requestQuery)

  //Filters for the q parameter, searches globally for keywords in the selected fields.

  const qFilters = [{ name: { $regex: `${requestQuery.q}`, $options: 'i' } }]

  //User searched for a keyword in the search bar ?

  if (requestQuery.q) {
    if (!isSafeRegex(requestQuery.q)) {
      throw new Error('No valid query')
    }
    query['$or'] = qFilters
  }

  //User sent tags with the checkboxes?

  if (requestQuery.tags) {
    const tagsArray = requestQuery.tags.split(',')
    const tagsToLowerCase = tagsArray.map((tag) => tag.toLowerCase())
    $and.push({ tags: { $all: tagsToLowerCase } })
    query['$and'] = $and
  }

  //Geo queries are always required.

  if (requestQuery.lng && requestQuery.lat && requestQuery.distance) {
    let longitude = parseFloat(requestQuery.lng)
    let latitude = parseFloat(requestQuery.lat)
    let distance =
      parseInt(requestQuery.distance) > 1 ? parseInt(requestQuery.distance) : 1

    //console.log('whats the distance bro?', distance)

    //Convert km to radians PENDING.

    const radians = 3963.2
    const distanceInRadians = distance / radians

    $and.push({
      'location.coordinates': {
        $geoWithin: {
          // $centerSphere: [[longitude, latitude], distance / 3963.2],
          $centerSphere: [[longitude, latitude], distanceInRadians],
        },
      },
    })

    query['$and'] = $and
  }

  console.log('Query found??', JSON.stringify(query, '\n', 2))

  return await Route.paginate(query, options)
}

export { getAllRoutes }

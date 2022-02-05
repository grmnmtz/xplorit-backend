import { Place } from '../../models/place.model.js'

const getAllPlaces = async (query) => {
  const myCustomLabels = {
    totalDocs: 'totalPlaces',
    docs: 'places',
  }

  const options = {
    page: query.page,
    limit: query.limit,
    customLabels: myCustomLabels,
  }

  console.log('Query found??', query)

  try {
    return await Place.paginate({}, options)
  } catch (error) {
    console.error(error)
  }
}

// const getAllPlaces = async () => {
//   try {
//     return await Place.find()
//   } catch (error) {
//     console.error(error)
//   }
// }

export { getAllPlaces }

import Route from 'models/route.model'

const getSingleRoute = async (id) => await Route.findById(id)

export { getSingleRoute }

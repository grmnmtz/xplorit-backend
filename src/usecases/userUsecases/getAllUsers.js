import { User } from '../../models/user.model.js'

const getAllUsers = async (query) => {
  const myCustomLabels = {
    totalDocs: 'totalUsers',
    docs: 'users',
  }

  console.log('Query found??', query)

  const options = {
    page: query.page,
    limit: query.limit,
    customLabels: myCustomLabels,
    select: 'username avatar coverPhoto',
  }

  try {
    return await User.paginate({}, options)
  } catch (error) {
    console.error(error)
  }
}

export { getAllUsers }

// const getAllUsers = async () => {
//   try {
//     return await User.find()
//       .select('username avatar coverPhoto')
//       .find({ hashedPassword: { $ne: null } })
//       .setOptions({ sanitizeFilter: true })
//   } catch (error) {
//     console.error(error)
//   }
// }

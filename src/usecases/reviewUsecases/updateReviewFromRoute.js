import { Review } from '../../models/review.model.js'

const updateReviewFromRoute = async (id, body) =>
  await Review.findByIdAndUpdate(id, body, { new: true })

export { updateReviewFromRoute }

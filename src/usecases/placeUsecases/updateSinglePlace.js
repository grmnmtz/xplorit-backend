import { Place } from '../../models/place.model.js'

const updateSinglePlace = async (id, body) =>
  await Place.findByIdAndUpdate(id, body, { new: true })

export { updateSinglePlace }

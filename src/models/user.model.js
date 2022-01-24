import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 4,
      maxlength: 16,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 120,
      required: true,
    },
    avatar: {
      type: String,
    },
    coverPhoto: {
      type: String,
    },
  },
  { timestamps: true }
)

userSchema.path('email').set((value) => value.toLowerCase())

const User = mongoose.model('user', userSchema)

export { User }

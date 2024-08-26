import mongoose from 'mongoose' // Importing the mongoose library for MongoDB integration
import bcrypt from 'bcrypt' // Importing the bcrypt library for password hashing

const saltRounds = 6 // Setting the number of salt rounds for password hashing
const Schema = mongoose.Schema // Creating a shorthand reference to the mongoose Schema class

const userSchema = new Schema({
  name: String, // Defining a field for the user's name
  email: { type: String, required: true, lowercase: true }, // Defining a required field for the user's email
  password: String, // Defining a field for the user's password
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' }, // Defining a reference to the user's profile using the ObjectId type
}, {
  timestamps: true, // Adding timestamps to track the creation and modification dates of the user document
})

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password // Removing the password field from the serialized user object
    return ret
  }
})

userSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next() // If the password is not modified, move to the next middleware

  try {
    const hash = await bcrypt.hash(user.password, saltRounds) // Hashing the user's password using bcrypt
    user.password = hash // Storing the hashed password in the user document
    next() // Moving to the next middleware
  } catch (err) {
    next(err) // Handling any errors that occur during password hashing
  }
})

userSchema.methods.comparePassword = async function (tryPassword) {
  return await bcrypt.compare(tryPassword, this.password) // Comparing a provided password with the stored hashed password
}

const User = mongoose.model('User', userSchema) // Creating a User model using the userSchema

export { User } // Exporting the User model for use in other files
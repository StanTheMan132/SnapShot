/**
 * This is the mongoose model for a User.

  It includes a
    1. username
    2. password
    3. email
    4. authority

  This model can be used to create a new User or find a User by using the
    .findOne()
    .save()
  functions
  Note that .save will automatically hash the included password
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.Promise = Promise;

const { Schema } = mongoose;

//  Mongoose Schema
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  authority: { type: String, required: true },
});

//  hash and salt the password before saving
UserSchema.pre('save', function saveSchema(next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        //  pass the error to the express error handler using next function
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
        return user.password;
      });
      return true;
    });
  } else {
    return next();
  }
  return true;
});


//  compare the user password to the hashed password
UserSchema.methods = {
  authenticate: async function authenticateUser(passw, next) {
    try {
      const authenticated = await bcrypt.compare(passw, this.password);
      // console.log(authenticated);
      if (authenticated) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  },
  removePassword: function removePassword() {
    const obj = this.toObject();
    delete obj.password;
    delete obj._id;
    return obj;

  }
};


//  export the UserSchema so it can be used in different files
module.exports = mongoose.model('User', UserSchema);

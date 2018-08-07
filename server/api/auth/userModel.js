const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

// https://blog.matoski.com/article/jwt-express-node-mongoose

//  Mongoose Schema
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  permissions: { type: String, required: true },
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
  authenticate: async function authenticateUser(passw) {
    const authenticated = await bcrypt.compare(passw, this.password);
    console.log(authenticated);
    return authenticated;
  },
};


//  export the UserSchema so it can be used in different files
module.exports = mongoose.model('User', UserSchema);

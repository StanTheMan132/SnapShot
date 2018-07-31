var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

//https://blog.matoski.com/article/jwt-express-node-mongoose

//Mongoose Schema
var UserSchema = new Schema({
    userName: {type:String, required: true},
    password: {type:String, required: true}
});

//hash the password AKA make it unreadable
UserSchema.pre('save', function(next){
    var user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if(err){
                //pass the error to the express error handler using next function
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err){
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else{
        return next();
    }
});

//compare the user password to the hashed password
UserSchema.methods.comparePasswords = function(passw, cb) {
    bcrypt.compare(passw, this.password, function(err, isMatch){
        if(err){
            return cb(err);
        }
        cb(null, isMatch);

    });
};

//export the UserSchema so it can be used in different files
module.exports = mongoose.model('User', UserSchema);
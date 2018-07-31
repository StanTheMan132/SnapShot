const JwtStratagy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../api/auth/userModel.js');
const config = require('./database');

module.exports = function(passport) {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStratagy(opts, function(jwt_payload, done){
        User.find({id: jwt_payload.id}, function(err, user) {
            if(err){
                return done(err, false);
            }
            if (user){
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};
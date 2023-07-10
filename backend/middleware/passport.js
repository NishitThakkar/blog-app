const passport = require("passport")

var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
    opts.secretOrKey = process.env.SECRET_KEY;
    passport.use(
        new JwtStrategy(opts, function (jwt_payload, done) {
            return done(null, jwt_payload);
        })
    );
};


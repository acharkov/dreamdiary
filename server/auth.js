// auth.js
var passport = require("passport");  
var passportJWT = require("passport-jwt");  
var users = require("./db/users.js");
var cfg = require("./config/jwt-config.js");  
var ExtractJwt = passportJWT.ExtractJwt;  
var Strategy = passportJWT.Strategy;  
var options = {  
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function () {
    var strategy = new Strategy(options, function (jwt_payload, done) {
        if (jwt_payload.id === undefined) {
            return done(new Error('No payload'), null);
        }
        let id = jwt_payload.id
        console.log('server auth jwt_payload.id: ' + id);
        users.findOne({ id: jwt_payload.id }, function (err, user) {
            if (err) {
                console.log(err);
                return done(new Error("Error: " + err), null);
            }
            if (!user) {
                return done(new Error("User not found"), null);
            }

            return done(null, { id: user.id });
        });

    })

    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
};
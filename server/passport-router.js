var express = require('express');
var users = require("./db/users.js");  
var jwt = require("jwt-simple");
var cfg = require("./config/jwt-config.js");
var uuid = require('uuid')

var router = express.Router();
module.exports = router;

router.post("/signin", function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.sendStatus(401);
    }

    var email = req.body.email;
    var password = req.body.password;
    users.findOne({ email : email }, function (err, user) {
        if (err) {
            console.log(err);
            return res.sendStatus(401);
        }

        if (!user) {
            console.log("User not found")
            return res.sendStatus(401);
        }

        let payload = {
            id: user.id
        }
        var token = jwt.encode(payload, cfg.jwtSecret);
        console.log('user signin: email=' + email + ', id=' + user.id)
        res.status(200).json({ token: 'JWT ' + token, id: user.id})
    });
});

router.post("/signup", function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.sendStatus(401);
    }

    var email = req.body.email;
    var password = req.body.password;

    users.findOne({ email: email }, function (err, user) {
        if (err) {
            console.log(err);
            return res.sendStatus(401);
        }

        if (user) {
            console.log("User with email " + email + " already exists");
            return res.sendStatus(401)
        }

        var newUser = {
            id: uuid.v4(),
            email: email,
            date: new Date(),
            dreams: []
        };

        let payload = {
            id: newUser.id
        }
        var token = jwt.encode(payload, cfg.jwtSecret);

        users.insert(newUser, function (err, docs) {
            if (err) {
                console.log('error during insert');
                res.sendStatus(401);
                return done(null, newUser);
            }

            res.status(200).json({ token: 'JWT ' + token, id: newUser.id });
        });
    })
})
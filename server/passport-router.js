var express = require('express');
var users = require("./db/users.js");  
var jwt = require("jwt-simple");
var cfg = require("./config/jwt-config.js");
var uuid = require('uuid')

var router = express.Router();
module.exports = router;

router.post("/login", function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.sendStatus(401);
    }

    var email = req.body.email;
    var password = req.body.password;

    console.log(email, password)
    users.findOne({ email : email }, function (err, user) {
        if (err) {
            console.log(err);
            return res.sendStatus(401);
        }

        if (!user) {
            console.log("User not found")
            return res.sendStatus(401);
        }

        var payload = {
            id: user.id
        }
        console.log(payload)

        var token = jwt.encode(payload, cfg.jwtSecret);
        res.json({ token: "JWT " + token })
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
            email: email,
            date: new Date(),
            id: uuid.v4(),
            dreams: []
        };

        users.insert(newUser, function (err, docs) {
            if (err) {
                console.log("error during insert");
                res.sendStatus(401);
                return done(null, newUser);
            }

            res.sendStatus(200);
        });
    })
})
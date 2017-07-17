var express = require('express');
var users = require("./db/users.js");
var uuid = require('uuid');
var _ = require('lodash');
var auth = require("./auth.js")();  

const NUM_OF_DREAMS_TO_SHOW = 3;

var router = express.Router();
module.exports = router;

router.post('/api/dream', auth.authenticate(), function (req, res) {
    users.findOne({ id: req.user.id }, function (err, user) {
        if (!user) {
            //FIXME: send something else instead of 404
            res.sendStatus(404);
        };
        
        let inputDream = req.body.dream;
        console.log(inputDream);
        let foundIndex = _.findIndex(user.dreams, { id: inputDream.id });

        if (foundIndex != -1) {
            user.dreams[foundIndex].dreamText = inputDream.dreamText;
            users.update({ id: req.user.id },
                { $set: { dreams: user.dreams } },
                {},
                function (s) {
                    console.log(s);
                    res.sendStatus(200);
                });
        } else {

            users.update({ id: req.user.id },
                { $push: { dreams: inputDream } },
                {},
                function () {
                    res.sendStatus(200);
                });
        }
    });
});

router.get('/api/dreams', auth.authenticate(), function (req, res) {
    users.findOne({ id: req.user.id }, function (err, user) {
        if (!user) {
            //FIXME: send something else instead of 404
            return res.sendStatus(404);
        };
        return res.json(user.dreams.reverse());
    });
});

router.get('/api/topdreams', function (req, res) {
    users.findOne({ id: req.user.id }, function (err, user) {
        if (!user) {
            //FIXME: send something else instead of 404
            return res.sendStatus(404);
        };
        return res.json(user.dreams.reverse().slice(0, NUM_OF_DREAMS_TO_SHOW));
    });
});

router.delete('/api/dream/:id', auth.authenticate(), function (req, res) {
    var idToDelete = req.params.id;
    users.findOne({ id: req.user.id }, function (err, user) {
        if (!user) {
            //FIXME: send something else instead of 404
            console.error("delete dream: can't find the user");
            return res.sendStatus(404);
        };

        _.remove(user.dreams, { id: idToDelete });

        users.update({ id: req.user.id },
            { $set: { dreams: user.dreams } },
            {},
            function () {
                console.log("dream removed: id=" + idToDelete);
                return res.json(user.dreams.reverse());
            });
    });
})
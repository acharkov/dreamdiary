
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
var path = require('path')
var auth = require('./auth.js')();

const PORT = 3000

app.use(express.static(path.join(__dirname,'..', '/public')))
app.use(bodyParser.json());
//needed for passport-local
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(require('morgan')("combined"))

app.use(auth.initialize());

var passportRouter = require('./passport-router.js');
app.use(passportRouter);

var apiRouter = require('./api');
app.use(apiRouter);

app.get('/', function (req, res) {
    res.sendFile('/index.html');
});

app.listen(PORT, function () {
  console.log('Example app listening on port: ' + PORT)
})
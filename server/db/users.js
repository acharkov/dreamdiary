var DataStore = require('nedb');
var path = require('path');
var users = new DataStore({ filename : path.join(__dirname, "users.db"), autoload : true });

//FIXME: create an abstract User class instead?
module.exports = users;
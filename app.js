var express = require('express');
var bodyParser = require('body-parser');
var winstone = require('winston');
// var mongo = require('mongodb');
// var monk = require('monk');
// var db = monk('mongodb://root:root@ds161136.mlab.com:61136/mydb');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.use(bodyParser.json());

var user = require('./public/javascripts/user.js');


app.get('/', (req, res) => {
    console.log(new user.User()._firstName);
    res.sendFile('index.html');
});

http.listen(PORT, () => {
    console.log('Server listen PORT: ' + PORT)
});
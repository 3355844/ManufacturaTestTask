const express = require('express');
const bodyParser = require('body-parser');
const winstone = require('winston');
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('mongodb://root:root@ds161136.mlab.com:61136/mydb');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.get('/users', (req, res) => {
    console.log('GET Users method');
    let db = req.db;
    let users = db.get('users');
    users.find({}, {}, (err, data) => {
        res.json({users: data});
    })
});

app.post('/users', (req, res) => {
    console.log('POST User method');
    let newUser = {
        _firstName: req.body.firstName,
        _lastName: req.body.lastName,
        _emailUser: req.body.emailUser,
        _phoneUser: req.body.phoneUser
    };
    let db = req.db;
    let users = db.get('users');
    users.insert(newUser, (err, result) => {
        res.sendStatus(200);
    });

});

// Listen Server
http.listen(PORT, () => {
    console.log('Server listen PORT: ' + PORT)
});
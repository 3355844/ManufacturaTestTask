const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('mongodb://root:root@ds161136.mlab.com:61136/mydb');
const app = express();
const http = require('http').Server(app);
const log4js = require('log4js');
const PORT = process.env.PORT || 3000;

// Log4js
let logger = log4js.getLogger();
logger.level = 'error';
logger.level = 'info';
logger.level = 'trace';

app.use(express.static(__dirname));

app.use(bodyParser.json());

//ADD MongoDB
app.use(function (req, res, next) {
    req.db = db;
    next();
});

// GET USERS
app.get('/users', (req, res) => {
    logger.info('GET method return All users');
    let db = req.db;
    let users = db.get('users');
    users.find({}, {}, (err, data) => {
        if (err) {
            logger.error(err);
        } else {
            logger.trace('Return: ' + JSON.stringify(data));
            res.json({users: data});
        }
    })
});

// CREATE USER
app.post('/users', (req, res) => {
    logger.info('POST Create Method');
    let newUser = {
        _firstName: req.body.firstName,
        _lastName: req.body.lastName,
        _emailUser: req.body.emailUser,
        _phoneUser: req.body.phoneUser
    };
    let db = req.db;
    let users = db.get('users');
    users.insert(newUser, (err, result) => {
        if (err) {
            logger.error(err)
        } else {
            logger.trace('User Created ' + JSON.stringify(result));
            res.sendStatus(200);
        }
    });
});
// UPDATE USER
app.put('/users/:id', (req, res) => {
    logger.info('PUT User Method');
    let id = req.params.id;
    let newFirstName = req.body.newFirstName;
    let newLastName = req.body.newLastName;
    let newEmail = req.body.newEmail;
    let newPhone = req.body.newPhone;
    let db = req.db;
    let users = db.get('users');
    //  UPDATE USER FILLS
    users.findOneAndUpdate({_id: id}, {
        $set: {
            _firstName: newFirstName,
            _lastName: newLastName,
            _emailUser: newEmail,
            _phoneUser: newPhone
        }
    });
    logger.info('User ' + id + ' Updated successful');
    res.sendStatus(200);
});

// DELETE USER
app.delete('/users/:id', (req, res) => {
    logger.info('DELETE User method');
    let id = req.params.id;
    let users = req.db.get('users');
    users.remove({_id: id});
    logger.info('User: ' + id + ' deleted successful');
    res.sendStatus(200);
});

// Listen Server
http.listen(PORT, () => {
    console.log('Server listen PORT: ' + PORT)
});
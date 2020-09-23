var userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');

var token = function (req, res, next) {
    // let tokenHolder = req.headers['authorization'].split(' ');
    // const token = tokenHolder[1];
    const token = req.headers.token;
    jwt.verify(token, 'secret', (err, authData) => {
        if (err) {
            res.status(403).send({ message: 'token_expired' })
        }
        if (authData != undefined) {
            userModel.find({ 'email': authData.user.email }, function (err, doc) {
                if (err) {
                    console.log(err);
                    res.status(404).send({ message: err })
                    return;
                }
                req.body.userId = doc[0]._id;
                req.body.userEmail = doc[0].email;
                next();
                return;
            })
        }
    })
}
module.exports = token;
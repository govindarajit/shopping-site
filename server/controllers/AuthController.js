// const bcrypt = require('bcrypt');
const async = require('async');
const crypto = require('crypto');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

module.exports = {
    signup: (req, res, next) => {
        const {
            name,
            email,
            password,
            contact,
            address,
            roles
        } = req.body;

        async.waterfall([
            function (done) {
                crypto.randomBytes(48, function (err, buf) {
                    let cryptoToken = buf.toString('hex');
                    done(err, cryptoToken);
                });
            },
            function (cryptoToken, done) {
                User.findOne({
                    email
                }, '_id', (err, foundUser) => {
                    if (foundUser) return res.status(400).json({ message: 'This e-mail already exists' });
                    else {
                        // const salt = bcrypt.genSaltSync(10);
                        // const hashPass = bcrypt.hashSync(password, salt);
                        const newUser = new User({
                            name,
                            email,
                            password,
                            contact,
                            address,
                            roles
                            // password: hashPass,
                            // verifyUserToken: cryptoToken
                        });
                        jwt.sign({ user: newUser }, 'secret', { expiresIn: '24h' }, (err, token) => {
                            newUser.save((err) => {
                                if (err) return res.status(400).json({ message: 'Something went wrong' });
                                else return res.status(200).send({ token: token });
                            });
                        })
                    }
                });
            }
        ])
    },

    login: (req, res, next) => {
        let obj = req.body;
        User.findOne({ email: obj.email, password: obj.password })
            .select('_id name contact email password roles')
            .populate('roles')
            .exec(function (err, user) {
                if (err) res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);

                if (user !== undefined && user !== null) {
                    let roles = [];
                    for (let i = 0; i < user.roles.length; i++) {
                        roles.push(user.roles[i].name);
                    }

                    // if user found then create a token
                    const token = jwt.sign({
                        email: user.email,
                        password: user.password,
                        roles: roles
                    }, 'secret', {
                        expiresIn: 1440 * 60 // expires in 24 hours
                    });
                    const authObj = {
                        userId: user._id,
                        email: user.email,
                        name: user.name,
                        contact: user.contact,
                        roles: roles,
                        token: token
                    };
                    // return the information including token as JSON
                    res.status(httpStatus.OK).send(authObj);
                } else {
                    res.status(httpStatus.NOT_FOUND).send();
                }
            });
    },

    getUserDetail: async (req, res, next) => {
        User.find({}, function (err, doc) {
            if (err) {
                return res.status(404).send({ message: "Not Found" })
            }
            else {
                return res.status(200).send(doc)
            }
        })
    },


};
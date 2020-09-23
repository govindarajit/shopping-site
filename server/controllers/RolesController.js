const roles = require('../models/role');
const httpStatus = require('http-status');

module.exports = {

    getAll: async (req, res, next) => {
        roles.find({}, function (err, data) {
            if (err)
                res.status(404).send(err);
            else
                res.status(httpStatus.OK).send(data);
        });
    },

    getById: async (req, res, next) => {
        const id = req.params.id;
        roles.findById(id, function (err, data) {
            if (err)
                res.status(404).send(err);
            else
                res.status(httpStatus.OK).send(data[0]);
        });
    },

    add: async (req, res, next) => {
        const obj = req.body;
        const objProd = new roles(obj);
        objProd.save(function (err, data) {
            if (err) {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
            } else {
                res.status(httpStatus.CREATED).send();
            }
        });
    },

    update: async (req, res, next) => {
        let id = req.params.id;
        let obj = req.body;
        roles.updateOne({ '_id': id }, {
            '$set': {
                name: obj.name, bio: obj.bio
            }
        }).then(() => {
            res.status(httpStatus.OK).send();
        }).catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
    },

    delete: async (req, res, next) => {
        const id = req.params.id;
        roles.deleteOne({ '_id': id }, function (err) {
            if (err) res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
            res.status(httpStatus.OK).send();
        });
    }

};
const category = require('../models/category');
const httpStatus = require('http-status');

module.exports = {

    getAll: async (req, res, next) => {
        category.find({}, function (err, data) {
            if (err)
                res.status(404).send(err);
            else
                res.status(httpStatus.OK).send(data);
        });
    },

    getById: async (req, res, next) => {
        const id = req.params.id;
        category.findById(id, function (err, data) {
            if (err)
                res.status(404).send(err);
            else
                res.status(httpStatus.OK).send(data[0]);
        });
    },

    add: async (req, res, next) => {
        const obj = req.body;
        const objProd = new category(obj);
        objProd.save(function (err, data) {
            if (err) {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
            } else {
                res.status(httpStatus.CREATED).send();
            }
        });
    },

    update: async (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        category.updateOne({ '_id': id }, {
            '$set': {
                name: body.name,
                description: body.description
            }
        }, function (err, data) {
            if (err)
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.stack);
            else
                res.status(httpStatus.OK).send();
        });
    },

    delete: async (req, res, next) => {
        const id = req.params.id;
        category.deleteOne({ '_id': id }, function (err) {
            if (err) res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
            res.status(httpStatus.OK).send();
        });
    }

};
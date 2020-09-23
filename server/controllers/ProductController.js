const product = require('../models/product');
const httpStatus = require('http-status');

module.exports = {

    getAllProducts: async (req, res, next) => {
        product.find({}).populate([
            {
                path: 'categoryId',
                model: 'categories',
            }
        ]).exec(function (err, data) {
            if (err)
                res.status(404).send(err);
            else
                res.status(httpStatus.OK).send(data);
        })
    },

    getProductById: async (req, res, next) => {
        const id = req.params.id;
        product.findById(id, function (err, data) {
            if (err)
                res.status(404).send(err);
            else
                res.status(httpStatus.OK).send(data[0]);
        });
    },

    addProduct: async (req, res, next) => {
        const obj = req.body;
        const objProd = new product(obj);
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
        product.updateOne({ '_id': id }, {
            '$set': {
                name: obj.name, bio: obj.bio
            }
        }).then(() => {
            res.status(httpStatus.OK).send();
        }).catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        });
    },

    deleteProduct: async (req, res, next) => {
        const id = req.params.id;
        product.deleteOne({ '_id': id }, function (err) {
            if (err) res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
            res.status(httpStatus.OK).send();
        });
    }

};
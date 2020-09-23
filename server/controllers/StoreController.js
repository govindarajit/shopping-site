const product = require('../models/product');
const cart = require('../models/cart');
const order = require('../models/order');
const transaction = require('../models/transaction');
const httpStatus = require('http-status');

module.exports = {

    getStore: async (req, res, next) => {
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

    getStoreById: async (req, res, next) => {
        const id = req.params.id;
        product.findById(id, function (err, data) {
            if (err)
                res.status(500).send(err);
            else
                res.status(httpStatus.OK).send(data[0]);
        });
    },

    addCart: async (req, res, next) => {
        const obj = req.body;
        obj.createdDate = new Date();
        const objCart = new cart(obj);

        objCart.save(function (err) {
            console.log(err);
            if (err) {
                res.send(err);
            } else {
                console.log('objCart', objCart);
                res.json(objCart._id);
            }
        });
    },

    paymentStatus: async (req, res, next) => { //payment staus from payment gateway
        const objPayment = req.body;

        const obj = {
            cartId: objPayment.udf1,
            userId: objPayment.udf2,
            amount: objPayment.amount,
            paymentType: objPayment.mode,
            status: objPayment.status,
            transactionId: objPayment.txnid,
            createdDate: new Date()
        };
        const objTransaction = new transaction(obj);
        objTransaction.save(function (error) {
            if (error) {
                res.json(error);
            } else {
                if (obj.status == 'success') {
                    cart.findById(obj.cartId, function (err, data) {
                        if (error) {
                            res.json(error);
                        } else {
                            //  console.log("3.", data);
                            const _obj = {
                                cartId: data._id,
                                items: data.items,
                                total: data.total,
                                userId: data.userId,
                                createdDate: new Date()
                            };
                            const objOrder = new order(_obj); // console.log("3.1.", objOrder);
                            objOrder.save(function (error) {
                                if (error) {
                                    res.json(error);
                                } else {
                                    const receiptObj = {
                                        name: objPayment.firstname,
                                        email: objPayment.email,
                                        transactionId: objPayment.txnid,
                                        amount: objPayment.amount,
                                        status: objPayment.status
                                    };
                                    req.session.receipt = receiptObj;
                                    res.redirect('/receipt');
                                }
                            });
                        }
                    });
                }
                else {
                    const receiptObj = {
                        name: objPayment.firstname,
                        email: objPayment.email,
                        transactionId: objPayment.txnid,
                        amount: objPayment.amount,
                        status: objPayment.status
                    };
                    req.session.receipt = receiptObj;
                    res.redirect('/receipt');
                }
            }
        });
    }

};
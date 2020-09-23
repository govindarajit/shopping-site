var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// create a schema
var orderItemSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    name: { type: String, required: true },
    productId: { type: ObjectId, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    unitPrice: { type: Number, required: true }
});

// create a schema
var orderSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    cartId: { type: ObjectId, ref: 'carts', required: true }, //relation
    items: [orderItemSchema], //embedded document
    total: { type: Number, required: true },
    userId: { type: ObjectId, ref: 'users', required: true }, //relation
    createdDate: { type: Date, required: true }
}, {
        versionKey: false
    });
// make this available to our carts in our Node applications
module.exports = mongoose.model('orders', orderSchema);
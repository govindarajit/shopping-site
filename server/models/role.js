const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const role = new Schema({
    _id: { type: ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String },
    createdDate: { type: Date, default: Date.now },
    users: [{ type: ObjectId, ref: 'users' }]
}, { skipVersioning: true, versionKey: false });

var roles = mongoose.model('roles', role);
module.exports = roles;
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    name: { type: String, required: true },
    email: {
        type: String,
        trim: true, unique: true,
        match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        required: true
    },
    password: { type: String, required: true },
    address: { type: String },
    contact: { type: String },
    createdDate: { type: Date, default: Date.now },
    roles: [{ type: ObjectId, ref: 'roles', required: true }]
}, { skipVersioning: true, versionKey: false });

userSchema.set('toJSON', { getters: true, virtuals: true });

const UserModel = mongoose.model('Users', userSchema);
module.exports = UserModel;
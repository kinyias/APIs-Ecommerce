const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: {
            unique: true,
            collation: { strength: 2 },
        },
    },
    password: {
        type: String,
        required: true,
    },
    firstname: String,
    lastname: String,
    phone: String,
    activateAccountToken: { type: String, unique: true, sparse: true },
    refreshToken: { type: String, unique: true, sparse: true },
    lastConnexion: { type: Date, default: Date.now() },
    isAdmin: { type: Boolean, default: false },
})

module.exports = mongoose.model('users', UserSchema)

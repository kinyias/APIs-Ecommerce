const mongoose = require('mongoose')
const { Schema } = mongoose

const CategoriesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    img: String,
    user_hidden: {
        type: Boolean,
        default: false,
    },
    description: String,
})

module.exports = mongoose.model('categories', CategoriesSchema)

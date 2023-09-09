const mongoose = require('mongoose')
const { Schema } = mongoose

const NewsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    datePost: {
        type: Date,
        default: Date.now()
    },
    imgUrl: String,
    user_hidden: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('news', NewsSchema)

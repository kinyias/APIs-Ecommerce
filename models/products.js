const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    images: [
        {
            img: String,
        },
    ],
    price: Number,
    price_sale: Number,
    price_import: Number,
    quantity: Number,
    unit: String,
    units: [
        {
            unit: String,
            price: Number,
            price_sale: Number,
            price_import: Number,
            quantity: Number,
            default: {
                type: Boolean,
                default: false,
            },
        },
    ],
    comments: [
        {
            author: { type: String, required: true },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    id_category: { type: Schema.Types.ObjectId, ref: 'categories' },
    user_hidden: {
        type: Boolean,
        default: false,
    },
    description: String,
})

module.exports = mongoose.model('products', ProductsSchema)

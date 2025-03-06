const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now }
    },
    {
        timestamps: true,
    }
);

const sizeSchema = mongoose.Schema({
    size: { type: String, required: true },
    available: { type: Boolean, default: true }
});

const colorSchema = mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true }
});

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        discountPrice: {
            type: Number,
            default: 0,
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        sizes: [sizeSchema],
        colors: [colorSchema],
        features: [String],
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        reviews: [reviewSchema],
        tags: [String],
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 
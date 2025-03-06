const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// @desc    Tüm ürünleri getir
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const count = await Product.countDocuments({ ...keyword, ...category });
    const products = await Product.find({ ...keyword, ...category })
        .populate('category', 'name')
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Tek bir ürünü ID'ye göre getir
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
        'category',
        'name'
    );

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Ürün bulunamadı');
    }
});

// @desc    Ürün oluştur
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        images,
        category,
        stock,
        sizes,
        colors,
        features,
        tags,
        discountPrice,
    } = req.body;

    const product = new Product({
        name,
        price,
        description,
        images,
        category,
        stock,
        sizes,
        colors,
        features,
        tags,
        discountPrice,
        user: req.user._id,
        numReviews: 0,
        rating: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Ürün güncelle
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        images,
        category,
        stock,
        sizes,
        colors,
        features,
        tags,
        discountPrice,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.images = images || product.images;
        product.category = category || product.category;
        product.stock = stock || product.stock;
        product.sizes = sizes || product.sizes;
        product.colors = colors || product.colors;
        product.features = features || product.features;
        product.tags = tags || product.tags;
        product.discountPrice = discountPrice || product.discountPrice;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Ürün bulunamadı');
    }
});

// @desc    Ürün sil
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Ürün silindi' });
    } else {
        res.status(404);
        throw new Error('Ürün bulunamadı');
    }
});

// @desc    Ürüne yorum ekle
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Ürün zaten değerlendirilmiş');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Değerlendirme eklendi' });
    } else {
        res.status(404);
        throw new Error('Ürün bulunamadı');
    }
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
}; 
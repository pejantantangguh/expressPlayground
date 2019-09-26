const mongoose = require('mongoose');
const Product = mongoose.model('Product');


exports.productList = async (req, res) => {
    const products = await Product.find();
    res.render('productlist', { products });
}

exports.addProduct = (req, res) => {
    res.render('addProduct');
}

exports.createProduct = async (req, res) => {
    const product = new Product(req.body)
    await product.save();
    res.redirect('/');
}
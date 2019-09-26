const mongoose = require('mongoose');
const Product = mongoose.model('Product');


exports.addProduct = (req, res) => {
    res.render('addProduct');
}

exports.createProduct = async (req, res) => {
    // const product = new Product(req.body)
    // await product.save();
    res.json(req.body);
}
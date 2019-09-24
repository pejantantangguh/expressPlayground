const mongoose = require('mongoose');
const Product = mongoose.model('Product');


exports.addProduct = (req, res) => {
    res.render('addProduct');
}
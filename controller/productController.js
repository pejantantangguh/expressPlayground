const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const jimp = require('jimp');
const multer = require('multer');
const uuid = require('uuid');
const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            // Photo returns true 
            next(null, true); // This is just how the next call back works, if it's photo then it's null then value is true
        } else {
            next({ message: 'File type is not allowed!' }, false);
        }
    }
}

exports.upload = multer(multerOptions).single('thumbnail');

exports.resize = async (req, res, next) => {
    if (!req.file) {
        next();
        return;
    }
    const extension = req.file.mimetype.split('/'[1]);
    req.body.thumbnail = `${uuid.v4()}.${extension}`;

    // resizing
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./uploads/${req.body.thumbnail}.jpeg`);
    res.redirect('/');
}




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
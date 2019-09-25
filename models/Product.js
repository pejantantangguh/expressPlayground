const mongoose = require('mongoose');
const slug = require('slugs');
mongoose.Promise = global.Promise;


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: 'Please enter product name',
    },
    slug: String,
    price: {
        type: Number,
        required: 'Please enter valid number',
        trim: true,
    },
    category: [String],
    brand: String,
    thumbnail: String,
    gallery: [String],
    description: String,
    color: [String]
});
productSchema.pre('save', function (next) {
    if (!this.isModified('productName')) {
        next();
        return;
    }
    this.slug = slug(this.productName);
    next();
    // TODO Make name cannot be the same as existing slug
})



module.export = mongoose.model('Product', productSchema);

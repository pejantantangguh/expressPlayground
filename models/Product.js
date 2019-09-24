const mongoose = require('mongoose');
const slug = require('slugs');
const validate = require('moongoose-validator')
mongoose.Promise = global.Promise;

const nameValidator = [
    validate({
        validator: 'isLength',
        argument: [3, 100],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only',
    })
]

const numberValidator = [
    validate({
        validate: 'isCurrency',
        message: 'This needs to be a number'
    })
]

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: 'Please enter product name',
        validate: nameValidator
    },
    slug: String,
});

productSchema.pre('save', function (next) {
    if (!this.isModified('productName')) {
        next();
        return;
    }
    this.slug = slug(this.name);
    next();

    // TODO Make name cannot be the same as existing slug
})



module.export = mongoose.model('Product', productSchema);

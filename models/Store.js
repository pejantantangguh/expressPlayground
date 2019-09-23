const mongoose = require('mongoose');
const slug = require('slugs');
mongoose.Promise = global.Promise;

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter store name'
    },
    slug: String,
    //desc an object
    description: {
        type: String,
        trim: true
    },
    // tags [String]
    tags: [String]


});

// Create Store Schema save
storeSchema.pre('save', function (next) {
    // Enabling slugs to follow the name
    if (!this.isModified('name')) {
        next() // skip it
        return; // stop function from running
    } this.slug = slug(this.name);
    next();

    // TODO Make name cannot be the same as existing slugs
});

module.export = mongoose.model('Store', storeSchema);

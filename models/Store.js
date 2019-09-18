const mongoose = require('mongoose');
const slugs = require('slugs');
mongoose.Promise = global.Promise;

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter store name'
    },
    slugs: String,
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

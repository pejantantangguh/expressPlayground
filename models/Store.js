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
    tags: [String],
    photo: [String]
});

// Create Store Schema save
storeSchema.pre('save', async function (next) {
    // Enabling slugs to follow the name
    if (!this.isModified('name')) {
        next() // skip it
        return; // stop function from running
    } this.slug = slug(this.name);
    // TODO Make name cannot be the same as existing slugs
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    console.log(slugRegEx);

    const storeswithSlug = await this.constructor.find({ slug: slugRegEx });

    if (storeswithSlug.length) {
        this.slug = `${this.slug}-${storeswithSlug.length + 1}`;
    }
    next();


});

// Store Controller -> getTagsList
storeSchema.statics.getTagsList = function () {
    return this.aggregate([
        { $unwind: '$tags' },
        {
            $group: { _id: '$tags', count: { $sum: 1 } }
        },
        { $sort: { count: -1 } }
    ]);
}

module.export = mongoose.model('Store', storeSchema);

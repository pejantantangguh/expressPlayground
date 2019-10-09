const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: 'Please enter Email',
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid Email Address']
    },
    name: {
        type: String,
        required: 'Please supply a name',
        trim: true
    },


});


userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.export = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongoErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
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
userSchema.plugin(mongoErrorHandler);

module.export = mongoose.model('User', userSchema);
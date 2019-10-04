const mongoose = require('mongoose');
const User = mongoose.model('User');




exports.userRegister = (req, res) => {
    res.render('register', { title: 'User Register Page' });
}

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('name', 'You must supply a name').notEmpty();
    req.checkBody('email', 'Your email is not valid!').isEmail();
    req.checkBody('password', 'Password cannot be blank').notEmpty();
    req.checkBody('confirm-password', 'Confirmed password cannot be blank').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        console.log('error', errors.map(err => err.msg))
        res.render('register', { title: 'Register', body: req.body, errors });
        return;
    } else {
        res.render('register', { title: 'Register', body: req.body });
        next();
    }

};


exports.saveUser = async (req, res, next) => {
    const user = new User(req.body);
    await user.save();
    res.redirect('/');
}


exports.userLogin = (req, res) => {
    res.render('login', { title: 'Login page' });
}

exports.loginSubmitted = async (req, res) => {
    res.send('login button pressed');
}
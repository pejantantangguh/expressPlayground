const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');



exports.userRegister = (req, res) => {
    res.render('register', { title: 'User Register Page' });
}


exports.userLogin = (req, res) => {
    res.render('login', { title: 'Login page' });
}

exports.loginSubmitted = async (req, res) => {
    res.send('login button pressed');
}

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'That Email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        gmail_remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
    req.checkBody('confirm-password', 'Confirmed Password cannot be blank!').notEmpty();
    req.checkBody('confirm-password', 'Oops! Your passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        const errorsMessage = errors.map(err => err.msg);
        res.render('register', { title: 'Register', body: req.body, errorsMessage });
        return; // stop the fn from running
    }
    next(); // there were no errors!
};


exports.saveUser = async (req, res, next) => {
    const user = new User({ email: req.body.email, name: req.body.name });
    const register = promisify(User.register, User);
    await register(user, req.body.password);
    next();
}
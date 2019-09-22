const Store = require('../models/Store');

exports.storeList = (req, res) => {
  res.render('./storelist');
}

exports.storeDetails = (req, res) => {
  res.send('Details of the clicked store');
}

// Add store and edit store will be exactly same way.
exports.addStore = (req, res) => {
  res.render('./addstore', { title: 'Add / Edit Store ' });
}


exports.homePage = (req, res) => {
  res.render('index', { title: 'Express' })
}



